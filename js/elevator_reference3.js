 $(function() {

    var Elevator = function() {
      this.currentFloor = 1;
      this.targetFloor = null;
      this.targetButton = null;
      this.queue = [];

      // pass elevator object to handler function 
      $('.floor-select-button').on('click', this, this.addToElevatorQueue);
    };

    Elevator.prototype.move = function(indicator) {
      
      // indicate which direction elevator is traveling
      $(indicator).animate({opacity:1}, 500);
      
      // travel time should take 2 seconds per floor
      var travelTime = Math.abs(this.currentFloor - this.targetFloor) * 2000;

      // $.scrollTo() is cool
      $.scrollTo('#floor' + elevator.targetFloor, travelTime, 'easeInExpo');

      // Make changes to all relevant objects upon "arrival" time // var travelTime
      setTimeout(function() {

        // indicate elevator has stopped moving
        $(indicator).animate({opacity:0}, 500);

        // set the currentFloor to the targetFloor // "we've arrived!"
        this.currentFloor = this.targetFloor;

        // reflect current floor change in the DOM
        $('#floor-number').fadeOut(500, function() {
          $('#floor-number').html(this.currentFloor).fadeIn(500);  
        }.bind(this));

        // remove glow class from elevator button
        this.targetButton.removeClass('glow');

        this.targetFloor = null;

        // re-apply click listener to 'that' button
        this.targetButton.on('click', elevator, this.addToElevatorQueue);
        
        // check to see if there are any floors still waiting to be visited
        this.checkQueue();

        // bind the elevator object to 'this'
      }.bind(this), travelTime);


    };

    Elevator.prototype.addToElevatorQueue = function(event) {

      var targetElevator = event.data;
      
      var button = $(this);
      
      // push the whole dom element into the queue
      targetElevator.queue.push(button);

      // add glow class to the button pushed
      button.addClass('glow');

      // remove click listener from 'this' button
      $(button).off('click');
      
      // check to see if there are any floors still waiting to be visited
      targetElevator.checkQueue();
    };

    Elevator.prototype.checkQueue = function() {
      
      if (this.queue.length && this.targetFloor === null) {
        
        // splice off the 0th index of the this.queue
        this.targetButton = this.queue.splice(0,1)[0];

        // extract the floor number from that dom element and cast to type 'number'
        this.targetFloor = Number(this.targetButton.text());
        
        // if the target is "above" the current floor
        if (this.targetFloor > this.currentFloor) {
          
          // pass that indicator's css ID to Elevator.prototype.move()
          this.move('#up-indicator');

        // if the target is "below" the current floor
        } else {
          // pass the ID
          this.move('#down-indicator');          
        }

      }
    };

    var elevator = new Elevator();

    // initiate the elevator on the "bottom" / first floor
    $.scrollTo('#floor1', 500, 'easeInExpo');


  });