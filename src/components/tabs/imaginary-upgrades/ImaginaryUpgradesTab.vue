<<<<<<< HEAD
<script>
import ImaginaryUpgradeButton from "./ImaginaryUpgradeButton";

export default {
  name: "ImaginaryUpgradesTab",
  components: {
    ImaginaryUpgradeButton
  },
  data() {
    return {
      baseRMCap: new Decimal(),
      capRM: new Decimal(),
      scaleTime: 0,
      capStr: "",
    };
  },
  computed: {
    upgrades: () => ImaginaryUpgrades.all,
    lockTooltip: () => `锁定升级要求仅会阻止手动和自动操作，不会禁用任何相关的升级，要求仍可能失败。`,
  },
  methods: {
    update() {
      this.baseRMCap.copyFrom(MachineHandler.baseRMCap);
      this.capRM.copyFrom(MachineHandler.hardcapRM);
      this.scaleTime = MachineHandler.scaleTimeForIM;
      this.capStr = formatMachines(MachineHandler.hardcapRM, MachineHandler.currentIMCap, MachineHandler.currentDMCap);
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div class="c-cap-text">
      你的机器上限为 <span class="c-reality-tab__reality-machines">{{ capStr }}</span>。
    </div>
    <div class="c-info-text">
      你已达到现实的极限，无法持有超过 {{ format(capRM) }} 的现实机器。
      <br>
      超过 {{ format(baseRMCap) }} 的机器将提高你可以拥有的虚幻机器的上限。
      <br>
      虚幻机器会随时间被动获得，直到达到上限，但随着接近上限，获得速度呈指数级减慢。
      <br>
      每 {{ formatInt(scaleTime) }} 秒，你的当前数量与上限之间的虚幻机器差额将减半。
      <br>
      <br>
      前两组升级可以无限购买，其余的升级是一次性升级，除了需要虚幻机器外，还需要解锁条件。
      <br>
      虚幻升级的视觉效果与现实升级标签中的升级相同。
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
    </div>
    <div
      v-for="row in 6"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <ImaginaryUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-cap-text {
  color: var(--color-text);
  font-size: 1.5rem;
}

.c-info-text {
  color: var(--color-text);
  margin: 1.5rem;
}
</style>
=======
<script>
import ImaginaryUpgradeButton from "./ImaginaryUpgradeButton";

export default {
  name: "ImaginaryUpgradesTab",
  components: {
    ImaginaryUpgradeButton
  },
  data() {
    return {
      baseRMCap: new Decimal(),
      capRM: new Decimal(),
      scaleTime: 0,
      capStr: "",
      showingRows: 5
    };
  },
  computed: {
    upgrades: () => ImaginaryUpgrades.all,
    lockTooltip: () => `Requirement locks only prevent manual and automated actions. Any related upgrades
      will not be disabled and may still cause requirements to be failed.`,
  },
  methods: {
    update() {
      this.baseRMCap.copyFrom(MachineHandler.baseRMCap);
      this.capRM.copyFrom(MachineHandler.hardcapRM);
      this.scaleTime = MachineHandler.scaleTimeForIM;
      this.capStr = formatMachines(MachineHandler.hardcapRM, MachineHandler.currentIMCap, MachineHandler.currentDMCap);
      this.showingRows = PlayerProgress.endgameUnlocked() ? 6 : 5;
    },
    id(row, column) {
      return (row - 1) * 5 + column - 1;
    }
  }
};
</script>

<template>
  <div class="l-reality-upgrade-grid">
    <div class="c-cap-text">
      Your Machine cap is <span class="c-reality-tab__reality-machines">{{ capStr }}</span>.
    </div>
    <div class="c-info-text">
      You have reached the limits of Reality and cannot hold more than {{ format(capRM) }} Reality Machines.
      <br>
      Machines gained in excess of {{ format(baseRMCap) }} will raise the maximum amount of Imaginary Machines
      you can have.
      <br>
      Imaginary Machines are gained passively over time up to the cap, but gain slows down exponentially
      as you approach the cap.
      <br>
      Every {{ formatInt(scaleTime) }} seconds the difference in iM between your current amount and the cap
      will be cut in half.
      <br>
      <br>
      The first two rows of upgrades can be purchased endlessly and the rest of the upgrades are one-time upgrades
      with requirements.
      <br>
      Upgrades here have the same gameplay and visual behavior as Reality Upgrades, but cost Imaginary Machines instead.
      <span :ach-tooltip="lockTooltip">
        <i class="fas fa-question-circle" />
      </span>
    </div>
    <div
      v-for="row in showingRows"
      :key="row"
      class="l-reality-upgrade-grid__row"
    >
      <ImaginaryUpgradeButton
        v-for="column in 5"
        :key="id(row, column)"
        :upgrade="upgrades[id(row, column)]"
      />
    </div>
  </div>
</template>

<style scoped>
.c-cap-text {
  color: var(--color-text);
  font-size: 1.5rem;
}

.c-info-text {
  color: var(--color-text);
  margin: 1.5rem;
}
</style>
>>>>>>> upstream/master
