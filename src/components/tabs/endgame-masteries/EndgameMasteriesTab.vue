<script>
import { MASTERY_TREE_LAYOUT_TYPE, EndgameMasteryTreeLayout } from "./endgame-mastery-tree-layout";

import PermanentEndgameMastery from "./PermanentEndgameMastery";
import NormalEndgameMastery from "./NormalEndgameMastery";
import PrimaryButton from "@/components/PrimaryButton";
import EndgameMasteryConnection from "./EndgameMasteryConnection";
import EndgameMasterySaveLoadButton from "./es-shop/EndgameMasterySaveLoadButton";

export default {
  name: "EndgameMasteriesTab",
  components: {
    PrimaryButton,
    NormalEndgameMastery,
    PermanentEndgameMastery,
    EndgameMasteryConnection,
    EndgameMasterySaveLoadButton
  },
  data() {
    return {
      respec: player.endgame.respec,
      layoutType: MASTERY_TREE_LAYOUT_TYPE.NORMAL,
      renderedMasteryCount: 0,
      renderedConnectionCount: 0,
      skillAmount: new Decimal(0),
      skillGeneration: new Decimal(0),
      totalEndgameSkills: new Decimal(0),
      budget: {
        gg: new Decimal(0),
        cp: new Decimal(0),
        dp: new Decimal(0)
      },
      costs: {
        gg: new Decimal(0),
        cp: new Decimal(0),
        dp: new Decimal(0)
      },
      hasESGen: false,
      isLockedES: false,
      treeScale: window.__mobileEndgameMasteryScale || 0.54,
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
      return EndgameMasteryTreeLayout.create(this.layoutType);
    },
    allMasteries() {
      return this.layout.masteries;
    },
    masteries() {
      return this.allMasteries.slice(0, this.renderedMasteryCount);
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
        "o-primary-btn--endgame-respec-active": this.respec
      };
    },
    formatEndgameSkillType() {
      if (this.skillAmount.gte(1e6)) {
        return format;
      }
      return formatInt;
    },
    ESgenRateText() {
      if (this.skillGeneration.lt(1 / 3600)) {
        return "你每 " + TimeSpan.fromSeconds(this.skillGeneration.reciprocal()).toStringShort(false) + " 获得 1 终局能力。";
      }
      if (this.skillGeneration.lt(0.1)) {
        return "你每小时获得 " + format(this.skillGeneration.times(3600), 2, 2) + " 终局能力。";
      }
      return "你每秒获得 " + format(this.skillGeneration, 2, 2) + " 终局能力。";
    }
  },
  watch: {
    respec(newValue) {
      player.endgame.respec = newValue;
    },
    treeScale(newValue) {
      window.__mobileEndgameMasteryScale = newValue;
    }
  },
  created() {
    // 一次性渲染（原因同 TimeStudiesTab：逐帧 +4 会连刷几十帧）
    this.renderedMasteryCount = this.allMasteries.length;
    this.renderedConnectionCount = this.allConnections.length;

    document.body.scrollTop = 0;
  },
  mounted() {
    this.$nextTick(() => {
      this.centerTreeHorizontally();
    });
  },
  methods: {
    update() {
      this.respec = player.endgame.respec;
      this.layoutType = MASTERY_TREE_LAYOUT_TYPE.current;
      this.skillAmount.copyFrom(Currency.endgameSkills);
      this.skillGeneration.copyFrom(getESPerSecond());
      this.totalEndgameSkills.copyFrom(Currency.endgameSkills.max);
      this.budget.gg.copyFrom(EndgameSkillPurchaseType.gg.currency);
      this.budget.cp.copyFrom(EndgameSkillPurchaseType.cp.currency);
      this.budget.dp.copyFrom(EndgameSkillPurchaseType.dp.currency);
      this.costs.gg.copyFrom(EndgameSkillPurchaseType.gg.cost);
      this.costs.cp.copyFrom(EndgameSkillPurchaseType.cp.cost);
      this.costs.dp.copyFrom(EndgameSkillPurchaseType.dp.cost);
      this.hasESGen = this.skillGeneration.gt(0);
      this.isLockedES = player.endgames <= 0;
    },
    formatGG(gg) {
      return format(gg, 2, 0) + " 星系";
    },
    buyWithGG() {
      EndgameSkills.buyOne(false, "gg");
    },
    formatCP(cp) {
      return format(cp, 2, 0) + " 天界点数";
    },
    buyWithCP() {
      EndgameSkills.buyOne(false, "cp");
    },
    formatDP(dp) {
      return format(dp, 2, 0) + " 毁灭粒子";
    },
    buyWithDP() {
      EndgameSkills.buyOne(false, "dp");
    },
    buyMaxSkills() {
      EndgameSkills.buyMax(false);
    },
    esBtnClass(type) {
      if (this.isLockedES || !this.budget[type].gte(this.costs[type])) {
        return "c-es-buy-button c-es-buy-button--locked c-mobile-ts-tt-btn";
      }
      return "c-es-buy-button c-es-buy-button--unlocked c-mobile-ts-tt-btn";
    },
    masteryComponent(mastery) {
      switch (mastery.type) {
        case ENDGAME_MASTERY_TYPE.NORMAL: return NormalEndgameMastery;
        case ENDGAME_MASTERY_TYPE.PERMANENT: return PermanentEndgameMastery;
      }
      throw "Unknown Endgame Mastery type";
    },
    exportMasteryTree() {
      if (player.endgameMasteries.masteries.length === 0) {
        GameUI.notify.error("你不能导出空的终局专精树。");
      } else {
        copyToClipboard(GameCache.currentMasteryTree.value.exportString);
        GameUI.notify.info("当前终局专精树已导出到剪贴板");
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
        window.__emDragging = true;
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
          window.__emDragging = true;
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
          window.__emDragging = false;
        }, 80);
      }
    }
  }
};
</script>

<template>
  <div class="l-endgame-masteries-tab">
    <div class="c-mobile-ts-control-panel">
      <div class="c-mobile-ts-info">
        <div class="c-mobile-ts-info__main">
          你拥有 <span class="c-es-amount">{{ formatEndgameSkillType(skillAmount, 2, 0) }}</span> 终局能力。
        </div>
        <div
          v-if="hasESGen"
          class="c-mobile-ts-info__rate"
        >
          {{ ESgenRateText }}
        </div>
        <div class="c-mobile-ts-info__total">
          (总计 {{ formatEndgameSkillType(totalEndgameSkills, 2, 2) }})
        </div>
      </div>

      <div class="c-mobile-ts-row-max-auto">
        <button
          class="c-es-buy-button c-es-buy-button--unlocked c-mobile-ts-btn-max"
          @click="buyMaxSkills"
        >
          购买最大数量的终局能力
        </button>
      </div>

      <div class="c-mobile-ts-row-buy-three">
        <button
          :class="esBtnClass('gg')"
          @click="buyWithGG"
        >
          <div>购买终局能力</div>
          <div>价格：{{ isLockedES ? "需终局解锁" : formatGG(costs.gg) }}</div>
        </button>
        <button
          :class="esBtnClass('cp')"
          @click="buyWithCP"
        >
          <div>购买终局能力</div>
          <div>价格：{{ isLockedES ? "需终局解锁" : formatCP(costs.cp) }}</div>
        </button>
        <button
          :class="esBtnClass('dp')"
          @click="buyWithDP"
        >
          <div>购买终局能力</div>
          <div>价格：{{ isLockedES ? "需终局解锁" : formatDP(costs.dp) }}</div>
        </button>
      </div>

      <div class="c-mobile-ts-row-respec">
        <PrimaryButton
          :class="respecClassObject"
          @click="respec = !respec"
        >
          下次终局时重置终局专精树
        </PrimaryButton>
      </div>

      <div class="c-mobile-ts-row-actions">
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          @click="exportMasteryTree"
        >
          导出终局专精树
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          onclick="Modal.preferredMasteryTree.show()"
        >
          选择优先路径
        </PrimaryButton>
        <PrimaryButton
          class="o-primary-btn--subtab-option c-mobile-ts-btn-green"
          onclick="Modal.masteryString.show({ id: -1 })"
        >
          导入终局专精树
        </PrimaryButton>
      </div>

      <div class="c-mobile-ts-row-presets">
        <EndgameMasterySaveLoadButton
          v-for="saveslot in 6"
          :key="saveslot"
          :saveslot="saveslot"
        />
      </div>

      <div class="c-mobile-ts-hint-text">
        <div>点击可加载该槽位的预设终局专精树，长按可编辑。</div>
        <div>你可以按住一个终局专精，以购买它之前的所有终局专精。</div>
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
          class="l-endgame-mastery-tree l-endgame-masteries-tab__tree"
          :style="treeStyleObject"
        >
          <component
            :is="masteryComponent(setup.mastery)"
            v-for="(setup) in masteries"
            :key="setup.mastery.type.toString() + setup.mastery.id.toString()"
            :setup="setup"
          />
          <svg
            :style="svgStyleObject"
            class="l-endgame-mastery-connection"
          >
            <EndgameMasteryConnection
              v-for="(setup, index) in connections"
              :key="'connection' + index"
              :setup="setup"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
