document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    
    let currentPlayer = 'X';
    let gameActive = true;
    
    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameActive = false;
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                message.textContent = `${currentPlayer} wins!`;
                return;
            }
        }
    
        if (![...cells].some(cell => !cell.textContent)) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    };
    
    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.dataset.index;
    
        if (cell.textContent || !gameActive) return;
    
        cell.textContent = currentPlayer;
    
        checkWinner();
    
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };
    
    const handleReset = () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        message.textContent = '';
        currentPlayer = 'X';
        gameActive = true;
    };
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
});
