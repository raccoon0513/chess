import './App.css';
import { useState, useEffect } from 'react';

function ChessSquare({col, row, cellColor, squaresize, piece}){ //컴포넌트문법, 첫글자 대문자 필수, 함수 외밖에 작성
  
  return(
    <div 
        className={`chessSquare col${col} row${row} ${cellColor}`}
        style={{
          width:`${squaresize}px`,
          height:`${squaresize}px`
        }}
      >
        <p
          className='innerSquareLocate'
        >{row}{col}</p>
        <div className='innerSquareBox'  style={{
          width : `${squaresize * 0.8}px`,
          height : `${squaresize * 0.8}px`,
          top:"50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
          
        } }>
          <p className='piece'>
          {piece}
        </p>
        </div>
        
      </div> 
  )

}
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const initialBoardState = [
    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
  ];

  let asciiADefault = 97

  //해상도 받아오기
  let isVertical = window.innerWidth >= window.innerHeight ? true:false;
  let squaresize = (!isVertical ? window.innerWidth : window.innerHeight) * 0.9 /8
  const board = Array(64).fill(null);

  const renderBoard = initialBoardState.map((piece, index) => {
    const colIndex = Math.floor(index / 8);
    const col = 8-colIndex;
    const rowIndex = index % 8;
    const row = String.fromCodePoint(rowIndex+asciiADefault);
    const isDark = (rowIndex + colIndex) % 2 === 1;
    
    const cellColor = isDark ? 'blackCell' : 'whiteCell';
    return(
      <ChessSquare 
        key={index}
        col={col}
        row={row}
        cellColor={cellColor}
        squaresize={squaresize}
        piece={piece}
        />
    )
   
  });
  return (
    <>
      <div className="App">
        <div
          className='chessBoard'
          style={{
            width : `${squaresize * 8}px`,
            height : `${squaresize * 8}px`
          }}
        >
          {renderBoard}
        </div>
      </div>

      {/* 말을 선택했을떄 보여지는 코드 */}
        <div 
        className='pickupedDiv'
        style={{
          width : `${squaresize*0.8}px`,
          height : `${squaresize*0.8}px`,
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px'
        }}
      >
        <p className='piece'></p>
      </div>
    </>
  );

  //TODO : 창크기 변화시 판 크기 변경
  

}

export default App;