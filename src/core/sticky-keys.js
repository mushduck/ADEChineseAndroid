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

export const stuckKey = {
  actionID: ""
};

export const stickAKey = actionID => {
  stuckKey.actionID = actionID;
};

export const cancelStickingKey = () => {
  stuckKey.actionID = "";
};

export const pressAKeyOnce = actionID => {
  switch (actionID) {
    case "max":
      maxAll();
      break;
    case "dimboost":
      manualRequestDimensionBoost(true);
      break;
    case "ag":
      manualRequestGalaxyReset(true);
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
      stuckKey.actionID = "";
      break;
  }
};
