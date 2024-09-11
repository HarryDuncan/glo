import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../constants";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { DefaultUniform, VaryingConfig } from "../../../../types";

export const DEFAULT_PHONG_UNIFORMS = {
  defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
  customUniforms: [
    {
      id: "uLightPosition",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(1, 1, 1),
    },
    {
      id: "uDiffuseColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 0.5),
    },
    {
      id: "uLightColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 1),
    },
    {
      id: "uAmbientReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.3,
    },
    {
      id: "uDiffuseReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.5,
    },
    {
      id: "uSpecularReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.5,
    },
    {
      id: "uAmbientColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.2, 0.2, 0.2),
    },
    {
      id: "uMaterialDiffuse",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 0.5),
    },
    {
      id: "uMaterialSpecular",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 0.5),
    },
    {
      id: "uSpecularColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 0.5),
    },
    {
      id: "uShininess",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.5,
    },
  ],
};

export const DEFAULT_PHONG_EFFECT_PROPS = {};

export const PHONG_REQUIRED_FUNCTIONS = [];
export const PHONG_VARYINGS = [
  {
    id: "vEye",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },

  {
    id: "vPosition",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vNormal",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vUv",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC2,
  },
  {
    id: "vNormalInterpolation",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
] as VaryingConfig[];
