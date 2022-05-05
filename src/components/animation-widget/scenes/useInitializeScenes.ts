import { IAnimationWidgetScene, TWidgetVisual } from "../interfaces";
import * as Scenes from "../../../@visual/scenes/widget-scenes";
import { IFramework } from "../framework/types";
import { useEffect, useMemo } from "react";

export const useInitializeScenes = (
  scenes: IAnimationWidgetScene[],
  framework: Partial<IFramework>,
  isRunning: boolean
) => {
  return new Promise((resolve: (value: TWidgetVisual[]) => void, reject) => {
    if (!framework.widgetState || isRunning) {
      reject();
    }
    const { isInitialized } = framework;
    const initializedScenes: TWidgetVisual[] = [];
    let errorCount = 0;
    scenes.forEach((sceneItem) => {
      const newScene: TWidgetVisual = Scenes[sceneItem.name];
      newScene
        .init(sceneItem, framework)
        .then((response) => {
          const { scene, camera, sceneParams } = response;
          newScene.camera = camera;
          newScene.scene = scene;
          newScene.sceneParams = sceneParams;
          initializedScenes.push(newScene);
          if (errorCount + initializedScenes.length === scenes.length) {
            resolve(initializedScenes);
          }
        })
        .catch((error) => {
          console.error(error);
          errorCount++;
        });
    });
  });
};
