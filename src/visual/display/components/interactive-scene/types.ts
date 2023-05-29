import { Object3D, Texture } from "three";
import { InteractiveScene } from "./InteractiveScene";
import {
  ComponentProps,
  ThreeJsComponentType,
} from "visual/display/scene-elements/components/threeJsComponents.types";
import { MaterialConfig } from "visual/display/materials/materials.types";
import { LightConfigs } from "visual/display/scene-elements/lights/lights.types";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export type SceneComponentConfig = {
  id: string;
  componentType: ThreeJsComponentType;
  componentProps: ComponentProps;
  materialConfig?: MaterialConfig;
};

export type SceneProperties = {
  background?: Texture;
};
export type SceneData = {
  meshes: Object3D[];
  sceneComponents: Object3D[];
  lights: LightConfigs[];
  sceneProperties?: SceneProperties;
  // TODO -type
  interactionComponents?: any;
};