import React, {Component} from 'react';
import  "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diceValue: 0,
            position: 0,
            startGame: false,
            gameOver: false
        };

        this.snakes = new Map();
        this.snakes.set(23, 9);
        this.snakes.set(13, 6);

        this.ladders = new Map();
        this.ladders.set(10, 20);
    }

    getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {top: _y, left: _x};
    }

    placeDiv(x_pos, y_pos) {
        var d = document.getElementById('player');
        d.style.left = x_pos + 'px';
        d.style.top = y_pos + 'px';
    }


    rollDice = () => {
        const diceValue = Math.floor((Math.random() * 6) + 1);
        this.setState({"diceValue": diceValue});
        if (this.state.position + diceValue <= 24) {
            this.setState({position: this.state.position + diceValue});
            if (this.state.position + diceValue === 24) {
                this.setState({gameOver: true});
            } else if (this.snakes.has(this.state.position + diceValue)) {
                this.setState({position: this.snakes.get(this.state.position + diceValue)});
            } else if (this.ladders.has(this.state.position + diceValue)) {
                this.setState({position: this.ladders.get(this.state.position + diceValue)});
            }
        }

    }

    makeFullScreen = () => {
        var el = document.documentElement,
            rfs = el.requestFullscreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullscreen
            ;

        rfs.call(el);
    }

    startGame = () => {
        this.makeFullScreen();
        this.setState({startGame: true})
    }

    renderGame = () => {
        return (<div className="app">

            <div className="flex-box">
                <div className="flex-item" id="24">24</div>
                <div className="flex-item" id="23">23</div>
                <div className="flex-item" id="22">22</div>
                <div className="flex-item" id="21">21</div>

                <div className="flex-item" id="17">17</div>
                <div className="flex-item" id="18">18</div>
                <div className="flex-item" id="19">19</div>
                <div className="flex-item" id="20">20</div>

                <div className="flex-item" id="16">16</div>
                <div className="flex-item" id="15">15</div>
                <div className="flex-item" id="14">14</div>
                <div className="flex-item" id="13">13</div>

                <div className="flex-item" id="9">9</div>
                <div className="flex-item" id="10">10</div>
                <div className="flex-item" id="11">11</div>
                <div className="flex-item" id="12">12</div>

                <div className="flex-item" id="8">8</div>
                <div className="flex-item" id="7">7</div>
                <div className="flex-item" id="6">6</div>
                <div className="flex-item" id="5">5</div>

                <div className="flex-item" id="1">1</div>
                <div className="flex-item" id="2">2</div>
                <div className="flex-item" id="3">3</div>
                <div className="flex-item" id="4">4</div>
            </div>
            <div id="player">P</div>
            <button onClick={this.rollDice} disabled={this.state.gameOver}>Roll Dice</button>
            diceValue= {this.state.diceValue} position= {this.state.position}
            {this.state.gameOver && "Game Over"}
            <img id="snake" alt="snake"
                 src="http://orig04.deviantart.net/6e1c/f/2014/157/1/4/craig_by_porygon2z-d719i6j.png"/>
            <img id="snake2" alt="snake"
                 src="http://orig04.deviantart.net/6e1c/f/2014/157/1/4/craig_by_porygon2z-d719i6j.png"/>
            <img id="ladder" alt="ladder" src="http://pngimg.com/uploads/ladder/ladder_PNG14784.png"/>
        </div>);
    }

    componentDidUpdate() {
        var currentPosition = this.state.position.toString();
        var cord = this.getOffset(document.getElementById(currentPosition));
        this.placeDiv(cord.left, cord.top);
    }

    renderStartButton = () => {
        return (<button onClick={this.startGame} >Start Game</button>);
    }

    render() {
        return (
            <div>
                {!this.state.startGame && this.renderStartButton()}

                {this.state.startGame && this.renderGame()}
            </div>
        );
    }
}

export default App;
