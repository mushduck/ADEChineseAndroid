<script>
import svgPanZoom from "svg-pan-zoom";

import { CELESTIAL_NAV_DRAW_ORDER } from "@/core/secret-formula/celestials/navigation";

import NodeBackground from "./NodeBackground";
import NodeOverlay from "./NodeOverlay";
import NodeRing from "./NodeRing";
import ProgressConnector from "./ProgressConnector";

export default {
  name: "CelestialNavigationTab",
  components: {
    NodeRing,
    NodeBackground,
    NodeOverlay,
    ProgressConnector
  },
  data: () => ({
    nodeState: null,
  }),
  computed: {
    db() {
      return {
        ...GameDatabase.celestials.navigation,
        ...GameDatabase.celestials.navSigils
      };
    },
    drawOrder() {
      const db = this.db;
      const order = [];
      for (const nodeId of Object.keys(db)) {
        const node = db[nodeId];
        if (node.connector instanceof Array) {
          for (const config of node.connector) {
            order.push({
              nodeId,
              is: ProgressConnector,
              config,
              drawOrder: config.drawOrder || CELESTIAL_NAV_DRAW_ORDER.CONNECTORS,
            });
          }
        } else if (node.connector) {
          order.push({
            nodeId,
            is: ProgressConnector,
            config: node.connector,
            drawOrder: node.connector.drawOrder || CELESTIAL_NAV_DRAW_ORDER.CONNECTORS,
          });
        }
        if (node.node) {
          order.push({
            nodeId,
            is: NodeBackground,
            config: node.node,
            drawOrder: node.node.bgDrawOrder || CELESTIAL_NAV_DRAW_ORDER.NODE_BG,
          });
          order.push({
            nodeId,
            is: NodeRing,
            config: node.node,
            drawOrder: node.node.drawOrder || CELESTIAL_NAV_DRAW_ORDER.NODES,
          });
          order.push({
            nodeId,
            is: NodeOverlay,
            config: node.node,
            drawOrder: node.node.overlayDrawOrder || CELESTIAL_NAV_DRAW_ORDER.NODE_OVERLAYS,
          });
        }
        order.sort((a, b) => a.drawOrder - b.drawOrder);
      }
      return order;
    }
  },
  created() {
    this.nodeState = Object.keys(this.db).mapToObject(
      name => name,
      () => ({
        visible: false,
        complete: 0,
      })
    );
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const navigationSvg = this.$refs.celestialNavigationSVG;
    const panLimiter = function(oldPan, newPan) {
      // In the callback context, "this" is the svgPanZoom object.
      // eslint-disable-next-line no-invalid-this
      const sizes = this.getSizes();
      // 画布元素是写死的 950×600，手机屏幕比它窄，元素右侧一大截是被 overflow 裁掉的、永远看不见。
      // 平移边界必须按「屏幕上真正可见的那块」算，不能按元素宽度算：
      // 按元素宽度算会认为内容装得下 → 一个像素都不许拖 → 右边半张图永远拖不出来。
      const rect = navigationSvg.getBoundingClientRect();
      const docWidth = document.documentElement.clientWidth || window.innerWidth;
      const docHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleWidth = Math.max(1, Math.min(rect.right, docWidth) - Math.max(rect.left, 0));
      const visibleHeight = Math.max(1, Math.min(rect.bottom, docHeight) - Math.max(rect.top, 0));
      const leftLimit = visibleWidth - ((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom);
      const rightLimit = -sizes.viewBox.x * sizes.realZoom;
      const topLimit = visibleHeight - ((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom);
      const bottomLimit = -sizes.viewBox.y * sizes.realZoom;
      // 内容比可见区还小时（手机缩到 0.4 倍看全图），上下限会倒过来（低 > 高），
      // 原来的 Math.max(低, ...) 会把图整个平移到右侧、直接推出手机可视区；
      // 这种情况贴住 high（= 可见区左上角），整张图才会落在能看到的那半边。
      const clamp = (low, high, value) => (low > high
        ? high
        : Math.max(low, Math.min(high, value)));
      return {
        x: clamp(leftLimit, rightLimit, newPan.x),
        y: clamp(topLimit, bottomLimit, newPan.y)
      };
    };
    this.panZoom = svgPanZoom(this.$refs.celestialNavigationSVG, {
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      center: false,
      fit: false,
      zoomScaleSensitivity: 0.3,
      // 手机屏幕比 950×600 的画布窄很多，0.64 的缩放下限根本缩不开整张图（950×0.64≈608px），
      // 窄屏给到 0.4，才能把整张天神地图缩到屏幕里
      minZoom: window.innerWidth <= 768 ? 0.4 : 0.64,
      maxZoom: 1.5,
      beforePan: panLimiter,
    });
    if (CelestialNavigationViewportCache.pan) this.panZoom.pan(CelestialNavigationViewportCache.pan);
    if (CelestialNavigationViewportCache.zoom) this.panZoom.zoom(CelestialNavigationViewportCache.zoom);
    this.setupPinchZoom();
  },
  beforeDestroy() {
    this.teardownPinchZoom();
    if (this.panZoom) {
      CelestialNavigationViewportCache.zoom = this.panZoom.getZoom();
      CelestialNavigationViewportCache.pan = this.panZoom.getPan();
      this.panZoom.destroy();
      delete this.panZoom;
    }
  },
  activated() {
    // 从 keep-alive 缓存回来时尺寸可能变了，重新量一次
    this.$nextTick(() => {
      if (this.panZoom) this.panZoom.resize();
    });
  },
  methods: {
    /**
     * 双指捏合缩放。
     *
     * svg-pan-zoom 3.6 的触摸支持只有「单指拖动」：它把 touchstart/touchmove 直接交给
     * handleMouseDown/handleMouseMove，而取点用的是 touches[0]，第二根手指被完全忽略 ——
     * 所以手机上没有捏合缩放。它自带的 +/− 按钮又被画在 950×600 画布的右下角，
     * 手机上根本不在这块可视区域里，等于完全没法缩放。
     *
     * 这里在 svg 的父元素上用捕获阶段接管「两根手指」的情况：
     *   - 记下两指距离与中点；
     *   - 每次移动按距离比例调用 zoomAtPoint，以两指中点为锚点缩放；
     *   - stopPropagation 让 svg-pan-zoom 收不到这两个事件，避免它同时按单指拖动去平移。
     * 只挡「正好两根手指」的事件，单指拖动照旧走 svg-pan-zoom 自己的平移。
     */
    setupPinchZoom() {
      const svg = this.$refs.celestialNavigationSVG;
      const host = svg?.parentNode;
      if (!svg || !host) return;

      const touchPoint = touches => {
        const rect = svg.getBoundingClientRect();
        const point = svg.createSVGPoint();
        point.x = (touches[0].clientX + touches[1].clientX) / 2 - rect.left;
        point.y = (touches[0].clientY + touches[1].clientY) / 2 - rect.top;
        return point;
      };
      const touchDistance = touches => Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );

      const pinch = { lastDistance: 0 };

      const onTouchStart = event => {
        if (event.touches.length !== 2) return;
        pinch.lastDistance = touchDistance(event.touches);
        event.stopPropagation();
        if (event.cancelable) event.preventDefault();
      };
      const onTouchMove = event => {
        if (event.touches.length !== 2 || !pinch.lastDistance) return;
        event.stopPropagation();
        if (event.cancelable) event.preventDefault();
        const distance = touchDistance(event.touches);
        if (distance <= 0) return;
        const ratio = distance / pinch.lastDistance;
        // 抖动过滤：变化太小就别动了，省得每帧都重设一次 CTM
        if (Math.abs(ratio - 1) < 0.003) return;
        pinch.lastDistance = distance;
        // 公版 API 里 zoomAtPoint() 的第 3 个参数被写死成「绝对缩放」，
        // 这里给的是「相对当前缩放的比例」，所以要用 zoomAtPointBy()
        this.panZoom.zoomAtPointBy(ratio, touchPoint(event.touches));
      };
      const onTouchEnd = event => {
        if (event.touches.length >= 2) return;
        pinch.lastDistance = 0;
        // 捏合结束后把平移量收进合法范围：缩到很小的时候不会停在屏幕外面
        if (this.panZoom) this.panZoom.pan(this.panZoom.getPan());
      };

      host.addEventListener("touchstart", onTouchStart, { passive: false, capture: true });
      host.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
      host.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
      host.addEventListener("touchcancel", onTouchEnd, { passive: true, capture: true });
      this._pinch = { host, onTouchStart, onTouchMove, onTouchEnd };
    },
    teardownPinchZoom() {
      const pinch = this._pinch;
      if (!pinch) return;
      pinch.host.removeEventListener("touchstart", pinch.onTouchStart, { capture: true });
      pinch.host.removeEventListener("touchmove", pinch.onTouchMove, { capture: true });
      pinch.host.removeEventListener("touchend", pinch.onTouchEnd, { capture: true });
      pinch.host.removeEventListener("touchcancel", pinch.onTouchEnd, { capture: true });
      this._pinch = null;
    },
    update() {
      // The GameUI code forces update() to be called upon its initialization, which may force this to be called
      // before created() on this component is actually called; this suppresses any initial errors on-creation
      if (!this.nodeState) return;
      // 导航图状态变化很慢，没必要每帧都查：10 帧一次足够，
      // 而且每次赋值都会触发整棵 SVG（几十个节点 × 背景/光环/覆盖层）重渲染。
      if (!this._throttleUpdate(10)) return;
      for (const key of Object.keys(this.db)) {
        const state = this.nodeState[key];
        if (!state) continue;
        const visible = this.db[key].visible();
        const complete = this.db[key].complete();
        // 只在真的变化时才赋值，避免 Vue 无谓重渲染
        if (state.visible !== visible) state.visible = visible;
        if (state.complete !== complete) state.complete = complete;
      }
    },
    vec(x, y) {
      return new Vector(x, y);
    },
    nodeVisibility(obj) {
      return this.nodeState[obj.nodeId].visible ? "visible" : "hidden";
    },
  }
};
export function cubicBezierArrayToPath(a, initialCommand = "M") {
  const prefix = `${initialCommand} ${a[0].p0.x} ${a[0].p0.y}\n`;
  const parts = a.map(b => `C ${b.p1.x} ${b.p1.y} ${b.p2.x} ${b.p2.y} ${b.p3.x} ${b.p3.y}\n`);
  return prefix + parts.join("");
}
const CelestialNavigationViewportCache = {
  pan: { x: 125, y: 125 },
  zoom: 0.75,
};
</script>

<template>
  <!-- Need to wrap whole thing in a div because of properties applied to tabs -->
  <div>
    <svg
      ref="celestialNavigationSVG"
      class="c-wide-canvas-element l-celestial-navigation"
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stop-color="#ffff00"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="#ff0000"
            stop-opacity="1"
          />
        </linearGradient>
        <linearGradient
          id="incompleteFade"
          x1="0"
          x2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#888"
            stop-opacity="0"
          />
          <stop
            offset="8"
            stop-color="#888"
            stop-opacity="1"
          />
        </linearGradient>
        <linearGradient
          id="fadeGrad"
          y2="0"
          x2="1"
        >
          <stop
            offset="0.5"
            stop-color="white"
            stop-opacity="0"
          />
          <stop
            offset="1"
            stop-color="white"
            stop-opacity=".5"
          />
        </linearGradient>
        <linearGradient
          id="gradTeresaEffarig"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#5151ec"
          />
          <stop
            offset="1"
            stop-color="#d13737"
          />
        </linearGradient>
        <linearGradient
          id="gradEffarigEnslaved"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#d13737"
          />
          <stop
            offset="1"
            stop-color="#ffa337"
          />
        </linearGradient>
        <linearGradient
          id="gradEnslavedV"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#ffa337"
          />
          <stop
            offset="1"
            stop-color="#ffe066"
          />
        </linearGradient>
        <linearGradient
          id="gradRaTeresa"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#5151ec"
          />
        </linearGradient>
        <linearGradient
          id="gradRaEffarig"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#d13737"
          />
        </linearGradient>
        <linearGradient
          id="gradRaEnslaved"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#ffa337"
          />
        </linearGradient>
        <linearGradient
          id="gradRaV"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="#ffe066"
          />
        </linearGradient>
        <linearGradient
          id="gradRaLaitela"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#9063de"
          />
          <stop
            offset="1"
            stop-color="white"
          />
        </linearGradient>
        <linearGradient
          id="gradLaitelaPelle"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="white"
          />
          <stop
            offset="1"
            stop-color="crimson"
          />
        </linearGradient>
        <linearGradient
          id="gradPelleAlpha"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="crimson"
          />
          <stop
            offset="1"
            stop-color="#00ff00"
          />
        </linearGradient>
        <linearGradient
          id="gradAlphaCelBreak"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#00ff00"
          />
          <stop
            offset="1"
            stop-color="#5151ec"
          />
        </linearGradient>
        <linearGradient
          id="gradCelBreakCelEternity"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#5151ec"
          />
          <stop
            offset="1"
            stop-color="#8051ec"
          />
        </linearGradient>
        <linearGradient
          id="gradCelEternitySlabdrill"
          y2="0"
          x2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stop-color="#8051ec"
          />
          <stop
            offset="1"
            stop-color="#952ba8"
          />
        </linearGradient>
        <mask
          id="fade"
          maskContentUnits="objectBoundingBox"
        >
          <rect
            width="1"
            height="1"
            fill="url(#fadeGrad)"
          />
        </mask>
        <filter
          id="completeGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation="2"
          />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="backgroundGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation="4"
          />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <image
        x="-250"
        y="-350"
        height="1503"
        width="1503"
        href="images/celestial-navigation-bg.webp"
      />
      <g
        v-for="(obj, index) in drawOrder"
        :key="obj.nodeId + '-' + obj.drawOrder + '-' + (obj.config && obj.config.name ? obj.config.name : '')"
        :visibility="nodeVisibility(obj)"
      >
        <component
          :is="obj.is"
          :complete="Math.round(nodeState[obj.nodeId].complete * 200) / 200"
          v-bind="obj.config"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>

</style>
