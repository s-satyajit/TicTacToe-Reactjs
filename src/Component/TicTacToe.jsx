import React, { useState } from "react";

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXTurn, setIsXTurn] = useState(true)
    const [winner, setWinner] = useState(null)

    const renderSquare = (index) => {
        return(
            <button 
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-blue-100 border-2 border-blue-500 text-3xl text-black font-bold flex items-center justify-center"
            >
                {board[index]}
            </button>
        )
    }

    const handleClick = (index) => {
        if(board[index] || winner) return;
        
        console.log(index, "Click")
        const newBoard = [...board]
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard)
        setIsXTurn(!isXTurn)
        const winnerCombination = checkWinner(newBoard)
        if(winnerCombination)
            setWinner(newBoard[winnerCombination[0]])
    }

    const handleReset = () => {
        setBoard(Array(9).fill(null))
        setWinner(null)
        setIsXTurn(true)
    }

    const checkWinner = (newBoard) => {
        const combination =  [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i = 0; i < combination.length; i++) {
            const [a, b, c] = combination[i]
            if(newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c])
                return combination[i]
        }
        return null;

    }

    return(
        <>
        <h1 className="text-4xl font-extrabold text-center my-6">Let's Play Tic Tac Toe</h1>
        <div className="flex flex-col items-center space-y-4">

            <div className="flex flex-col items-center">
                <div className="flex" >
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="flex">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="flex">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button 
                onClick={handleReset} 
                className="mt-4 text-white font-bold rounded hover:bg-red-700 transition duration-400" 
                >
                    Reset Game
                </button>
            {winner && <div className="flex-col  items-center justify-center font-bold text-2xl my-4 py-2 px-4 bg-green-700 rounded-xl shadow-lg max-w-xs">{winner} is the winner!</div>}
        </div>
        </>
    )
}

export default TicTacToe;