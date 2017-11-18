import React from 'react';

class Square extends React.Component{
  render(){
    return(
        <button className="square" onClick={this.props.onClick}>{this.props.value}</button> // this.props.value ở đây là giá trị i bên renderSquare(i) của Board
      );
  }
}

export default Square;