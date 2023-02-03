const pause = document.getElementById("pause");
const play = document.getElementById("play");
const cheatBtn = document.getElementById("cheatBtn");
const puzzleDataInput = document.getElementById("puzzleData");
const inputSpeed = document.getElementById("speed");
const resolveNowBtn = document.getElementById("resolve_now");

renderSudoku(new Array(9).fill(new Array(9).fill(null)));

function renderSudoku(sudokuArr) {
  const container = document.querySelector(".sudoku_container");
  container.innerHTML = "";

  sudokuArr.forEach((rowData) => {
    const row = document.createElement("div");
    row.classList.add("row");

    rowData.forEach((cellData) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (cellData) {
        cell.innerText = cellData;
      }

      row.appendChild(cell);
    });

    container.appendChild(row);
  });
}

function findEmptyCellCords(mainArr) {
  const cordArr = [];

  for (let i = 0; i < mainArr.length; i++) {
    for (let j = 0; j < mainArr[i].length; j++) {
      if (mainArr[i][j] === 0) {
        cordArr.push(i, j);
        return cordArr;
      }
    }
  }

  return null;
}

function horisontalCollect(mainArr, cordY) {
  const matchArr = [];

  mainArr.forEach((e, i) => {
    if (mainArr[cordY][i] !== 0) {
      matchArr.push(mainArr[cordY][i]);
    }
  });

  return matchArr;
}

function verticalCollect(mainArr, cordX) {
  const matchArr = [];

  mainArr.forEach((e, i) => {
    if (mainArr[i][cordX] !== 0) {
      matchArr.push(mainArr[i][cordX]);
    }
  });

  return matchArr;
}

function squareCollect(mainArr, cordY, cordX) {
  const matchArr = [];

  const row = Math.floor(cordY / 3) * 3;
  const col = Math.floor(cordX / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mainArr[row + i][col + j] !== 0) {
        matchArr.push(mainArr[row + i][col + j]);
      }
    }
  }

  return matchArr;
}

function getTotalResult(horColl, vertColl, sqrColl) {
  const result = [];

  for (let i = 1; i <= 9; i++) {
    if (!horColl.includes(i) && !vertColl.includes(i) && !sqrColl.includes(i)) {
      result.push(i);
    }
  }

  return result;
}

function getAvailableNums(mainArr, cordY, cordX) {
  const horColl = horisontalCollect(mainArr, cordY);
  const vertColl = verticalCollect(mainArr, cordX);
  const sqrColl = squareCollect(mainArr, cordY, cordX);

  const result = getTotalResult(horColl, vertColl, sqrColl);

  if (result.length) {
    return result;
  } else {
    return null;
  }
}

function copySudokuArr(sudokuArr) {
  return sudokuArr.map((row) => [...row]);
}

function getSudokuState(sudokuArr) {
  const emptyCellCords = findEmptyCellCords(sudokuArr);

  if (emptyCellCords) {
    const [cordY, cordX] = emptyCellCords;
    const availableNums = getAvailableNums(sudokuArr, cordY, cordX);

    return {
      sudokuState: sudokuArr,
      availableNums,
    };
  }
}

let currentSpeed = +inputSpeed.value;

function solveSudoku(sudokuArr) {
  renderSudoku(sudokuArr);
  const stack = [];

  let emptyCellCordsState = findEmptyCellCords(sudokuArr);
  let currentSudokuState = copySudokuArr(sudokuArr);
  let availableNumsState = null;

  function fillCell() {
    const [cordY, cordX] = emptyCellCordsState;
    const availableNums = availableNumsState
      ? availableNumsState
      : getAvailableNums(currentSudokuState, cordY, cordX);

    if (availableNumsState) {
      availableNumsState = null;
    }

    if (availableNums) {
      const lastNum = availableNums.pop();

      stack.push({
        sudokuState: currentSudokuState,
        availableNums: availableNums,
      });

      const newSudokuState = copySudokuArr(currentSudokuState);
      newSudokuState[cordY][cordX] = lastNum;

      currentSudokuState = newSudokuState;
      const newEmptyCellCords = findEmptyCellCords(newSudokuState);
      emptyCellCordsState = newEmptyCellCords;

      renderSudoku(newSudokuState);
    } else {
      const { sudokuState, availableNums } = stack.pop();

      if (availableNums.length) {
        currentSudokuState = sudokuState;

        renderSudoku(sudokuState);
        availableNumsState = availableNums;
        const newEmptyCellCords = findEmptyCellCords(sudokuState);
        emptyCellCordsState = newEmptyCellCords;
      } else {
        renderSudoku(sudokuState);
      }
    }
  }

  let interval;

  const setResolvingInterval = (speed) => {
    return setInterval(() => {
      if (emptyCellCordsState) {
        fillCell();
      } else {
        clearInterval(interval);
      }
    }, speed);
  };

  pause.addEventListener("click", () => {
    clearInterval(interval);
  });

  play.addEventListener("click", () => {
    interval = setResolvingInterval(speed);
  });

  inputSpeed.addEventListener("input", (e) => {
    const speed = +e.target.value;
    currentSpeed = speed;
    clearInterval(interval);

    interval = setResolvingInterval(speed);
  });

  interval = setResolvingInterval(currentSpeed);

  resolveNowBtn.addEventListener("click", () => {
    clearInterval(interval);

    while (emptyCellCordsState) {
      fillCell();
    }
  });
}

cheatBtn.addEventListener("click", () => {
  const inputValue = puzzleDataInput.value;
  const SUDOKU_CELLS_AMOUNT = 81;
  const isFullData = inputValue.length === SUDOKU_CELLS_AMOUNT;

  if (!isFullData) {
    alert("The data is not full! Should be 81 diggits");
  } else {
    const numbersArray = inputValue.split("");
    const matrix = [];
    let tempArray = [];

    for (let i = 0; i < numbersArray.length; i++) {
      if ((i + 1) % 9 === 0) {
        tempArray.push(+numbersArray[i]);
        matrix.push(tempArray);
        tempArray = [];
      } else {
        tempArray.push(+numbersArray[i]);
      }
    }

    solveSudoku(matrix);
  }
});
