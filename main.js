const boardArr = Array(16).fill(0).map(() => Array(30).fill(0))
const boardElem = document.getElementById("board");
const explodedIcon = '💥';

function addBombs() {
    for (let i = 0; i < 99; i++) {
        setBomb()
    }
}

function setBomb() {
    var rowIndex = Math.round(Math.random() * 15)
    var cellIndex = Math.round(Math.random() * 29)
    if (boardArr[rowIndex][cellIndex] == 0) {
        boardArr[rowIndex][cellIndex] = explodedIcon;

    }
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
            c.dataset.x = j + 1;
            c.dataset.y = i + 1;
            c.addEventListener('click', function () {
                console.log(`Clicked cell at position (${this.dataset.x}, ${this.dataset.y}) with content: ${this.textContent}`);
            });
            c.textContent = cell;
            row.appendChild(c);
        }

        boardElem.appendChild(row);
    }
}



addBombs()
drawBoard()