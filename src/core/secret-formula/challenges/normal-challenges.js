// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "首次在挑战之外达到无限。"
        : "首次达到无限。";
    },
<<<<<<< HEAD
    name: "第一",
    reward: "升级第一维度自动购买间隔的能力",
=======
    name: () => `1st ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 1st ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => "Infinities power themselves at a severely reduced rate",
      effect: () => player.infinities.max(4).log2().log2(),
      formatEffect: value => formatPow(value, 2, 3)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D0
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
<<<<<<< HEAD
      () => "购买任何东西都将会 停止->减半 产出，" +
      `不过会在接下来的 ${formatInt(3)} 分钟内逐渐恢复。`,
    name: "第二",
    reward: "升级第二维度自动购买间隔的能力",
=======
      () => `buying ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions or Tickspeed upgrades halts production of
      ${Slabdrill.isCursed ? "your Antimatter Dimension." : `all ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions.`} Production gradually returns to normal
      over ${formatInt(3)} minutes.`,
    name: () => `2nd ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 2nd ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => `Gain a power to the first three Dimension types that increases over ${formatInt(5)} hours this Endgame`,
      effect: () => Time.thisEndgameRealTime.totalSeconds.max(1).min(18000).pow(0.75),
      formatEffect: value => formatPow(value, 2, 3)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
<<<<<<< HEAD
      `大幅度削弱第一反物质维度的效果，不过可以得到一个指数增长的加成。该加成会在进行维度提升或购买反物质星系后重置。`,
    name: "第三",
    reward: "升级第三维度自动购买间隔的能力",
=======
      () => `${Slabdrill.isCursed ? "your" : "the 1st"} ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension is heavily weakened, but gets an uncapped exponentially
      increasing multiplier. This multiplier resets after Dimension Boosts and ${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxies.`,
    name: () => `3rd ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 3rd ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => `Gain a Dilation to the 1st ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension that increases over ${formatInt(5)} hours this Endgame`,
      effect: () => Time.thisEndgameRealTime.totalHours.min(5).div(100).add(1),
      formatEffect: value => formatPow(value, 2, 4)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
<<<<<<< HEAD
    description: "购买反物质维度会自动清除所有更低位面的反物质维度，类似一次不提供加成的维度献祭。",
    name: "第四",
    reward: "升级第四维度自动购买间隔的能力",
=======
    description: () => Slabdrill.isCursed ? "buying your Antimatter Dimension resets Antimatter." :
      `buying ${player.universes.current === 2 ? "a Matter" : "an Antimatter"} Dimension automatically erases all lower tier ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions, ` +
      "like a sacrifice without the boost.",
    name: () => `4th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 4th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => "Dimension Surges are cheaper based on their amount",
      effect: () => Decimal.pow(0.9, player.dimensionBoosts.max(1).log10()),
      formatEffect: value => formatPow(value, 2, 3)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
<<<<<<< HEAD
      () => `购买计数频率获得的倍率从 ${formatX(1.080, 0, 3)} 开始而不是 ${formatX(1.1245, 0, 3)}.`,
    name: "第五",
    reward: "升级第五维度自动购买间隔的能力",
=======
      () => `the Tickspeed purchase multiplier starts at ${formatX(1.080, 0, 3)} instead of ${formatX(1.1245, 0, 3)}.`,
    name: () => `5th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 5th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => "Galaxies are stronger based on total Galaxies",
      effect: () => Decimal.log10(GalacticPowers.galacticAscension.isUnlocked ?
        Replicanti.galaxies.total.max(1).times(player.galaxies.max(1)).times(player.dilation.totalTachyonGalaxies.max(1)).times(
        GalacticPower.freeGalaxies.max(1)).times(GalaxyGenerator.galaxies.max(1)).max(10) :
        Replicanti.galaxies.total.add(player.galaxies).add(player.dilation.totalTachyonGalaxies).add(
        GalacticPower.freeGalaxies).add(GalaxyGenerator.galaxies).max(10)).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
<<<<<<< HEAD
    description: () => `购买反物质维度时不消耗反物质，而是按另外的价格消耗其上 ${formatInt(2)} 层的反物质维度。模组中降低反物质维度价格。`,
    name: "第六",
    reward: "升级第六维度自动购买间隔的能力",
=======
    description: () => Slabdrill.isCursed ? "Your Antimatter Dimension is more expensive." :
      `upgrading each ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension costs the ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension ${formatInt(2)} tiers ` +
      `below it instead of ${player.universes.current === 2 ? "matter" : "antimatter"}. ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension prices are modified.`,
    name: () => `6th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 6th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => `Gain more Continuum purchases based on 8th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions`,
      effect: () => Decimal.log10(AntimatterDimension(8).amount.max(10)).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
<<<<<<< HEAD
      `购买 ${formatInt(10)} 个反物质维度获得的加成减少至 ${formatX(1)}。
      不过这一加成在每次维度提升后会增加 ${formatX(0.2, 1, 1)} ，直到到达 ${formatX(2)} 的上限。`,
    name: "第七",
    reward: "升级第七维度自动购买间隔的能力",
=======
      Slabdrill.isCursed ? `the multiplier from buying ${formatInt(10)} ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions is reduced to ${formatX(5)}.
        This increases by ${formatX(5)} per Dimension Boost, to a maximum of ${formatX(30)}, and is unaffected by any upgrades.` :
      `the multiplier from buying ${formatInt(10)} ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions is reduced to ${formatX(1)}. This increases by
        ${formatX(0.2, 1, 1)} per Dimension Boost, to a maximum of ${formatX(2)}, and is unaffected by any upgrades.`,
    name: () => `7th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 7th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => "Buy OoM Power is stronger based on Dimension Surges",
      effect: () => Decimal.log10(player.dimensionBoosts.max(1)).add(1),
      formatEffect: value => formatX(value, 2, 2)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
<<<<<<< HEAD
    description: `维度提升不再提供倍率加成且无法购买反物质星系。
      维度献祭被大幅度加强，但它会重置除了计数频率之外的一切。`,
    name: "第八",
    reward: "升级第八维度自动购买间隔的能力",
=======
    description: () => `Dimension Boosts provide no multiplier and ${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxies cannot be bought.
      ${Slabdrill.isCursed ? "" : `Dimensional Sacrifice resets ${player.universes.current === 2 ? "matter" : "antimatter"} and all ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions,
      but also gives a significantly stronger multiplier.`}`,
    name: () => `8th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : `Upgradeable 8th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Autobuyer`,
    charged: {
      reward: () => "Dimensional Sacrifice is stronger based on itself",
      effect: () => Decimal.log10(Sacrifice.totalBoost.max(10).log10().log10().add(1)).add(1),
      formatEffect: value => formatX(value, 2, 2)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
<<<<<<< HEAD
    description: () => `购买单个计数频率升级或 ${formatInt(10)} 个反物质维度之后，` +
      "价格相等的其它东西将会涨价到下一个档位。",
    name: "计数频率自动提升",
    reward: "升级计数频率自动购买间隔的能力",
=======
    description: () => `whenever you buy Tickspeed upgrades or ${formatInt(10)} of ${player.universes.current === 2 ? "a Matter" : "an Antimatter"} Dimension, ` +
      "everything else of equal cost will increase to its next cost step.",
    name: () => "Tickspeed Autobuyer",
    reward: () => Slabdrill.isCursed ? `Antimatter Dimension ${formatX(6.66, 2, 2)}` : "Upgradeable Tickspeed Autobuyer",
    charged: {
      reward: () => `Gain more Continuum purchases based on ${player.universes.current === 2 ? "Matter" : "Antimatter"}`,
      effect: () => Decimal.log10(Decimal.log10(player.antimatter.max(1e10))).pow(2),
      formatEffect: value => formatX(value, 2, 2)
    },
>>>>>>> upstream/master
    lockedAt: DC.D0,
    alphaLockedAt: DC.D1
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
<<<<<<< HEAD
    description: () => `只有 ${formatInt(6)} 个反物质维度，` +
      "同时提高维度提升和反物质星系的价格。",
    name: "自动购买维度提升",
    reward: "自动购买维度提升",
=======
    description: () => Slabdrill.isCursed ? `your Antimatter Dimension is raised ${formatPow(0.75, 2, 2)}.` :
      `there are only ${formatInt(6)} ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions. Dimension Boost ` +
      `and ${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxy costs are modified.`,
    name: () => "Automated Dimension Boosts",
    reward: () => "Dimension Boosts Autobuyer",
    charged: {
      reward: () => "Gain more Galactic Power based on Dimension Surges",
      effect: () => player.dimensionBoosts.max(1).log10().div(20).add(1),
      formatEffect: value => formatPow(value, 2, 3)
    },
>>>>>>> upstream/master
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
<<<<<<< HEAD
    description: () => `当你拥有至少 ${formatInt(1)} 个第二反物质维度后，` +
      "正物质将会出现并逐渐增加。如果正物质超过了反物质，那么将会触发一次不提供加成的维度提升。",
    name: "自动购买反物质星系",
    reward: "自动购买反物质星系",
=======
    description: () => `there is ${player.universes.current === 2 ? "antimatter" : "normal matter"} which rises${Slabdrill.isCursed ? "" : ` once you have at
      least ${formatInt(1)} 2nd ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension`}. If it exceeds your ${player.universes.current === 2 ? "matter" : "antimatter"}, it will Dimension Boost
      without giving the bonus.`,
    name: () => `Automated ${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxies`,
    reward: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxies Autobuyer`,
    charged: {
      reward: () => "Unlock the Tangible Universe"
    },
>>>>>>> upstream/master
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
<<<<<<< HEAD
    description: () => `每个反物质维度生产比其低 ${formatInt(1)} -> ${formatInt(2)} 层的反物质维度，
      第一 -> 第一、二反物质维度以更快的速度生产反物质。
      模组中为了弥补这一不足，强化了第二、四、六维度`,
    name: "自动大坍缩",
    reward: "自动大坍缩",
=======
    description: () => Slabdrill.isCursed ? `your Antimatter Dimension is raised ${formatPow(0.5, 1, 1)} and returns
      over the span of ${formatInt(3)} minutes, resetting on Dimension Boosts and Antimatter Galaxies.` :
      `each ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension produces the Dimension ${formatInt(2)} tiers below it
      instead of ${formatInt(1)}. Both 1st and 2nd Dimensions produce ${player.universes.current === 2 ? "matter" : "antimatter"}.
      The 2nd, 4th, and 6th Dimensions are made stronger to compensate.`,
    name: () => "Automated Big Crunches",
    reward: () => "Big Crunches Autobuyer",
    charged: {
      reward: () => `Even-numbered ${player.universes.current === 2 ? "MDs" : "ADs"} are stronger based on 8th Dimensions and ${player.universes.current === 2 ? "MD" : "AD"} amounts are no longer affected by Entropy caps`,
      effect: () => Decimal.log10(AntimatterDimension(8).amount.max(10)),
      formatEffect: value => formatPow(value, 2, 3)
    },
>>>>>>> upstream/master
    lockedAt: DC.D16,
    alphaLockedAt: DC.D16
  }
];
