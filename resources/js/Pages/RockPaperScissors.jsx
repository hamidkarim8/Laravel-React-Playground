// resources/js/Pages/RockPaperScissors.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function RockPaperScissors({ auth }) {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const choices = ['Rock', 'Paper', 'Scissors'];

    const handleClick = (choice) => {
        setPlayerChoice(choice);
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(computerChoice);
        determineWinner(choice, computerChoice);
    };

    const determineWinner = (player, computer) => {
        if (player === computer) {
            setResult("It's a tie!");
        } else if (
            (player === 'Rock' && computer === 'Scissors') ||
            (player === 'Paper' && computer === 'Rock') ||
            (player === 'Scissors' && computer === 'Paper')
        ) {
            setResult('You win!');
        } else {
            setResult('You lose!');
        }
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Rock-Paper-Scissors</h2>}
        >
            <Head title="Rock-Paper-Scissors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Let's Play Rock-Paper-Scissors!</h1>
                        <div className="flex justify-center mb-8">
                            {choices.map((choice) => (
                                <button
                                    key={choice}
                                    onClick={() => handleClick(choice)}
                                    className="bg-blue-500 text-white text-lg font-semibold py-3 px-6 mx-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                        {playerChoice && computerChoice && (
                            <div className="text-center mt-6">
                                <p className="text-xl text-white font-semibold">Your Choice: <span className="text-blue-500">{playerChoice}</span></p>
                                <p className="text-xl text-white font-semibold">Computer Choice: <span className="text-blue-500">{computerChoice}</span></p>
                                <p className="text-2xl text-white font-bold mt-4">{result}</p>
                            </div>
                        )}
                        <div className="text-center mt-6">
                            <button
                                onClick={resetGame}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
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
