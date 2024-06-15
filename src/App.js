import { useState } from 'react';
import { ChakraProvider, Button, Flex, Box, Center } from '@chakra-ui/react';

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return (
      <Button 
        className="square" 
        size='lg' 
        width='80px' 
        height='80px' 
        colorScheme='gray'
        border='1px'
        borderColor='black'
        borderRadius='0' 
        onClick={() => onClick(i)}>
        {squares[i]}
      </Button>
    );
  }

  return (
    <div>
      <Flex justify="center" align="center" marginTop={5}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Flex>
      <Flex justify="center" align="center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Flex>
      <Flex justify="center" align="center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Flex>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handleClick(i) {
    if (currentSquares[i] || calculateWinner(currentSquares)) {
      return;
    }
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (currentSquares.every(Boolean)) {
    status = `Scratch: Cat's game`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((squares, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <Button colorScheme='teal' mb={2} onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    );
  });

  return (
    <ChakraProvider>
      <Box>
        <Box justify="center" align="center" mt={10}>{status}</Box>
        <Board squares={currentSquares} onClick={handleClick} />
        <Flex justify='center' ms={360} mt={-40}>
          <Button onClick={restart} colorScheme='red' >
            Restart
          </Button>
        </Flex>
        <Box justify="center" align="center" ms={-430} mt={-10}>
          <ol>{moves}</ol>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

function calculateWinner(squares) {
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
}

function App() {
  return <Game />;
}

export default App;
