<script>
import { STUDY_TREE_LAYOUT_TYPE, TimeStudyTreeLayout } from "./time-study-tree-layout";

import DilationTimeStudy from "./DilationTimeStudy";
import ECTimeStudy from "./ECTimeStudy";
import EnslavedTimeStudy from "./EnslavedTimeStudy";
import HiddenTimeStudyConnection from "./HiddenTimeStudyConnection";
import NormalTimeStudy from "./NormalTimeStudy";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";
import SecretTimeStudy from "./SecretTimeStudy";
import TimeStudyConnection from "./TimeStudyConnection";
import TimeStudySaveLoadButton from "./tt-shop/TimeStudySaveLoadButton";
import TriadTimeStudy from "./TriadTimeStudy";

export default {
  name: "TimeStudiesTab",
  components: {
    PrimaryButton,
    PrimaryToggleButton,
    NormalTimeStudy,
    ECTimeStudy,
    EnslavedTimeStudy,
    DilationTimeStudy,
    TriadTimeStudy,
    SecretTimeStudy,
    TimeStudyConnection,
    HiddenTimeStudyConnection,
    TimeStudySaveLoadButton
  },
  data() {
    return {
      respec: player.respec,
      layoutType: STUDY_TREE_LAYOUT_TYPE.NORMAL,
      vLevel: 0,
      renderedStudyCount: 0,
      renderedConnectionCount: 0,
      isEnslaved: false,
      delayTimer: 0,
      theoremAmount: new Decimal(0),
      theoremGeneration: new Decimal(0),
      totalTimeTheorems: new Decimal(0),
      hasTTAutobuyer: false,
      isAutobuyerOn: false,
      budget: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0)
      },
      costs: {
        am: new Decimal(0),
        ip: new Decimal(0),
        ep: new Decimal(0)
      },
      showST: false,
      STamount: 0,
      hasTTGen: false,
      isFlipped: false,
      isLockedTT: false,
      treeScale: window.__mobileTimeStudyScale || 0.54,
      isPinching: false,
      pinchStartDist: 0,
      pinchStartScale: 0.54,
      pinchTreeX: 0,
      pinchTreeY: 0,
      panStartX: 0,
      panStartY: 0,
      panStartScrollLeft: 0
    };
  },
  computed: {
    layout() {
      return TimeStudyTreeLayout.create(this.layoutType);
    },
    allStudies() {
      return this.layout.studies;
    },
    studies() {
      return this.allStudies.slice(0, this.renderedStudyCount);
    },
    allConnections() {
      return this.layout.connections;
    },
    connections() {
      return this.allConnections.slice(0, this.renderedConnectionCount);
    },
    svgStyleObject() {
      return {
        width: this.layout.width + "rem",
        height: this.layout.height + "rem"
      };
    },
    treeStyleObject() {
      return {
        width: this.layout.width + "rem",
        height: this.layout.height + "rem",
        transform: "scale(" + this.treeScale + ")",
        transformOrigin: "top left"
      };
    },
    treeScalerStyle() {
      return {
        width: (this.layout.width * this.treeScale) + "rem",
        height: ((this.layout.height + 4) * this.treeScale) + "rem"
      };
    },
    respecClassObject() {
      return {
        "o-primary-btn--subtab-option": true,
        "c-mobile-ts-btn-green": true,
        "o-primary-btn--respec-active": this.respec
      };
    },
    formatTimeTheoremType() {
      if (this.theoremAmount.gte(1e6)) {
        return format;
      }
      if (!(Teresa.isRunning || Enslaved.isRunning) &&
        getAdjustedGlyphEffect("dilationTTgen").gt(0) && !DilationUpgrade.ttGenerator.isBought) {
        return formatFloat;
      }
      return formatInt;
    },
    TTgenRateText() {
      if (this.theoremGeneration.lt(1 / 3600)) {
        return "你每 " + TimeSpan.fromSeconds(
          this.theoremGeneration.reciprocal()).toStringShort(false) + " 获得一个时间之理。";
      }
      if (this.theoremGeneration.lt(0.1)) {
        return "你每小时获得 " + format(this.theoremGeneration.times(3600), 2, 2) + " 时间之理。";
      }
      return "你每秒获得 " + format(this.theoremGeneration, 2, 2) + " 时间之理。";
    }
  },
  watch: {
    respec(newValue) {
      player.respec = newValue;
    },
    vLevel() {
      this.$recompute("layout");
    },
    isAutobuyerOn(newValue) {
      Autobuyer.timeTheorem.isActive = newValue;
    },
    treeScale(newValue) {
      window.__mobileTimeStudyScale = newValue;
    }
  },
  created() {
    const incrementRenderedCount = () => {
      let shouldRequestNextFrame = false;
      if (this.renderedStudyCount < this.allStudies.length) {
        this.renderedStudyCount += 4;
        shouldRequestNextFrame = true;
      }
      if (this.renderedConnectionCount < this.allConnections.length) {
        this.renderedConnectionCount += 4;
        shouldRequestNextFrame = true;
      }
      if (shouldRequestNextFrame) {
        this.renderAnimationId = requestAnimationFrame(incrementRenderedCount);
      }
    };
    incrementRenderedCount();

    this.on$(GAME_EVENT.REALITY_RESET_AFTER, () => {
      this.delayTimer = player.celestials.enslaved.hasSecretStudy
        ? Date.now()
        : 0;
    });

    document.body.scrollTop = 0;
  },
  mounted() {
    this.$nextTick(() => {
      this.centerTreeHorizontally();
    });
  },
  beforeDestroy() {
    cancelAnimationFrame(this.renderAnimationId);
  },
  methods: {
    update() {
      this.respec = player.respec;
      this.layoutType = STUDY_TREE_LAYOUT_TYPE.current;
      this.vLevel = Ra.pets.v.level;
      this.isEnslaved = Enslaved.isRunning || Date.now() - this.delayTimer < 1000;

      this.theoremAmount.copyFrom(Currency.timeTheorems);
      this.theoremGeneration.copyFrom(getTTPerSecond().times(Alpha.isRunning ? 1 : getGameSpeedupForDisplay()));
      this.totalTimeTheorems.copyFrom(Currency.timeTheorems.max);
      this.hasTTAutobuyer = Autobuyer.timeTheorem.isUnlocked;
      this.isAutobuyerOn = Autobuyer.timeTheorem.isActive;
      this.budget.am.copyFrom(TimeTheoremPurchaseType.am.currency);
      this.budget.ip.copyFrom(TimeTheoremPurchaseType.ip.currency);
      this.budget.ep.copyFrom(TimeTheoremPurchaseType.ep.currency);
      this.costs.am.copyFrom(TimeTheoremPurchaseType.am.cost);
      this.costs.ip.copyFrom(TimeTheoremPurchaseType.ip.cost);
      this.costs.ep.copyFrom(TimeTheoremPurchaseType.ep.cost);
      this.showST = V.spaceTheorems > 0 && (!Pelle.isDoomed || PelleDestructionUpgrade.spaceTheorems.canBeApplied);
      this.STamount = V.availableST;
      this.hasTTGen = this.theoremGeneration.gt(0);
      this.isFlipped = player.universes.current === 2;
      this.isLockedTT = player.eternities.eq(0);
    },
    formatAM(am) {
      return format(am) + " " + (this.isFlipped ? "正物质" : "反物质");
    },
    buyWithAM() {
      TimeTheorems.buyOne(false, "am");
    },
    formatIP(ip) {
      return format(ip) + " 无限点数";
    },
    buyWithIP() {
      TimeTheorems.buyOne(false, "ip");
    },
    formatEP(ep) {
      return format(ep, 2, 0) + " 永恒点数";
    },
    buyWithEP() {
      TimeTheorems.buyOne(false, "ep");
    },
    buyMaxTheorems() {
      TimeTheorems.buyMax(false);
    },
    ttBtnClass(type) {
      if (this.isLockedTT || !this.budget[type].gte(this.costs[type])) {
        return "c-tt-buy-button c-tt-buy-button--locked c-mobile-ts-tt-btn";
      }
      return "c-tt-buy-button c-tt-buy-button--unlocked c-mobile-ts-tt-btn";
    },
    studyComponent(study) {
      switch (study.type) {
        case TIME_STUDY_TYPE.NORMAL: return NormalTimeStudy;
        case TIME_STUDY_TYPE.ETERNITY_CHALLENGE: return ECTimeStudy;
        case TIME_STUDY_TYPE.DILATION: return DilationTimeStudy;
        case TIME_STUDY_TYPE.TRIAD: return TriadTimeStudy;
      }
      throw "Unknown Time Study type";
    },
    exportStudyTree() {
      if (player.timestudy.studies.length === 0) {
        GameUI.notify.error("你不能导出空的时间研究树。");
      } else {
        copyToClipboard(GameCache.currentStudyTree.value.exportString);
        GameUI.notify.info("当前时间研究树已导出到剪贴板");
      }
    },
    centerTreeHorizontally() {
      const vp = this.$refs.treeViewport;
      if (!vp) return;
      const maxScroll = vp.scrollWidth - vp.clientWidth;
      if (maxScroll > 0) {
        vp.scrollLeft = maxScroll / 2;
      }
    },
    onSliderZoom() {
      const vp = this.$refs.treeViewport;
      if (!vp) return;
      const centerRatio = (vp.scrollLeft + vp.clientWidth / 2) / Math.max(1, vp.scrollWidth);
      this.$nextTick(() => {
        const newScrollLeft = centerRatio * vp.scrollWidth - vp.clientWidth / 2;
        vp.scrollLeft = Math.max(0, newScrollLeft);
      });
    },
    onTreeTouchStart(e) {
      const vp = this.$refs.treeViewport;
      if (!vp) return;
      if (e.touches.length === 2) {
        this.isPinching = true;
        window.__tsDragging = true;
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        this.pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        this.pinchStartScale = this.treeScale;
        const rect = vp.getBoundingClientRect();
        const midX = (t0.clientX + t1.clientX) / 2;
        const midY = (t0.clientY + t1.clientY) / 2;
        this.pinchTreeX = (vp.scrollLeft + midX - rect.left) / this.treeScale;
        this.pinchTreeY = (window.scrollY + midY - rect.top) / this.treeScale;
      } else if (e.touches.length === 1) {
        this.isPinching = false;
        this.panStartX = e.touches[0].clientX;
        this.panStartY = e.touches[0].clientY;
        this.panStartScrollLeft = vp.scrollLeft;
      }
    },
    onTreeTouchMove(e) {
      const vp = this.$refs.treeViewport;
      if (!vp) return;
      if (e.touches.length === 2 && this.isPinching) {
        if (e.cancelable) e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (this.pinchStartDist > 10) {
          const rawScale = this.pinchStartScale * (dist / this.pinchStartDist);
          const newScale = Math.min(1.15, Math.max(0.32, Math.round(rawScale * 100) / 100));
          const rect = vp.getBoundingClientRect();
          const midX = (t0.clientX + t1.clientX) / 2;
          const midY = (t0.clientY + t1.clientY) / 2;
          this.treeScale = newScale;
          this.$nextTick(() => {
            vp.scrollLeft = Math.max(0, this.pinchTreeX * newScale - (midX - rect.left));
            const targetScrollY = this.pinchTreeY * newScale + rect.top - midY;
            window.scrollTo(0, Math.max(0, targetScrollY));
          });
        }
      } else if (e.touches.length === 1 && !this.isPinching) {
        const dx = e.touches[0].clientX - this.panStartX;
        const dy = e.touches[0].clientY - this.panStartY;
        if (Math.hypot(dx, dy) > 8) {
          window.__tsDragging = true;
        }
        if (Math.abs(dx) > 4) {
          vp.scrollLeft = this.panStartScrollLeft - dx;
        }
      }
    },
    onTreeTouchEnd(e) {
      if (e.touches.length < 2) {
        this.isPinching = false;
      }
      if (e.touches.length === 1) {
        const vp = this.$refs.treeViewport;
        this.panStartX = e.touches[0].clientX;
        this.panStartY = e.touches[0].clientY;
        if (vp) this.panStartScrollLeft = vp.scrollLeft;
      }
      if (e.touches.length === 0) {
        setTimeout(() => {
          window.__tsDragging = false;
        }, 80);
      }
    }
  }
};
</script>

<template>
  <div class="l-time-studies-tab">
    <div class="c-mobile-ts-control-panel">
      <div class="c-mobile-ts-info">
        <div class="c-mobile-ts-info__main">
          你拥有 <span class="c-tt-amount">{{ formatTimeTheoremType(theoremAmount, 2, 0) }}</span> 时间之理。
        </div>
        <div
          v-if="showST"
          class="c-mobile-ts-info__sub"
        >
          你拥有 {{ formatInt(STamount) }} 空间之理。
        </div>
        <div
          v-if="hasTTGen"
          class="c-mobile-ts-info__rate"
        >
          {{ TTgenRateText }}
        </div>
        <div class="c-mobile-ts-info__total">
          (总计 {{ formatTimeTheoremType(totalTimeTheorems, 2, 2) }})
        </div>
      </div>

      <div class="c-mobile-ts-row-max-auto">
        <button
          class="c-tt-buy-button c-tt-buy-button--unlocked c-mobile-ts-btn-max"
          @click="buyMaxTheorems"
        >
          购买最大数量的时间之理
        </button>
        <PrimaryToggleButton
          v-if="hasTTAutobuyer"
          v-model="isAutobuyerOn"
          class="c-tt-buy-button c-tt-buy-button--unlocked c-mobile-ts-btn-auto"
          label="自动："
        />
      </div>

      <div class="c-mobile-ts-row-buy-three">
        <button
          :class="ttBtnClass('am')"
          @click="buyWithAM"
        >
          <div>购买时间之理</div>
          <div>价格：{{ isLockedTT ? "需永恒解锁" : formatAM(costs.am) }}</div>
        </button>
        <button
          :class="ttBtnClass('ip')"
          @click="buyWithIP"
        >
          <div>购买时间之理</div>
          <div>价格：{{ isLockedTT ? "需永恒解锁" : formatIP(costs.ip) }}</div>
        </button>
        <button
          :class="ttBtnClass('ep')"
          @click="buyWithEP"
        >
          <div>购买时间之理</div>
          <div>价格：{{ isLockedTT ? "需永恒解锁" : formatEP(costs.ep) }}</div>
        </button>
      </div>

      <div class="c-mobile-ts-row-respec">
        <PrimaryButton
          :class="respecClassObject"
          @click="respec = !respec"
        >
          下次永恒后重置时间研究树
        </PrimaryButton>
      </div>

      <div class="c-mobile-ts-row-actions">
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          @click="exportStudyTree"
        >
          导出时间研究树
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          onclick="Modal.preferredTree.show()"
        >
          选择优先路径
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          onclick="Modal.studyString.show({ id: -1 })"
        >
          导入时间研究树
        </PrimaryButton>
      </div>

      <div class="c-mobile-ts-row-presets">
        <TimeStudySaveLoadButton
          v-for="saveslot in 6"
          :key="saveslot"
          :saveslot="saveslot"
        />
      </div>

      <div class="c-mobile-ts-hint-text">
        <div>点击可加载该槽位的预设时间研究树，长按可编辑。</div>
        <div>你可以按住一个时间研究，以购买它之前的所有时间研究。</div>
      </div>

      <div class="c-mobile-ts-zoom-row">
        <span class="c-mobile-ts-zoom-label">缩放比例：</span>
        <input
          v-model.number="treeScale"
          type="range"
          min="0.32"
          max="1.15"
          step="0.01"
          class="c-mobile-ts-zoom-slider"
          @input="onSliderZoom"
        >
      </div>
    </div>

    <div
      ref="treeViewport"
      class="c-mobile-study-tree-viewport"
      @touchstart="onTreeTouchStart"
      @touchmove="onTreeTouchMove"
      @touchend="onTreeTouchEnd"
      @touchcancel="onTreeTouchEnd"
    >
      <div
        class="c-mobile-study-tree-scaler"
        :style="treeScalerStyle"
      >
        <div
          class="l-time-study-tree l-time-studies-tab__tree"
          :style="treeStyleObject"
        >
          <component
            :is="studyComponent(setup.study)"
            v-for="(setup) in studies"
            :key="setup.study.type.toString() + setup.study.id.toString()"
            :setup="setup"
          />
          <SecretTimeStudy :setup="layout.secretStudy" />
          <EnslavedTimeStudy
            v-if="isEnslaved"
            :setup="layout.enslavedStudy"
          />
          <svg
            :style="svgStyleObject"
            class="l-time-study-connection"
          >
            <TimeStudyConnection
              v-for="(setup, index) in connections"
              :key="'connection' + index"
              :setup="setup"
            />
            <HiddenTimeStudyConnection :setup="layout.secretStudyConnection" />
            <HiddenTimeStudyConnection
              v-if="isEnslaved"
              :setup="layout.enslavedStudyConnection"
              :is-enslaved="isEnslaved"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
