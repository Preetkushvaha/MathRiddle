import { _decorator, Component, Node } from "cc";
import ScreenManager, { ScreenEnum } from "../Utils/Screens/ScreenManager";
import AbstractScreen from "../utils/Screens/AbstractScreen";
const { ccclass, property } = _decorator;

@ccclass("MainMenuScreen")
export class MainMenuScreen extends AbstractScreen {
  start() {}

  playBtnClicked() {
    console.log("Play button clicked");
    let data = {
      level: 0,
    };
    ScreenManager.GlobalScreenManager.showScreen(ScreenEnum.GameScreen, data);
  }
  levelBtnClicked() {
    console.log("Level button clicked");
    ScreenManager.GlobalScreenManager.showScreen(ScreenEnum.LevelScreen, {});
  }
  update(deltaTime: number) {}
}
