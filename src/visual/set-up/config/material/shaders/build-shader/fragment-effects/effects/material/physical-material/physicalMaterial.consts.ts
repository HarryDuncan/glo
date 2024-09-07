import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../constants";
import {
  brdfGgx,
  brdfLambert,
  dGGX,
  fSchlickVector,
  getDistanceAttenuation,
  getLightProbeIrradiance,
  inverseTransformDirection,
  linearToneMapping,
  linearTosRGB,
  pointLightInfo,
  redirectPhysicalLight,
  shGetIrradianceAt,
  vGGXSmithCorrelated,
} from "../../../../shader-properties/functions/lighting/light";
import { pow2 } from "../../../../shader-properties/functions/maths/maths";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import {
  ShaderFunction,
  StructConfig,
  UniformConfig,
  VaryingConfig,
} from "../../../../types";

export const PHYSICAL_MATERIAL_UNIFORM_CONFIG = {
  defaultUniforms: ["uResolution"],
  customUniforms: [
    {
      id: "uToneMappingExposure",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 1.0,
    },
    { id: "uSpecularIntensity", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uRoughness", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uMetalness", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uOpacity", valueType: ShaderPropertyValueTypes.FLOAT, value: 1.0 },
    { id: "uIor", valueType: ShaderPropertyValueTypes.FLOAT },
    {
      id: "uDiffuse",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(1, 0.5, 0.5),
    },
    { id: "uEmissive", valueType: ShaderPropertyValueTypes.VEC3 },
    { id: "uSpecularColor", valueType: ShaderPropertyValueTypes.VEC3 },
    { id: "uAmbientLightColor", valueType: ShaderPropertyValueTypes.VEC3 },
    {
      id: "uPointLight",
      valueType: ShaderPropertyValueTypes.STRUCT,
      arrayLength: 2,
      structProperties: { id: "PointLight", properties: [] },
    },
    {
      id: "uLightProbe",
      valueType: ShaderPropertyValueTypes.VEC3,
      arrayLength: 9,
      value: new Vector3(1, 0.5, 0.5),
    },
  ],
} as UniformConfig;

export const DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS = {};
export const PHYSICAL_MATERIAL_REQUIRED_FUNCTIONS = [
  { id: "pow2", functionDefinition: pow2 },
  { id: "brdfLambert", functionDefinition: brdfLambert },
  { id: "fSchlickVector", functionDefinition: fSchlickVector },
  { id: "vGGXSmithCorrelated", functionDefinition: vGGXSmithCorrelated },
  { id: "dGGX", functionDefinition: dGGX },
  { id: "brdfGgx", functionDefinition: brdfGgx },
  { id: "getDistanceAttenuation", functionDefinition: getDistanceAttenuation },
  { id: "getPointLightInfo", functionDefinition: pointLightInfo },
  {
    id: "inverseTransformDirection",
    functionDefinition: inverseTransformDirection,
  },
  { id: "shGetIrradianceAt", functionDefinition: shGetIrradianceAt },
  {
    id: "getLightProbeIrradiance",
    functionDefinition: getLightProbeIrradiance,
  },
  { id: "linearToneMapping", functionDefinition: linearToneMapping },
  { id: "linearTosRGB", functionDefinition: linearTosRGB },
  { id: "redirectPhysicalLight", functionDefinition: redirectPhysicalLight },
] as ShaderFunction[];

export const PHYSICAL_MATERIAL_VARYING_CONFIG = [
  {
    id: "vNormal",
    varyingType: VARYING_TYPES.ATTRIBUTE,
    attributeKey: "normal",
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vModelViewMatrix",
    varyingType: VARYING_TYPES.DEFAULT,
    attributeKey: "modelViewMatrix",
    valueType: ShaderPropertyValueTypes.MAT4,
  },
  {
    id: "vEye",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
] as VaryingConfig[];

export const PHYSICAL_MATERIAL_STRUCT_CONFIG = [
  {
    id: "ReflectedLight",
    properties: [
      { id: "directDiffuse", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "directSpecular", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "indirectDiffuse", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "indirectSpecular", valueType: ShaderPropertyValueTypes.VEC3 },
    ],
  },
  {
    id: "PhysicalMaterial",
    properties: [
      { id: "diffuseColor", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "roughness", valueType: ShaderPropertyValueTypes.FLOAT },
      { id: "specularColor", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "specularF90", valueType: ShaderPropertyValueTypes.FLOAT },
      { id: "ior", valueType: ShaderPropertyValueTypes.FLOAT },
    ],
  },
  {
    id: "GeometricContext",
    properties: [
      { id: "position", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "normal", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "viewDir", valueType: ShaderPropertyValueTypes.VEC3 },
    ],
  },
  {
    id: "IncidentLight",
    properties: [
      { id: "color", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "direction", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "visible", valueType: ShaderPropertyValueTypes.BOOL },
    ],
  },
  {
    id: "PointLight",
    properties: [
      { id: "position", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "color", valueType: ShaderPropertyValueTypes.VEC3 },
      { id: "distance", valueType: ShaderPropertyValueTypes.FLOAT },
      { id: "decay", valueType: ShaderPropertyValueTypes.FLOAT },
    ],
  },
] as StructConfig[];
