import React, { Component } from 'react';

class Dynamite extends React.Component{
    constructor(props){
        super(props);
        var time = new Date();
        this.state = {
            counter:0,
            message: "Safe",
            lastClickTime: time.getTime(),
        }
    }

    handleClick(){
        var newCount = this.state.counter + 1;
        var rand = Math.ceil(Math.random()*10);
        var newMessage = newCount%rand ===0 ? "Dynamite" : "Safe";

        var currentTime = new Date();
        currentTime = currentTime.getTime();
        if(currentTime -this.state.lastClickTime <  1000*5 &&
            this.state.message === "Dynamite"){
            alert("Boom");
        }

        this.setState({
            counter: newCount,
            message: newMessage,
            lastClickTime: currentTime,
        })
    }

    render(i){
        var name = 'Button '+ i;
        return( <button id = {name} className = "Dynamite"
                        onClick = {() => this.handleClick()}
        >
            {this.state.message}
        </button>)
    }
}


export default Dynamite;