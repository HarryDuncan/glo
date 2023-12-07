import { Position3d } from "visual/utils/three-dimension-space/position/position.types";
import {
  AttributeConfig,
  ShaderFunction,
  UniformConfig,
} from "../buildShader.types";

export interface VertexEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig;
  transformation: string;
  pointName: string;
  attributeConfig?: AttributeConfig[];
}

export type MorphObject = {
  pointName: string;
  normalName: string;
};