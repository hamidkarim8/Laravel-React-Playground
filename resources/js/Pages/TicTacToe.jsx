import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    // Tic Tac Toe game logic
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    // Check for a winner
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const currentPlayer = isXNext ? 'X' : 'O';

    // Check if the board is full (for draw condition)
    const isBoardFull = board.every(square => square !== null);

    // Handle square click
    const handleClick = (index) => {
        if (board[index] || winner) return; // Return if there's already a winner or the square is filled
        const newBoard = board.slice();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    // Reset the game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    // Render individual square
    const renderSquare = (index) => {
        return (
            <button
                className="w-20 h-20 md:w-24 md:h-24 text-3xl font-bold bg-gray-100 dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-600 transition duration-200 ease-in-out"
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </button>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tic Tac Toe</h2>}
        >
            <Head title="Tic Tac Toe" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-gray-900 dark:text-gray-100 mb-4 text-center text-2xl">
                            Hi, let's play Tic Tac Toe!
                        </div>

                        <div className="grid grid-cols-3 gap-4 justify-center items-center max-w-xs mx-auto">
                            {board.map((_, index) => renderSquare(index))}
                        </div>

                        {/* Display winner, draw, or next player message */}
                        {winner ? (
                            <div className="mt-6 text-green-600 dark:text-green-400 text-2xl text-center">
                                {`Player ${winner} wins! 🎉`}
                            </div>
                        ) : isBoardFull ? (
                            <div className="mt-6 text-yellow-600 dark:text-yellow-400 text-2xl text-center">
                                It's a draw! 🤝
                            </div>
                        ) : (
                            <div className="mt-6 text-gray-900 dark:text-gray-100 text-xl text-center">
                                {`Next player: ${currentPlayer}`}
                            </div>
                        )}

                        <div className="text-center mt-6">
                            <button
                                onClick={resetGame}
                                className="bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
                            >
                                Reset Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
