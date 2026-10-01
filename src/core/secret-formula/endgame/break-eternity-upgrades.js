function rebuyable(config) {
  const effectFunction = config.effect || (x => x);
  const { name, id, maxUpgrades, description, isDisabled, noLabel, onPurchased } = config;
  return {
    rebuyable: true,
    name,
    id,
    cost: () => Decimal.pow(10, config.initialCost() * Math.pow(config.costIncrease(), player.breakEternityRebuyables[config.id])),
    maxUpgrades,
    description,
    effect: () => player.disablePostReality && !SlabdrillUnlocks.infinity.isUnlocked
      ? 1 : effectFunction(player.breakEternityRebuyables[config.id]),
    isDisabled,
    // There isn't enough room in the button to fit the EC reduction and "Next:" at the same time while still
    // presenting all the information in an understandable way, so we only show it if the upgrade is maxed
    formatEffect: config.formatEffect,
    formatCost: value => formatPostBreak(value, 2, 0),
    noLabel,
    onPurchased
  };
}

export const breakEternityUpgrades = {
  antimatterDimensionPow: rebuyable({
<<<<<<< HEAD
    name: "反物质指数",
=======
    name: () => `Exponentiation of ${player.universes.current === 2 ? "Matter" : "Antimatter"}`,
>>>>>>> upstream/master
    id: 0,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 100 : 1e15,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "所有反物质维度的倍率 ^ 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.01, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise your ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension multiplier to ${formatPow(1.01, 2, 2)}`
      : `Square All ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension Multipliers`,
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  infinityDimensionPow: rebuyable({
    name: "无限指数",
    id: 1,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e4 : 1e16,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "所有无限维度的倍率 ^ 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.02, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise all Infinity Dimension multipliers to ${formatPow(1.02, 2, 2)}` : "Square All Infinity Dimension Multipliers",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  timeDimensionPow: rebuyable({
    name: "时间指数",
    id: 2,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e6 : 1e17,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "所有时间维度的倍率 ^ 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.03, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise all Time Dimension multipliers to ${formatPow(1.03, 2, 2)}` : "Square All Time Dimension Multipliers",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiIntervalPow: rebuyable({
    name: "复制指数",
    id: 3,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 3e4 : 1e18,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(0.5, value),
    description: () => "复制器间隔 ^ 0.5",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(0.96, value) : Math.pow(0.5, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise the Replicanti Interval to ${formatPow(0.96, 2, 2)}` : "Square-root the Replicanti Interval",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${format(value, 2, 3)}`,
    noLabel: false
  }),
  tachyonParticlePow: rebuyable({
    name: "膨胀指数",
    id: 4,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1.5e8 : 1e19,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 2 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "超光速粒子获取 ^ 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.05, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise Tachyon Particle gain to ${formatPow(1.05, 2, 2)}` : "Square Tachyon Particle Gain",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  galaxyScaleDelay: rebuyable({
    name: "星系效力",
    id: 5,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 1e5 : 1e20,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 5 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => value * 10000,
    description: () => "推迟遥远星系/极远星系出现",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? value * 10 : value * 10000,
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Delay Distant/Remote Galaxy Scaling by +${formatInt(10)} Galaxies`
      : `Delay Distant/Remote Galaxy Scaling by +${formatInt(10000)} Galaxies`,
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => `${formatInt(value)} 星系`,
    noLabel: false
  }),
  infinityPowerConversion: rebuyable({
    name: "力量加成",
    id: 6,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 2e5 : 1e21,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "无限之力转换指数 × 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Multiply the Infinity Power Conversion Rate by ${formatX(1.1, 1, 1)}` : "Double the Infinity Power Conversion Rate",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
    noLabel: false
  }),
  epMultiplierDelay: rebuyable({
    name: "软上限提高",
    id: 7,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 8e6 : 1e22,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 4 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(10, value),
    description: () => `将永恒点数倍增的价格加速增长起始值提高至${formatPow(10)}`,
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(10, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Raise the start of the 5x EP Multiplier Cost Scalings to ${formatPow(1.1, 2, 2)}`
      : `Raise the start of the 5x EP Multiplier Cost Scalings to ${formatPow(10)}`,
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatPow(value, 2, 3) : `^${formatHybridSmall(value, 3)}`,
    noLabel: false
  }),
  replicantiGalaxyPower: rebuyable({
    name: "涨价延迟",
    id: 8,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 5e6 : 1e23,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 3 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "复制器星系成本加速增长起始值 × 2",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Multiply the starting points of the Replicanti Galaxy cost scalings by ${formatX(1.1, 1, 1)}`
      : "Double the starting points of the Replicanti Galaxy Cost Scalings",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
    noLabel: false
  }),
  dilatedTimeMultiplier: rebuyable({
    name: "倍率强化",
    id: 9,
    initialCost: () => SlabdrillUnlocks.infinity.isUnlocked ? 2e8 : 1e24,
    costIncrease: () => SlabdrillUnlocks.infinity.isUnlocked ? 2 : 1e10,
    maxUpgrades: 10,
<<<<<<< HEAD
    effect: value => Math.pow(2, value),
    description: () => "膨胀时间倍增升级的每次购买倍率 × 2 (仅限初始值为×2的那个)",
=======
    effect: value => SlabdrillUnlocks.infinity.isUnlocked ? Math.pow(1.1, value) : Math.pow(2, value),
    description: () => SlabdrillUnlocks.infinity.isUnlocked
      ? `Multiply the Per-Purchase Multiplier of the 2x Dilated Time Upgrade by ${formatX(1.1, 1, 1)}`
      : "Double the Per-Purchase Multiplier of the 2x Dilated Time Upgrade",
>>>>>>> upstream/master
    isDisabled: effect => effect.eq(0),
    formatEffect: value => SlabdrillUnlocks.infinity.isUnlocked ? formatX(value, 2, 3) : `${formatX(value, 2)}`,
    noLabel: false
  }),
  doubleIPUncap: {
    name: "无限强化",
    id: "doubleIPUncap",
    cost: Decimal.pow(10, 1e30),
    description: "去除无限点数倍增升级购买硬上限"
  },
  tgThresholdUncap: {
    name: "星系增长",
    id: "tgThresholdUncap",
    cost: Decimal.pow(10, 1e40),
    description: "去除超光速粒子星系阈值升级的购买上限并优化公式"
  },
  tesseractMultiplier: {
    name: "穿越立方",
    id: "tesseractMultiplier",
    cost: Decimal.pow(10, 1e50),
    description: "将所有有效超立方体数量 × 2",
    effect: 2
  },
  glyphSacrificeUncap: {
    name: "献祭补偿",
    id: "glyphSacrificeUncap",
    cost: Decimal.pow(10, 1e70),
    description: "去除符文献祭效果上限"
  },
  glyphSlotImprovement: {
    name: "效力扩增",
    id: "glyphSlotImprovement",
    cost: Decimal.pow(10, 1e100),
    description: "在被毁灭的现实外增加 3 个符文槽",
    effect: 3
  },
};
