import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Material,
  Mesh,
  Points,
  Vector3,
} from "three";
import {
  MeshConfig,
  MESH_TYPES,
  MeshAttributeConfig,
} from "visual/set-up/assets/geometry/geometry.types";
import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";
import { CustomMesh } from "../mesh.types";

export const setUpMeshes = (meshConfigs: MeshConfig[] = []) =>
  meshConfigs.flatMap(
    (
      { geometry, name, material, meshType, position, rotation, groupId },
      index
    ) => {
      const mesh = getMesh(geometry, material, meshType);
      if (!mesh) return [];
      formatMesh(mesh, name ?? `mesh-${index}`, position, rotation, groupId);
      return mesh;
    }
  );

// const attributeConfig = [{ type: "POINT_ID" }];

const getMesh = (
  geometry: BufferGeometry,
  material: Material,
  meshType: string = MESH_TYPES.MESH
) => {
  switch (meshType) {
    case MESH_TYPES.NONE: {
      return null;
    }
    case MESH_TYPES.POINTS: {
      return new Points(geometry, material);
    }
    case MESH_TYPES.MESH:
    default:
      // setUpAttributes(geometry, attributeConfig);
      return new Mesh(geometry, material);
  }
};

const formatMesh = (
  mesh: CustomMesh,
  name: string,
  position?: ThreeDPosition,
  rotation?: ThreeDPosition,
  groupId?: string
) => {
  mesh.name = name;
  mesh.groupId = groupId;
  if (position) {
    const { x, y, z } = position;
    mesh.position.set(x, y, z);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    mesh.rotation.set(x, y, z);
  }
};

// function removeXPositionsAndNormals(
//   geometry: THREE.BufferGeometry,
//   n: number
// ): THREE.BufferGeometry {
//   const positionArray = geometry.getAttribute("position").array;
//   // const normalArray = geometry.getAttribute("normal").array;
//   const resultPositionArray: number[] = [];
//   const resultNormalArray: number[] = [];

//   for (let i = 0; i < positionArray.length; i += 3) {
//     if (i % (n * 3) !== 0) {
//       // keep only positions that are not a multiple of n
//       resultPositionArray.push(positionArray[i + 1]); // push y position
//       resultPositionArray.push(positionArray[i + 2]); // push z position
//     }
//   }

//   const resultGeometry = new BufferGeometry();
//   resultGeometry.setAttribute(
//     "position",
//     new Float32BufferAttribute(resultPositionArray, 3)
//   );
//   resultGeometry.computeVertexNormals();
//   resultGeometry.computeBoundingSphere();

//   return resultGeometry;
// }