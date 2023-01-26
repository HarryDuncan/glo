import { MeshPhongMaterial } from "three";
import { ANIMATION_TYPES } from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const LOGO_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.ROTATE,
  animationProperties: {
    animationDurationMilis: 2000,
    animationPauseMilis: 1000,
    repeatAnimation: true,
    rotationAxis: AXIS.Z,
  },
};

export const CONFIG_INDEX = 3;

export const CONFIGS = [
  {
    background: "blue-mag",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    }),
  },
  {
    background: "pinky-red",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    }),
  },
  {
    background: "blue",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x934832,
      shininess: 250,
    }),
  },
  {
    background: "orange-red",
    directionalLightColor: "#cc7931",
    ambientLightColor: "#cc040e",
    pointLightColor: "#c99000",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0xf5da42,
      shininess: 10,
    }),
  },
  {
    background: "green",
    directionalLightColor: "",
    ambientLightColor: "",
    pointLightColor: "",
    marchingCubeMaterial: new MeshPhongMaterial({
      specular: 0x111111,
      shininess: 250,
    }),
  },
];
