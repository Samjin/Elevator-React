var Elevator = (function($) {
  'use strict';

  function Elevator(floorContainer, btns) {
    this.floorContainer = floorContainer;
    this.btns = btns;
    this.floorArray = Array.prototype.slice.call(this.floorContainer.children()).reverse();
    this.colorArray = [];
  }

  $(window).resize(function() {
    Elevator.floorHeight = $(this).height();
  });

  Elevator.prototype = function() {
    var self,
      current;
    var _config = {
      duration: 1500,
      easing: 'linear',
      lightOff: 'rgb(92, 92, 92)', // #5c5c5c
      upColor: 'rgb(46, 204, 113)', // #2ecc71 green
      downColor: 'rgb(231, 76, 60)' // #E74C3C red
    };
    var init = function() {
      self = this;
      //set first floor pos, comparing it with targeted floor pos click.
      current = $(self.floorArray[0]).offset().top;
      self.floorContainer.scrollTop(self.floorContainer[0].scrollHeight);
      _clickBtn.call(self);
    };

    var _clickBtn = function() {
      this.btns.on('click', _onclick);
    };

    var _onclick = function() {
        var thisBtn = $(this);
        var set = {
          thisBtn: thisBtn, //not set at this moment
          prev: current, //current is defined in init
          motion: 0,
          targetFloorID: $(thisBtn.data('target')),
          upColor: function() {
            $('.up').css('backgroundColor', _config.upColor);
          },
          downColor: function() {
            $('.down').css('backgroundColor', _config.downColor);
          },
          upOff: function() {
            $('.up').css('backgroundColor', _config.lightOff);
          },
          downOff: function() {
            $('.down').css('backgroundColor', _config.lightOff);
          }
        };
        thisBtn.css('backgroundColor', '#fff');

        current = set.targetFloorID[0].offsetTop; //update current pos
        if (current < set.prev) {
          self.colorArray.push(set.upColor);
          set.motion = 1;
        } else if (current > set.prev) {
          self.colorArray.push(set.downColor);
          set.motion = -1;
        } else {
          set.thisBtn.css('backgroundColor', 'none');
        }
        if ($('.up').css('backgroundColor') === _config.lightOff &&
          $('.down').css('backgroundColor') === _config.lightOff) {
          if (set.motion !== 0) {
            self.colorArray[0]();
            self.colorArray.shift();
          }
        }
        _move.call(self, set);
      },

      _move = function(set) {
        var complete = {
          duration: _config.duration,
          easing: _config.easing,
          complete: function() {
            set.thisBtn.css('backgroundColor', 'none');
            $('.currentFloor').text(parseInt(set.thisBtn.text(), 10));
            set.upOff();
            set.downOff();
            current = set.targetFloorID[0].offsetTop;

            if (typeof self.colorArray[0] !== 'undefined') {
              self.colorArray[0]();
              self.colorArray.shift();
            }
          }
        };
        if (set.motion !== 0) {
          self.floorContainer.delay(_config.duration).animate({
            scrollTop: set.targetFloorID[0].offsetTop
          }, complete);
        }

      };

    // public member
    return {
      init: init
    };
  }();
  return Elevator;
})(jQuery);

$(function() {
  "use strict";
  var elevator = new Elevator($('.floorContainer'), $('.btns'));
  elevator.init();
});