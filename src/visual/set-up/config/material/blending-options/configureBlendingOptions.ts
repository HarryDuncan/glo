import { CustomBlending, OneFactor, SrcAlphaFactor, ZeroFactor } from "three";
import { BlendingConfig } from "./blendingOptions.types";
import { DEFAULT_BLENDING_OPTIONS } from "./blendingOptions.consts";
import { getBlendingFactor } from "./getBlendingFactor";

export const configureBlendingOptions = (
  blendingConfig: Partial<BlendingConfig> | undefined
) => {
  if (!blendingConfig) return {};
  const formattedBlendingConfig = formatBlendingConfig(blendingConfig);
  const blendDst = getBlendingFactor(formattedBlendingConfig.blendDstKey);
  const blendSrc = getBlendingFactor(formattedBlendingConfig.blendSrcKey);
  console.log(formattedBlendingConfig);
  return {
    blending: CustomBlending,
    blendSrc,
    blendDst,
    transparent: formattedBlendingConfig.transparent,
    depthTest: formattedBlendingConfig.depthTest,
  };
};

const formatBlendingConfig = (
  parsedBlendingConfig: Partial<BlendingConfig>
) => {
  return { ...DEFAULT_BLENDING_OPTIONS, ...parsedBlendingConfig };
};
