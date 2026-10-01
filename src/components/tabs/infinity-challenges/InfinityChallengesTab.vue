<<<<<<< HEAD
<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import InfinityChallengeBox from "./InfinityChallengeBox";

export default {
  name: "InfinityChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    InfinityChallengeBox
  },
  data() {
    return {
      nextIC: 0,
      showAllChallenges: false
    };
  },
  computed: {
    challenges() {
      return InfinityChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextIC?.id === 1;
      const next = InfinityChallenges.nextICUnlockAM;

      if (first) return `第一个无限挑战需要 ${format(next)} 反物质解锁。`;
      return next === undefined
        ? "所有无限挑战已解锁。"
        : `下一个无限挑战需要 ${format(next)} 反物质解锁。`;
    }
  },
  methods: {
    update() {
      this.nextIC = InfinityChallenges.nextIC;
      this.showAllChallenges = player.options.showAllChallenges;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      如果启用自动大坍缩，不论采用何种设置，当反物质数量接近挑战目标时，它会尽全力强制进行一次大坍缩。
    </div>
    <div>{{ nextAtDisplay }}</div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <InfinityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
=======
<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import InfinityChallengeBox from "./InfinityChallengeBox";

export default {
  name: "InfinityChallengesTab",
  components: {
    ChallengeGrid,
    ChallengeTabHeader,
    InfinityChallengeBox
  },
  data() {
    return {
      nextIC: 0,
      showAllChallenges: false,
      isFlipped: false
    };
  },
  computed: {
    challenges() {
      return InfinityChallenges.all;
    },
    nextAtDisplay() {
      const first = this.nextIC?.id === 1;
      const next = InfinityChallenges.nextICUnlockAM;

      if (first) return `The first Infinity Challenge unlocks at ${format(next)} ${this.isFlipped ? "matter" : "antimatter"}.`;
      return next === undefined
        ? "All Infinity Challenges unlocked"
        : `Next Infinity Challenge unlocks at ${format(next)} ${this.isFlipped ? "matter" : "antimatter"}.`;
    }
  },
  methods: {
    update() {
      this.nextIC = InfinityChallenges.nextIC;
      this.showAllChallenges = player.options.showAllChallenges;
      this.isFlipped = player.universes.current === 2;
    },
    isChallengeVisible(challenge) {
      return challenge.isUnlocked || (this.showAllChallenges && PlayerProgress.eternityUnlocked());
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      An active Big Crunch Autobuyer will Crunch immediately when
      reaching an Infinity Challenge's {{ isFlipped ? "matter" : "antimatter" }} goal, regardless of settings.
    </div>
    <div>{{ nextAtDisplay }}</div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <InfinityChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
>>>>>>> upstream/master
