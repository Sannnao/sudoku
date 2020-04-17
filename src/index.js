function solveSudoku(sudokuArr) {
  function getCords(mainArr) {
    const cordArr = [];

    for (let i = 0; i < mainArr.length; i++) {
      for (let j = 0; j < mainArr[i].length; j++) {
        if (mainArr[i][j] === 0) {
          cordArr.push(i, j);
          return cordArr;
        }
      }
    }

    return cordArr;
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
      if (
        !horColl.includes(i) &&
        !vertColl.includes(i) &&
        !sqrColl.includes(i)
      ) {
        result.push(i);
      }
    }

    return result;
  }

  function availableIntengers(mainArr, cordY, cordX) {
    const horColl = horisontalCollect(mainArr, cordY);
    const vertColl = verticalCollect(mainArr, cordX);
    const sqrColl = squareCollect(mainArr, cordY, cordX);

    const result = getTotalResult(horColl, vertColl, sqrColl);

    return result;
  }

  const stack = [];

  const [cordY, cordX] = getCords(sudokuArr);
  stack.push({
    newArr: sudokuArr,
    availableNums: availableIntengers(sudokuArr, cordY, cordX),
    cordY,
    cordX,
  });

  restart: while (true) {
    const { newArr, availableNums, cordY, cordX } = stack[stack.length - 1];
    if (!availableNums.length) {
      stack.pop();
      continue restart;
    }

    const copyArr = newArr.map((row) => [...row]);

    copyArr[cordY][cordX] = availableNums.shift();

    const [newCordY, newCordX] = getCords(copyArr);

    if (newCordY === undefined && newCordX === undefined) {
      return copyArr;
    }

    const newAvailableNums = availableIntengers(copyArr, newCordY, newCordX);

    stack.push({
      newArr: copyArr,
      availableNums: newAvailableNums,
      cordY: newCordY,
      cordX: newCordX,
    });
  }
}

module.exports = solveSudoku;
