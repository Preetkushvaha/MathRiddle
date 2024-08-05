import {
  _decorator,
  Button,
  Component,
  director,
  instantiate,
  JsonAsset,
  Label,
  Node,
  Prefab,
  resources,
  ScrollView,
} from "cc";
import AbstractScreen from "../utils/Screens/AbstractScreen";
import { Level } from "../Managers/Level";
import ScreenManager, { ScreenEnum } from "../Utils/Screens/ScreenManager";
const { ccclass, property } = _decorator;

@ccclass("LevelController")
export class LevelController extends AbstractScreen {
  @property(ScrollView)
  levelScrollView: ScrollView = null;
  @property(Prefab)
  levelPrefab: Prefab = null;
  levels: Level[] = [];

  onShow(data: any): void {
    resources.load("levels", JsonAsset, (err, jsonAsset) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        this.levels = jsonAsset.json.map(
          (levelData: any) =>
            new Level(
              levelData.riddle,
              levelData.choices,
              levelData.correctAnswer,
              levelData.hint
            )
        );
        this.populateLevelList();
      } catch (error) {
        console.error("Error in creating Levels : ", error);
      }
    });
  }
  onLoad() {}

  populateLevelList(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const content = this.levelScrollView.content;
        this.levels.forEach((level, index) => {
          const levelPre = instantiate(this.levelPrefab);
          levelPre.getComponentInChildren(Label).string = `${index + 1}`;
          console.log("Creating level ", index, levelPre);
          levelPre.on(Node.EventType.TOUCH_END, () => {
            this.onLevelSelected(index);
          });
          content.addChild(levelPre);
        });
        return resolve();
      } catch (error) {
        console.error("Erron in populate levels ", error);
        return reject(error);
      }
    });
  }

  onLevelSelected(levelIndex: number) {
    console.log("on select level : ", levelIndex);
    let data = {
      level: levelIndex,
    };
    ScreenManager.GlobalScreenManager.showScreen(ScreenEnum.GameScreen, data);
    // Store the selected level index in a global state or pass it to the GamePlay scene
    // director.loadScene("GamePlay");
  }
}
