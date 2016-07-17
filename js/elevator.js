// DOM Hierarchy
/*
*  elevator
*       floorContainer
*       elevatorPanel
*           displayPanel
*               curerntFloor
*               lightDirection
*           floorBtns
*/

// Tip: 
// Never access 'refs' inside of any component's render method - 
// or while any component's render method is even running anywhere in the call stack. 'refs' reach to real DOM node
// 'PropTypes' defines type and which props are required.

var React = require('react');
var ReactDOM = require('react-dom');

var FloorContainer = React.createClass({
    render: function(){
        return (
            <div>
                <div className='floorContainer'>
                    <div id="floor4" className="floor">4</div>
                    <div id="floor3" className="floor">3</div>
                    <div id="floor2" className="floor">2</div>
                    <div id="floor1" className="floor">1</div>
                </div>
            </div>
        );
    }
});



var ElevatorPanel = React.createClass({
    render: function(){
        return (
            <div className='elevatorPanel'>
                <DisplayPanel />
                <FloorBtns />
            </div>
        );
    }
});



var DisplayPanel = React.createClass({
    render: function(){
        return (
            <div className='displayPanel'>
                <div className="currentFloor">1</div>

                <div className='lightDirection'>
                    <div className="up"></div>
                    <div className="down"></div>
                </div>
            </div>
        );
    }
});



var FloorBtns = React.createClass({
    render: function(){
        var leftBtns,
            rightBtns,
            eachVal,
            className = 'btns',
            updateBtnColor = this.props.updateBtnColor,
            btnsArr=[ [3,4], [2,1] ];


        var btns = btnsArr.map(function(num, i) {
            eachVal = i===1 ? num[i-1] : num[i+1];

            leftBtns =  <div onClick={updateBtnColor} key={num[i]} className={className} data-target={ "#floor"+ num[i] } > {num[i]} </div>;
            rightBtns = <div onClick={updateBtnColor} key={eachVal} className={className} data-target={ "#floor"+ eachVal }> {eachVal} </div>;

            if(i === 1){
                return (
                    <div key={i} className='floorBtns'>
                        {leftBtns}
                        {rightBtns}
                    </div>
                );
            } else {
                return (
                    <div key={i} className='floorBtns'>
                        {leftBtns}
                        {rightBtns}
                    </div>
                 );
            }

        });

        return (
            <div>
                {btns}
            </div>
        );
    }
});


var Elevator = React.createClass({
    getInitialState: function() {
        return {
            pos: 1,
            btnColor: false
        };
    },
    updateBtnColor: function () {
        this.setState({
            btnColor: true
        });
        console.log('hello');
    },
    render: function(){
        return (
            <div>
                <FloorContainer />
                <ElevatorPanel updateBtnColor={this.updateBtnColor} />    
            </div>
        );
    }
});


ReactDOM.render( <Elevator /> , document.getElementById('Elevator') );


