export const ecTimeStudies = [
  {
    id: 1,
    cost: 30,
    requirement: [171],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "永恒次数",
=======
      resource: () => "Eternities",
>>>>>>> upstream/master
      current: () => Currency.eternities.value,
      required: completions => new Decimal(20000 + Math.min(completions, Enslaved.isRunning ? 999 : 4) * 20000),
      formatValue: formatInt
    }
  },
  {
    id: 2,
    cost: 35,
    requirement: [171],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "来自于时间维度的计数频率升级",
=======
      resource: () => "Tickspeed upgrades from Time Dimensions",
>>>>>>> upstream/master
      current: () => player.totalTickGained,
      required: completions => new Decimal(1300 + Math.min(completions, 4) * 150),
      formatValue: value => formatInt(Math.floor(value.toNumber()))
    }
  },
  {
    id: 3,
    cost: 40,
    requirement: [171],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "第八维度",
=======
      resource: () => `8th ${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimensions`,
>>>>>>> upstream/master
      current: () => AntimatterDimension(8).totalAmount,
      required: completions => new Decimal(17300 + Math.min(completions, 4) * 1250),
      formatValue: value => formatInt(Math.floor(value.toNumber()))
    }
  },
  {
    id: 4,
    cost: 70,
    requirement: [143],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "无限次数",
=======
      resource: () => "Infinities",
>>>>>>> upstream/master
      current: () => Currency.infinitiesTotal.value,
      required: completions => new Decimal(1e8 + Math.min(completions, 4) * 2.5e7),
      formatValue: value => formatInt(Math.floor(value.toNumber()))
    }
  },
  {
    id: 5,
    cost: 130,
    requirement: [42],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "反物质星系",
=======
      resource: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Galaxies`,
>>>>>>> upstream/master
      current: () => player.galaxies,
      required: completions => new Decimal(160 + Math.min(completions, 4) * 14),
      formatValue: formatInt
    }
  },
  {
    id: 6,
    cost: 85,
    requirement: [121],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "复制器星系",
=======
      resource: () => "Replicanti Galaxies",
>>>>>>> upstream/master
      current: () => player.replicanti.galaxies,
      required: completions => new Decimal(40 + Math.min(completions, 4) * 5),
      formatValue: formatInt
    }
  },
  {
    id: 7,
    cost: 115,
    requirement: [111],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "反物质",
=======
      resource: () => player.universes.current === 2 ? "matter" : "antimatter",
>>>>>>> upstream/master
      current: () => Currency.antimatter.value,
      required: completions => DC.E300000.pow(Math.min(completions, 4)).times(DC.E500000),
      formatValue: value => format(value)
    }
  },
  {
    id: 8,
    cost: 115,
    requirement: [123],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "无限点数",
=======
      resource: () => "Infinity Points",
>>>>>>> upstream/master
      current: () => Currency.infinityPoints.value,
      required: completions => DC.E1000.pow(Math.min(completions, 4)).times(DC.E4000),
      formatValue: value => format(value)
    }
  },
  {
    id: 9,
    cost: 415,
    requirement: [151],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "无限之力",
=======
      resource: () => "Infinity Power",
>>>>>>> upstream/master
      current: () => Currency.infinityPower.value,
      required: completions => DC.E2000.pow(Math.min(completions, 4)).times(DC.E17500),
      formatValue: value => format(value)
    }
  },
  {
    id: 10,
    cost: 550,
    requirement: [181],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      resource: "永恒点数",
=======
      resource: () => "Eternity Points",
>>>>>>> upstream/master
      current: () => Currency.eternityPoints.value,
      required: completions => DC.E20.pow(Math.min(completions, 4)).times(DC.E100),
      formatValue: value => format(value)
    }
  },
  {
    id: 11,
    cost: 1,
    requirement: [231, 232],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      path: "反物质维度",
=======
      path: () => `${player.universes.current === 2 ? "Matter" : "Antimatter"} Dimension`,
>>>>>>> upstream/master
      forbiddenStudies: [72, 73],
    }
  },
  {
    id: 12,
    cost: 1,
    requirement: [233, 234],
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    secondary: {
<<<<<<< HEAD
      path: "时间维度",
=======
      path: () => "Time Dimension",
>>>>>>> upstream/master
      forbiddenStudies: [71, 72],
    }
  }
];
