import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";
import { MaterialConfig } from "visual/display/materials/materials.types";
import { SceneComponentConfig } from "visual/display/components/interactive-scene";
import { InteractionConfig } from "interaction-node/interactions.types";
import { Asset } from "visual/set-up/assets/use-assets/types";

export type RandomizationConfig = {
  instanceCount: number;
  boundingBoxConfig: {
    width: number;
    height: number;
    depth: number;
    center: Partial<ThreeDPosition>;
  };
};
export type MeshComponentConfig = {
  id: string;
  geometryId?: string;
  rotation?: Partial<ThreeDPosition>;
  position?: Partial<ThreeDPosition>;
  size?: number;
  materialConfig: MaterialConfig;
  randomizationConfig?: RandomizationConfig;
};
export type SceneDataConfig = {
  assets?: Asset[];
  meshComponentConfigs: MeshComponentConfig[];
  globalMaterialConfigs: MaterialConfig[];
  animationConfig: CustomAnimationConfig[];
  lightConfig: LightConfigs[];
  sceneComponentConfigs?: SceneComponentConfig[];
  interactionConfig?: InteractionConfig[];
};