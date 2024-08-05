// Level.ts
export class Level {
  riddle: string;
  choices: string[];
  correctAnswer: string;
  hint: string;

  constructor(
    riddle: string,
    choices: string[],
    correctAnswer: string,
    hint: string
  ) {
    this.riddle = riddle;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.hint = hint;
  }

  isCorrectAnswer(choice: string): boolean {
    return this.correctAnswer === choice;
  }
}
