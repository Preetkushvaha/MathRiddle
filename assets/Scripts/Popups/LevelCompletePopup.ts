import { _decorator, Component, Node } from "cc";
import PopUpBase from "../Utils/PopUps/PopUpBase";
import ScreenManager, { ScreenEnum } from "../Utils/Screens/ScreenManager";
import { Level } from "../Managers/Level";
import PopUpManager from "../Utils/PopUps/PopUpManager";
const { ccclass, property } = _decorator;

@ccclass("LevelCompletePopup")
export class LevelCompletePopup extends PopUpBase {
  nextLevel: number = 0;
  onShow(data: any): void {
    // console.log("Next level is : ", data.nextLevel);
    // this.nextLevel = data.nextLevel;
  }

  onHomeBtnClicked() {
    //TODO: MainMenu screen

    ScreenManager.GlobalScreenManager.showScreen(
      ScreenEnum.MainMenuScreen,
      null,
      this.onHide
    );
  }
  onHide(): void {
    PopUpManager.PopupManagerRef.hideCurrentPopUp();
  }
}
