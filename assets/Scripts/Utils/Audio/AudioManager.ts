import {
  _decorator,
  Component,
  Node,
  AudioClip,
  AudioSourceComponent,
} from "cc";
export enum SOUND {
  ButtonSound = 0,
  CatchPoint = 1,
  KS_Hit = 2,
  DogSelection = 3,
}
// declare global {
//   interface Window {
//     AudioManager: AudioManager;
//   }
// }
const { ccclass, property } = _decorator;
var root = window;
@ccclass("AudioManager")
export class AudioManager extends Component {
  @property({ type: AudioClip })
  audiofiles = [];

  @property({ type: AudioSourceComponent })
  audioSource: AudioSourceComponent = null;

  @property({ type: AudioSourceComponent })
  musicSource: AudioSourceComponent = null;

  private _disableAudio = false;
  private _disableMusic = false;

  onLoad() {}

  playAudio(id, loop = false) {
    if (this._disableAudio) return;
    // console.log("Play audio ", id);
    this.audioSource.clip = this.audiofiles[id];
    this.audioSource.loop = loop;
    this.audioSource.play();
  }

  stopAudio() {
    if (this._disableAudio) return;
    this.audioSource.stop();
  }

  isMuted(): boolean {
    return this._disableMusic;
  }

  disableAudio(mute) {
    this._disableAudio = mute;
  }

  getAudioStatus() {
    return this._disableAudio;
  }

  disableMusic(mute) {
    this._disableMusic = mute;
  }

  playMusic() {
    if (this._disableMusic) return;
    this.musicSource.play();
  }

  pauseMusic() {
    this._disableMusic = !this._disableMusic;
    if (this._disableMusic) this.musicSource.pause();
    else this.musicSource.stop();
  }

  playOnScore() {
    if (this._disableAudio) return;
    this.audioSource.play();
  }

  //   playOnBlockBreak() {
  //     if (this._disableAudio) return;
  //     for (let i = 0; i < this.extraSource.length; i++) {
  //       if (!this.extraSource[i].playing) {
  //         this.extraSource[i].play();
  //       }
  //     }
  //   }
}
