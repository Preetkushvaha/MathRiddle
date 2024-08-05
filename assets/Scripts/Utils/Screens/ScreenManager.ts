import { Component, Enum, _decorator } from "cc";
import AbstractScreen from "./AbstractScreen";

export enum ScreenEnum {
  MainMenuScreen = 0,
  LevelScreen = 1,
  GameScreen = 2,
  StartScreen = 3,
  NONE = 100,
}

export enum ScreenState {
  SHOWN = 0,
  HIDDEN = 1,
  NONE = 2,
}

// declare global {
//   interface Window {
//     // ScreenManager: ScreenManager;
//     // ScreenEnum: typeof ScreenEnum;
//     // Utils: any;
//   }
// }
// window.ScreenManager = this;
// window.ScreenEnum = ScreenEnum;

const { ccclass, property } = _decorator;

@ccclass
export default class ScreenManager extends Component {
  @property(AbstractScreen)
  public screens: AbstractScreen[] = [];

  @property({ type: Enum(ScreenEnum) })
  public currentScreen: ScreenEnum = ScreenEnum.MainMenuScreen;

  @property({ type: Enum(ScreenState) })
  public screenState: ScreenState = ScreenState.NONE;
  static GlobalScreenManager: ScreenManager = null;

  onLoad() {
    ScreenManager.GlobalScreenManager = this;
    // this.currentScreen = ScreenEnum.StartScreen;
    //this.registerCloseBtn();
  }

  showScreen(screen, optionalData = {}, callBack = null) {
    this.enableNewScreen(screen, optionalData, callBack);
  }

  private enableNewScreen(screen, optionalData, callBack) {
    // window.Analytics.viewEvent(ScreenEnum[screen] , ScreenEnum[this.currentScreen]);
    if (this.currentScreen !== ScreenEnum.NONE) {
      this.hideCurrentScreen(screen, optionalData, callBack);
    } else {
      this.showNextScreen(screen, optionalData, callBack);
    }
  }

  private showNextScreen(screen, optionalData, callBack) {
    // console.log("screen: ", screen);
    // console.log("this.screens: ", this.screens);

    this.screens[screen].node.active = true;
    this.currentScreen = screen;
    // var anim = this.screens[screen].getComponent('AnimBase');
    // if (anim === null) {
    this.screens[screen].onShow(optionalData);
    if (callBack) callBack();
    this.screenState = ScreenState.SHOWN;
    return;
    // }
    // var inst = this;
    // anim.play("showScreen", function () {
    //     inst.screens[screen].onShow(optionalData);
    //     if (callBack !== null)
    //         callBack();
    // });
    // this.screenState = ScreenState.SHOWN;
  }

  hideCurrentScreen(nextScreen, nextOptionalData, nextCallBack) {
    //var anim = this.screens[this.currentScreen].getComponent('AnimBase');
    var inst = this;
    //if (anim === null) {
    // inst.screens[inst.currentScreen].onHide();
    if (inst.screens[inst.currentScreen])
      inst.screens[inst.currentScreen].node.active = false;
    inst.screenState = ScreenState.HIDDEN;
    inst.currentScreen = ScreenEnum.NONE;

    if (nextScreen !== null && nextScreen !== "undefined") {
      inst.showNextScreen(nextScreen, nextOptionalData, nextCallBack);
    }
    return;
  }
}
