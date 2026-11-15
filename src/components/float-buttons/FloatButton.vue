<script>
// @ts-check
import { cancelStickingKey, pressAKeyOnce, stickAKey, stuckKey } from "../../core/sticky-keys";

export default {
  name: "FloatButton",
  props: {
    label: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    actionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      startTime: 0,
      stuck: false
    };
  },
  computed: {
    buttonClass() {
      return {
        "sticky-float-button": this.stuck
      };
    }
  },
  methods: {
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
      this.startTime = 0;
      const STICKY_THRESHOLD = 500;
      if (duration < STICKY_THRESHOLD) {
        if (stuckKey.actionID === this.actionId) {
          cancelStickingKey();
        } else {
          this.handleClickOnce();
        }
      } else {
        stickAKey(this.actionId);
      }
    },
    handleCancelTouch() {
      this.startTime = 0;
    },
    update() {
      this.stuck = this.actionId === stuckKey.actionID;
    }
  }
};
</script>

<template>
  <button
    v-if="show"
    class="float-button"
    :class="buttonClass"
    @contextmenu.prevent
    @pointerdown="handleStartTouch"
    @pointerup="handleEndTouch"
    @pointercancel="handleCancelTouch"
    @pointerleave="handleCancelTouch"
  >
    {{ label }}
  </button>
</template>

<style>
.float-button {
  border-radius: 50%;
  width: calc((100% - 1.8rem) / 7);
  flex: 0 0 calc((100% - 1.8rem) / 7);
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  padding: 2px;
  border: 1px solid #262630;
  background-color: #0b0b0f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.95);
  color: #dcdce6;
  font-size: 0.72rem;
  font-weight: bold;
  line-height: 1.12;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-line;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  transition: transform 0.1s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.float-button:hover {
  cursor: pointer;
}

.float-button:active {
  cursor: pointer;
  transform: scale(0.92);
  background-color: #040406;
  border-color: #444454;
}

.float-button.sticky-float-button {
  border: 1.5px solid #ffd166;
  box-shadow: 0 0 8px rgba(255, 209, 102, 0.65);
  background-color: #14141c;
  color: #ffe6a3;
}

.float-button--page {
  background-color: #08080c;
  border-color: #2d3a54;
  color: #b8c4e0;
}
</style>
