const Cell = (props) => {
  const classlist = 'cell' + (props.value ? ' cell-' + props.value : '');
  return (
    <div className={classlist} onClick={props.onClick}>
      {props.value}
    </div>
  );
};

const Board = (props) => {
  const board = props.cells.map((cell, i) => {
    return (
      <Cell
        key={i}
        value={cell}
        onClick={() => props.onClick(i)}
      />
    );
  });
  return (
    <div className="board">
      <div className="cells">
        {board}
      </div>
    </div>
  );
};

// should i create a PLayer class instead?
const Players = (props) => {
  return (
    <div className="players">
      <div className={'player player-x' + (props.xIsNext ? ' player-active' : '')}>
        X <span className="player__points">{props.points.X}</span>
      </div>
      <div className={'player player-o' + (props.xIsNext ? '' : ' player-active')}>
        O <span className="player__points">{props.points.O}</span>
      </div>
    </div>
  );
};

const Status = (props) => {
  let content = '';
  if (props.cells.filter(x => x).length === 0) {
    content = 'Start game or select player';
  } else if (props.winner) {
    content = 'Game over';
  } else {
    content = (props.xIsNext ? 'X' : 'O') + ' Turn';
  }
  return (
    <div className="status">{content}</div>
  );
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      cells: Array(9).fill(null),
      points: {
        X: 0,
        O: 0,
      },
      xIsNext: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
  }
  handleClick(i) {
    const cells = this.state.cells.slice();
    if (declareWinner(cells) || cells[i]) {
      return;
    }
    cells[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      cells,
      xIsNext: !this.state.xIsNext,
    });
  }
  restart() {
    this.setState({
      cells: Array(9).fill(null),
      xIsNext: true,
    });
  }
  render() {
    const winner = declareWinner(this.state.cells);
    if (winner) {
      this.state.points[winner] += 1; //////////
      console.log(winner + ' wins');
    }
    return (
      <div className="game">
        <h1 className="page-title">React Tic Tac Toe</h1>
        <Players
          points={this.state.points}
          xIsNext={this.state.xIsNext}
        />
        <Status
          cells={this.state.cells}
          xIsNext={this.state.xIsNext}
          winner={winner}
        />
        <Board
          cells={this.state.cells}
          onClick={this.handleClick}
        />
        <button
          className="btn btn--restart"
          onClick={this.restart}
        >Restart Game</button>
      </div>
    );
  }
}

const declareWinner = (cells) => {
  const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCells.length; i++) {
    const [a, b, c] = winningCells[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};

ReactDOM.render(<Game />, document.getElementById('app'));
