import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-4">Welcome to Hamid's Mini Game Center!</h1>
                            <p className="mb-4">You're logged in! Explore our games and enjoy.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Game Card */}
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
                                    <h3 className="font-semibold text-lg">Tic Tac Toe</h3>
                                    <p className="text-gray-600 dark:text-gray-400">A classic game of strategy.</p>
                                    <a
                                        href="/tic-tac-toe"
                                        className="block mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                                    >
                                        Play Now
                                    </a>
                                </div>

                                {/* Repeat for other games */}
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
                                    <h3 className="font-semibold text-lg">Rock Paper Scissors</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Can you beat the computer with strategy?</p>
                                    <a
                                        href="/rock-paper-scissors"
                                        className="block mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                                    >
                                        Play Now
                                    </a>
                                </div>

                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
                                    <h3 className="font-semibold text-lg">Memory Game</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Challenge your brain with this memory game.</p>
                                    <a
                                        href="/memory-game"
                                        className="block mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
                                    >
                                        Play Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
