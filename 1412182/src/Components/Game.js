import React from 'react';
import Board from './Board';

class Game extends React.Component {
    
        constructor() {
            
            let arr = new Array(3);
            for(let i = 0;i<3;i++){
                arr[i] = new Array(3).fill(null);
            }

            super();
            this.state = {
                history: [{
                squares: arr,
                
                }],
                stepNumber: 0, //stepNumber = history.length - 1
                xIsNext: true,
                checkWin:false,
                isReverse: false, // Thêm cờ isReverse để nhận biết hướng sắp xếp
                size: 5, //Kích thước của mảng
            };
         
        }
    
        handleClick(i,j) {
  
          console.log("stepNumber",this.state.stepNumber);
          const history = JSON.parse(JSON.stringify(this.state.history));
          console.log("history length",history.length); 
          const current = history[this.state.stepNumber];
          const squares = JSON.parse(JSON.stringify(current.squares));
  
          console.log('square', squares);
          if(squares[i][j] || this.state.checkWin){
            return;
          }
    
          squares[i][j] = this.state.xIsNext? 'X':'0';
          
          console.log('current', current);
          console.log('history', this.state.history);
          this.setState({
            // history: history.concat([{
            //   squares: squares,
            // }]), 
            history:history.push(squares),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          });

          console.log("stepNumber new:", this.state.stepNumber);
          console.log("history new",this.state.history);
          if(calculateWinner(squares,i,j)){
              this.setState({
                checkWin: true,
              });
          }
        }
    
        jumpTo(step){
          this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
          });
        }
    
        changeReverse(isReverse){
          this.setState({
            isReverse: !isReverse
          });
        }

        render() {
    
          const history = this.state.history;
          const current = history[this.state.stepNumber];
      
          const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key = {move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
    
          let status;
          if (this.state.checkWin) {
            status = 'Winner: ' + (this.state.xIsNext? 'O':'X');
          } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
          }
    
          return (
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i,j) => this.handleClick(i,j)}
                />
              </div>
              <div className="game-info">
                <div>{ status }</div>
                <ol reversed={this.state.isReverse ? 'reverse' :''}>{this.state.isReverse ? moves.reverse() : moves}</ol>
                <button onClick={() => this.changeReverse(this.state.isReverse)}>Reverse list</button>
              </div>
            </div>
          );
        }
      }

function calculateWinner(squares,x,y) {
    
    let count = 1;
    let i = x,j= y;
    // Đếm trên hàng ngang sang trái
    for(j;j>0;j--){
         
        if(squares[i][j-1]&& squares[i][j] === squares[i][j-1]){
            count++;
        }
        else
        {
            break;
        }
    }
    
    i=x;j=y;
    for(j;j<3;j++){
        if(squares[i][j+1]&& squares[i][j] === squares[i][j+1]){
            count++;
            continue;
        }
        break;
    }
    
    if(count >= 3){
        return squares[i][j];
    }
    
    else 
    {
        count = 1;
        i=x;j=y;
    }

    for(i=x;i>0;i--){
        if(squares[i-1]&&squares[i][j]===squares[i-1][j]){
            count++;
            continue;
        }
        break;
    }

    i=x;j=y;
    for(i=x;i<3;i++){
        
        if(squares[i+1]&&squares[i][j]===squares[i+1][j]){
            count++;
            continue;
        }
        break;
    }

    if(count >=3){
        return squares[i][j];
    }

    else{
        count = 1;
        i=x;j=y;
    }
   
    return null;
}

export default Game;