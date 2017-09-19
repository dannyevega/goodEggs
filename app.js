// constructor function initializing the trains seats and distance traveled to a set value
function Train(location, destinations){
	this.location = location;
	this.destinations = destinations;
	this.seats = 100;
	this.distanceTraveled = 0;
}

// increases miles traveled by 10
Train.prototype.miles = function(){
	this.distanceTraveled += 10;
}

// makes seats available again after a train has ran and reached its destination because those seats will be getting off at the destination
Train.prototype.returnSeats = function(){
	var unoccupied = 100 - this.seats;
	this.seats += unoccupied;
}

// run function for train to reach to given destination and once it reaches the destination, it stops and increments the miles traveled as well as making seats availabl eagain
Train.prototype.run = function(destination){
	var destinationDistance = this.destinations[destination].distance, self = this;
	var intervalID = setInterval(function(){
		while(self.distanceTraveled < destinationDistance){
			self.miles();
			if(self.distanceTraveled >= destinationDistance){
				self.returnSeats();
				clearInterval(intervalID);
			}
		}
	}, 2000);
}

Train.prototype.reserveSeats = function(amount){
	var failure = { capacity: "Cannot reserve " + amount + " seats. There are only " + this.seats + " seats left." }
	if(amount > this.seats || this.seats === 0){
		throw new Error(failure.capacity);
	} else {
		this.seats -= amount;
	}
}

// returns how many seats are available
Train.prototype.remainingSeats = function(){
	return this.seats;
}

// initializes values for these variables if user doesnt select new values
var departureCity = "Los Angeles", destinationCity = "San Francisco", tickets = 1;

// grabs value of selected departure city
function getDepartureCity(){
	var element = document.getElementById("departure-city");
	departureCity = element.options[element.selectedIndex].value;
}

// grabs value of selected destination city
function getDestinationCity(){
	var element = document.getElementById("destination-city");
	destinationCity = element.options[element.selectedIndex].value;
}

// grabs value of selected ticket value
function getTickets(){
	var element = document.getElementById("tickets");
	tickets = Number(element.options[element.selectedIndex].value);
}

// shows how many tickets  a user reserved, departure city and destination
function displayMessage(){
	var text = document.getElementById("message").textContent;
	document.getElementById("message").textContent = "Thank you. You have reserved " + tickets + " tickets for " + departureCity + " " + destinationCity + ".";
}

// shows how many tickets are left on a train
function remainingMessage(train){
	var text = document.getElementById("remaining").textContent;
	document.getElementById("remaining").textContent = "There are " + train.remainingSeats() + " seats left on this train.";
}

// gets button element
var submitBtn = document.getElementById("submit");

// adds event listener when user clicks to display message and run functions
submitBtn.addEventListener("click", function(){
	displayMessage();
	losAngeles.reserveSeats(tickets);
	remainingMessage(losAngeles);
})

var losAngeles = new Train("Los Angeles", {"San Francisco": { "distance": 380, "time": 330 }, "Portland": { "distance": 963, "time": 875 }, "Seattle": { "distance": 1135, "time": 1031 }});
var sanFrancisco = new Train("San Francisco", {"Los Angeles": { "distance": 380, "time": 330 }, "Portland": { "distance": 963, "time": 875 }, "Seattle": { "distance": 1135, "time": 1031 }});

// for mocha testing
losAngeles.run("San Francisco"); // distanceTraveled for losAngeles train should be 380
losAngeles.reserveSeats(9); // seats on losAngeles train should be 91
losAngeles.remainingSeats() // should be 91
losAngeles.returnSeats() // should be back at 100
sanFrancisco.seats // should equal 100
sanFrancisco.distanceTraveled // should equal 0
sanFrancisco.reserveSeats(102) // should throw error
