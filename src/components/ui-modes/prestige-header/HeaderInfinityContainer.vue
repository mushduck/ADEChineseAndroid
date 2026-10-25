<script>
import BigCrunchButton from "./BigCrunchButton";
import CelestialCrunchButton from "./CelestialCrunchButton";

export default {
  name: "HeaderInfinityContainer",
  props: {
    mode: {
      type: String,
      default: "both"
    }
  },
  components: {
    BigCrunchButton,
    CelestialCrunchButton
  },
  data() {
    return {
      showContainer: false,
      infinityPoints: new Decimal(0),
      isTesseractUnlocked: false,
      tesseractCost: new Decimal(0),
      tesseractText: "",
      hasCelestial: false,
      celInfinityPoints: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.showContainer = player.break || PlayerProgress.infinityUnlocked();
      this.infinityPoints.copyFrom(Currency.infinityPoints.value.floor());
      this.isTesseractUnlocked = Enslaved.isCompleted && !player.disablePostReality;
      this.tesseractCost = Tesseracts.nextCost;
      this.tesseractText = this.tesseractProgress();
      this.hasCelestial = PlayerProgress.celestialInfinityUnlocked() && !Slabdrill.isCursed;
      this.celInfinityPoints.copyFrom(Currency.celestialInfinityPoints.value.floor());
    },
    tesseractProgress() {
      const progress = this.infinityPoints.add(1).log10().div(this.tesseractCost.log10()).toNumber();
      if (progress > 1) return `<b>(${formatPercents(1)})</b>`;
      return `(${formatPercents(progress, 2, 2)})`;
    },
  },
};
</script>

<template>
  <div>
    <div
      v-if="showContainer && (mode === 'both' || mode === 'normal')"
      class="c-prestige-button-container"
    >
      <div v-if="mode === 'both'" class="c-infinity-points">
        你拥有 <span class="c-game-header__ip-amount">{{ format(infinityPoints, 2) }}</span> {{ pluralize("无限点数", infinityPoints) }}。
        <span v-if="isTesseractUnlocked" v-html="tesseractText" />
      </div>
      <BigCrunchButton />
    </div>
    <div
      v-if="showContainer && hasCelestial && (mode === 'both' || mode === 'celestial')"
      class="c-prestige-button-container"
    >
      <div v-if="mode === 'both'" class="c-infinity-points">
        你拥有 <span class="c-game-header__cip-amount">{{ format(celInfinityPoints, 2) }}</span> {{ pluralize("天界无限点数", celInfinityPoints) }}。
      </div>
      <CelestialCrunchButton />
    </div>
    <div v-if="showContainer && mode === 'celestial-resource'" class="c-mobile-resource-item">
      <div v-if="hasCelestial">你拥有 <span class="c-game-header__cip-amount">{{ format(celInfinityPoints, 2) }}</span> 天界无限点数。</div>
    </div>
    <div v-if="showContainer && mode === 'normal-resource'" class="c-mobile-resource-item">
      <div>你拥有 <span class="c-game-header__ip-amount">{{ format(infinityPoints, 2) }}</span> 无限点数。</div>
    </div>
  </div>
</template>

<style scoped>
.c-infinity-points {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
