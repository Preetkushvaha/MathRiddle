import { _decorator, Component, Node } from "cc";
import PopUpBase from "../Utils/PopUps/PopUpBase";
import ScreenManager, { ScreenEnum } from "../Utils/Screens/ScreenManager";
import { Level } from "../Managers/Level";
import PopUpManager from "../Utils/PopUps/PopUpManager";
const { ccclass, property } = _decorator;

@ccclass("WinPopup")
export class WinPopup extends PopUpBase {
  nextLevel: number = 0;
  onShow(data: any): void {
    this.nextLevel = data.nextLevel;
    console.log("Next level is : ", data.nextLevel);
  }

  onNextBtnClicked() {
    //TODO: Start Next level
    let data = {
      level: this.nextLevel,
    };
    ScreenManager.GlobalScreenManager.showScreen(
      ScreenEnum.GameScreen,
      data,
      this.onHide
    );
    // this.loadLevel(this.currentLevelIndex + 1);
  }
  onHide(): void {
    PopUpManager.PopupManagerRef.hideCurrentPopUp();
  }
  start() {}

  update(deltaTime: number) {}
}
