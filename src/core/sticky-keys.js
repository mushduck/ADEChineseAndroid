// @ts-check
import {
  bigCrunchResetRequest,
  CelestialDimensions,
  celestialEternityResetRequest,
  eternityResetRequest,
  manualCelestialCrunchResetRequest,
  manualRequestDimensionBoost,
  manualRequestGalaxyReset,
  maxAll,
  PlayerProgress,
  replicantiGalaxyRequest,
  resetForDivineStars,
} from "./globals";

/**
 * @typedef StuckKey
 * @type {object}
 * @property {string} actionID 已经粘滞的按钮行为的 ID，如果无按键则为 ""
 */

/** @type {StuckKey} */
export const stuckKey = {
  actionID: ""
};

/**
 * @description 用于根据某个按钮行为的 ID 粘滞对应的按钮
 * @param {string} actionID 要粘滞的按钮行为的 ID
 * @returns {void}
 */
export const stickAKey = actionID => {
  stuckKey.actionID = actionID;
};

/**
 * @description 用于取消粘滞
 * @returns {void}
 */
export const cancelStickingKey = () => {
  stuckKey.actionID = "";
};

/**
 * @description 根据对应按钮行为的 ID 进行操作
 * @param {string} actionID 按一次的按键行为的 ID
 * @returns {void}
 */
export const pressAKeyOnce = actionID => {
  // 根据不同的 ID 进行不同的操作

  /**
   * max: 普通最大
   * dimboost: 维度提升
   * ag: 反物质星系
   * big-crunch: 普通大坍缩
   * rg: 复制器星系
   * eternity: 普通永恒
   * cel-max: 天界维度购买最大
   * cel-big-crunch: 天界大坍缩
   * cel-eternity: 天界永恒
   * condense: 凝聚
   */

  switch (actionID) {
    case "max":
      maxAll();
      break;
    case "dimboost":
      manualRequestDimensionBoost(false);
      break;
    case "ag":
      manualRequestGalaxyReset(false);
      break;
    case "big-crunch":
      bigCrunchResetRequest(true);
      break;
    case "rg":
      replicantiGalaxyRequest();
      break;
    case "eternity":
      eternityResetRequest();
      break;
    case "cel-max":
      CelestialDimensions.buyMax();
      break;
    case "cel-big-crunch":
      manualCelestialCrunchResetRequest();
      break;
    case "cel-eternity":
      celestialEternityResetRequest();
      break;
    case "condense":
      if (!PlayerProgress.condenseUnlocked()) {
        return;
      }
      resetForDivineStars();
      break;
    default:
      // 如果没有对应的 ID 就取消
      stuckKey.actionID = "";
      break;
  }
};
