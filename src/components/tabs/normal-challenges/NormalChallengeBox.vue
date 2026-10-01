<<<<<<< HEAD
<script>
import ChallengeBox from "@/components/ChallengeBox";
import DescriptionDisplay from "@/components/DescriptionDisplay";

export default {
  name: "NormalChallengeBox",
  components: {
    ChallengeBox,
    DescriptionDisplay
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDoomed: false,
      isDisabled: false,
      isRunning: false,
      isCompleted: false,
      isBroken: false,
      isUnlocked: false,
      normalLockedAt: new Decimal(),
      alphaLockedAt: new Decimal()
    };
  },
  computed: {
    descriptionDisplayConfig() {
      if (this.isUnlocked) {
        return this.challenge.config;
      }
      return {
        description: `大坍缩 ${formatInt(this.lockedAt)} 次以解锁。`
      };
    },
    name() {
      return `挑战${this.challenge.id}`;
    },
    overrideLabel() {
      return this.isBroken ? "已打破" : "";
    },
  },
  methods: {
    update() {
      this.isDisabled = this.challenge.isDisabled;
      this.isUnlocked = this.challenge.isUnlocked;
      // This stops normal challenges from appearing like they're running during IC1
      this.isRunning = this.challenge.isOnlyActiveChallenge;
      this.normalLockedAt = this.challenge.config.lockedAt;
      this.alphaLockedAt = this.challenge.config.alphaLockedAt;
      this.lockedAt = Alpha.isRunning ? this.alphaLockedAt : this.normalLockedAt;
      this.isBroken = Enslaved.isRunning && Enslaved.BROKEN_CHALLENGES.includes(this.challenge.id);
      this.isCompleted = this.challenge.isCompleted && !this.isBroken;
    }
  }
};
</script>

<template>
  <ChallengeBox
    :name="name"
    :is-unlocked="isUnlocked"
    :is-running="isRunning"
    :is-completed="isCompleted"
    :override-label="overrideLabel"
    :locked-at="lockedAt"
    class="c-challenge-box--normal"
    @start="challenge.requestStart()"
  >
    <template #top>
      <DescriptionDisplay :config="descriptionDisplayConfig" />
    </template>
    <template #bottom>
      <span :class="{ 'o-pelle-disabled': isDisabled }">奖励：{{ challenge.config.reward }}</span>
    </template>
  </ChallengeBox>
</template>

<style scoped>

</style>
=======
<script>
import ChallengeBox from "@/components/ChallengeBox";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "NormalChallengeBox",
  components: {
    ChallengeBox,
    DescriptionDisplay,
    EffectDisplay
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDoomed: false,
      isDisabled: false,
      isRunning: false,
      isCompleted: false,
      isBroken: false,
      isUnlocked: false,
      normalLockedAt: new Decimal(),
      alphaLockedAt: new Decimal(),
      reward: ""
    };
  },
  computed: {
    shiftDown() {
      return ui.view.shiftDown;
    },
    showingCharged() {
      return (this.shiftDown || this.challenge.isCharged) && Ascensions.oc3A.isUnlocked && player.endgame.overcharge.allowComplex;
    },
    descriptionDisplayConfig() {
      if (this.isUnlocked) {
        return this.challenge.config;
      }
      return {
        description: `Infinity ${formatInt(this.lockedAt)} times to unlock.`
      };
    },
    name() {
      return `C${this.challenge.id}`;
    },
    overrideLabel() {
      return this.isBroken ? "Broken" : "";
    },
  },
  methods: {
    update() {
      this.isDisabled = this.challenge.isDisabled;
      this.isUnlocked = this.challenge.isUnlocked;
      // This stops normal challenges from appearing like they're running during IC1
      this.isRunning = this.challenge.isOnlyActiveChallenge;
      this.normalLockedAt = this.challenge.config.lockedAt;
      this.alphaLockedAt = this.challenge.config.alphaLockedAt;
      this.lockedAt = Alpha.isRunning ? this.alphaLockedAt : this.normalLockedAt;
      this.isBroken = Enslaved.isRunning && Enslaved.BROKEN_CHALLENGES.includes(this.challenge.id);
      this.isCompleted = this.challenge.isCompleted && !this.isBroken;
      this.reward = this.showingCharged ? this.challenge.config.charged.reward() : this.challenge.config.reward();
    }
  }
};
</script>

<template>
  <ChallengeBox
    :name="name"
    :is-unlocked="isUnlocked"
    :is-running="isRunning"
    :is-completed="isCompleted"
    :override-label="overrideLabel"
    :locked-at="lockedAt"
    class="c-challenge-box--normal"
    @start="challenge.requestStart()"
  >
    <template #top>
      <DescriptionDisplay :config="descriptionDisplayConfig" />
    </template>
    <template #bottom>
      <span :class="{ 'o-pelle-disabled': isDisabled }">Reward: {{ reward }}</span>
      <div v-if="showingCharged">
        <EffectDisplay
          br
          :config="challenge.config.charged"
        />
      </div>
    </template>
  </ChallengeBox>
</template>

<style scoped>

</style>
>>>>>>> upstream/master
