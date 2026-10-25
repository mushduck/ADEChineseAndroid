<script>
import CondenseButton from "./CondenseButton";
import SupernovaButton from "./SupernovaButton";

export default {
  name: "DivinityContainer",
  props: {
    mode: {
      type: String,
      default: "both"
    }
  },
  components: {
    CondenseButton,
    SupernovaButton
  },
  data() {
    return {
      showContainer: false,
      divineStars: new Decimal(0),
      hasSupernova: false,
      nebulae: new Decimal(0),
    };
  },
  methods: {
    update() {
      this.showContainer = DivinityMilestone.divineDimensions.isReached;
      this.divineStars.copyFrom(Currency.divineStars.value.floor());
      this.hasSupernova = PlayerProgress.supernovaUnlocked() || Currency.divineStars.gte(DC.NUMMAX);
      this.nebulae.copyFrom(Currency.nebulae.value.floor());
    },
  },
};
</script>

<template>
  <div class="c-prestige-row">
    <template v-if="mode === 'both' || mode === 'buttons'">
      <div v-if="showContainer" class="c-prestige-button-container">
        <CondenseButton />
      </div>
      <div v-if="showContainer && hasSupernova" class="c-prestige-button-container">
        <SupernovaButton />
      </div>
    </template>
    <div v-if="mode === 'resources'" class="c-mobile-resource-item">
      <div v-if="showContainer && hasSupernova">你拥有 <span class="c-game-header__neb-amount">{{ format(nebulae, 2) }}</span> 终结之星。</div>
      <div v-if="showContainer">你拥有 <span class="c-game-header__vs-amount">{{ format(divineStars, 2) }}</span> 神性之星。</div>
    </div>
  </div>
</template>

<style scoped>
.c-prestige-row {
  display: flex;
  flex-direction: row;
}

.c-divine-stars {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
</style>
