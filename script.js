//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
            // Game state variables
            let currentPlayer = 'X';
            let player1Name = '';
            let player2Name = '';
            let gameActive = true;
            let moves = 0;
            
            // Win combinations
            const winCombinations = [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
                [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
                [1, 5, 9], [3, 5, 7]             // diagonals
            ];
            
            // DOM elements
            const playerSetup = document.getElementById('player-setup');
            const gameSection = document.getElementById('game');
            const messageElement = document.getElementById('message');
            const boardElement = document.getElementById('board');
            const cells = document.querySelectorAll('.cell');
            const submitButton = document.getElementById('submit');
            const restartButton = document.getElementById('restart');
            const p1NameElement = document.getElementById('p1-name');
            const p2NameElement = document.getElementById('p2-name');
            
            // Start the game when submit button is clicked
            submitButton.addEventListener('click', startGame);
            
            // Restart the game
            restartButton.addEventListener('click', () => {
                resetGame();
                showPlayerSetup();
            });
            
            // Add click listeners to cells
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
            
            // Start the game
            function startGame() {
                player1Name = document.getElementById('player-1').value.trim() || 'Player 1';
                player2Name = document.getElementById('player-2').value.trim() || 'Player 2';
                
                if (!player1Name || !player2Name) {
                    alert('Please enter names for both players');
                    return;
                }
                
                p1NameElement.textContent = player1Name;
                p2NameElement.textContent = player2Name;
                
                playerSetup.classList.add('hidden');
                gameSection.classList.remove('hidden');
                
                updateMessage();
            }
            
            // Handle cell click
            function handleCellClick(e) {
                const cell = e.target;
                const cellId = cell.id;
                
                // Check if cell is already taken or game is over
                if (cell.textContent !== '' || !gameActive) return;
                
                // Update cell content
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
                moves++;
                
                // Check for win or draw
                if (checkWin()) {
                    endGame(false);
                } else if (moves === 9) {
                    endGame(true);
                } else {
                    // Switch player
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateMessage();
                }
            }
            
            // Check for win
            function checkWin() {
                return winCombinations.some(combination => {
                    const [a, b, c] = combination;
                    const cellA = document.getElementById(a);
                    const cellB = document.getElementById(b);
                    const cellC = document.getElementById(c);
                    
                    if (cellA.textContent === currentPlayer && 
                        cellB.textContent === currentPlayer && 
                        cellC.textContent === currentPlayer) {
                        
                        // Highlight winning cells
                        cellA.classList.add('winning-cell');
                        cellB.classList.add('winning-cell');
                        cellC.classList.add('winning-cell');
                        
                        return true;
                    }
                    return false;
                });
            }
            
            // End the game
            function endGame(isDraw) {
                gameActive = false;
                
                if (isDraw) {
                    messageElement.textContent = "It's a draw!";
                } else {
                    const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
                    messageElement.textContent = `${winnerName}, congratulations you won!`;
                }
            }
            
            // Update message
            function updateMessage() {
                const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
                messageElement.textContent = `${currentPlayerName}, you're up`;
            }
            
            // Reset game state
            function resetGame() {
                currentPlayer = 'X';
                gameActive = true;
                moves = 0;
                
                // Clear board
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'winning-cell');
                });
                
                updateMessage();
            }
            
            // Show player setup screen
            function showPlayerSetup() {
                gameSection.classList.add('hidden');
                playerSetup.classList.remove('hidden');
                
                // Reset input fields
                document.getElementById('player-1').value = '';
                document.getElementById('player-2').value = '';
            }
        });