import React from 'react';
import UnderTile from './resources/UpwordsUndertile.png';
import TileImage from './resources/Tile.png';
import Tile from './Tile.js';
import './TileSpace.css';

let timer;

class TileSpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numTiles: 0,
            letterTile: props.letter,
            tileStack: [],
        }
    }

    changeLetterTile(letter) {
        this.setState({
            letterTile: letter
        });
    }


    clickHandler = (event) => {
        clearTimeout(timer);
        if (event.detail === 1) {
            timer = setTimeout(this.onClick, 175);
        } else if (event.detail === 2) {
            this.onDoubleClick();
        }
    }

    onClick = () => {
        if (this.state.numTiles < this.props.maxStack) {
            let stack = this.state.tileStack;
            let tiles = this.state.numTiles + 1;
            if (tiles === 1) {
                stack.push(<Tile img={TileImage} letter={this.state.letterTile} alt="Tile" key={tiles}/>);
            }
            else {
                stack.push(<Tile img={TileImage} count={tiles} letter={this.state.letterTile} alt="Tile" key={tiles}/>);
            }
            this.setState({
                numTiles: tiles,
                tileStack: stack
            });
        }
    }

    onDoubleClick = () => {
        let stack = this.state.tileStack;
        let tiles = this.state.numTiles - 1;
        if (this.state.numTiles > 0) {
            stack.pop();
            this.setState({
                numTiles: tiles,
                tileStack: stack
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.letter !== this.props.letter) {
            this.setState({
                letterTile: this.props.letter
            })
        }
    }

    componentDidMount() {
        const stack = this.state.tileStack;
        stack.unshift(<Tile img={UnderTile} alt="Bottom" key={0}/>);
        this.setState({
            tileStack: stack
        });
    }

    render() {
        let stack = this.state.tileStack;
        return (
            <div onClick={this.clickHandler}>
                {stack[stack.length - 1]}
            </div>
        )
    }
}

export default TileSpace