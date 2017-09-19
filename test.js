var assert = require('assert');
var app = require('./app.js');

describe("Variables", function() {

	it("should return Los Angeles initially", function(){
		assert.equal("Los Angeles", departureCity);
	})
	
	it("should return San Francisco initially", function(){
		assert.equal("Los Angeles", destinationCity);
	})	
	
	it("should return 1 initially", function(){
		assert.equal(1, tickets);
	})		

});

describe("Train", function() {

	it("should have traveled 380 miles", function(){
		assert.equal(app.losAngeles.distanceTraveled, 380);
	})
	
	it("should have 91 seats", function(){
		assert.equal(app.losAngeles.seats, 91);
	})	
	
	it("should have 91 seats left after reservine", function(){
		assert.equal(app.losAngeles.seats, 91);
	})	
	
	it("should add 9 seats back and be at 100", function(){
		assert.equal(app.losAngeles.seats, 100);
	})			

});

// for mocha testing
losAngeles.run("San Francisco"); // distanceTraveled for losAngeles train should be 380
losAngeles.reserveSeats(9); // seats on losAngeles train should be 91
losAngeles.remainingSeats() // should be 91
losAngeles.returnSeats() // should be back at 100