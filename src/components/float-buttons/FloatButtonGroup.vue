<script>
// @ts-check

import { PlayerProgress } from "../../core/player-progress";
import FloatButton from "./FloatButton";

export default {
  name: "FloatButtonGroup",
  data() {
    return {
      showBigCrunchButton: false,
      showReplicantiGalaxyButton: false,
      showEternityButton: false,
      showCelMaxButton: false,
      showCelBigCrunchButton: false,
      showCelEternityButton: false,
      showCondenseButton: false,
    }
  },
  components: {
    FloatButton
  },
  methods: {
    update() {
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
    <FloatButton
      action-id="max"
      label="最大"
      :show="true"
    />
    <FloatButton
      action-id="dimboost"
      label="维度提升"
      :show="true"
    />
    <FloatButton
      action-id="ag"
      label="反物质星系"
      :show="true"
    />
    <FloatButton
      action-id="big-crunch"
      label="大坍缩"
      :show="showBigCrunchButton"
    />
    <FloatButton
      action-id="rg"
      label="复制器星系"
      :show="showReplicantiGalaxyButton"
    />
    <FloatButton
      action-id="eternity"
      label="永恒"
      :show="showEternityButton"
    />
    <FloatButton
      action-id="cel-max"
      label="天界最大"
      :show="showCelMaxButton"
    />
    <FloatButton
      action-id="cel-big-crunch"
      label="天界大坍缩"
      :show="showCelBigCrunchButton"
    />
    <FloatButton
      action-id="cel-eternity"
      label="天界永恒"
      :show="showCelEternityButton"
    />
    <FloatButton
      action-id="condense"
      label="凝聚"
      :show="showCondenseButton"
    />
  </div>
</template>

<style>
.float-button-group {
  display: none;
}

@media screen and (max-width: 768px) {
  .float-button-group {
    right: 32px;
    bottom: 64px;
    display: flex;
    gap: 16px;
    position: absolute;
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
    width: 100svw;
  }
}
</style>
