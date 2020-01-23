import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { isFulfilled } from "q";

class Slot extends React.Component {
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [null, null, null, null, null, null, null, null, null],
      turn: "X",
      conclusion: "It is X's turn",
      X_win: 0,
      O_win: 0,
    };
  }

  handleClick(i) {
    //Check to see if the current slot is filled
    var new_squares = [...this.state.squares];
    var next_turn = this.state.turn;

    if (new_squares[i]) {
      this.setState({
        squares: new_squares,
        turn: next_turn,
        conclusion: "It is " + next_turn + "turn"
      });
    } else if (this.state.turn == "X") {
      new_squares[i] = "X";
      next_turn = "O";
    } else {
      new_squares[i] = "O";
      next_turn = "X";
    }

    this.setState({
      squares: new_squares,
      turn: next_turn,
      conclusion: "It is " + next_turn + "'s " + "turn"
    });
  }

  reset() {
    this.setState({
      squares: [null, null, null, null, null, null, null, null, null],
      turn: "X",
      conclusion: "It is X's turn"
    });
  }

  render() {
    var statement = this.state.conclusion;
 
    let winnerX = {
      first:
        this.state.squares[0] == "X" &&
        this.state.squares[1] == "X" &&
        this.state.squares[2] == "X",
      second:
        this.state.squares[3] == "X" &&
        this.state.squares[4] == "X" &&
        this.state.squares[5] == "X",
      third:
        this.state.squares[6] == "X" &&
        this.state.squares[7] == "X" &&
        this.state.squares[8] == "X",
      fourth:
        this.state.squares[0] == "X" &&
        this.state.squares[3] == "X" &&
        this.state.squares[6] == "X",
      fifth:
        this.state.squares[1] == "X" &&
        this.state.squares[4] == "X" &&
        this.state.squares[7] == "X",
      sixth:
        this.state.squares[2] == "X" &&
        this.state.squares[5] == "X" &&
        this.state.squares[8] == "X",
      seventh:
        this.state.squares[0] == "X" &&
        this.state.squares[4] == "X" &&
        this.state.squares[8] == "X",
      eighth:
        this.state.squares[6] == "X" &&
        this.state.squares[4] == "X" &&
        this.state.squares[2] == "X"
    };

    let winnerO = {
      first:
        this.state.squares[0] == "O" &&
        this.state.squares[1] == "O" &&
        this.state.squares[2] == "O",
      second:
        this.state.squares[3] == "O" &&
        this.state.squares[4] == "O" &&
        this.state.squares[5] == "O",
      third:
        this.state.squares[6] == "O" &&
        this.state.squares[7] == "O" &&
        this.state.squares[8] == "O",
      fourth:
        this.state.squares[0] == "O" &&
        this.state.squares[3] == "O" &&
        this.state.squares[6] == "O",
      fifth:
        this.state.squares[1] == "O" &&
        this.state.squares[4] == "O" &&
        this.state.squares[7] == "O",
      sixth:
        this.state.squares[2] == "O" &&
        this.state.squares[5] == "O" &&
        this.state.squares[8] == "O",
      seventh:
        this.state.squares[0] == "O" &&
        this.state.squares[4] == "O" &&
        this.state.squares[8] == "O",
      eighth:
        this.state.squares[6] == "O" &&
        this.state.squares[4] == "O" &&
        this.state.squares[2] == "O"
    };

    if (
      winnerX.first ||
      winnerX.second ||
      winnerX.third ||
      winnerX.fourth ||
      winnerX.fifth ||
      winnerX.sixth ||
      winnerX.seventh ||
      winnerX.eighth
    ) {
      statement = "The Winner Is X";
      this.setState(state => ({
        X_win: state.X_win + 1
      }))
      alert("The Winner Is X. Game Reset.");
      this.reset();
    } else if (
      winnerO.first ||
      winnerO.second ||
      winnerO.third ||
      winnerO.fourth ||
      winnerO.fifth ||
      winnerO.sixth ||
      winnerO.seventh ||
      winnerO.eighth
    ) {
      statement = "The Winner Is O";
      this.setState(state => ({
        O_win: state.O_win + 1
      }))
      alert("The Winner Is O. Game Reset.");
      this.reset();
    }

    return (
      <div>
        <br />
        <h1 className="center">Welcome to Tic Tac Toe</h1>

        <div className="flex-container">
          <Slot
            value={this.state.squares[0]}
            onClick={() => this.handleClick(0)}
          />
          <Slot
            value={this.state.squares[1]}
            onClick={() => this.handleClick(1)}
          />
          <Slot
            value={this.state.squares[2]}
            onClick={() => this.handleClick(2)}
          />
        </div>
        <div className="flex-container">
          <Slot
            value={this.state.squares[3]}
            onClick={() => this.handleClick(3)}
          />
          <Slot
            value={this.state.squares[4]}
            onClick={() => this.handleClick(4)}
          />
          <Slot
            value={this.state.squares[5]}
            onClick={() => this.handleClick(5)}
          />
        </div>
        <div className="flex-container">
          <Slot
            value={this.state.squares[6]}
            onClick={() => this.handleClick(6)}
          />
          <Slot
            value={this.state.squares[7]}
            onClick={() => this.handleClick(7)}
          />
          <Slot
            value={this.state.squares[8]}
            onClick={() => this.handleClick(8)}
          />
        </div>
        <br />
        <div className="center">{statement}</div>
        <br />
        <button className="center-button" onClick={() => this.reset()}>
          Reset
        </button>
        <br />
        <div className="center">X's victory : {this.state.X_win} </div>
        <div className="center">O's victory : {this.state.O_win} </div>
      </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById("root"));
