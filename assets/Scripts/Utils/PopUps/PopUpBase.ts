const { ccclass } = _decorator;
import { Component, _decorator } from "cc";
import { GameSFX } from "../../global/Constants";
@ccclass
export default class PopUpBase extends Component {
  data: any = {};
  node: any;

  onShow(data) {
    this.data = data;
    // window.SoundManager.playSound(GameSFX.Open_Pop, false);
  }

  onHide() {
    // window.SoundManager.playSound(GameSFX.Close_Pop, false);
  }

  onButtonClick() {
    // window.SoundManager.playSound(GameSFX.ButtonClick, false);
  }
}
