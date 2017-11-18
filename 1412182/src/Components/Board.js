import React from 'react';
import Square from './Square';

class Board extends React.Component{
    renderSquare(i,j){
        return <Square value={this.props.squares[i][j]} onClick={() => this.props.onClick(i,j)}/>
    }

    renderAllSquares(){
        const board = new Array(3);
        for(let i = 0;i<3;i++){
            board[i] = new Array(3).fill(null);
        }
        
        for(let i = 0; i < 3; i++){
            const arrRow = Array(3).fill(null);
            for(let j = 0; j < 3; j++){
                arrRow[j] = this.renderSquare(i,j);
            }
            board[i] = <div> {arrRow} </div>
        }
        return board;
    }

    render(){
        return(
        <div>
            <div>{this.renderAllSquares()}</div>
        </div>
        );
    }
}

export default Board;