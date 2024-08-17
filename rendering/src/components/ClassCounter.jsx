import React from 'react';

class ClassCounter extends React.Component{
    constructor(props){
        super(props); // invoke constructor of parent class
        this.state = {count : 0};
        // console.log(this);
    }

    incrementCount = function(){
        this.setState({count:this.state.count+1});
    }

    render(){
        return(
            <div>
                <h1>Hello World, {this.props.name}</h1>
                <h2>Count : {this.state.count}</h2>
                <button onClick={this.incrementCount.bind(this)}>Increment Count</button>
            </div>
        )
    }
}

export default ClassCounter;