// 1. Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // 2. Add click listeners to cells
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.getAttribute('data-index');

            if (board[index] !== "" || !isGameActive) return;

            board[index] = currentPlayer;
            cell.innerText = currentPlayer;
            
            // Stylize the letters
            cell.style.color = currentPlayer === "X" ? "#ff4d4d" : "#4dff88";

            checkResult();
        });
    });

    function checkResult() {
        let roundWon = false;
        for (let condition of winningConditions) {
            let [a, b, c] = [board[condition[0]], board[condition[1]], board[condition[2]]];
            if (a === "" || b === "" || c === "") continue;
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Player ${currentPlayer} Wins!`);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) alert("It's a Draw!");
        
        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // 3. Reset Button logic
    resetBtn.addEventListener('click', () => {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.color = "white";
        });
    });
});