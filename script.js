

function aaa(x, y) {
    let myMatrix = matrixArray(x,y);
    // let myMatrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    drowHtml(myMatrix);

    setTimeout(() => { 
        let newArray = [];
        myMatrix.forEach((el, i) => {
           let result = [];
            el.forEach((cell, j) => {
                let sum = findingNeighbors(myMatrix, i, j).reduce((a, b) => a + b, 0);
                result.push(isLife(sum, myMatrix[i][j]));
            })
            newArray.push(result);
        });
        drowHtml(newArray);
     },1000);
    
}
function drowHtml(myMatrix) {
    let mainElem = document.getElementById('main');
    mainElem.innerHTML = '';
    myMatrix.forEach(el => {
        let row = document.createElement("div");
        row.classList.add('row');
        el.forEach(cell => {
            let newDiv = document.createElement("div");
            cell == 0 ? newDiv.classList.add('black') : newDiv.classList.add('white');
            row.appendChild(newDiv);
        });
        mainElem.appendChild(row);
    })
}
function findingNeighbors(myArray, i, j){
    let newArray = [...myArray];
    return newArray.reduce(function(a, b, c){
        if(Math.max(0, i-1) <= c && c <= Math.min(i+1, newArray.length-1)){
            a = a.concat(
                b.reduce(function(d, e, f){
                if(f == j && c == i)
                    return d;
                if(Math.max(0, j-1) <= f && f <= Math.min(j+1, newArray.length-1))
                    d.push(e)
                return d;
                },[])
            );
        }
        
        return a;
        
    },[]);
}

function isLife(sum, item) {
    if (item == 1) {
        return (sum == 2 || sum == 3 ) ? 1 : 0;
    }
    else  {
        return sum == 3 ? 1 : 0;
    }

}
function matrixArray(rows,columns){
    var arr = new Array();
    for(var i=0; i<rows; i++){
      arr[i] = new Array();
      for(var j=0; j<columns; j++){
        arr[i][j] = Math.random()<0.5?0:1;
      }
    }
    return arr;
}
