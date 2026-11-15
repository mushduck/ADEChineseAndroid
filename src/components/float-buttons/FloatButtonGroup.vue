<script>
// @ts-check
import { PlayerProgress } from "../../core/player-progress";
import { pressAKeyOnce, stuckKey } from "../../core/sticky-keys";
import FloatButton from "./FloatButton";

export default {
  name: "FloatButtonGroup",
  components: {
    FloatButton
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 6,
      isCollapsed: false,
      hasStuckKey: false,
      pageHoldTimer: 0,
      pagePointerActive: false,
      didLongPress: false,
      hasShownPageHint: false,
      showBigCrunchButton: false,
      showReplicantiGalaxyButton: false,
      showEternityButton: false,
      showCelMaxButton: false,
      showCelBigCrunchButton: false,
      showCelEternityButton: false,
      showCondenseButton: false
    };
  },
  computed: {
    allButtons() {
      return [
        { actionId: "max", label: "最大", show: true },
        { actionId: "dimboost", label: "维度提升", show: true },
        { actionId: "ag", label: "反物质星系", show: true },
        { actionId: "big-crunch", label: "大坍缩", show: this.showBigCrunchButton },
        { actionId: "rg", label: "复制器星系", show: this.showReplicantiGalaxyButton },
        { actionId: "eternity", label: "永恒", show: this.showEternityButton },
        { actionId: "cel-max", label: "天界最大", show: this.showCelMaxButton },
        { actionId: "cel-big-crunch", label: "天界大坍缩", show: this.showCelBigCrunchButton },
        { actionId: "cel-eternity", label: "天界永恒", show: this.showCelEternityButton },
        { actionId: "condense", label: "凝聚", show: this.showCondenseButton }
      ];
    },
    visibleButtons() {
      return this.allButtons.filter(b => b.show);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.visibleButtons.length / this.pageSize));
    },
    safePage() {
      return this.currentPage >= this.totalPages ? 0 : this.currentPage;
    },
    pagedButtons() {
      const start = this.safePage * this.pageSize;
      return this.visibleButtons.slice(start, start + this.pageSize);
    },
    pageMainLabel() {
      if (this.isCollapsed) return "展开";
      return "翻页\n" + (this.safePage + 1) + "/" + this.totalPages;
    },
    pageBtnClass() {
      return {
        "float-button--page": true,
        "float-button--collapsed": this.isCollapsed,
        "sticky-float-button": this.isCollapsed && this.hasStuckKey
      };
    }
  },
  mounted() {
    document.body.classList.toggle("l-float-bar-open", !this.isCollapsed);
  },
  beforeDestroy() {
    clearTimeout(this.pageHoldTimer);
    document.body.classList.remove("l-float-bar-open");
  },
  methods: {
    setCollapsed(val) {
      this.isCollapsed = val;
      document.body.classList.toggle("l-float-bar-open", !val);
    },
    nextPage() {
      this.currentPage = (this.safePage + 1) % this.totalPages;
    },
    onPageBtnDown() {
      this.pagePointerActive = true;
      this.didLongPress = false;
      clearTimeout(this.pageHoldTimer);
      if (this.isCollapsed) return;
      this.pageHoldTimer = setTimeout(() => {
        this.didLongPress = true;
        this.setCollapsed(true);
      }, 450);
    },
    onPageBtnUp() {
      clearTimeout(this.pageHoldTimer);
      if (!this.pagePointerActive) return;
      this.pagePointerActive = false;
      if (this.didLongPress) {
        this.didLongPress = false;
        return;
      }
      if (this.isCollapsed) {
        this.setCollapsed(false);
        return;
      }
      this.nextPage();
      if (!this.hasShownPageHint) {
        this.hasShownPageHint = true;
      }
    },
    onPageBtnCancel() {
      clearTimeout(this.pageHoldTimer);
      this.pagePointerActive = false;
      this.didLongPress = false;
    },
    update() {
      this.hasStuckKey = Boolean(stuckKey.actionID);
      if (stuckKey.actionID) {
        pressAKeyOnce(stuckKey.actionID);
      }
      this.showBigCrunchButton = (
        PlayerProgress.infinityUnlocked() ||
        PlayerProgress.eternityUnlocked() ||
        PlayerProgress.realityUnlocked() ||
        PlayerProgress.endgameUnlocked()
      );
      this.showReplicantiGalaxyButton = (
        PlayerProgress.replicantiUnlocked() ||
        PlayerProgress.eternityUnlocked() ||
        PlayerProgress.realityUnlocked() ||
        PlayerProgress.endgameUnlocked()
      );
      this.showEternityButton = (
        PlayerProgress.eternityUnlocked() ||
        PlayerProgress.realityUnlocked() ||
        PlayerProgress.endgameUnlocked()
      );
      this.showCelMaxButton = PlayerProgress.endgameUnlocked();
      this.showCelBigCrunchButton = PlayerProgress.celestialInfinityUnlocked();
      this.showCelEternityButton = PlayerProgress.celestialEternityUnlocked();
      this.showCondenseButton = PlayerProgress.divinityUnlocked();
    }
  }
};
</script>

<template>
  <div class="float-button-group">
    <button
      class="float-button"
      :class="pageBtnClass"
      title="短按翻页，长按收起悬浮球"
      @contextmenu.prevent
      @pointerdown="onPageBtnDown"
      @pointerup="onPageBtnUp"
      @pointercancel="onPageBtnCancel"
      @pointerleave="onPageBtnCancel"
    >
      <span class="float-button__main">{{ pageMainLabel }}</span>
      <span
        v-if="!isCollapsed"
        class="float-button__hint"
      >
        长按收起
      </span>
    </button>
    <template v-if="!isCollapsed">
      <FloatButton
        v-for="btn in pagedButtons"
        :key="btn.actionId"
        :action-id="btn.actionId"
        :label="btn.label"
        :show="btn.show"
      />
    </template>
  </div>
</template>

<style>
.float-button-group {
  display: none;
}

.float-button--page {
  flex-direction: column;
  gap: 1px;
}

.float-button__main {
  line-height: 1.08;
}

.float-button__hint {
  font-size: 0.5rem;
  font-weight: normal;
  opacity: 0.72;
  line-height: 1;
}

.float-button--collapsed {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  opacity: 0.72;
  font-size: 0.7rem;
}

@media screen and (max-width: 768px) {
  .float-button-group {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 6rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
    width: 100%;
    pointer-events: none;
  }
}
</style>
