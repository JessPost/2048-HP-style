
window.onload = function () {

    const gameBoard = document.getElementById("gameBoard");
    const rowsWidth = 4;
    const columnsHeight = 4;
    //game board array
    let board = [
        // [2, 16, 2, 4],
        // [8, 4, 8, 16],
        // [2, 16, 2, 4],
        // [8, 32, 32, 8]
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    //array holding numbers that will generate
    const generateNumberArray = [2, 4];
    //scoreTotal
    let scoreTotal = 0;
    //variable for check game status
    let gameStatus = false;


    createGameBoard();
    //create 2 numbers in board to start the game
    generateNumber();
    generateNumber();

    document.querySelector('audio').addEventListener('play', function () {
        setTimeout(function () {
            alert("Enjoy the music while you play and \nmake sure to click on GOOD LUCK \nbefore starting for some good luck!!")
        }, 100)
    })

    //create game board
    function createGameBoard() {
        //loop over the board 
        for (let i = 0; i < rowsWidth; i++) {
            for (let j = 0; j < columnsHeight; j++) {
                //store each location on the board, create a square 
                let square = document.createElement("squareTile");
                gameBoard.style.backgroundColor = '#726255';
                //store number in the square -- 0 to start
                let numberInside = board[i][j];
                //set the id to be the index location coordinates
                let rowIndex = i;
                let colIndex = j;
                square.id = rowIndex + " " + colIndex;
                //console.log(square.id)
                //set the color
                squareColor(square, numberInside);
                //put the new color square to board
                gameBoard.append(square);
            }
        }
    }

    //generate numbers
    function generateNumber() {
        let openSpotFound = true;
        //check for square
        if (!isThereAvailableSquare()) return;
        else {
            while (openSpotFound) {
                //find 2 random row and column locations to place a 2 or 4 in
                //use Math.floor
                let randomRowIndex = Math.floor(Math.random() * rowsWidth);
                //console.log(randomRowIndex)
                let randomColumnIndex = Math.floor(Math.random() * columnsHeight);
                //console.log(randomColumnIndex)
                let numberPicked = generateNumberArray[Math.floor(Math.random() * generateNumberArray.length)];
                //console.log(numberPicked)

                //check to see if square is empty
                if (board[randomRowIndex][randomColumnIndex] === 0) {
                    board[randomRowIndex][randomColumnIndex] = numberPicked;

                    //store the id to set color
                    let square = document.getElementById(randomRowIndex + " " + randomColumnIndex);
                    //set id to number for colors
                    square.innerText = board[randomRowIndex][randomColumnIndex];
                    openSpotFound = false;

                    //check if the number is 2 
                    if (square.innerText === '2') {
                        square.style.backgroundColor = '#740001';
                        square.style.color = '#D3A625';
                    }
                    //check if the number is 4 
                    if (square.innerText === '4') {
                        square.style.backgroundColor = '#1A472A';
                        square.style.color = '#5D5D5D';
                    }
                    //console.log(square.innerText)
                }
            }
        }

    }

    //check to see if there is an open square - make this outside of generateNumbers 
    function isThereAvailableSquare() {
        //go through the board
        for (let i = 0; i < rowsWidth; i++) {
            for (let j = 0; j < columnsHeight; j++) {
                //check if there is at least one zero in the board
                if (board[i][j] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function slideSquareLeft() {
        //go through the game board
        for (let i = 0; i < rowsWidth; i++) {
            //store row array
            let row = board[i];
            //mergeLeftRight - move the zeros
            row = mergeLeftOrRight(row);
            //set the array back to the row after merged
            board[i] = row;

            for (let j = 0; j < columnsHeight; j++) {
                //store id of square for the color
                let square = document.getElementById(i + " " + j);
                //store the number to run through squareColor
                let numberInside = board[i][j];
                //set the color
                squareColor(square, numberInside);
            }
        }
    }

    function slideSquareRight() {
        //go through the game board
        for (let i = 0; i < rowsWidth; i++) {
            //store row array
            let row = board[i];
            //mirror the array before merging
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
            row.reverse();
            // console.log(row.reverse())
            //mergeLeftRight
            row = mergeLeftOrRight(row);
            //console.log(row)
            //set the reversed array back to the row after merged
            board[i] = row.reverse();
            // console.log(board[i])

            for (let j = 0; j < columnsHeight; j++) {
                //store id of square
                let square = document.getElementById(i + " " + j);
                //store the number to run through squareColor
                let numberInside = board[i][j];
                //set the color
                squareColor(square, numberInside);
            }
        }
    }

    //function mergeLeftRight(row)
    function mergeLeftOrRight(row) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        //create new array that is a copy but removes zeros 
        row = row.filter(numberInside => numberInside != 0);
        //console.log(row) 

        //merge going through each row
        for (let i = 0; i < row.length - 1; i++) {
            //check to see if the numbers are the same left or right
            if (row[i] === row[i + 1]) {
                //if they are equal add together
                row[i] = row[i] + row[i + 1];
                //console.log(row[i + 1])
                //clear the square that was merged
                row[i + 1] = 0;
                //console.log(row[i + 1])
                //update the score with the merged value
                scoreTotal = scoreTotal + row[i];
                //console.log(scoreTotal)
                //update score
                document.getElementById("score").innerText = scoreTotal;
                gameStatus = true;
            }
            gameStatus = false;
        }
        //console.log(row)
        //remove the zeros again from merged array to move all numbers
        row = row.filter(numberInside => numberInside != 0);
        //console.log(row)
        //add zeroes back to array to equal length
        while (row.length < 4) {
            row.push(0);
        }
        return row;
        //console.log(row)
    }

    function slideSquareUp() {
        //go through the game board
        for (let i = 0; i < columnsHeight; i++) {
            //note i is columns in here
            //turn columns into rows 
            //https://www.tutorialspoint.com/transpose-of-a-two-dimensional-array-javascript
            //https://stackoverflow.com/questions/4492678/swap-rows-with-columns-transposition-of-a-matrix-in-javascript
            let column0 = board[0][i];
            let column1 = board[1][i];
            let column2 = board[2][i];
            let column3 = board[3][i];
            //new array after column switched into row
            let newColumn = [column0, column1, column2, column3];
            //console.log(newColumn)
            newColumn = mergeUpOrDown(newColumn);
            //console.log(newColumn)

            //turn temp row into column
            board[0][i] = newColumn[0];
            board[1][i] = newColumn[1];
            board[2][i] = newColumn[2];
            board[3][i] = newColumn[3];

            for (let j = 0; j < rowsWidth; j++) {
                //note j is rows here
                //store id of square
                let square = document.getElementById(j + " " + i);
                //store the number to run through squareColor
                let numberInside = board[j][i];
                //set the color
                squareColor(square, numberInside);
            }
        }
    }

    function slideSquareDown() {
        //go through the game board
        for (let i = 0; i < columnsHeight; i++) {
            //note i is columns here
            //turn columns into rows 
            let column0 = board[0][i];
            let column1 = board[1][i];
            let column2 = board[2][i];
            let column3 = board[3][i];

            //new array after column switched into row
            let newColumn = [column0, column1, column2, column3];
            //reverse the array before merging
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
            newColumn = newColumn.reverse();
            newColumn = mergeUpOrDown(newColumn);
            //console.log(newColumn)
            //set the reversed array back to the newColumn after merged
            newColumn = newColumn.reverse();
            // console.log(board[i])
            //turn temp row into column
            board[0][i] = newColumn[0];
            board[1][i] = newColumn[1];
            board[2][i] = newColumn[2];
            board[3][i] = newColumn[3];

            for (let j = 0; j < rowsWidth; j++) {
                //note j is rows here
                //store id of square
                let square = document.getElementById(j + " " + i);
                //store the number to run through squareColor
                let numberInside = board[j][i];
                //set the color
                squareColor(square, numberInside);
            }
        }

    }

    //function mergeUpDown(column)
    function mergeUpOrDown(column) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        //create new array that is a copy but removes zeros 
        column = column.filter(filterNumber => filterNumber != 0);
        // console.log(column)

        //merge going through each column
        for (let i = 0; i < column.length - 1; i++) {
            //check to see if the numbers are the same in the next
            if (column[i] === column[i + 1]) {
                //combine squares
                column[i] = column[i] + column[i + 1];
                //reset square
                column[i + 1] = 0;
                //add to score
                scoreTotal = scoreTotal + column[i];
                //update score
                document.getElementById("score").innerText = scoreTotal;
                gameStatus = true;
            }
            gameStatus = false;
        }
        //remove the zeros again from merged array to move all numbers
        column = column.filter(filterNumber => filterNumber != 0);
        //console.log('part1  ' + column)
        //add zeroes back
        while (column.length < 4) {
            column.push(0);
        }
        return column;
    }

    //function to updates color
    function squareColor(square, numberInside) {
        //clear the innerText of square
        square.innerText = '';
        //set classList
        square.classList.add('square');
        // console.log('numberInside ' + numberInside)
        //set empty square color
        if (square.innerText === '') {
            square.style.backgroundColor = '#F3C25E';
        }
        //if square is not blank set colors accordingly
        if (numberInside > 0) {
            square.innerText = numberInside;

            //console.log('hi' + numberInside)
            if (numberInside === 2 || numberInside === 512) {
                //console.log(square)
                square.style.backgroundColor = '#740001';
                square.style.color = '#D3A625';
            }
            if (numberInside === 4 || numberInside === 1024) {
                square.style.backgroundColor = '#1A472A';
                square.style.color = '#5D5D5D';
            }
            if (numberInside === 8 || numberInside === 2048) {
                square.style.backgroundColor = '#FFD800';
                square.style.color = '#000000';
            }
            if (numberInside === 16) {
                square.style.backgroundColor = '#0E1A40';
                square.style.color = '#946B2D';
            }
            if (numberInside === 32) {
                square.style.backgroundColor = '#D3A625';
                square.style.color = '#740001';
            }
            if (numberInside === 64) {
                square.style.backgroundColor = '#5D5D5D';
                square.style.color = '#1A472A';
            }
            if (numberInside === 128) {
                square.style.backgroundColor = '#000000';
                square.style.color = '#FFD800';
            }
            if (numberInside === 256) {
                square.style.backgroundColor = '#946B2D';
                square.style.color = '#0E1A40';
            }
        }
        //check to see if won the game - once the square reaches 2048
        if (numberInside >= 2048) {
            setTimeout(function () {
                document.removeEventListener('keyup', keyboardPresses);
                alert('AMAZING!!! YOU\'VE REACHED \n2048 AND WON THIS TIME!!!');
                playAgain();
            }, 200)
        }
    }

    //ask player to play again
    function playAgain() {
        //ask to play again and store answer 
        let answer = prompt("Do you want to play again? Enter yes or no");
        //check answer - set to lower case
        if (answer.toLocaleLowerCase() === 'yes') {
            //reload the page
            location.reload();
        }
        if (answer.toLocaleLowerCase() === 'no') {
            alert('See you next time!');
            document.removeEventListener('keyup', keyboardPresses);
            // window.close();
        }
        if (answer === '') {
            alert('Please enter yes or no');
            playAgain();
        }
    }
    //player lost the game and ask if they want to play again
    function gameLost() {
        //counter to see how many zeros are left
        let counter = 0
        //go through the board
        for (let i = 0; i < rowsWidth; i++) {
            for (let j = 0; j < columnsHeight; j++) {
                //check to see if the game board has one or more 0
                if (board[i][i] === 0) {
                    counter++
                }
            }
        }
        console.log(gameStatus)
        if ((counter === 0) && (!isThereAvailableSquare()) && (!gameStatus)) {
            setTimeout(function () {
                alert('YOU LOST!');
                document.removeEventListener('keyup', keyboardPresses);
                playAgain();
            }, 100)
        }
    }

    //setup keyboard
    function keyboardPresses(event) {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowUp':
                setTimeout(function () {
                    audio.play();
                    slideSquareUp();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'ArrowDown':
                setTimeout(function () {
                    audio.play();
                    slideSquareDown();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'ArrowLeft':
                setTimeout(function () {
                    audio.play();
                    slideSquareLeft();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'ArrowRight':
                setTimeout(function () {
                    audio.play();
                    slideSquareRight();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'w':
                setTimeout(function () {
                    audio.play();
                    slideSquareUp();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 's':
                setTimeout(function () {
                    audio.play();
                    slideSquareDown();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'a':
                setTimeout(function () {
                    audio.play();
                    slideSquareLeft();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case 'd':
                setTimeout(function () {
                    audio.play();
                    slideSquareRight();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case '8':
                setTimeout(function () {
                    audio.play();
                    slideSquareUp();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case '2':
                setTimeout(function () {
                    audio.play();
                    slideSquareDown();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case '4':
                setTimeout(function () {
                    audio.play();
                    slideSquareLeft();
                    gameLost();
                    generateNumber();
                }, 200)
                break;
            case '6':
                setTimeout(function () {
                    audio.play();
                    slideSquareUp();
                    gameLost();
                    generateNumber();
                }, 200)
                break;

            default:
                break;
        }
    }
    document.addEventListener('keyup', keyboardPresses);
    //to prevent scroll
    //https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
    document.addEventListener("keydown", function (event) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(event.code) > -1) {
            event.preventDefault();
        }
    }, false);

}
