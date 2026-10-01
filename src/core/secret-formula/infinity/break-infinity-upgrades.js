function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    id,
    cost: () => config.initialCost() * Math.pow(config.costIncrease(), player.infinityRebuyables[config.id]),
    maxUpgrades,
    description,
    effect: () => effectFunction(player.infinityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect ||
      (value => {
<<<<<<< HEAD
        const afterECText = config.afterEC ? config.afterEC() : " ";
        return (Alpha.isRunning && Alpha.currentStage >= 6)
=======
        const afterECText = config.afterEC ? config.afterEC() : "";
        return SlabdrillUnlocks.breakInfinity.isUnlocked
          ? (value === config.maxUpgrades()
          ? `Currently: ${formatX(25 - value)} ${afterECText}`
          : `Currently: ${formatX(25 - value)} | Next: ${formatX(25 - value - 1)}`)
          : ((Alpha.isRunning && Alpha.currentStage >= 6)
>>>>>>> upstream/master
          ? (value === config.maxUpgrades()
            ? `当前：${formatX(20 - value)} ${afterECText}` 
            : `当前：${formatX(20 - value)} | 下一级：${formatX(20 - value - 1)}`) 
          : (value === config.maxUpgrades()
<<<<<<< HEAD
            ? `当前：${formatX(10 - value)} ${afterECText}`
            : `当前：${formatX(10 - value)} | 下一级：${formatX(10 - value - 1)}`);
=======
          ? `Currently: ${formatX(10 - value)} ${afterECText}`
          : `Currently: ${formatX(10 - value)} | Next: ${formatX(10 - value - 1)}`));
>>>>>>> upstream/master
      }),
    formatCost: value => format(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakInfinityUpgrades = {
  totalAMMult: {
    id: "totalMult",
<<<<<<< HEAD
    cost: () => 1e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于产生的总反物质，给予反物质维度倍数加成",
    effect: () => Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于产生的总反物质和特蕾莎等级，给予反物质维度指数加成", 
=======
    cost: () => 1e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension gains a multiplier based on total antimatter produced" :
      `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a multiplier based on total ${player.universes.current === 2 ? "matter" : "antimatter"} produced`,
    effect: () => Slabdrill.isCursed ? Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1), 12) :
      Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a power based on total ${player.universes.current === 2 ? "Matter" : "Antimatter"} and Teresa level`,
>>>>>>> upstream/master
      effect: () => Decimal.pow(player.records.totalEndgameAntimatter.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.2).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  currentAMMult: {
    id: "currentMult",
<<<<<<< HEAD
    cost: () => 5e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于当前反物质，给予反物质维度倍数加成",
    effect: () => Decimal.pow(Currency.antimatter.value.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于当前反物质和特蕾莎等级，给予反物质维度指数加成", 
=======
    cost: () => 5e4 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension gains a multiplier based on current antimatter" :
      `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a multiplier based on current ${player.universes.current === 2 ? "matter" : "antimatter"}`,
    effect: () => Slabdrill.isCursed ? Decimal.pow(Currency.antimatter.value.add(1).log10().add(1), 12) :
      Decimal.pow(Currency.antimatter.value.add(1).log10().add(1), 1.5),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a power based on current ${player.universes.current === 2 ? "Matter" : "Antimatter"} and Teresa level`,
>>>>>>> upstream/master
      effect: () => Decimal.pow(Currency.antimatter.value.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.2).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  galaxyBoost: {
    id: "postGalaxy",
<<<<<<< HEAD
    cost: () => 5e11 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: () => `星系增强 ${formatPercents(0.5)}`,
    effect: 1.5,
=======
    cost: () => 5e11 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? `All Galaxies are ${formatX(6.66, 2, 2)} stronger and double the Buy 10 Dimension multiplier` :
      `All Galaxies are ${formatPercents(0.5)} stronger`,
    effect: () => Slabdrill.isCursed ? 6.66 : 1.5,
>>>>>>> upstream/master
    charged: {
      description: "基于特蕾莎等级增强星系", 
      effect: () => Decimal.pow(Ra.pets.teresa.level, 2).add(50).div(100).add(1).toNumber(),
      formatEffect: value => `${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
    }
  },
  infinitiedMult: {
    id: "infinitiedMult",
<<<<<<< HEAD
    cost: () => 1e5 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于无限次数，给予反物质维度倍数加成",
    effect: () => Currency.infinitiesTotal.value.add(1).pLog10().times(25).add(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于无限次数和特蕾莎等级，给予反物质维度指数加成", 
=======
    cost: () => 1e5 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension gains a multiplier based on Infinities" :
      `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a multiplier based on Infinities`,
    effect: () => Slabdrill.isCursed ? Currency.infinitiesTotal.value.add(1).pLog10().times(25).add(1).pow(8) :
      Currency.infinitiesTotal.value.add(1).pLog10().times(25).add(1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a power based on Infinities and Teresa level`,
>>>>>>> upstream/master
      effect: () => Decimal.pow(Currency.infinitiesTotal.value.add(1).log10().add(1).log10().times(
        Ra.pets.teresa.level).add(1), 0.5).toNumber(),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  achievementMult: {
    id: "achievementMult",
<<<<<<< HEAD
    cost: () => 1e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于已完成的成就数，给予反物质维度倍数加成",
    effect: () => Math.max(Math.pow((Achievements.effectiveCount - 30), 4) / 20, 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: "基于已完成的成就数和特蕾莎等级，给予反物质维度指数加成", 
=======
    cost: () => 1e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension gains a multiplier based on Achievements completed" :
      `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a multiplier based on Achievements completed`,
    effect: () => Slabdrill.isCursed ? Math.max(Math.pow(Math.pow((Achievements.effectiveCount - 30), 4) / 20, 8), 1) :
      Math.max(Math.pow((Achievements.effectiveCount - 30), 4) / 20, 1),
    formatEffect: value => formatX(value, 2, 2),
    charged: {
      description: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a power based on Achievements completed and Teresa level`,
>>>>>>> upstream/master
      effect: () => Math.pow(Achievements.effectiveCount * Ra.pets.teresa.level + 1, 0.25),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  slowestChallengeMult: {
    id: "challengeMult",
<<<<<<< HEAD
    cost: () => 5e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于最慢的普通挑战时间，给予反物质维度倍数加成",
    effect: () => Alpha.isDestroyed
      ? new Decimal(300).div(Time.worstChallenge.totalMinutes)
      : Decimal.clampMin(new Decimal(300).div(Time.worstChallenge.totalMinutes.clampMin(0.001)), 1),
=======
    cost: () => 5e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension gains a multiplier based on how fast your slowest challenge run is" :
      `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a multiplier based on how fast your slowest challenge run is`,
    effect: () => Slabdrill.isCursed ? Decimal.clampMin(new Decimal(300).div(Time.worstChallenge.totalMinutes.clampMin(0.001)), 1).pow(8)
      : (Alpha.isDestroyed
        ? new Decimal(300).div(Time.worstChallenge.totalMinutes)
        : Decimal.clampMin(new Decimal(300).div(Time.worstChallenge.totalMinutes.clampMin(0.001)), 1)),
>>>>>>> upstream/master
    formatEffect: value => formatX(value, 2, 2),
    hasCap: true,
    cap: () => Alpha.isDestroyed ? DC.BEMAX : (Slabdrill.isCursed ? DC.D2E5.pow(8) : DC.D2E5),
    charged: {
<<<<<<< HEAD
      description: "基于最慢的普通挑战时间和特蕾莎等级，给予反物质维度指数加成", 
=======
      description: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions gain a power based on Hadronizes and Teresa level`,
>>>>>>> upstream/master
      effect: () => Decimal.pow(Laitela.hadronizes * Ra.pets.teresa.level + 1, 0.25),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  infinitiedGen: {
    id: "infinitiedGeneration",
<<<<<<< HEAD
    cost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "基于最快的无限被动生成无限次数",
=======
    cost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: "Passively generate Infinities based on your fastest Infinity",
>>>>>>> upstream/master
    effect: () => player.records.bestInfinity.time,
    formatEffect: value => {
      if (value === DC.BEMAX && !Pelle.isDoomed) return "没有无限次数生成";
      const infinities = gainedInfinities();
      const timeStr = Time.bestInfinity.totalMilliseconds.lte(50) && !Alpha.isDestroyed
        ? `${TimeSpan.fromMilliseconds(new Decimal(100)).toStringShort()}（已达到上限）`
        : `${Time.bestInfinity.times(new Decimal(2)).toStringShort()}`;
      return `${format(infinities)} 无限次数 / ${timeStr}`;
    },
    charged: {
      description: "基于最快的无限和特蕾莎等级给予无限次数指数加成", 
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 1.5),
      formatEffect: value => formatPow(value, 4, 4)
    }
  },
  autobuyMaxDimboosts: {
    id: "autobuyMaxDimboosts",
<<<<<<< HEAD
    cost: () => 2e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "解锁自动购买最大维度擢升",
=======
    cost: () => 2e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: "Unlock the buy max Dimension Boost Autobuyer mode",
>>>>>>> upstream/master
    charged: {
      description: "基于特蕾莎等级提高维度擢升强度", 
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 0.5),
      formatEffect: value => `${value >= 11 ? formatX(value, 2, 2) : formatPercents(value - 1, 2, 2)}`
    }
  },
  autobuyerSpeed: {
    id: "autoBuyerUpgrade",
<<<<<<< HEAD
    cost: () => 1e15 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    description: "通过普通挑战解锁或提升性能的自动购买器，它们的工作速度加倍",
=======
    cost: () => 1e15 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1) *
      (SlabdrillUnlocks.breakInfinity.isUnlocked ? 1000 : 1),
    description: () => Slabdrill.isCursed
      ? `Autobuyers unlocked or improved by Normal Challenges work twice as fast and gain ${formatX(666)} more Infinity Points`
      : "Autobuyers unlocked or improved by Normal Challenges work twice as fast",
>>>>>>> upstream/master
    charged: {
      description: "基于特蕾莎等级提高连续统购买倍率", 
      effect: () => Math.pow(Ra.pets.teresa.level + 1, 2),
      formatEffect: value => formatX(value, 2, 2)
    }
  },
  tickspeedCostMult: rebuyable({
    id: 0,
    initialCost: () => 1e6 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
<<<<<<< HEAD
    costIncrease: 5,
    maxUpgrades: () => 8 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: "降低无限之后的计数频率价格增速",
=======
    costIncrease: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 2 : 5,
    maxUpgrades: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 23 :
      8 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: "Reduce post-infinity Tickspeed Upgrade cost multiplier scaling",
>>>>>>> upstream/master
    afterEC: () => (EternityChallenge(11).completions > 0
      ? `永恒挑战 11 之后：${formatX(Player.tickSpeedMultDecrease, 2, 2)}`
      : " "
    ),
    noLabel: true,
    onPurchased: () => GameCache.tickSpeedMultDecrease.invalidate()
  }),
  dimCostMult: rebuyable({
    id: 1,
    initialCost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
<<<<<<< HEAD
    costIncrease: 5e3,
    maxUpgrades: () => 7 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: "降低无限之后的反物质维度价格增速",
=======
    costIncrease: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 5 : 5e3,
    maxUpgrades: () => SlabdrillUnlocks.breakInfinity.isUnlocked ? 22 :
      7 + (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfB.effectOrDefault(0) - 10 : 0),
    description: () => `Reduce post-infinity ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension cost multiplier scaling`,
>>>>>>> upstream/master
    afterEC: () => (EternityChallenge(6).completions > 0
      ? `永恒挑战 6 之后：: ${formatX(Player.dimensionMultDecrease, 2, 2)}`
      : " "
    ),
    noLabel: true,
    onPurchased: () => GameCache.dimensionMultDecrease.invalidate()
  }),
  ipGen: rebuyable({
    id: 2,
    initialCost: () => 1e7 * (Alpha.isRunning ? AlphaUnlocks.breakInfinity.effects.nerfA.effectOrDefault(1) : 1),
    costIncrease: () => 10,
    maxUpgrades: () => 10,
    effect: value => Player.bestRunIPPM.times(value / 10),
    description: () => {
      let generation = `自动生产你过去 10 次无限中最佳的无限点/分钟的 ${formatInt(10 * player.infinityRebuyables[2])}%`;
      if (!BreakInfinityUpgrade.ipGen.isCapped) {
        generation += `➜ ${formatInt(10 * (1 + player.infinityRebuyables[2]))}%`;
      }
      return generation;
    },
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${format(value, 2, 1)} 无限点数/分钟`,
    noLabel: false
  })
};