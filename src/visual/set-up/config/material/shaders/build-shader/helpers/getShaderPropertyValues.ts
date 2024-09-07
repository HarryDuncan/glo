import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../constants/buildShader.consts";
import { ShaderPropertyConfig } from "../types";
import { createDeclarationString } from "./createDeclarationString";
import { getDefaultValue } from "./getDefaultValue";

interface CustomProperties {
  [key: string]: { value: unknown } | { value: unknown }[];
}
export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: ShaderPropertyTypes
) => {
  const customProperties: CustomProperties = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType, arrayLength, structProperties }) => {
    if (arrayLength !== undefined) {
      const propertyValues = new Array(arrayLength).fill(
        value ?? getDefaultValue(valueType)
      );
      customProperties[id] = { value: propertyValues };
    } else {
      const propertyValue = value ?? getDefaultValue(valueType);
      if (propertyValue !== undefined && propertyValue !== null) {
        customProperties[id] = { value: propertyValue };
      } else {
        console.warn(`Property value for ${id} ${valueType} is undefined`);
      }
    }

    customStrings.push(
      createDeclarationString(
        propertyType,
        valueType,
        id,
        arrayLength,
        structProperties
      )
    );
  });
  return { customProperties, customStrings };
};
