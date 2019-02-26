module.exports = function solveSudoku(sudokuArr) {
 
  function getCords(arr) {
      var cordArr = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === 0) {
            cordArr.push([i, j]);
          }
        }
      }
      return cordArr;
  }
  




  function getSquare(b, a) {
    var hor = [];
    var vert = [];
    
    switch(b) {
      case 0:
      case 1:
      case 2:
        vert = [0, 1, 2];
        switch(a) {
          case 0:
          case 1:
          case 2:
            hor = [0, 1, 2];
            break;
          case 3:
          case 4:
          case 5:
            hor = [3, 4, 5];
            break;
          case 6:
          case 7:
          case 8:
            hor = [6, 7, 8];
            break;
        }
        break;
      case 3:
      case 4:
      case 5:
        vert = [3, 4, 5];
        switch(a) {
          case 0:
          case 1:
          case 2:
            hor = [0, 1, 2];
            break;
          case 3:
          case 4:
          case 5:
            hor = [3, 4, 5];
            break;
          case 6:
          case 7:
          case 8:
            hor = [6, 7, 8];
            break;
        }
        break;
      case 6:
      case 7:
      case 8:
        vert = [6, 7, 8];
        switch(a) {
          case 0:
          case 1:
          case 2:
            hor = [0, 1, 2];
            break;
          case 3:
          case 4:
          case 5:
            hor = [3, 4, 5];
            break;
          case 6:
          case 7:
          case 8:
            hor = [6, 7, 8];
            break;
        }
        break;
    }
    var square = {a: hor, b: vert};
    return square;
  }
  function squareCollect(arr, b, a) {
    var matchArr = [];
    var square = getSquare(b, a);
    var hor = square.a;
    var vert = square.b;
    
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (arr[vert[i]][hor[j]] !== 0) {
          matchArr.push(arr[vert[i]][hor[j]]);
        }  
      }          
    }
    
    return matchArr;
  }
  function horisontalCollect(arr, b) { 
    var matchArr = [];
    
    for (var i = 0; i < arr[b].length; i++) {
      if(arr[b][i] !== 0) {
        matchArr.push(arr[b][i]);
        
      }
          
    }
    return matchArr; 
  }
  function verticalCollect(arr, a) {
    var matchArr = [];
    
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][a] !== 0) {
        matchArr.push(arr[i][a]);
      }
    }
    
    return matchArr;
  }
  function getTotalResult(arr) {
    var arrTen = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
    for (var i = 0; i < arrTen.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if(arrTen[i] === arr[j]) {
          arrTen.splice(i, 1);
          i--;
        }
      }
    }
    
    return arrTen;
  }

  function checkMatches(array1, array2) {
    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if (array1[i] == array2[j]) {
          array2.splice(j, 1);
          j--;
        }
      }
    }
    var arr = array1.concat(array2);
    return arr;
  }
  function getResultArr(arr1, arr2, arr3) {
        
        
    var arr = checkMatches(arr1, arr2);
    var result = checkMatches(arr, arr3);
    
    return result;
  }

  function availableIntengers(arr, b, a) {
      let hor = horisontalCollect(arr, b);
      let vert = verticalCollect(arr, a);
      let sqr = squareCollect(arr, b, a);
      let getRslt = getResultArr(hor, vert, sqr);
      
      return getTotalResult(getRslt);
  }
     
  function getAvailableArr(arr) {
      let availableArr = [];
      let getCordsArr = getCords(arr);
  
    for (var i = 0; i < getCordsArr.length; i++) {
      availableArr.push(availableIntengers(arr, getCordsArr[i][0], getCordsArr[i][1]));
    }
    return availableArr;
  }
  
  function whetherTrue(arr) {
      let whetherTrue = getAvailableArr(arr).some((elem) => {
        if (elem.length === 1) {
          return true;
        } else {
          return false;
        }
      });
      return whetherTrue;
  }
  
  
  function fillSingle(arr) {
      if (whetherTrue(arr)) {
        
        for (var i = 0; i < getAvailableArr(arr).length; i++) {
          if (getAvailableArr(arr)[i].length == 1) {
            arr[getCords(arr)[i][0]][getCords(arr)[i][1]] = getAvailableArr(arr)[i][0];
          }  
        }
      }
  }
  function fillArraySingle(arr) {
      for (var j = 0; j < getAvailableArr(arr).length; j++) {
        fillSingle(arr);
      }
  }
    
  function wetherSingle(arr) {
      
      if (whetherTrue(arr)) {
        fillArraySingle(arr);
      }
  }
  function qwerty(arr, a, b) {
  
    let newArr1 = arr.map((e) => {
      return e.slice();
    })
    let cords = getCords(newArr1);
  
    newArr1[cords[a][0]][cords[a][1]] = getAvailableArr(newArr1)[a][b];
    
    wetherSingle(newArr1);
    return newArr1;
  }
  
  function wetherEmptySell(arr) {
    let wetherEmptyCell = getAvailableArr(arr).some((elem) => {
      if (elem.length == 0) {
        return true;
      } else {
        return false;
      }
    });
    return wetherEmptyCell;
  }
  function wetherEmpty(arr1, arr3) {
      
    
  
    if (wetherEmptySell(arr1)) {
  
      good:   
      for (;;) {  
        if (arr3[arr3.length - 1].handle === 1) {
          arr3.pop();
          continue good;  
        } else { 
          arr3[arr3.length - 1].handle++; 
          break;
        }
      }
  
    arr1 = arr3[arr3.length - 1].arr.map((e) => {
      return e.slice();
      });
    } else {
      arr3.push({arr: arr1, handle: 0});
    }
  }
  
  fillArraySingle(sudokuArr);

  let newArr = sudokuArr.map((e) => {
    return e.slice();
  });
  
  let backUp = [];
  
  backUp.push({arr: newArr, handle: 0});
  
  
  let newArr1 = [];
  
  
  
  
  for (; getAvailableArr(backUp[backUp.length - 1].arr)[0] !== undefined;) {
    let i = 0;
    
    for (var j = 0; j < getAvailableArr(backUp[backUp.length - 1].arr).length; j++) {
      if (getAvailableArr(backUp[backUp.length - 1].arr)[j].length === 2) {
        i += j;
        break;
      }
    }
    
    newArr1 = qwerty(backUp[backUp.length - 1].arr, i, backUp[backUp.length - 1].handle);
    
    wetherEmpty(newArr1, backUp);
    
    }
  
  
  sudokuArr = newArr1;
  
  
  return sudokuArr;
}