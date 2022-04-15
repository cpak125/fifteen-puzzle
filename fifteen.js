"use strict";

let originalTiles = ["one", "two", "three", "four",
    "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", "sixteen"];

let shuffledTiles = originalTiles.slice();

let numericMap = {
    "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
};

// move directions: [[top, right, bottom, left]]
let validMoveDirs = [
    [0, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1],
    [1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 1, 1],
    [1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 1, 1],
    [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 0, 1], [1, 0, 0, 1]
];

document.getElementById("background").addEventListener("change", changeBg);

function initPuzzle() {
    let bgs = ["kobe", "lebron", "steph", "kd"];

    let randBg = bgs[Math.floor(Math.random() * bgs.length)];
    document.getElementById(randBg).selected = true;

    for (let i = 0; i < originalTiles.length - 1; i++) {
        document.getElementById(originalTiles[i]).classList.add(`${ randBg }`);
    }
}


function generatePuzzle() {
    let puzzleDiv = document.getElementById("puzzle");
    puzzleDiv.innerHTML = "";
    let bg = document.getElementById("background").value;
    console.log(bg);


    for (let i = 0; i < shuffledTiles.length; i++) {

        if (shuffledTiles[i] == "sixteen") {
            puzzleDiv.innerHTML += "<div id='sixteen' class='tile'></div>"
        } else {
            puzzleDiv.innerHTML += `<div id='${ shuffledTiles[i] }' class='tile ${ bg }'>
                                        ${ numericMap[shuffledTiles[i]] }
                                    </div>`
        }
    }

    let emptyTile = shuffledTiles.indexOf("sixteen");

    // empty tile can swap with top
    if (validMoveDirs[emptyTile][0] == 1) {
        let movableTile = emptyTile - 4;
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-down");
        })
    }

    // empty tile can swap with right
    if (validMoveDirs[emptyTile][1] == 1) {
        let movableTile = shuffledTiles.indexOf("sixteen") + 1;
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-left");
        })
    }

    // empty tile can swap with bottom
    if (validMoveDirs[emptyTile][2] == 1) {
        let movableTile = shuffledTiles.indexOf("sixteen") + 4;
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-up");
        })
    }

    // empty tile can swap with left
    if (validMoveDirs[emptyTile][3] == 1) {
        let movableTile = emptyTile - 1;
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-right");
        })
    }
}

function swapTiles(movableTile, emptyTile, transition) {
    let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);
    movableTileDiv.classList.add(transition);

    setTimeout(function () {
        let temp = shuffledTiles[emptyTile];
        shuffledTiles[emptyTile] = shuffledTiles[movableTile];
        shuffledTiles[movableTile] = temp;
        generatePuzzle();
    }, 1100)

}

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        let neighbors = [];
        let movableTile;
        let emptyTile = shuffledTiles.indexOf("sixteen");

        //  for each neighbor n that is directly up, down, left, right from empty square:
        //  if n exists and is movable:
        //  neighbors.push(n)
        if (validMoveDirs[emptyTile][0] == 1) {
            movableTile = emptyTile - 4;
            neighbors.push(movableTile);
        }

        if (validMoveDirs[emptyTile][1] == 1) {
            movableTile = emptyTile + 1;
            neighbors.push(movableTile);
        }

        if (validMoveDirs[emptyTile][2] == 1) {
            movableTile = emptyTile + 4;
            neighbors.push(movableTile);
        }

        if (validMoveDirs[emptyTile][3] == 1) {
            movableTile = emptyTile - 1;
            neighbors.push(movableTile);
        }

        //  randomly choose an element i from neighbors
        let randIdx = Math.floor(Math.random() * neighbors.length);
        let randTile = neighbors[randIdx];

        //  move neighbors[i] to the location of the empty square

        let temp = shuffledTiles[emptyTile];
        shuffledTiles[emptyTile] = shuffledTiles[randTile];
        shuffledTiles[randTile] = temp;
    }

    generatePuzzle();
}

function changeBg() {
    let bg = document.getElementById("background").value;
    let puzzleDiv = document.getElementById("puzzle")
    puzzleDiv.innerHTML = "";

    for (let i = 0; i < originalTiles.length; i++) {
        if (originalTiles[i] == "sixteen") {
            puzzleDiv.innerHTML += "<div id='sixteen' class='tile'></div>"
        } else {
            puzzleDiv.innerHTML += `<div id='${ originalTiles[i] }' class='tile ${ bg }'>
                                        ${ numericMap[shuffledTiles[i]] }
                                    </div>`
        }
    }
}