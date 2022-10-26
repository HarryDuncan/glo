import {
  BufferAttribute,
  Float32BufferAttribute,
  MathUtils,
  Vector3,
} from "three";
import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";

const ROTATE_STEP = 0.01;

export const surfaceScattering = {
  threeJsParams: {
    camera: {
      ...defaultCameraParams,
      position: { x: 0, y: 8, z: 25 },
    },
  },
  assets: [
    {
      name: "uGeometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: AssetType.Geometry,
    },
  ],

  materialFunctions: {
    onTimeUpdate: (scene: InteractiveScene) => {
      const delta = scene.clock.getDelta();
      scene.sceneParams.deltaOffset += delta;

      const {
        lines,
        deltaOffset,
        sparkles,
        sampler,
        sparklesGeometry,
      } = scene.sceneParams;
      if (deltaOffset > 0.05) {
        scene.sceneParams.deltaOffset = 0;
        lines.forEach((l) => {
          if (sparkles.length < 350000) {
            nextDot(l, sampler, sparkles);
            nextDot(l, sampler, sparkles);
          }
          const tempVertices = new Float32Array(l.coordinates);
          l.geometry.setAttribute(
            "position",
            new BufferAttribute(tempVertices, 3)
          );
          l.geometry.computeBoundingSphere();
        });

        updateSparklesGeometry(sparkles, sparklesGeometry);
        // _prev = a;
      }

      const {
        sceneParams: {
          rotateGeometryTo,
          currentGeometryRotation,
          rotationDirection,
        },
      } = scene;
      if (rotateGeometryTo.y !== Math.abs(currentGeometryRotation.y)) {
        const step = ROTATE_STEP * rotationDirection.y;
        const group = scene.children[0];
        group.rotation.y += step;
        scene.sceneParams.currentGeometryRotation.y = Number(
          (scene.sceneParams.currentGeometryRotation.y + step).toFixed(2)
        );
      }
      if (rotateGeometryTo.x !== Math.abs(currentGeometryRotation.x)) {
        const step = ROTATE_STEP * rotationDirection.x;
        const group = scene.children[0];
        group.rotation.x += step;
        scene.sceneParams.currentGeometryRotation.x = Number(
          (scene.sceneParams.currentGeometryRotation.x + step).toFixed(2)
        );
      }
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (scene: InteractiveScene, details) => {
        if (Math.abs(details.xAsScale - scene.sceneParams.prevX) > 0.05) {
          const yAxisRotation = getRotation(details.xAsScale);

          scene.sceneParams.rotateGeometryTo.y = yAxisRotation;
          scene.sceneParams.rotationDirection.y =
            details.xAsScale < scene.sceneParams.prevX ? -1 : 1;
          scene.sceneParams.prevX = details.xAsScale;
        }

        if (Math.abs(details.yAsScale - scene.sceneParams.prevY) > 0.4) {
          const xAxisRotaton = getRotation(details.yAsScale);

          scene.sceneParams.rotateGeometryTo.x = xAxisRotaton;
          scene.sceneParams.rotationDirection.x =
            details.yAsScale < scene.sceneParams.prevY ? 1 : -1;
          scene.sceneParams.prevY = details.yAsScale;
        }
      },
    },
  ],
};

const getRotation = (scale: number) => {
  const pi = Math.PI;
  return Number(((clamp(scale, 0, 1) * 360 * pi) / 180).toFixed(2));
};
const clamp = (number, min, max) => Math.max(min, Math.min(number, max));

const nextDot = (line, sampler, sparkles) => {
  const p1 = new Vector3();
  let ok = false;
  while (!ok) {
    sampler.sample(p1);
    if (line.previous && p1.distanceTo(line.previous) < 0.3) {
      line.coordinates.push(p1.x, p1.y, p1.z);
      line.previous = p1.clone();

      for (let i = 0; i < 2; i += 1) {
        const spark = new Sparkle();
        spark.setup(p1, line.material.color);
        sparkles.push(spark);
      }
      ok = true;
    } else if (!line.previous) {
      line.previous = p1.clone();
    }
  }
};

const updateSparklesGeometry = (sparkles, sparklesGeometry) => {
  const tempSparklesArraySizes: number[] = [];
  const tempSparklesArrayColors: any[] = [];
  sparkles.forEach((s: Sparkle) => {
    tempSparklesArraySizes.push(s.size);
    tempSparklesArrayColors.push(s.color.r, s.color.g, s.color.b);
  });
  sparklesGeometry.setAttribute(
    "color",
    new Float32BufferAttribute(tempSparklesArrayColors, 3)
  );
  sparklesGeometry.setAttribute(
    "size",
    new Float32BufferAttribute(tempSparklesArraySizes, 1)
  );
};
class Sparkle extends Vector3 {
  v: Vector3;

  size: number;

  slowDown: number;

  color: any;

  constructor() {
    super();
    this.v = new Vector3();
    this.size = 0;
    this.slowDown = 0;
  }

  setup(origin, color) {
    this.x = origin.x;
    this.y = origin.y;
    this.z = origin.z;

    /* X Speed */
    this.v.x = MathUtils.randFloat(0.001, 0.006);
    this.v.x *= Math.random() > 0.5 ? 1 : -1;
    /* Y Speed */
    this.v.y = MathUtils.randFloat(0.001, 0.006);
    this.v.y *= Math.random() > 0.5 ? 1 : -1;
    /* Z Speed */
    this.v.z = MathUtils.randFloat(0.001, 0.006);
    this.v.z *= Math.random() > 0.5 ? 1 : -1;

    this.size = Math.random() * 4 + 0.5 * window.devicePixelRatio;
    this.slowDown = 0.4 + Math.random() * 0.58;
    this.color = color;
  }

  update() {
    if (this.v.x > 0.001 || this.v.y > 0.001 || this.v.z > 0.001) {
      this.add(this.v);
      this.v.multiplyScalar(this.slowDown);
    }
  }
}
