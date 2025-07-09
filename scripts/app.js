function init() {
    /*------------------------ Cached Element References ------------------------*/
    // const boardElm = document.querySelector('.board')
    const squareEls = document.querySelectorAll('.sqr')
    const messageElm = document.querySelector('#message')
    const btnElm = document.querySelector('#restartBtn')
    /*-------------------------------- Constants --------------------------------*/
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [6, 4, 2],
        [0, 4, 8],
    ]
    /*---------------------------- Variables (state) ----------------------------*/
    // let message
    let board = ['', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X'
    let winner = false
    let tie = false

    /*-------------------------------- Functions --------------------------------*/

    function updateBoard() {
        board.forEach((sqr, i) => {
            squareEls[i].textContent = sqr
        });
    }

    function updateMessage() {
        if (winner == false && tie == false) {
            messageElm.textContent = 'game is in process..'
        }
        else if (winner == false && tie == false) {
            messageElm.textContent = 'It is a Tie '
        }
        else {
            messageElm.textContent = `You Won!`
        }
    }


    function handleClick(event) {
        const sqrIndex = event.target.id
        if (board[sqrIndex] != '' || winner == true) {
            return
        }
        placePiece(sqrIndex)
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
    }

    function placePiece(index) {
        board[index] = currentPlayer
        squareEls[index].textContent = currentPlayer
        console.log(board)
    }

    function checkForWinner() {
        for (let i = 0; i < winningCombos.length; i++) {
            const combo = winningCombos[i]
            const a = board[combo[0]]
            const b = board[combo[1]]
            const c = board[combo[2]]
            if (a == '' || b == '' || c == '') {
                continue
            }
            if (a == b && b == c) {
                winner = true
            }
        }

        if (winner) {
            messageElm.textContent = `${currentPlayer} Wins!`
            winner = true
        }
        else if (board.includes('')) {
            messageElm.textContent = `It is a Tie`
            tie = true
        }
    }

    function checkForTie() {
        if (winner == true) {
            return
        }
    }

    function switchPlayerTurn() {
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
        messageElm.textContent = `${currentPlayer}'s turn`
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', '']
        currentPlayer = 'X'
        messageElm.textContent = 'Play'
        squareEls.forEach(cell => cell.textContent = '')
        // updateBoard()
    }

    function render() {
        updateBoard()
        updateMessage()
        restartGame()
    }
    render()

    /*----------------------------- Event Listeners -----------------------------*/

    squareEls.forEach(sqr => {
        sqr.addEventListener('click', handleClick)
    })

    btnElm.addEventListener('click', restartGame)
}
document.addEventListener('DOMContentLoaded', init)