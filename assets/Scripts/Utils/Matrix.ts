// import { IMatrixItem } from "../interface/IMatrixItem";

// export class MatrixPos {
//   row: number;
//   column: number;
//   constructor(row?: number, column?: number) {
//     this.row = row;
//     this.column = column;
//   }
// }

// export function matrixPos(row?: number, column?: number): MatrixPos {
//   return { row, column };
// }

// export class MatrixSize {
//   row: number;
//   column: number;
//   constructor(row?: number, column?: number) {
//     this.row = row;
//     this.column = column;
//   }
// }

// export function matrixSize(row?: number, column?: number): MatrixSize {
//   return { row, column };
// }

// export class Matrix<T extends IMatrixItem> {
//   public matrix;
//   private row: number;
//   private column: number;
//   ftue: boolean = false;

//   constructor(mSize: MatrixSize) {
//     this.row = mSize.row;
//     this.column = mSize.column;
//     // console.log("!!!!!!", mSize);
//     this.matrix = new Array<T>(mSize.row * mSize.column);
//   }

//   get(mPos: MatrixPos): T {
//     return this.matrix[mPos.row * this.column + mPos.column];
//   }

//   set(mPos: MatrixPos, value: T) {
//     // console.log(' set ', mPos, " ", (mPos.row * this.column - 1) + mPos.column);
//     this.matrix[mPos.row * this.column + mPos.column] = value;
//     value.setPosInMatrix(mPos);
//   }

//   setByIndex(index: number, value: T) {
//     this.matrix[index] = value;
//   }

//   getBlockValues(size) {
//     let values = [];
//     if (this.ftue) {
//       values = [1, 2, 3, 5, 6, 8, 4, 7, -1];
//       return values;
//     } else {
//       for (let i = 0; i < size - 1; i++) {
//         values.push(i + 1);
//       }
//       values.push(-1);
//       return this.shuffleArray(values);
//     }
//   }

//   shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i + 1));
//       var temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//     }
//     let tempArray = [...array];
//     const index = tempArray.findIndex((ele) => ele === -1);
//     tempArray[index] = 0;
//     if (this.isSolvable(tempArray)) {
//       return array;
//     } else {
//       let tempArray = [...array];
//       const index = tempArray.findIndex((ele) => ele === 0);
//       tempArray[index] = -1;
//       return this.shuffleArray(tempArray);
//     }

//     return array;
//   }
//   isSolvable(puzzle) {
//     let parity = 0;
//     let gridWidth = Math.sqrt(puzzle.length);
//     let row = 0; // the current row we are on
//     let blankRow = 0; // the row with the blank tile

//     for (let i = 0; i < puzzle.length; i++) {
//       if (i % gridWidth == 0) {
//         // advance to next row
//         row++;
//       }
//       if (puzzle[i] == 0) {
//         // the blank tile
//         blankRow = row; // save the row on which encountered
//         continue;
//       }
//       for (let j = i + 1; j < puzzle.length; j++) {
//         if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
//           parity++;
//         }
//       }
//     }

//     if (gridWidth % 2 == 0) {
//       // even grid
//       if (blankRow % 2 == 0) {
//         // blank on odd row; counting from bottom
//         return parity % 2 == 0;
//       } else {
//         // blank on even row; counting from bottom
//         return parity % 2 != 0;
//       }
//     } else {
//       // odd grid
//       return parity % 2 == 0;
//     }
//   }
// }
