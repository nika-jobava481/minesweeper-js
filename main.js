const boardArr = Array(16).fill(0).map(() => Array(30).fill(0))
const boardElem = document.getElementById("board");
const explodedIcon = '💥';
const bombsPositions = []

function addBombs() {
    for (let i = 0; i < 99; i++) {
        setBomb()
    }
}

function setBomb() {
    var rowIndex = Math.round(Math.random() * 15)
    var cellIndex = Math.round(Math.random() * 29)
    if (boardArr[rowIndex][cellIndex] == 0) {
        bombsPositions.push([rowIndex, cellIndex])
        boardArr[rowIndex][cellIndex] = explodedIcon;
        return;
    }
    setBomb()
}

function getSurroundingCells(x, y) {
    const surroundings = [];

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < 30 && j >= 0 && j < 16) {
                surroundings.push([i, j]);
            }
        }
    }




    return surroundings;
}

function showSurroundings(surroundings, un = false) {
    // const color = un ? '#F0F0F0' : 'antiquewhite'

    // for (let cell of surroundings) {
    //     document.querySelector(`button[data-x="${cell[0]}"][data-y="${cell[1]}"]`).style.backgroundColor = color;
    // }

}

function checkIfNum(inp) {
    return !isNaN(parseFloat(inp)) && isFinite(inp);
}


function drawBoard() {
    for (let i = 0; i < boardArr.length; i++) {
        let line = boardArr[i];
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < line.length; j++) {
            let cell = line[j];
            let c = document.createElement('button');
            c.classList.add('cell');
            c.dataset.x = j;
            c.dataset.y = i;

            c.addEventListener('click', clickEvent);
            c.addEventListener('mouseover', hoverEvent);
            c.addEventListener('mouseout', unhoverEvent);

            c.textContent = cell;
            row.appendChild(c);
        }

        boardElem.appendChild(row);
    }
}

function clickEvent() {
    const X = Number(this.dataset.x)
    const Y = Number(this.dataset.y)
    console.log(`Clicked cell at position (${this.dataset.x}, ${this.dataset.y}) with content: ${this.textContent}`);
    // console.log(this)
    console.log(getSurroundingCells(X, Y))
}

function setNumbers(){

    let surroundings = []

    for(let bomb of bombsPositions){
        surroundings.push(getSurroundingCells(bomb[1],bomb[0]))
    }

    surroundings = surroundings.flat()



    for(let cell of surroundings){
        const current = document.querySelector(`button[data-x="${cell[0]}"][data-y="${cell[1]}"]`)
        if(checkIfNum(current.textContent)){
            current.textContent = Number(current.textContent)+1;
            current.style.backgroundColor = 'red'
        }
    }
}

function hoverEvent() {
    const X = Number(this.dataset.x)
    const Y = Number(this.dataset.y)
    showSurroundings(getSurroundingCells(X, Y))
}
function unhoverEvent() {
    const X = Number(this.dataset.x)
    const Y = Number(this.dataset.y)
    showSurroundings(getSurroundingCells(X, Y), true)
}



addBombs()
drawBoard()
setNumbers()