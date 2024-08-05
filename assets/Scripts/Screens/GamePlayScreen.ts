import {
  _decorator,
  Component,
  Node,
  JsonAsset,
  resources,
  Label,
  Button,
  director,
} from "cc";
import { Level } from "../Managers/Level";
import AbstractScreen from "../utils/Screens/AbstractScreen";
import PopUpManager, { PopUpType } from "../Utils/PopUps/PopUpManager";
const { ccclass, property } = _decorator;

@ccclass("GamePlay")
export class GamePlay extends AbstractScreen {
  @property(Label)
  currentLevelLabel: Label = null;

  @property(Label)
  riddleLabel: Label = null;

  @property([Button])
  choiceButtons: Button[] = []; // Buttons for multiple choices

  @property(Label)
  hintLabel: Label = null; // Label to show the hint
  @property(Label)
  wrongMessageLabel: Label = null; // Label to show the wrong message

  currentLevelIndex: number = 0;
  levels: Level[] = [];

  onShow(data: any): void {
    resources.load("levels", JsonAsset, (err, jsonAsset) => {
      if (err) {
        console.error(err);
        return;
      }
      this.levels = jsonAsset.json.map(
        (levelData: any) =>
          new Level(
            levelData.riddle,
            levelData.choices,
            levelData.correctAnswer,
            levelData.hint
          )
      );
      // this.loadLevel(0); // Start with the first level
      this.loadLevel(data.level);
      this.currentLevelLabel.string = `LEVEL ${data.level + 1}`;
    });
  }
  // onLoad() {
  //   // Load levels data from JSON file
  //   resources.load("levels", JsonAsset, (err, jsonAsset) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     this.levels = jsonAsset.json.map(
  //       (levelData: any) =>
  //         new Level(
  //           levelData.riddle,
  //           levelData.choices,
  //           levelData.correctAnswer,
  //           levelData.hint
  //         )
  //     );
  //     this.loadLevel(0); // Start with the first level
  //   });
  // }

  loadLevel(levelIndex: number) {
    if (levelIndex >= this.levels.length) {
      console.log("All levels completed!");
      PopUpManager.PopupManagerRef.show(PopUpType.LevelsCompleted);
      return;
    }

    this.currentLevelIndex = levelIndex;
    const currentLevel = this.levels[this.currentLevelIndex];
    this.riddleLabel.string = currentLevel.riddle;
    this.hintLabel.string = ""; // Clear the hint label initially

    // Display choices
    for (let i = 0; i < this.choiceButtons.length; i++) {
      if (i < currentLevel.choices.length) {
        this.choiceButtons[i].node.active = true;
        this.choiceButtons[i].node
          .getChildByName("Label")
          .getComponent(Label).string = currentLevel.choices[i];
        this.choiceButtons[i].node.off("click"); // Remove previous click event
        this.choiceButtons[i].node.on("click", this.onChoiceSelected, this); // Add new click event
      } else {
        this.choiceButtons[i].node.active = false;
      }
    }
  }

  onChoiceSelected(event) {
    const selectedChoice = event.target
      .getChildByName("Label")
      .getComponent(Label).string;
    const currentLevel = this.levels[this.currentLevelIndex];
    if (currentLevel.isCorrectAnswer(selectedChoice)) {
      console.log("Correct!");
      let data = {
        nextLevel: this.currentLevelIndex + 1,
      };
      PopUpManager.PopupManagerRef.show(PopUpType.Win, data);
      //TODO: Win popup open
      // this.loadLevel(this.currentLevelIndex + 1); // Load next level
    } else {
      console.log("Incorrect!");
      this.wrongMessageLabel.string = "Wrong. Try Again!";
      this.scheduleOnce(() => {
        this.wrongMessageLabel.string = "";
      }, 0.3);
      //TODO: Wrong.Try Again!
      // Show failure message or feedback
    }
  }

  showHint() {
    const currentLevel = this.levels[this.currentLevelIndex];
    this.hintLabel.string = currentLevel.hint; // Display the hint
    this.scheduleOnce(() => {
      this.hintLabel.string = "";
    }, 0.3);
  }
}
