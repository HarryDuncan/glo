import { Asset } from "visual/set-up/assets/asset.types";
import { SceneConfig } from "../config.types";
import {
  MATERIAL_TYPES,
  SHADER_MATERIALS,
} from "visual/display/materials/materials.constants";
import {
  MaterialConfig,
  ShaderMaterialProps,
} from "visual/display/materials/materials.types";
import { configureShaders } from "visual/display/materials/webgl-shaders/shader-setup/configureShaders";
import {
  CustomBlending,
  OneFactor,
  OneMinusSrcAlphaFactor,
  ShaderMaterial,
  SrcAlphaFactor,
} from "three";

export const getShaderMaterials = (config: SceneConfig, assets: Asset[]) => {
  const { globalMaterialConfigs } = config;
  if (!globalMaterialConfigs) return [];
  return globalMaterialConfigs.flatMap((materialConfig) => {
    if (SHADER_MATERIALS.includes(materialConfig.materialType)) {
      const shaderMaterial = setUpShaderMaterial(materialConfig, assets);
      if (shaderMaterial) {
        shaderMaterial.name = materialConfig.id;
        return shaderMaterial;
      }
    }
    return [];
  });
};

const setUpShaderMaterial = (
  materialConfig: MaterialConfig,
  assets: Asset[]
) => {
  const {
    shaderConfig,
    uniforms,
  } = materialConfig.materialProps as ShaderMaterialProps;
  const { vertexShader, fragmentShader, configuredUniforms } = configureShaders(
    shaderConfig,
    uniforms,
    assets
  );
  switch (materialConfig.materialType) {
    case MATERIAL_TYPES.SHADER: {
      return new ShaderMaterial({
        uniforms: configuredUniforms,
        vertexShader,
        fragmentShader,
        blending: CustomBlending,
        blendSrc: SrcAlphaFactor,
        blendDst: OneFactor,
        transparent: true,
        depthTest: false,
      });
    }
    default:
      return null;
  }
};
