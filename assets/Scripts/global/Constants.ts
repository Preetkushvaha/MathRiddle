import { assetManager, ImageAsset, Sprite, SpriteFrame, Texture2D } from "cc";
import { EventEmitter } from "../utils/EventEmitter";

export const BLOCK_SPACE = 15;
export const BLOCK_MATCH_DISTANCE = 20;
export const BLOCK_MOVE_TIME = 0.15;
// export const BLOCK_LEVEL=

export const blockEventEmitter = new EventEmitter();

export const GAME_EVENT = {
  onMove: "onMove",
  level: "level",
  ftue: "ftue",
  // bestScore: "bestScore",
};
export enum APINAME {
  LEADERBOARD,
  USER_ENTRY,
  SET_SCORE,
  SET_PROFILE,
}
export const FB_LEADERBOARD_NAMES = ["3", "5", "7", "9"];
export const ADS_LAUNCH_POINT = {
  HOMEPAGE: "homepage",
  GAME_OVER: "game_over",
  GAME_SCREEN: "game_scene",
  PAUSE_SCREEN: "pause_popup",
};
export enum PayloadType {
  ATTRIBUTION = "attribution",
}
export interface AttributionData {
  phylum: string;
  kingdom: string;
  class: string;
}
export interface SocialPayload {
  type: PayloadType;
  payload?: AttributionData;
}
export const ADS_TYPE = {
  BANNER: "banner",
  INTERSTITIAL: "interstitial",
  REWARDED: "reward",
};

export interface AttributionData {
  phylum: string;
  kingdom: string;
  class: string;
}
export interface SocialPayload {
  type: PayloadType;
  payload?: AttributionData;
}
export const GameSFX = {
  ButtonClick: 0,
  Game_Win: 1,
  Game_BestWin: 2,
  Open_Pop: 3,
  Close_Pop: 4,
  Slide_Puzzle: 5,
  none: 100,
};
export class USER {
  static data: any;
  constructor() {
    this.event = new EventEmitter();
    // this.event.setMaxListeners(100);
    this.profileEvent = new EventEmitter();
  }

  private _data: IUSER = {
    name: "Guest",
    fbid: "",
    coins: 1000,
    level: 1,
    isIAPSupported: false,
    canCollectDailyHint: false,
    currentCategory: "",
    picImg: null,
    isFirstTime: true,
    connectedFriends: [],
    numOption: 0,
    inGame: false,
    invitemsg: {
      en: "Lets train your brain with me",
      zh: "",
    },
    adsRetriveAttempt: {
      reward: 3,
      interstitial: 3,
      banner: 3,
    },
    receivemsg: {
      en: "",
      zh: "",
    },
  };

  public get data(): IUSER {
    return this._data;
  }

  public event: EventEmitter;
  public profileEvent: EventEmitter;

  public set(input: any): void {
    const keys: string[] = Object.keys(input);
    keys.forEach(
      function (key) {
        if (this.data.hasOwnProperty(key)) {
          this.data[key] = input[key];
        }
      }.bind(this)
    );
    console.log("USER DATA ", this.data);
    // this.profileEvent.emit(GAME_EVENTS.ONPROFILEUPDATE, keys);
  }
}

export interface IUSER {
  name: string;
  fbid: string;
  coins: number;
  level: number;
  isIAPSupported: boolean;
  canCollectDailyHint: boolean;
  currentCategory: string;
  isFirstTime: boolean;
  // fbData: FBData;
  picImg: SpriteFrame;
  numOption: number;
  inGame: boolean;
  connectedFriends: any;
  invitemsg: {
    en: string;
    zh: string;
  };
  receivemsg: {
    en: string;
    zh: string;
  };
  adsRetriveAttempt: {
    reward: number;
    interstitial: number;
    banner: number;
  };
}
export function loadImage(sprite, imgUrl) {
  // console.log("image url::", imgUrl);
  if (!imgUrl) {
    return;
  }
  assetManager.loadRemote<ImageAsset>(
    imgUrl,
    function (err: any, imageAsset: ImageAsset) {
      if (err) {
        console.log("eror in loading image", err);
        return;
      }
      const texture = new Texture2D();
      const spriteFrame = new SpriteFrame();
      texture.image = imageAsset;
      spriteFrame.texture = texture;
      sprite.spriteFrame = spriteFrame;
    }
  );
}
export function getStrTime(iTime) {
  let iM = Math.floor(iTime / 60);
  let iS = iTime % 60;
  let str = "";
  if (iM < 10) str += "0";
  str += iM.toString() + ":";
  if (iS < 10) str += "0";
  str += iS.toString();
  return str;
}
// export function loadImage(url: string): Promise<any> {
//   return new Promise((resolve: any, reject: any) => {
//     console.log("loadImage ", url);
//     if (!url || url === "") return resolve(null); //spriteFrame will be free
//     assetManager.loadRemote(url, (err: any, tex: Texture2D) => {
//       if (err) return resolve(null);
//       // console.log("coming: ", tex);
//       // const sprite = new Sprite();
//       // console.log("sprite 1: ", sprite);
//       // sprite.spriteFrame.texture = tex;
//       // console.log("sprite 2: ", sprite);
//       // console.log("tex: ", tex);
//       return resolve(tex);
//     });
//   });
// }
