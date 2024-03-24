import { PointsEffectProps } from "../../../buildShader.types";
import {
  DEFAULT_POINT_EFFECT_CONFIG,
  POINTS_ATTRIBUTES,
  POINTS_FUNCTIONS,
  POINTS_UNIFORMS,
  POINTS_VARYINGS,
} from "./points.consts";
import { formatVertexParameters } from "../../../helpers/formatDefaultVertexParameters";
import { VertexEffectData } from "../../vertexEffects.types";
import { pointsTransform } from "./pointsTransform";

export const pointsVertex = (
  previousPointName: string,
  effectProps: Partial<PointsEffectProps> = {}
): VertexEffectData => {
  const formattedEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_POINT_EFFECT_CONFIG
  ) as PointsEffectProps;
  const uniformConfig = POINTS_UNIFORMS;
  const requiredFunctions = POINTS_FUNCTIONS;
  const varyingConfig = POINTS_VARYINGS;
  const attributeConfigs = POINTS_ATTRIBUTES;
  const transformation = pointsTransform(
    previousPointName,
    formattedEffectProps
  );

  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfigs,
    pointName: previousPointName,
  };
};
