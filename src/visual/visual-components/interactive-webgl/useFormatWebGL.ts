import { useCallback } from "react";
import { PlaneGeometry, RepeatWrapping } from "three";
import { Asset } from "visual/hooks/use-assets/types";
import { defaultVertex } from "visual/shaders/vertex-shaders";
import { formatUniforms } from "visual/shaders/shader-functions/uniforms/formatUniforms";
import { formatFragmentShader } from "visual/shaders/shader-functions/formatFragmentShader";
import { WebGLShaderMaterialParams } from "./types";

export const useFormatWebGL = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  materialParams: WebGLShaderMaterialParams
) => {
  const { shaderName, uniformDefinition } = materialParams;
  const { uniforms, uniformText } = formatUniforms(uniformDefinition || []);
  const fragmentShader = formatFragmentShader(shaderName, uniformText);
  const formatUniformsAndGeometry = useCallback(
    (assets: Asset[], unformattedUniforms): { geometry; uniforms; shaders } => {
      const geometry = new PlaneGeometry(2, 2);
      const shaders = {
        fragmentShader,
        vertexShader: defaultVertex,
      };

      formatAssetWithUniforms(unformattedUniforms, assets);
      return { geometry, uniforms: unformattedUniforms, shaders };
    },
    [fragmentShader]
  );
  return formatUniformsAndGeometry(initializedAssets, uniforms);
};

function formatAssetWithUniforms(uniforms, assets: Asset[]) {
  assets.forEach((asset) => {
    uniforms[asset.name].value = asset.data;
    if (uniforms.uChannel0.value) {
      uniforms.uChannel0.value.wrapS = RepeatWrapping;
      uniforms.uChannel0.value.wrapT = RepeatWrapping;
    }
  });
}
