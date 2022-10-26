import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";
import { InteractiveScenes } from "visual/components/interactive-shaders/types";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";

export const threeDGallery = {
  threeJsParams: {
    camera: {
      position: { x: 0, y: 0, z: 100 },
      fov: 50,
      aspect: 1,
      near: 1,
      far: 10080,
    },
    renderer: { rendererType: RendererTypes.CSS },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveShader, details) => {
        material.uniforms.uTouchRef.value.addTouch(details);
        material.uniforms.uTouchRef.value.update();
      },
    },
  ],
  assets: [
    {
      name: "image",
      url: "../assets/textures/zz.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParamType: InteractiveScenes.INTERACTIVE_PARTICLES,
  materialFunctions: {
    onTimeUpdate: (material: InteractiveShader) => {
      if (material.isRunningThread) {
        TweenLite.fromTo(
          material.uniforms.uSize,
          1.0,
          { value: 0.5 },
          { value: 1.5 }
        );
        TweenLite.to(material.uniforms.uRandom, 1.0, {
          value: 2.0,
        });
        TweenLite.fromTo(
          material.uniforms.uDepth,
          1.0 * 1.5,
          { value: 40.0 },
          { value: 4.0 }
        );
        material.isRunningThread = false;
      }
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
