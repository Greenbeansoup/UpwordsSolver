const Tile = props => {
    return (
        <div className="tileDiv" data-letter={props.letter} onClick={props.clickHandler}>
            <img src={props.img} className="underTile" alt={props.tileAlt} key={props.key}/>
            <div className="tileContents">
                <h2 className="letter">{props.letter}</h2>
                <h2 className="tileCount">{props.count}</h2>
            </div>
        </div>
    );
}

export default Tile;