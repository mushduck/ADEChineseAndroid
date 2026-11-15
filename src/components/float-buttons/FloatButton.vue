<script>
// @ts-check
import { cancelStickingKey, pressAKeyOnce, stickAKey, stuckKey } from '../../core/sticky-keys';

export default {
  name: "FloatButton",
  props: {
    // 按钮显示的文字
    label: String,
    // 按钮显示的条件
    show: Boolean,
    // 按钮行为的 ID，用于区分具有不同行为的按钮
    actionId: String,
  },
  data() {
    return {
      // 记录开始按下的时间戳，类型为 number
      startTime: 0,
      stuck: false
    };
  },
  methods: {
    // 单击
    handleClickOnce() {
      pressAKeyOnce(this.actionId);
    },
    handleStartTouch() {
      this.startTime = Date.now();
    },
    handleEndTouch() {
      if (!this.startTime) {
        return;
      }
      const duration = Date.now() - this.startTime;
      // 触发卡键的时间阈值，单位为毫秒
      const STICKY_THRESHOLD = 500;
      if (duration < STICKY_THRESHOLD) {
        if (stuckKey.actionID === this.actionId) {
          cancelStickingKey();
        } else {
          this.handleClickOnce();
        }
      } else {
        // 如果触发就粘滞新的按键
        stickAKey(this.actionId);
      }
    },
    update() {
      if (stuckKey.actionID === this.actionId) {
        // 如果被粘滞就模拟一直按
        this.handleClickOnce();
      }
      this.stuck = this.actionId === stuckKey.actionID;
    }
  },
};
</script>

<template>
  <div>
    <button
      v-if="show"
      class="float-button"
      :class="{'sticky-float-button': stuck}"
      @pointerdown="handleStartTouch"
      @pointerup="handleEndTouch"
      @pointercancel="handleEndTouch"
    >
      {{ label }}
    </button>
  </div>
</template>

<style>
.float-button {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: none;
  background-color: var(--color-base);
  box-shadow: 0 0 8px black;
  color: var(--color-text);
  z-index: 9999999;
  pointer-events: auto;
  transition-duration: 0.2s;
}

.float-button:hover {
  cursor: pointer;
}

.float-button:active {
  cursor: pointer;
  background-color: #111116;
}

.float-button.sticky-float-button {
  border: 1px solid white;
  background-color: #1a1a22;
}
</style>
