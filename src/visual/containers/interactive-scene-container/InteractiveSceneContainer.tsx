import React, { useCallback, useEffect, useMemo } from "react";
import { useSetUpScene } from "visual/hooks/scene-data/useSetUpScene";
import { RootContainer } from "../root/root-container";
import { Asset } from "visual/hooks/use-assets/types";
import { useInteractiveScene } from "visual/hooks/use-interactive-scene/useInteractiveScene";
import { SceneData } from "visual/components/interactive/scene/types";
import { useMeshes } from "visual/scene-elements/useMeshes";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { EMPTY_SCENE_DATA } from "consts";
import { defaultFormatWithContext } from "scenes/default-configs/defaultFormatSceneData";
import { useLights } from "visual/scene-elements/lights/useLights";
import { setSceneProperties } from "visual/helpers/scene/setSceneProperties";
import { useEvents } from "visual/hooks/use-events/useEvents";
import { InteractiveSceneProps } from "./interactiveSceneContainer.types";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { useThreadWithPostProcessor } from "visual/hooks/use-thread";

export const InteractiveSceneContainer = ({
  threeJsParams,
  interactions,
  assets,
  sceneFunctions,
  visualComponentConfig,
  formatSceneData = defaultFormatWithContext,
  animations = [],
  events,
}: InteractiveSceneProps) => {
  const {
    areAssetsInitialized,
    initializedAssets,
    currentFrameRef,
    clock,
    postProcessor,
    renderer,
    camera,
    container,
    orbitControls,
  } = useSetUpScene(threeJsParams, assets);

  const sceneData = useSceneData(
    initializedAssets,
    areAssetsInitialized,
    formatSceneData
  );

  const initializedMeshes = useMeshes(sceneData?.meshConfigs, interactions);
  const lights = useLights(sceneData.lights);
  const scene = useInteractiveScene(
    interactions,
    sceneFunctions,
    {},
    sceneData?.sceneObjects ?? [],
    sceneData?.isSceneDataInitialized ?? false
  );
  useEvents(scene, events);

  const { update, pause } = useThreadWithPostProcessor(
    postProcessor,
    currentFrameRef,
    clock,
    scene,
    camera
  );

  useEffect(() => () => pause(), [pause]);

  const initializeSceneWithData = useCallback(() => {
    if (scene) {
      initializedMeshes.forEach((mesh) => scene.add(mesh));
      lights.forEach((light) => scene.add(light));
      setSceneProperties(sceneData.sceneProperties, scene);
      sceneData?.sceneComponents?.forEach((component) => scene.add(component));
      scene.addAnimations(animations);
      scene.addOrbitControls(orbitControls);
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [],
      });
      update();
    }
  }, [scene, initializedMeshes, update, postProcessor, renderer, camera]);

  useEffect(() => {
    initializeSceneWithData();
  }, [initializeSceneWithData]);

  return (
    <RootContainer containerRef={container} config={visualComponentConfig} />
  );
};

const useSceneData = (
  initializedAssets: Asset[],
  areAssetsInitialized: boolean,
  formatSceneData: (assets: Asset[], context, dispatch) => SceneData
): SceneData => {
  const sceneDataContext = useAppSelector((state) => state.sceneData);
  const dispatch = useAppDispatch();
  return useMemo(() => {
    if (!areAssetsInitialized) return EMPTY_SCENE_DATA;
    const sceneData = formatSceneData(
      initializedAssets,
      sceneDataContext,
      dispatch
    );
    return sceneData;
  }, [areAssetsInitialized]);
};
