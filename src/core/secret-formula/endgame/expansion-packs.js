export const expansionPacks = {
  teresaPack: {
    name: "特蕾莎扩展包",
    id: "teresaPack",
    symbol: "Ϟ",
    get description() {
      return ` 移除进贡现实机器上限；解锁自动进贡现实机器。
      基于进贡的现实机器提高现实机器上限和现实机器获取量；
      终局后保留复兴商店；
      在特蕾莎标签页解锁充能复兴商店升级。`
    },
    cost: Decimal.pow(10, 1e30),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  effarigPack: {
    name: "鹿颈长扩展包",
    id: "effarigPack",
    symbol: "Ϙ",
    get description() {
<<<<<<< HEAD
      return ` 遗迹碎片获取量乘以当前反物质指数（当前：${formatX(player.antimatter.max(10).log10(), 2)}）；
      太阳神中鹿颈长的记忆达到 ${formatInt(10)} 级时，鹿颈长符文总是拥有 ${formatInt(7)} 个词条；
      提升符文炼金资源的上限至历史最高符文等级的三分之一（当前等级：${formatHybridLarge(player.records.bestEndgame.glyphLevel.div(3), 3)}）；
      终局后保留炼金资源，且创造现实符文不再消耗炼金资源；
      开始终局时解锁目前阶段鹿颈长商店全部内容；
      基于最快终局用时的十分之一自动完成鹿颈长的每一层现实。（当前每层用时：${TimeSpan.fromMilliseconds(new Decimal(player.records.bestEndgame.realTime).div(10)).toStringShort()}）`
=======
      return ` Multiply Relic Shard gain by the logarithm of your ${player.universes.current === 2 ? "Matter" : "Antimatter"} amount (Currently ${formatX(player.antimatter.max(10).log10(), 2)}).
        The Effarig Level ${formatInt(10)} reward in Ra is improved so that Effarig Glyphs are always generated with ${formatInt(7)} effects.
        Increase Glyph Alchemy caps to a base of one-third of your all-time maximum Glyph Level (Currently ${formatHybridLarge(player.records.bestEndgame.glyphLevel.div(3), 3)}).
        Alchemy resources are kept on Endgame, and making a Reality Glyph no longer spends Reality resources.
        Effarig's Shop starts completed.
        Layers of Effarig's Reality will automatically complete themselves ten times faster than the time of your fastest Endgame (Currently ${TimeSpan.fromMilliseconds(new Decimal(player.records.bestEndgame.realTime).div(10)).toStringShort()} per layer)`
>>>>>>> upstream/master
    },
    cost: Decimal.pow(10, 1e50),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  enslavedPack: {
    name: "无名氏扩展包",
    id: "enslavedPack",
    symbol: "\uf0c1",
    get description() {
      return ` 充能黑洞总是消耗 ${formatPercents(0.99)} 的游戏速度；
      解锁多样化黑洞充能，用于调整黑洞时间释放量以及释放间隔；
      有效超立方体的效力翻倍；解锁超立方体自动购买器。
      基于超立方体数量提高终局次数获取量并略微降低无限维度的软上限强度（当前：${formatX(Math.floor(1 + Math.pow(Math.log10(Math.min(Tesseracts.effectiveCount, 1000) * Math.max(Math.log10(Tesseracts.effectiveCount) - 2, 1) + 1), Math.log10(player.endgames + 1))), 2, 2)}, ${formatX(Math.pow(1 / Math.log10(Tesseracts.effectiveCount + 1), 0.2), 2, 3)}）；
      开始终局时自动完成无名氏的现实。`
    },
    cost: Decimal.pow(10, 1e70),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  vPack: {
    name: "薇扩展包",
    id: "vPack",
    symbol: "⌬",
    get description() {
      return ` 开始终局时自动完成薇的现实；
      每 ${TimeSpan.fromSeconds(new Decimal(60))} 自动解锁一个薇成就（包括困难的薇成就），可花费天界点数减少间隔；
      空间之理获取量翻倍。`
    },
    cost: Decimal.pow(10, 1e90),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  raPack: {
    name: "太阳神扩展包",
    id: "raPack",
    symbol: "\uf185",
    get description() {
<<<<<<< HEAD
      return ` 终局后保留太阳神记忆；
      基于反物质第二指数的最高值提升所有天神的记忆等级上限（当前：${formatHybridLarge(Decimal.max(Decimal.floor(player.records.bestAntimatterExponentOutsideDoom.max(1).log10()), 25), 3)}）；
      每位天神解锁另外 ${formatInt(7)} 个记忆等级奖励；
      记忆和记忆块的获取量 ${formatX(10)}。`
=======
      return ` Ra is kept on Endgame.
        Raise the level cap of all Celestials to the double-logarithm of your record ${player.universes.current === 2 ? "Matter" : "Antimatter"} amount (Currently ${formatHybridLarge(Decimal.max(Decimal.floor(player.records.bestAntimatterExponentOutsideDoom.max(1).log10()), 25), 3)}).
        Unlock ${formatInt(7)} new effects for each Celestial which can be obtained by increasing the level of each Celestial.
        Multiply Memory and Memory Chunk gain by ${formatX(10)}.`
>>>>>>> upstream/master
    },
    cost: Decimal.pow(10, 1e110),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  laitelaPack: {
    name: "莱特拉扩展包",
    id: "laitelaPack",
    symbol: "ᛝ",
    get description() {
<<<<<<< HEAD
      return ` 解锁自动调整凝聚奇点用时；解锁多样化自动湮灭；
      莱特拉的现实中游戏时间恢复速度翻倍；熵的最大获取速度 × ${formatInt(10)}；
      湮灭乘数对第八暗物质维度的效果 ^ 2（若湮灭乘数影响第八暗物质维度）；终局后自动获得 ${formatInt(10)} 奇点；
      暗物质维度飞升时增长的生产时间间隔除以 ${formatInt(200)}；
      暗物质获取量乘以当前反物质的第二指数和当前虚幻机器数量指数的最大值（当前：${formatX(Decimal.max(player.antimatter.max(1e10).log10().log10(), player.reality.imaginaryMachines.max(10).log10()), 2, 2)}）；
      暗能量获取量乘以奇点指数的平方（当前：${formatX(player.celestials.laitela.singularities.max(10).log10().pow(2), 2, 2)}）；
      基于暗物质数量提升暗物质湮灭的指数（当前：${formatPow(Decimal.pow((Decimal.log10(Decimal.log10(Currency.darkMatter.value.add(1)).add(1)).add(1)).div(2), 2).add(1), 2, 3)}）；
      解锁强子化莱特拉的现实；使莱特拉的现实失稳后提升暗物质的上限。`
=======
      return ` Unlock an autobuyer that will increase/decrease the bulk Singularity level based on an inputted time for each.
        While in Lai'tela's Reality, Game Speed returns to normal twice as fast.
        Square the Annihilation to ${formatInt(8)}th DMD multiplier if Annihilation multiplier currently affects the ${formatInt(8)}th DMD.
        Reduce the DMD Interval increase on Ascension by ${formatInt(200)}.
        Multiply Dark Matter gain by the double-logarithm of your ${player.universes.current === 2 ? "Matter" : "Antimatter"} amount or the logarithm of your Imaginary Machine amount, whichever is bigger (Currently ${formatX(Decimal.max(player.antimatter.max(1e10).log10().log10(), player.reality.imaginaryMachines.max(10).log10()), 2, 2)}).
        Start Endgames with ${formatInt(10)} Singularities.
        Multiply Dark Energy gain by the logarithm of your Singularity amount squared (Currently ${formatX(player.celestials.laitela.singularities.max(10).log10().pow(2), 2, 2)}).
        Raise the Annihilation effect to a power based on Dark Matter (Currently ${formatPow(Decimal.pow((Decimal.log10(Decimal.log10(Currency.darkMatter.value.add(1)).add(1)).add(1)).div(2), 2).add(1), 2, 3)}).
        Improve the Annihilation autobuyer.
        Unlock the ability to Hadronize Lai'tela's Reality.
        The reward for destabilizing Lai'tela's Reality now affects the Dark Matter Cap as well.
        The maximum gain of Entropy per second is multiplied by ${formatInt(10)}.`
>>>>>>> upstream/master
    },
    cost: Decimal.pow(10, 1e130),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  pellePack: {
    name: "佩勒扩展包",
    id: "pellePack",
    symbol: "♅",
    get description() {
      return ` 星系生成器不稳定性减少 ${formatInt(1)}；
      基于星系数量最大值为前三种维度提供指数加成（当前：${formatPow(Decimal.pow(Decimal.log10(player.records.bestEndgame.galaxies).div(100), 1.5).add(1), 2, 3)}）；
      解锁可重复购买的星系生成器升级的自动购买器。`
    },
    cost: Decimal.pow(10, 1e150),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  alphaPack: {
    name: "阿尔法扩展包",
    id: "alphaPack",
    symbol: "α",
    get description() {
<<<<<<< HEAD
      return ` 解锁强子加速器，可以加速你的强子以提高反物质指数；同时解锁虚无，类似时间膨胀但可以提升加速器的产量。`
=======
      return ` Unlock the Large Hadron Collider, which can accelerate your Hadrons to exponentially gain more ${player.universes.current === 2 ? "Matter" : "Antimatter"}.
        Unlock The Void, which is a feature that functions similarly to Time Dilation and boosts Accelerator production.`
>>>>>>> upstream/master
    },
    cost: Decimal.pow(10, 1e200),
    formatCost: value => formatPostBreak(value, 2, 0)
  },
  slabPack: {
    name: "Slabdrill's Expansion Pack",
    id: "slabPack",
    symbol: "⁹δ",
    get description() {
      return ` Allow Serpentine Power to be collected outside the Cursed Reality.
        Reunlock the Cursed Core, and boost Chaos Core find chance and interval by Celestial Points, Celestial Reality Machines and Celestial Runes rather than Slabdrill Strikes.
        Refactor all Serpentine Power effects.`
    },
    cost: Decimal.pow(10, 1e275),
    formatCost: value => formatPostBreak(value, 2, 0)
  }
};