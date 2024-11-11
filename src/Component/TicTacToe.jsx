import React, { useState } from "react";

function TicTacToe() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const currentBoard = history[currentMove];

    const renderSquare = (index) => {
        return (
            <button
                onClick={() => handleClick(index)}
                className="w-20 h-20 bg-blue-100 text-black border-2 border-blue-500 text-3xl font-bold flex items-center justify-center"
            >
                {currentBoard[index]}
            </button>
        );
    };

    const handleClick = (index) => {
        if (currentBoard[index] || winner) return;

        const newBoard = [...currentBoard];
        newBoard[index] = isXTurn ? 'X' : 'O';

        const newHistory = history.slice(0, currentMove + 1);
        newHistory.push(newBoard);
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);
        setIsXTurn(!isXTurn);

        const winnerCombination = checkWinner(newBoard);
        if (winnerCombination) {
            setWinner(newBoard[winnerCombination[0]]);
        }
    };

    const checkWinner = (newBoard) => {
        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < combinations.length; i++) {
            const [a, b, c] = combinations[i];
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return combinations[i];
            }
        }
        return null;
    };

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setIsXTurn(true);
        setWinner(null);
    };

    const undoMove = () => {
        if (currentMove > 0) {
            setCurrentMove(currentMove - 1);
            setIsXTurn(!isXTurn);
            setWinner(null);
        }
    };

    const redoMove = () => {
        if (currentMove < history.length - 1) {
            setCurrentMove(currentMove + 1);
            setIsXTurn(!isXTurn);
            setWinner(null);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-extrabold text-center my-6">
                Let's Play Tic Tac Toe!
            </h1>
            <div className="flex flex-col items-center space-y-4">
                <div className="m-1 flex flex-col items-center">
                    <div className="board-row flex">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="board-row flex">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="board-row flex">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                </div>
                {winner && (
                    <div className="flex items-center justify-center w-full">
                        <div className="text-2xl font-bold my-4 py-2 px-4 bg-green-500 text-white rounded shadow-lg">
                            {winner} is the winner!
                        </div>
                    </div>
                )}
                <div className="flex flex-col space-y-4 md:flex-col md:space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                    <button className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-2">
                        <i className="fas fa-redo-alt"></i>
                        <span>Reset Game</span>
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-700 transition duration-300 flex items-center justify-center space-x-2">
                        <i className="fas fa-undo-alt"></i>
                        <span>Undo Move</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2">
                        <i className="fas fa-redo"></i>
                        <span>Redo Move</span>
                    </button>
                </div>

            </div>
        </>
    );
}

export default TicTacToe;
