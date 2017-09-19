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

describe("Los Angeles Train", function() {

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

describe("San Franisco Train", function() {

	it("should have 100 seats available", function(){
		assert.equal(app.sanFrancisco.seats, 380);
	})
	
	it("should have traveled 0 miles", function(){
		assert.equal(app.sanFrancisco.distanceTraveled, 0);
	})	
	
	it("should throw an error because there arent enough seats", function(){
		assert.equal(app.sanFrancisco.reserveSeats(104), error);
	})	

});

// for mocha testing
losAngeles.run("San Francisco"); // distanceTraveled for losAngeles train should be 380
losAngeles.reserveSeats(9); // seats on losAngeles train should be 91
losAngeles.remainingSeats() // should be 91
losAngeles.returnSeats() // should be back at 100
sanFrancisco.seats // should equal 100
sanFrancisco.distanceTraveled // should equal 0
sanFrancisco.reserveSeats(102) // should throw error