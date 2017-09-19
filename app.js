let departureCity = "Los Angeles", destinationCity = "San Francisco", tickets = 1;

function Train(location, destinations){
	this.location = location;
	this.destinations = destinations;
	this.seats = 100;
	this.distanceTraveled = 0;
}

Train.prototype.miles = function(){
	this.distanceTraveled += 10;
}

Train.prototype.returnSeats = function(){
	let unoccupied = 100 - this.seats;
	this.seats += unoccupied;
}

Train.prototype.run = function(destination){
	let destinationDistance = this.destinations[destination].distance, self = this;
	let intervalID = setInterval(function(){
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
	let failure = { capacity: "Cannot reserve " + amount + " seats. There are only " + this.seats + " seats left." }
	if(amount > this.seats || this.seats === 0){
		throw new Error(failure.capacity);
	} else {
		this.seats -= amount;		
	}
}

Train.prototype.remainingSeats = function(){
	return this.seats;
}

function getDepartureCity(){
	let element = document.getElementById("departure-city");
	departureCity = element.options[element.selectedIndex].value;
}

function getDestinationCity(){
	let element = document.getElementById("destination-city");
	destinationCity = element.options[element.selectedIndex].value;
}

function getTickets(){
	let element = document.getElementById("tickets");
	tickets = Number(element.options[element.selectedIndex].value);
}

function displayMessage(){
	let text = 	document.getElementById("message").textContent;
	document.getElementById("message").textContent = "Thank you. You have reserved " + tickets + " tickets for " + departureCity + " " + destinationCity + ".";
}

function remainingMessage(train){
	let text = document.getElementById("remaining").textContent;
	document.getElementById("remaining").textContent = "There are " + train.remainingSeats() + " seats left on this train.";
}

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function(){
	displayMessage();
	losAngeles.reserveSeats(tickets);
	remainingMessage(losAngeles);
})

let losAngeles = new Train("Los Angeles", {"San Francisco": { "distance": 380, "time": 330 }, "Portland": { "distance": 963, "time": 875 }, "Seattle": { "distance": 1135, "time": 1031 }});
//let portland = new Train("Portland", 100, {"Los Angeles": { "distance": 960, "time": 865 }, "San Francisco": { "distance": 636, "time": 182 }, "Seattle": { "distance": 173, "time": 170 }});
//let seattle = new Train("Seattle", 100, {"Los Angeles": { "distance": 1130, "time": 1040 }, "Portland": { "distance": 174, "time": 172 }, "San Francisco": { "distance": 807, "time": 755 }});
//let sanFrancisco = new Train("San Francisco", 100, {"Los Angeles": { "distance": 388, "time": 350 }, "Portland": { "distance": 636, "time": 578 }, "Seattle": { "distance": 807, "time": 733 }});