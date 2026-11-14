<script>
export default {
  name: "BigCrunchButton",
  data() {
    return {
      isModern: false,
      smallCrunch: false,
      shouldDisplay: false,
      isFlipped: false
    };
  },
  methods: {
    update() {
      // 只覆盖「维度」主标签页；切到别的主标签页不显示
      this.shouldDisplay = !player.break && Player.canCrunch && ui.view.tab === "dimensions";
      if (!this.shouldDisplay) return;
      this.isModern = player.options.newUI;
      this.smallCrunch = Time.bestInfinityRealTime.totalMinutes.toNumber() <= 1;
      this.isFlipped = player.universes.current === 2;
    },
    handleClick() {
      if (PlayerProgress.infinityUnlocked()) bigCrunchResetRequest();
      else Modal.bigCrunch.show();
    }
  }
};
</script>

<template>
  <span v-if="shouldDisplay">
    <div v-if="isModern">
      <h3
        v-if="!smallCrunch"
        class="l-spacing"
      >
        这个宇宙已因{{ isFlipped ? "正物质" : "反物质" }}过多而坍缩
      </h3>
      <button
        :class="{
          'btn-big-crunch': true,
          'btn-big-crunch--small': smallCrunch
        }"
        @click="handleClick"
      >
        大坍缩
      </button>
    </div>
    <div v-else>
      <button
        :class="{
          'o-tab-btn': true,
          'o-big-crunch-btn': true,
          'l-old-ui__big-crunch-btn': true,
          'l-old-ui__big-crunch-btn--overlay': smallCrunch
        }"
        @click="handleClick"
      >
        大坍缩
      </button>
      <div
        v-if="!smallCrunch"
        class="o-emptiness"
      >
        这个宇宙已因{{ isFlipped ? "正物质" : "反物质" }}过多而坍缩
      </div>
    </div>
  </span>
</template>

<style scoped>
.l-spacing {
  margin-top: 1rem;
}
</style>
