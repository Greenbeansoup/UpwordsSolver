import board from './resources/Blankboard.png';
import underTile from './resources/UpwordsUndertile.png';
import './App.css';
import styled from 'styled-components';
import TileImage from './resources/Tile.png';
import TileSpace from './TileSpace.js';
import Tile from './Tile.js';
import React from 'react';
import SolveButton from './SolveButton.js';

const Grid = styled.div`
  background-image: url(${props => props.img});
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  flex: ${(props) => props.size};
`;

const ColumnBuilder = (size, letter, newLettersColMap, solveCount, img = underTile) => {
  return (
    [...Array(size)].map((e, i) =>
      <Col size={1} img={img} key={i}>
        <TileSpace letter={letter} maxStack={5}  newLetter={(newLettersColMap === undefined) ? null : newLettersColMap.get(i)} autoLetter={newLettersColMap !== undefined && newLettersColMap.get(i) !== undefined} clickId={solveCount}/>
      </Col>)
  );
}

const RowBuilder = (size, letter, newLettersRowMap, solveCount) => {
  return (
    [...Array(size)].map((e, i) =>
      <Row key={i}>
        {ColumnBuilder(size, letter, newLettersRowMap.get(i), solveCount)}
      </Row>
    )
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLetter: "A",
      newLettersRowMap: new Map(),
      solveCount: 0,
      grid: new Map(), // all of a sudden realizing maybe this component should be the one keeping track of stacks... hmm
      hand: []
    };

    this.letterTileClick = this.letterTileClick.bind(this);
    this.testSolve = this.testSolve.bind(this);
    this.solveClickHandler = this.solveClickHandler.bind(this);
  }

  letterTileClick(e) {
    if (this.state.currentLetter !== e.currentTarget.getAttribute('data-letter')) {
      this.setState({
        currentLetter: e.currentTarget.getAttribute('data-letter')
      });
    }
  }

  solveClickHandler = async () => {
    let fakeBoard = [[["X"], ["X"], ["X"], ["E"], ["R"], ["*"], ["*"], ["*"], ["*"], ["*"]], [["C"], ["O"], ["N"], ["S"], ["T"], ["R"], ["U"], ["C"], ["T"], ["I"]], [["O"], ["N"], ["*"], ["*"], ["*"], ["*"], ["*"], ["*"], ["*"], ["*"]]];
    let fakeHand = ["U", "N", "D"]; //currently need to refactor to allow a straightforward retrieval of the actual board state.

    let boardState = {
      grid: fakeBoard,
      hand: fakeHand
    }

    let header = new Headers();
    header.append("Content-Type", "application/json");
    
    let response = await fetch('http://localhost:8080/upwords/solve', {
      method: 'POST',
      headers: header,
      body: JSON.stringify(boardState)
    }).then(response => response.json()).then(data => {
      let grid = data.grid;
      let rowMap = new Map();
      for (let i = 0; i < grid.length; i++) {
        let colMap = new Map();
        rowMap.set(i, colMap);
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j][0] !== '*') colMap.set(j, grid[i][j][grid[i][j].length - 1]);
        }
      }
      this.setState({
        newLettersRowMap: rowMap,
        solveCount: this.state.solveCount + 1
      })
    });
  }

  testSolve = () => { // TODO: get rid of this. It's useful for testing the solve button without having the backend up.
    let rowMap = this.state.newLettersRowMap;
    let colMap = new Map();
    colMap.set(1, 'A');
    rowMap.set(1, colMap);

    this.setState({
      newLettersRowMap: rowMap,
      solveCount: this.state.solveCount + 1
    });
  }

  render() {
    console.log(window.innerWidth);
    return (
      <div className="App">
        <header className="App-header">
          <Grid className="selectorTiles" width={295}>
            <Row>
              <Col size={5}>
                <Tile img={TileImage} letter="A" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="D" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="G" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="J" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="M" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="P" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="S" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="V" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="Y" alt="Tile" clickHandler={this.letterTileClick} />
              </Col>
              <Col size={5}>
                <Tile img={TileImage} letter="B" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="E" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="H" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="K" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="N" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="Qu" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="T" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="W" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="Z" alt="Tile" clickHandler={this.letterTileClick} />
              </Col>
              <Col size={5}>
                <Tile img={TileImage} letter="C" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="F" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="I" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="L" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="O" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="R" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="U" alt="Tile" clickHandler={this.letterTileClick} />
                <Tile img={TileImage} letter="X" alt="Tile" clickHandler={this.letterTileClick} />
              </Col>
            </Row>
          </Grid>

          <Grid className="tileIndicator">
            <Tile img={TileImage} letter={this.state.currentLetter} />
          </Grid>
          
          <Grid img={board} width={Math.max(Math.min(window.innerWidth, window.innerHeight), 720)} height={Math.max(Math.min(window.innerWidth, window.innerHeight), 720)}>
            {RowBuilder(10, this.state.currentLetter, this.state.newLettersRowMap, this.state.solveCount)}
          </Grid>
          <Grid className="tilesInHand">
            <Row>
              <Col>
                <SolveButton clickHandler={this.solveClickHandler}/>
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
                <TileSpace letter={this.state.currentLetter} maxStack={1} />
              </Col>
            </Row>
          </Grid>
        </header>
      </div>
    );
  }
}

export default App;
