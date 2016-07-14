var Elevator = (function() {
  
  function Elevator(floorArray) {
    this.floors = floorArray;
    this.floorOrderArr = [];
    this.floorCurrent = 1;
    this.speed = 1500;
    this.callBackArr = [];
    
    this.elevatorObj = {
      moving: 0,
      current: this.floors[0]
    };
  }
  
  Elevator.prototype.floorSelect = function(floorSelection) {
    if($.inArray(floorSelection, this.floorOrderArr)==-1) {
      this.floorOrderArr.push(floorSelection);
    }
    if(!this.elevatorObj.moving) {
      moveElevator(this);
    }
    return this;
  };
  
  Elevator.prototype.callBack = function(callBack) {
    this.callBackArr.push(callBack);
    return this;
  };
  
  function moveElevator(eControl) {
    if(eControl.floorOrderArr === 0) {
      dispatchEvent(eControl, "here");
      return;
    }
    if(eControl.floorOrderArr[0] == eControl.floorCurrent) {
      eControl.elevatorObj.moving = 0;
      eControl.floorOrderArr.splice(0, 1);
      window.clearInterval(eControl.interval);
      eControl.interval = null;
      dispatchEvent(eControl, "here");
      stop(eControl);
      return;
    }
    if(eControl.elevatorObj.moving) {
      eControl.elevatorObj.current = eControl.floorCurrent += eControl.elevatorObj.moving;
      dispatchEvent(eControl, "level");
      return;
    }
    if (eControl.floorOrderArr[0] > eControl.floorCurrent) {
      eControl.elevatorObj.moving = +1;
      dispatchEvent(eControl, "up");
      check(eControl);
    } else if (eControl.floorOrderArr[0] < eControl.floorCurrent) {
      eControl.elevatorObj.moving = -1;
      dispatchEvent(eControl, "down");
      check(eControl);
    } else {
      return;
    }
  }
  
  function dispatchEvent(eControl, event) {
    for (var i = 0; i < eControl.callBackArr.length; i++) {
      eControl.callBackArr[i](eControl, event);
    }
  }
  
  function stop(eControl) {
    if (eControl.floorOrderArr.length > 0) {
      //Set Timeout to let people get off 
      setTimeout(function () {
        check(eControl);
      }, 2000);
      }
  }
  
  function check(eControl) {
    if (!eControl.interval) {
      eControl.interval = window.setInterval(function() { moveElevator(eControl); }, eControl.speed);
    }
  }
  return Elevator;
})();

$(document).ready(function () {
    updateFloor();
  
    $('.button').click(function() {
        $(this).addClass('button-selected');
        floorSelection = $(this).text();
        nordStromElevator.floorSelect(floorSelection);
    });
  
    $(window).resize(function() {
        updateFloor();
    });
});

function updateFloor() {
  $('.floor').height($(window).height());
}

var nordStromElevator = new Elevator([1,2,3,4]);
nordStromElevator.callBack(function upDownCallBack(eControl, e) {
    if(e=="up") {
        $('.up-light').addClass('active');
    } else if(e=="down") {
        $('.down-light').addClass('active');
    } else if(e=="here") {
      $('.down-light').add('.up-light').removeClass('active');
      $('[data-id=' + eControl.floorCurrent + ']').removeClass('button-selected');
    }
}).callBack(function buttonCallBack(eControl, e) {
  if(e=="level") {
    $('.floor-display').text(eControl.floorCurrent);
    $(".floorHolder").css("bottom", -1 * (eControl.floorOrderArr[0] - 1) * $(window).height());
  }
});