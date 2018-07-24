import * as React from 'react';
import './dial.css'

const radius = 20;

class Dial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            angle: Math.PI,
            lastAngle: Math.PI,
            startAngle: Math.PI
        };

        this.dial = React.createRef();
    }

    handleTouchStart = (e) => {
        e.preventDefault();
        const touch = e.targetTouches[0];
        const dialCenter = this.getDialCenter();
        if (dialCenter != null && touch != null) {
            const {x : cx, y: cy} = dialCenter;
            const {clientX: tx, clientY: ty} = touch;
            const x = tx - cx;
            const y = ty - cy;
            const angle = Math.atan2(x, y)

            this.setState({
                lastAngle: this.state.angle,
                startAngle: angle
            })
        }
    }
    
    handleTouchMove = (e) => {
        e.preventDefault();
        const touch = e.targetTouches[0];
        const dialCenter = this.getDialCenter();
        if (dialCenter != null && touch != null) {
            const {x : cx, y: cy} = dialCenter;
            const {clientX: tx, clientY: ty} = touch;
            const x = tx - cx;
            const y = ty - cy;
            const touchAngle = Math.atan2(x, y);

            const {angle, lastAngle, startAngle} = this.state;
            const newAngle = lastAngle + (touchAngle - startAngle)

            this.setState({
                angle: newAngle
            });


            this.props.update(this.correctDiff(angle, newAngle));
        }
    }

    correctDiff(a, b) {
        let diff = b - a;
        while (diff < -Math.PI) {
            diff += 2*Math.PI;
        }
        while (diff >= Math.PI) {
            diff -= 2*Math.PI;
        }
        return diff;
    }

    getDialCenter() {
        const dial = this.dial.current;
        if (dial !== null) {
            const { left, top} = dial.getBoundingClientRect();
            return {x : left, y: top}
        }
        
        return null;
    }

    render() {
        const { angle } = this.state;
        return (
            <div className="dial"
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleTouchStart}
                >
                <svg width={radius*2} height={radius*2}>
                    <ellipse ref={this.dial}
                        cx={radius} cy={radius} rx={radius} ry={radius}
                    />

                    <clipPath id="lineClip">
                        <ellipse cx={radius} cy={radius} rx={radius} ry={radius} />
                    </clipPath>
                    <line
                        clipPath="url(#lineClip)"
                        x1={radius} y1={radius}
                        x2={radius + Math.sin(angle) * radius}
                        y2={radius + Math.cos(angle) * radius}
                    />
                </svg>
            </div>
        );
    }
}

export default Dial;