// addToQue
// goToFloor - > 
//     //goUp 
//     //goDown
// updateFloorNumber (only after arrive to floor)
// removeFromQue

// TODO, write in composition pattern. 
// TODO, write in pure JavaScript

var Elevator = {

    init: function() {
        this.floorContainer = $('.floorContainer');
        this.floors = Array.prototype.reverse.call($('.floor')).get(); //array [4 floor elems]
        this.totalHeight = $(window).height() * (this.floors.length - 1);
        resetPanelPos = this.floorContainer.scrollTop(this.totalHeight);

        this.state = { moving: 0 };
        this.btnClick();
    },

    btnClick: function() {
        var self = this;

        $('.elevatorPanel').on('click', '.btns', function() {
            var $thisBtn = $(this);

            self.stateCheck($thisBtn);
            self.indicator();

            if (self.state.moving !==0 ) {
                $thisBtn.addClass('lightUp');

                var control = {
                    duration: 1500,
                    complete: function () {
                        $thisBtn.removeClass('lightUp');
                        self.stateCheck($thisBtn);
                        var up = $('.up');
                        var down = $('.down');
                        console.log(self.state.moving);

                        if (self.state.moving === -1) {
                            up.addClass('green');
                            down.removeClass('red');
                        } else if (self.state.moving === 1) {
                            up.removeClass('green');
                            down.addClass('red');
                        }
                    }
                };

                self.floorContainer.delay(500).animate({
                    scrollTop: self.floorContainer.scrollTop() + self.nextFloorPos
                }, control );
            }
        });
    },


    stateCheck: function (thisBtn) {
        var clickedBtnNum = parseInt(thisBtn.data('target'), 10);
        var $floorTarget = $(this.floors[clickedBtnNum - 1]);
        this.nextFloorPos = $floorTarget.offset().top;
        this.prevFloorPos = $(this.floors[0]).offset().top;
        console.log(this.prevFloorPos, this.nextFloorPos);

        if (this.nextFloorPos === 0) this.state.moving = 0;
        if (this.nextFloorPos < this.prevFloorPos) this.state.moving = 1; //going up
        if (this.nextFloorPos > this.prevFloorPos) this.state.moving = -1; //going down
    },

    indicator: function () {
        var up = $('.up');
        var down = $('.down');

        if (this.state.moving === 1) {
            up.addClass('green');
            down.removeClass('red');
        } else if (this.state.moving === -1) {
            up.removeClass('green');
            down.addClass('red');
        }
    }
};



var elevator = Object.create(Elevator);
var nordstromElevator = $('.elevatorPanel');
elevator.init(nordstromElevator);

