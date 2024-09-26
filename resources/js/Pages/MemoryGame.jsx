// resources/js/Pages/MemoryGame.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Generate card pairs
const generateCards = () => {
    const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥭'];
    const cards = [...cardValues, ...cardValues]; // Duplicate for pairs
    return cards.sort(() => Math.random() - 0.5); // Shuffle cards
};

export default function MemoryGame({ auth }) {
    const [cards, setCards] = useState(generateCards());
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isFlipping, setIsFlipping] = useState(false);

    // Handle card flip
    const handleCardClick = (index) => {
        if (isFlipping || flippedIndices.includes(index) || matchedPairs.includes(cards[index])) return;

        setFlippedIndices([...flippedIndices, index]);

        if (flippedIndices.length === 1) {
            setIsFlipping(true);
            const firstCard = cards[flippedIndices[0]];
            const secondCard = cards[index];

            // Check for a match
            if (firstCard === secondCard) {
                setMatchedPairs([...matchedPairs, firstCard]);
                setFlippedIndices([]); // Clear flipped indices
                setIsFlipping(false); // Allow for next moves
            } else {
                setTimeout(() => {
                    setFlippedIndices([]); // Hide cards after 1 second
                    setIsFlipping(false); // Allow for next moves
                }, 1000); // Hide cards after 1 second
            }
        }
    };

    // Reset the game
    const resetGame = () => {
        setCards(generateCards());
        setFlippedIndices([]);
        setMatchedPairs([]);
        setIsFlipping(false); // Reset flipping state
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Memory Card Game</h2>}
        >
            <Head title="Memory Card Game" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-3xl font-bold mb-4 text-center">Memory Card Game</h1>
                            <div className="grid grid-cols-4 gap-4 justify-items-center"> {/* Center items in grid */}
                                {cards.map((card, index) => (
                                    <button
                                        key={index}
                                        className={`w-24 h-24 rounded-lg flex items-center justify-center text-3xl transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-md border-2 border-transparent ${
                                            flippedIndices.includes(index) || matchedPairs.includes(card)
                                                ? 'bg-blue-400 border-blue-600'
                                                : 'bg-gray-200'
                                        }`}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        {(flippedIndices.includes(index) || matchedPairs.includes(card)) ? (
                                            <span className="text-4xl">{card}</span>
                                        ) : (
                                            <span className="text-4xl">❓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            {matchedPairs.length === cards.length / 2 && (
                                <div className="mt-4 text-green-600 dark:text-green-400 text-xl text-center">
                                    You found all pairs! 🎉
                                </div>
                            )}
                            <div className="flex justify-center">
                                <button
                                    onClick={resetGame}
                                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Reset Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
