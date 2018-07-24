import * as React from 'react';
import './App.css';
import Dial from './dial';
import Mark from './mark.png';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 250,
            y: 150
        }

        this.multiplier = 5;
        this.size = {
            height: 300,
            width: 500
        }
        this.canvas = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('touchmove', this.preventDefault, { passive: false });
        if (this.canvas.current !== null) {
            this.ctx = this.canvas.current.getContext('2d');
            this.fixDPI(this.canvas.current, this.ctx);
            this.ctx.strokeStyle = "#222";
            this.ctx.moveTo(this.state.x, this.state.y);
        }
    }

    fixDPI(canvas, ctx) {
        const dpr = window.devicePixelRatio || 1;
        const bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

        if (dpr !== bsr) {
            const ratio = dpr/bsr;
            const oldWidth = canvas.width;
            const oldHeight = canvas.height;

            canvas.width = oldWidth * ratio;
            canvas.height = oldHeight * ratio;

            canvas.style.width = oldWidth + 'px';
            canvas.style.height = oldHeight + 'px';

            ctx.scale(ratio, ratio);
        }
    }

    handleX = (distance) => {
        const { x, y } = this.state;
        const newX = Math.max(0, Math.min(this.size.width,
            x - distance * this.multiplier
        ));
        if (this.ctx !== null) {
            this.ctx.lineTo(newX, y);
            this.ctx.stroke();

            this.setState({
                x: newX
            });
        }
    }

    handleY = (distance) => {
        const { x, y } = this.state;
        const newY = Math.max(0, Math.min(this.size.height,
            y - distance * this.multiplier
        ));
        if (this.ctx !== null) {
            this.ctx.lineTo(x, newY);
            this.ctx.stroke();

            this.setState({
                y: newY
            });
        }
    }

    clear = () => {
        if (this.ctx !== null) {
            this.ctx.closePath();
            this.ctx.fillStyle = "white";
            this.ctx.clearRect(0, 0, this.size.width, this.size.height);
            this.ctx.beginPath();
        }
    }

    preventDefault = (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div id="App">
                <p>This needs a touchscreen</p>
                <div className="canvasContainer">
                    <canvas width="500" height="300" ref={this.canvas} />
                    <img src={Mark}
                        className="etch-mark"
                        style={ {left: this.state.x - 2, top: this.state.y - 2} }
                    />
                </div>
                <button onClick={this.clear}>clear</button>
                <div className="dials">
                    <Dial update={this.handleY} />
                    <Dial update={this.handleX} />
                </div>
            </div>
        );
    }
}

export default App;
