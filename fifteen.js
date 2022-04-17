"use strict";

// tiles by it's id in the correct order
let originalTiles = ["one", "two", "three", "four",
    "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", "sixteen"];

// numeric value of tile according to its id 
let numericMap = {
    "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "eleven": 11, "twelve": 12,
    "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16,
};

/* directions a div/tile can move from each puzzle position: 
[ [up, right, down, left] ]
value of 1 indicates valid direction. */
let validMoveDirs = [
    [0, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1],
    [1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 1, 1],
    [1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [1, 0, 1, 1],
    [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 0, 1], [1, 0, 0, 1]
];

// copy of orginal tiles/divs to use for shuffling/gameplay
let shuffledTiles = originalTiles.slice();

// to track current number of moves
let totalMoves = 0;

// to track time elapsed
let Interval;
let seconds = 0;

/**
 * Displays random background image onto puzzle pieces when page initially loads.
 */
function initPuzzle() {
    let bgs = ["kobe", "lebron", "steph", "kd"]; // class name of background images

    let randBg = bgs[Math.floor(Math.random() * bgs.length)];
    document.getElementById(randBg).selected = true;

    for (let i = 0; i < originalTiles.length - 1; i++) {
        document.getElementById(originalTiles[i]).classList.add(`${ randBg }`);
    }
}

/**
 * randomly rearrange the tiles of the puzzle by repeatedly choosing a random neighbor
 * of the empty tile and swapping it with the empty tile, 1000 times.
 */
function shuffle() {
    shuffledTiles = originalTiles.slice();
    let music = document.getElementById("music");

    for (let i = 0; i < 1000; i++) {
        let neighbors = []; // store neighbors of empty tile
        let movableTile;
        let emptyTile = shuffledTiles.indexOf("sixteen");

        // if empty tile can move left
        if (validMoveDirs[emptyTile][0] == 1) {
            // index of tile that's above empty one
            movableTile = emptyTile - 4;

            neighbors.push(movableTile);
        }

        // if empty tile can move left
        if (validMoveDirs[emptyTile][1] == 1) {
            // index tile that's right of empty one
            movableTile = emptyTile + 1;

            neighbors.push(movableTile);
        }

        // if empty tile can move left
        if (validMoveDirs[emptyTile][2] == 1) {
            // index of tile that's below the empty one
            movableTile = emptyTile + 4;
            neighbors.push(movableTile);
        }

        // if empty tile can move left
        if (validMoveDirs[emptyTile][3] == 1) {
            // index of tile that's left of empty one
            movableTile = emptyTile - 1;
            neighbors.push(movableTile);
        }

        // randomly choose an element from neighbors[]
        let randIdx = Math.floor(Math.random() * neighbors.length);
        let randTile = neighbors[randIdx];

        // update shuffledTiles after swaping neighbors[i] with empty tile
        let temp = shuffledTiles[emptyTile];
        shuffledTiles[emptyTile] = shuffledTiles[randTile];
        shuffledTiles[randTile] = temp;
    }

    reset();
    updatePuzzle();
    music.play();
    Interval = setInterval(startTimer, 1000);
}

/**
 * Iterates through the current state of the shuffledTiles 
 * and displays the tiles accordingly. Also distinguishes which
 * tiles can be swapped with empty tile.
 */
function updatePuzzle() {
    let puzzleDiv = document.getElementById("puzzle");
    puzzleDiv.innerHTML = "";
    let bg = document.getElementById("background").value;
    let emptyTile = shuffledTiles.indexOf("sixteen");

    for (let i = 0; i < shuffledTiles.length; i++) {

        // if current tile is the empty one add tile with empty properties
        if (shuffledTiles[i] == "sixteen") {
            puzzleDiv.innerHTML += "<div id='sixteen' class='tile'></div>"
        }

        // else add tile with its id, background, and numeric value
        else {
            puzzleDiv.innerHTML += `<div id='${ shuffledTiles[i] }' class='tile ${ bg }'> 
                                    ${ numericMap[shuffledTiles[i]] }</div>`
        }
    }

    // if empty tile can move up
    if (validMoveDirs[emptyTile][0] == 1) {
        // index of tile that's above empty one
        let movableTile = emptyTile - 4;

        // div element of tile that's above empty 
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");

        // add click event to this tile, which will swap it with the empty tile
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-down");
        })
    }

    // if empty tile can move right
    if (validMoveDirs[emptyTile][1] == 1) {
        // store index of tile that's right of empty one
        let movableTile = shuffledTiles.indexOf("sixteen") + 1;

        // div element of tile that's right of empty
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-left");
        })
    }

    // if empty tile can move down
    if (validMoveDirs[emptyTile][2] == 1) {
        // store index of tile that's below empty one
        let movableTile = shuffledTiles.indexOf("sixteen") + 4;

        // div element of tile that's below empty
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-up");
        })
    }

    // if empty tile can move left
    if (validMoveDirs[emptyTile][3] == 1) {
        // index of tile that's left of empty one
        let movableTile = emptyTile - 1;

        // div element of tile that's left of  empty
        let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);

        movableTileDiv.classList.add("movable-piece");
        movableTileDiv.addEventListener("click", function () {
            swapTiles(movableTile, emptyTile, "transition-right");
        })
    }
}

/**
 * Swaps two tiles with transition effect, increments totalMoves, checks if puzzle is solved and updates puzzle area.
 * @param {number} movableTile - The index of the non-empty tile that's going to be swapped.
 * @param {number} emptyTile - The index of the empty.
 * @param {string} transition - The classname of the transition.
 */
function swapTiles(movableTile, emptyTile, transition) {
    let movableTileDiv = document.getElementById(shuffledTiles[movableTile]);
    movableTileDiv.classList.add(transition);

    setTimeout(function () {
        let temp = shuffledTiles[emptyTile];
        shuffledTiles[emptyTile] = shuffledTiles[movableTile];
        shuffledTiles[movableTile] = temp;

        updateMoves();
        checkSolved();
        updatePuzzle();
    }, 900)
}

/** Changes the background image of puzzle tiles and displays them in the correct order. */
function changeBg() {
    let bg = document.getElementById("background").value;
    let puzzleDiv = document.getElementById("puzzle")
    puzzleDiv.innerHTML = "";
    reset();

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

/** Increments seconds and updates the DOM. */
function startTimer() {
    let secsHTML = document.getElementById("seconds");
    seconds++;
    secsHTML.innerHTML = seconds;
}

/** Increments totalMoves and updates DOM. */
function updateMoves() {
    totalMoves++
    let movesHTML = document.getElementById("moves");
    movesHTML.innerHTML = totalMoves;
}

/**  Checks if puzzle has been solved. If so, end game notification is displayed. */
function checkSolved() {
    if (shuffledTiles.toString() == originalTiles.toString()) {
        clearInterval(Interval);
        let endTime = document.getElementById("seconds").innerHTML;
        let message = document.getElementById("message");
        let close = document.getElementById("close");
        let audio = document.getElementById("music");

        audio.pause();
        message.innerHTML = `You solved the puzzle in ${ endTime } 
                            seconds with ${ totalMoves } moves.`
        modal.style.display = "block";

        close.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        reset();
    }
}

/** Pauses music, resets timer and totalMoves.  */
function reset() {
    let music = document.getElementById("music");
    let moves = document.getElementById("moves");
    let secs = document.getElementById('seconds');

    music.pause();
    clearInterval(Interval);
    seconds = 0;
    totalMoves = 0;
    secs.innerHTML = 0;
    moves.innerHTML = 0;
}