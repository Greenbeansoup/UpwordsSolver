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
            this.setState({
                numTiles: this.state.numTiles + 1
            });
        }
    }

    onDoubleClick = () => {
        if (this.state.numTiles > 0) {
            this.setState({
                numTiles: this.state.numTiles - 1
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

    render() {
        const stack = this.state.tileStack;
        if (stack.length === 0) {
            stack.push(<Tile img={UnderTile} alt="Bottom" key={0}/>);
            this.setState({
                tileStack: stack
            });
        }
        if (stack.length - 1 < this.state.numTiles) {
            
            if (this.state.numTiles === 1) {
                stack.push(<Tile img={TileImage} letter={this.state.letterTile} alt="Tile" key={this.state.numTiles}/>);
                this.setState({
                    tileStack: stack
                });
            }
            else {
                stack.push(<Tile img={TileImage} count={this.state.numTiles} letter={this.state.letterTile} alt="Tile" key={this.state.numTiles}/>);
                this.setState({
                    tileStack: stack
                });
            }
        }
        if (stack.length - 1 > this.state.numTiles) {
            stack.pop();
            this.setState({
                tileStack: stack
            });
        }

        return (
            <div onClick={this.clickHandler}>
                {stack[stack.length - 1]}
            </div>
        )
    }
}

export default TileSpace