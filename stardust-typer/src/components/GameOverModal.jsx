import React from "react";

const GameOverModal = ({ score, onRestart, onMenu }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white">
      <h2 className="text-4xl mb-4 font-bold">💫 Game Over 💫</h2>
      <p className="text-2xl mb-6">Your Score: {score}</p>
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Restart
        </button>
        <button
          onClick={onMenu}
          className="bg-gray-700 px-4 py-2 rounded-xl hover:bg-gray-800"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
