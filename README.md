# 15 Puzzle
## Project Description
The Fifteen Puzzle (more generally called the Sliding Puzzle) is a simple classic game consisting of a 4x4 grid of numbered squares with one square missing. The object of the game is to rearrange the tiles into numerical order by repeatedly sliding a square that neighbors the missing square into the empty space.

I recreated this classic game, which was originally invented by Noyes Palmer Chapman. Each tile displays a part of a background image. I implemented a shuffling algorithm that generates a random, valid solvable puzzle state by repeatedly choosing a random neighbor of the missing tile and sliding it onto the missing tile’s space. Roughly 1000 such random movements were made to produce a well-shuffled board. There are mulitple backgrounds to choose from. Total moves and time it takes to solve are recorded.

## Screenshots
<img src="https://i.imgur.com/yyNEY1u.png" width ="300" /> <img src="https://i.imgur.com/xHzBQb0.png" width ="300" /> <img src="https://i.imgur.com/nE0aYfX.png" width ="400" />

## Technologies Used
- HTML
- CSS
- JavaScript

## Getting Started
[Deployed App]()

**Tips for solving a fifteen puzzle**: First get the entire top/left sides into proper position. That is, put squares number 1, 2, 3, 4, 5, 9, and 13 into their proper places. Now never touch those squares again. Now what’s left to be solved is a 3x3 board, which is much easier.



