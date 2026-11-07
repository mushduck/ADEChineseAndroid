const fs=require("fs");const root=fs.existsSync("package.json")?".":"..";const vueFile=root+"/src/components/tabs/past-prestige-runs/PastPrestigeRunsContainer.vue";const vueSource=`<script>
function averageRun(allRuns) {
  let runs = allRuns.filter(run => run[0] !== Number.MAX_VALUE);
  if (runs.length === 0) runs = [allRuns[0]];
  const longestRow = allRuns.map(r => r.length).max();
  const avgAttr = [];
  for (let index = 0; index < longestRow; index++) {
    if (typeof runs[0][index] === "string") {
      avgAttr.push("");
      continue;
    }
    const isNumber = typeof runs[0][index] === "number";
    const total = runs.map(run => run[index]).reduce(isNumber ? Number.sumReducer : Decimal.sumReducer);
    avgAttr.push(isNumber ? total / runs.length : Decimal.div(total, runs.length));
  }
  return avgAttr;
}

export default {
  name: "PastPrestigeRunsContainer",
  props: {
    layer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isRealityUnlocked: false,
      resourceType: false,
      selectedResources: [],
      resourceTitles: [],
      showRealTime: false,
      runs: [],
      hasEmptyRecord: false,
      shown: true,
      hasChallenges: false,
      longestRow: 0,
      hasIM: false,
    };
  },
  computed: {
    averageRun() {
      return averageRun(this.runs);
    },
    dropDownIconClass() {
      return this.shown ? "far fa-minus-square" : "far fa-plus-square";
    },
    points() {
      const rawText = this.layer.currency;
      return rawText === "现实机器" && this.hasIM ? "虚幻机器上限" : rawText;
    },
    condition() {
      return this.layer.condition();
    },
    plural() {
      return this.layer.plural;
    },
    singular() {
      return this.layer.name;
    },
    getRuns() {
      return this.layer.getRuns;
    },
    hasRealTime: () => PlayerProgress.seenAlteredSpeed(),
  },
  methods: {
    update() {
      this.runs = this.clone(this.getRuns());
      this.hasEmptyRecord = this.runs[0][0].gte(Number.MAX_VALUE);
      this.runs.push(this.averageRun);
      this.isRealityUnlocked = PlayerProgress.current.isRealityUnlocked;
      this.shown = player.shownRuns[this.singular];
      this.resourceType = player.options.statTabResources;
      this.showRate = this.resourceType === RECENT_PRESTIGE_RESOURCE.RATE;
      this.hasChallenges = this.runs.map(r => this.challengeText(r)).some(t => t);
      this.hasIM = MachineHandler.currentIMCap.gt(0);

      const names = [this.points, \`\${this.points}增长率\`, this.plural, \`\${this.singular}增长率\`];
      switch (this.resourceType) {
        case RECENT_PRESTIGE_RESOURCE.ABSOLUTE_GAIN:
          this.selectedResources = [0, 2];
          break;
        case RECENT_PRESTIGE_RESOURCE.RATE:
          this.selectedResources = [1, 3];
          break;
        case RECENT_PRESTIGE_RESOURCE.CURRENCY:
          this.selectedResources = [0, 1];
          break;
        case RECENT_PRESTIGE_RESOURCE.PRESTIGE_COUNT:
          this.selectedResources = [2, 3];
          break;
        default:
          throw new Error("Unrecognized Statistics tab resource type");
      }
      this.resourceTitles = [names[this.selectedResources[0]], names[this.selectedResources[1]]];

      const lastIndex = arr => {
        let val = arr.length;
        while (val > 0) {
          const curr = arr[val - 1];
          if (typeof curr === "string" && curr !== "") return val;
          if (typeof curr !== "string" && Decimal.neq(curr, 0)) return val;
          val--;
        }
        return 0;
      };
      this.longestRow = this.runs.map(r => lastIndex(r)).max();
    },
    clone(runs) {
      return runs.map(run =>
        run.map(item =>
          (item instanceof Decimal ? Decimal.fromDecimal(item) : item)
        )
      );
    },
    timeCols() {
      return this.hasRealTime ? 3 : 2;
    },
    table1Col() {
      return this.infoCol().slice(0, this.timeCols());
    },
    table2Col() {
      return [this.infoCol()[0], this.infoCol()[this.timeCols()], this.infoCol()[this.timeCols() + 1]];
    },
    hasTable3() {
      return this.infoCol().length > this.timeCols() + 2;
    },
    table3Col() {
      return [this.infoCol()[0], ...this.infoCol().slice(this.timeCols() + 2)];
    },
    table1Array(run, index) {
      return this.infoArray(run, index).slice(0, this.timeCols());
    },
    table2Array(run, index) {
      const arr = this.infoArray(run, index);
      return [arr[0], arr[this.timeCols()], arr[this.timeCols() + 1]];
    },
    table3Array(run, index) {
      const arr = this.infoArray(run, index);
      return [arr[0], ...arr.slice(this.timeCols() + 2)];
    },
    infoArray(run, index) {
      let name;
      if (index === 0) name = "上一次";
      else if (index === 10) name = "平均";
      else name = \`\${formatInt(index + 1)} 次之前\`;

      const cells = [name, this.gameTime(run)];
      if (this.hasRealTime) cells.push(this.realTime(run));

      const resources = [this.prestigeCurrencyGain(run), this.prestigeCurrencyRate(run),
        this.prestigeCountGain(run), this.prestigeCountRate(run)];
      cells.push(resources[this.selectedResources[0]]);
      cells.push(resources[this.selectedResources[1]]);

      if (this.hasChallenges) cells.push(this.challengeText(run));
      for (let i = 0; i < this.layer.extra?.length && cells.length <= this.longestRow; i++) {
        if (!this.layer.showExtra[i]()) continue;
        const formatFn = this.layer.formatExtra[i];
        const val = run[i + 5] ?? 0;
        if (this.layer.allowRate[i] && this.showRate) cells.push(this.rateText(run, run[i + 5]));
        else cells.push(formatFn(val));
      }

      return cells;
    },
    infoCol() {
      const cells = ["编号", this.hasRealTime ? "游戏时间" : "真实时间"];
      if (this.hasRealTime) cells.push("真实时间");
      cells.push(...this.resourceTitles);
      if (this.hasChallenges) cells.push("挑战");

      for (let index = 0; index < this.layer.extra?.length && cells.length <= this.longestRow; index++) {
        if (!this.layer.showExtra[index]()) continue;
        cells.push((this.layer.allowRate[index] && this.showRate)
          ? this.layer.rateString[index]
          : this.layer.extra[index]);
      }
      return cells;
    },
    gameTime(run) {
      return timeDisplayShort(new Decimal(run[0]));
    },
    realTime(run) {
      return timeDisplayShort(new Decimal(run[1]));
    },
    prestigeCurrencyGain(run) {
      if (this.hasIM && this.layer.name === "现实") return \`\${format(run[7], 2)} 虚幻机器\`;
      return \`\${format(run[2], 2)} \${this.points}\`;
    },
    prestigeCountGain(run) {
      return quantify(this.singular, run[3]);
    },
    prestigeCurrencyRate(run) {
      if (this.hasIM && this.layer.name === "现实") return "N/A";
      return this.rateText(run, run[2]);
    },
    prestigeCountRate(run) {
      return this.rateText(run, run[3]);
    },
    rateText(run, amount) {
      const time = run[1];
      const rpm = ratePerMinute(amount, time);
      return Decimal.lt(rpm, 1)
        ? \`\${format(Decimal.mul(rpm, 60), 2, 2)} 每小时\`
        : \`\${format(rpm, 2, 2)} 每分钟\`;
    },
    challengeText(run) {
      const rawText = run[4];
      return rawText === "The Nameless Ones" ? "Nameless" : rawText;
    },
    toggleShown() {
      player.shownRuns[this.singular] = !player.shownRuns[this.singular];
    }
  }
};
</script>

<template>
  <div v-if="condition">
    <div
      class="c-past-runs-header"
      @click="toggleShown"
    >
      <span class="o-run-drop-down-icon">
        <i :class="dropDownIconClass" />
      </span>
      <span>
        <h3>最近 {{ formatInt(10) }} 次{{ plural }}：</h3>
      </span>
    </div>
    <div v-show="shown">
      <!-- 表格1: 时间表 -->
      <div class="c-row-container">
        <span
          v-for="(entry, col) in table1Col()"
          :key="col"
        >
          {{ entry }}
        </span>
      </div>
      <div
        v-for="(run, index) in runs"
        :key="\x27t1-\x27 + index"
      >
        <span
          v-if="run[0].gte(Number.MAX_VALUE)"
          class="c-empty-row"
        >
          <i v-if="index === 10">
            无可用{{ plural }}时无法计算平均值。
          </i>
          <i v-else>
            尚未完成第 {{ formatInt(index + 1) }} 次{{ index === 0 ? singular : plural }}。
          </i>
        </span>
        <span
          v-else
          class="c-row-container"
        >
          <span
            v-for="(entry, col) in table1Array(run, index)"
            :key="col"
          >
            {{ entry }}
          </span>
        </span>
      </div>
      <br>
      <!-- 表格2: 收益表(在第十次下方另起新表) -->
      <div class="c-row-container">
        <span
          v-for="(entry, col) in table2Col()"
          :key="col"
        >
          {{ entry }}
        </span>
      </div>
      <div
        v-for="(run, index) in runs"
        :key="\x27t2-\x27 + index"
      >
        <span
          v-if="run[0].gte(Number.MAX_VALUE)"
          class="c-empty-row"
        >
          <i v-if="index === 10">
            无可用{{ plural }}时无法计算平均值。
          </i>
          <i v-else>
            尚未完成第 {{ formatInt(index + 1) }} 次{{ index === 0 ? singular : plural }}。
          </i>
        </span>
        <span
          v-else
          class="c-row-container"
        >
          <span
            v-for="(entry, col) in table2Array(run, index)"
            :key="col"
          >
            {{ entry }}
          </span>
        </span>
      </div>
      <!-- 表格3: 挑战与额外资源(在存在时于收益表下方另起新表) -->
      <template v-if="hasTable3()">
        <br>
        <div class="c-row-container">
          <span
            v-for="(entry, col) in table3Col()"
            :key="col"
          >
            {{ entry }}
          </span>
        </div>
        <div
          v-for="(run, index) in runs"
          :key="\x27t3-\x27 + index"
        >
          <span
            v-if="run[0].gte(Number.MAX_VALUE)"
            class="c-empty-row"
          >
            <i v-if="index === 10">
              无可用{{ plural }}时无法计算平均值。
            </i>
            <i v-else>
              尚未完成第 {{ formatInt(index + 1) }} 次{{ index === 0 ? singular : plural }}。
            </i>
          </span>
          <span
            v-else
            class="c-row-container"
          >
            <span
              v-for="(entry, col) in table3Array(run, index)"
              :key="col"
            >
              {{ entry }}
            </span>
          </span>
        </div>
      </template>
      <br>
    </div>
  </div>
</template>

<style scoped>
.c-row-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.c-empty-row {
  display: block;
  border: 0.05rem solid #999999;
  color: var(--color-text);
  width: 100%;
  padding: 0.2rem 0;
  margin: -0.1rem;
}

.l-no-records {
  height: 5.4rem;
}
</style>\n\`;fs.writeFileSync(vueFile,vueSource,"utf8");console.log(">> VUE FILE SAFELY REPLACED WITH CLEAN 3-TABLE STREAM!");const cssFile=root+"/public/stylesheets/new-ui-styles.css";let cssContent=fs.readFileSync(cssFile,"utf8");const pastTag="/* === MOBILE PAST PRESTIGE RUNS TAB ADAPTATION === */";const pastBlock=pastTag+"\n@media (max-width: 768px) {\n  .c-stats-tab:has(.c-past-runs-header),\n  .c-stats-tab {\n    width: 100% !important;\n    max-width: 100vw !important;\n    padding: 0.2rem 0.2rem 1.0rem 0.2rem !important;\n    box-sizing: border-box !important;\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    overflow-x: hidden !important;\n  }\n  .c-past-runs-header {\n    width: 100% !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: flex-start !important;\n    font-size: 0.95rem !important;\n    padding: 0.35rem 0.1rem !important;\n    box-sizing: border-box !important;\n  }\n  .c-past-runs-header h3 {\n    font-size: 0.96rem !important;\n    display: inline !important;\n    margin: 0 0 0 0.3rem !important;\n  }\n  .c-past-runs-header + div {\n    width: 100% !important;\n    max-width: 100% !important;\n    margin: 0.2rem auto 0.6rem auto !important;\n    padding: 0 !important;\n    border: none !important;\n    overflow: hidden !important;\n    box-sizing: border-box !important;\n    display: block !important;\n  }\n  .c-row-container {\n    width: 100% !important;\n    max-width: 100% !important;\n    display: flex !important;\n    flex-direction: row !important;\n    box-sizing: border-box !important;\n    margin: 0 !important;\n    padding: 0 !important;\n    background: transparent !important;\n    border: none !important;\n  }\n  .c-row-container > span {\n    border: 0.05rem solid #999999 !important;\n    margin: -0.025rem !important;\n    padding: 0.22rem 0.12rem !important;\n    font-size: 0.72rem !important;\n    line-height: 1.25 !important;\n    text-align: center !important;\n    color: var(--color-text) !important;\n    box-sizing: border-box !important;\n    flex: 1 1 0 !important;\n    width: auto !important;\n    min-width: 0 !important;\n    word-break: break-all !important;\n    white-space: normal !important;\n  }\n  .c-row-container > span:first-child {\n    flex: 0 0 24% !important;\n    max-width: 24% !important;\n  }\n  div.c-row-container > span {\n    font-weight: 700 !important;\n    border-bottom-width: 0.15rem !important;\n  }\n  .c-empty-row {\n    width: 100% !important;\n    max-width: 100% !important;\n    display: block !important;\n    border: 0.05rem solid #999999 !important;\n    color: var(--color-text) !important;\n    font-size: 0.72rem !important;\n    line-height: 1.25 !important;\n    padding: 0.2rem 0 !important;\n    margin: -0.025rem 0 !important;\n    text-align: center !important;\n    box-sizing: border-box !important;\n  }\n}";const iPast=cssContent.indexOf(pastTag);if(iPast!==-1){const next=cssContent.indexOf("/* === MOBILE ",iPast+pastTag.length);if(next!==-1){cssContent=cssContent.substring(0,iPast)+pastBlock+"\n\n"+cssContent.substring(next);}else{cssContent=cssContent.substring(0,iPast)+pastBlock;}}else{cssContent=cssContent.trimEnd()+"\n\n"+pastBlock;}fs.writeFileSync(cssFile,cssContent,"utf8");console.log(">> ALL DONE CLEANLY!");