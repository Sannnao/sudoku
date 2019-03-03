module.exports = function solveSudoku(sudokuArr) {
   
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
      return false;
  }

  function horisontalCollect(mainArr, cordY) { 
    const matchArr = [];

    mainArr.forEach((e, i) => {
      if(mainArr[cordY][i] !== 0) {
        matchArr.push(mainArr[cordY][i]);
      }
    });

    return matchArr;
  }
  
  function verticalCollect(mainArr, cordX, horColl) {
    const newArr = [];
    
    mainArr.forEach((e, i) => {
      if (mainArr[i][cordX] !== 0) {
        newArr.push(mainArr[i][cordX]);  
      }
    });

    return horColl.concat(newArr.filter((e) => horColl.indexOf(e) === -1));
  }

  
  function squareCollect(mainArr, cordY, cordX, vertColl) {
    const localArr = [];

    let row = Math.floor(cordY / 3) * 3;
    let col = Math.floor(cordX / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mainArr[row + i][col + j] !== 0) {
          localArr.push(mainArr[row + i][col + j]);
        }  
      }          
    }
    
    return vertColl.concat(localArr.filter((e) => vertColl.indexOf(e) === -1));
  }
  
  function getTotalResult(sqrColl) {
    const arrTen = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
    for (let i = 0; i < arrTen.length; i++) {
      for (let j = 0; j < sqrColl.length; j++) {
        if(arrTen[i] === sqrColl[j]) {
          arrTen.splice(i, 1);
          i--;
        }
      }
    }
    
    return arrTen;
  }
  
  function availableIntengers(mainArr, cordY, cordX) {
    
    let horColl = horisontalCollect(mainArr, cordY);
    let vertColl = verticalCollect(mainArr, cordX, horColl);
    let sqrColl = squareCollect(mainArr, cordY, cordX, vertColl);
    
      
      return getTotalResult(sqrColl);
  }
  
  function getAvailableArr(mainArr) {
      let availableArr = [];
      let getCordsArr = getCords(mainArr);
  
        availableArr.push(availableIntengers(mainArr, getCordsArr[0], getCordsArr[1]));
    
    return availableArr;
  }
  
  function fillFinal(mainArr, currentAvVar) {
  
    const newArr1 = mainArr.map((e, i, arr) => {
      return [...arr[i]];
    });
    const cordY = getCords(mainArr)[0];
    const cordX = getCords(mainArr)[1];
  
    newArr1[cordY][cordX] = currentAvVar.shift();
    
    
    return newArr1;
  }
  
  function wetherEmptyCell(mainArr) {

  
    return getAvailableArr(mainArr).some((elem) => {
      return (elem.length == 0) ? true : false;
    });
  

  }

  function wetherEmpty(mainArr, backUpArr) {
    
    if (wetherEmptyCell(mainArr)) {


      good:
      for (;;) {  
        if (backUpArr[backUpArr.length - 1].arrVar.length === 0) {
          backUpArr.pop();
          continue good;
        } else {
          break;
        }
      }

      mainArr = backUpArr[backUpArr.length - 1].arr.map((e, i, arr) => {
        return [...arr[i]];
      });
    } else {
      backUpArr.push({arr: mainArr, arrVar: []});
      for (var i = 0; i < getAvailableArr(mainArr)[0].length; i++) {
        backUpArr[backUpArr.length - 1].arrVar.push(getAvailableArr(mainArr)[0][i]);
      }
    }
  }
  
  let newArr = sudokuArr.map((e, i, arr) => {
    return [...arr[i]];
  });
  
  const backUp = [];
  
  
  backUp.push({arr: newArr, arrVar: []});
  

  for (var i = 0; i < getAvailableArr(newArr)[0].length; i++) {
    backUp[0].arrVar.push(getAvailableArr(newArr)[0][i]);
  }

  
  let newArr1 = [];
  
  
  do {

    newArr1 = fillFinal(backUp[backUp.length - 1].arr, backUp[backUp.length - 1].arrVar);

    if (getCords(newArr1) !== false) {
      wetherEmpty(newArr1, backUp);
    }

  } while (getCords(newArr1))
  
  
  return newArr1;
}