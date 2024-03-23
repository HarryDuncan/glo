import { shaderSafeFloat } from "visual/utils/conversion/shaderConversions";
import { ExpandEffectProps } from "../../../../buildShader.types";

export const expandTransformation = (
  transformPointName: string,
  pointName: string,
  expandParameters: ExpandEffectProps
) => {
  const { effectStrength, declareInTransform } = expandParameters;
  const vertexPointInstantiation = `vec3 ${pointName} = ${transformPointName}.xyz;`;
  const transformation = `
        // EXPAND VERTEX POSITIONS
        ${declareInTransform ? vertexPointInstantiation : ""}
        vec3 direction = normalize(uCenter - ${pointName}.xyz);
        ${pointName}.xyz -= direction * ${shaderSafeFloat(
    effectStrength
  )} * uStrength;
      `;
  return { vertexPointInstantiation, transformation };
};