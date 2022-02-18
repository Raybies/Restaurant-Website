//add core node packages to top, then 3rd party packages
const fs = require("fs"); //fs file system package
const express = require("express");

//to access util files & route files
const resData = require("../util/restaurant-data");

//require uuid for unique id
const uuid = require("uuid");
const router = express.Router();

//routes
router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

//user requests to 'post' data
router.post("/recommend", function (req, res) {
  const restaurant = req.body; //req.body is object that has all of the json {} file data
  //make a new property in the {obj of restaurant} called id
  restaurant.id = uuid.v4(); //v4 method generates a random id string

  const restaurants = resData.getStoredRestaurants(); //this is a method as its exported

  //add the data to the array
  restaurants.push(restaurant);

  /*  
        call function from util/restaurant-data.js pass into that 
        function the parameter of restaurants 
    */
  //method to go back to the external file
  resData.storeRestaurants(restaurants);

  //send back response to a different page
  res.redirect("/confirm");
});

router.get("/restaurants", function (req, res) {
  /* request object property query parameter in url ?order=somevalue*/
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== "asc" && order !== "desc") {
    /* if order is not set, then set to asc by default url ?order=asc*/
    order = "asc";
  };
  /* 
    check if nextOrder is already in desc, and if so, then switch order
    to asc
  */
  if (order === 'desc'){
      nextOrder = 'asc';
  };
  /*  
        open json file where we will store these recommendations
        by calling function getStoredRestaurants located in 
        util/restaurant-data.js
    */
  const storedRestaurants = resData.getStoredRestaurants();

  /* 
        sort() is a method that can be called on any array 
        but to do more complex sorting we pass an anonymous function 
        as a parameter, binary merge sort?, evaluate two restaurants 
        against each other, so there are to parameters passed into the
        anonymous function 
    */
  storedRestaurants.sort(function (resA, resB) {
    /*
            sort on name alphabetically (desc), passes the object (as resA or resB)
            then adds the name field in the restaurant object

            the return 1 (they are already in order) or -1 sorts by switching the 
            place of the values if the statement evaluates false (-1)
        */
    if (
      (order === 'asc' && resA.name > resB.name) ||
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  /*  
        render ejs file
        note that in the for loop of restaurants.ejs the const restaurant of restaurants
        must match the variable for the JSON.parse function restaurants:storedRestaurants
    */
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    /* 
        pass variable nextOrder as a variable into the nextOrder key to ejs form
    */
    nextOrder: nextOrder //nextOrder key (exposed to template ejs) : nextOrder variable
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
      /* 
                value in key value pair is the const restaurant in the for loop passing the 
                restaurantID of the if statement and thus from the urlencoded
                key restaurant matches the key in the json object  
                return ends function execution
            */
    }
  }

  res.status(404).render("404");
});

// export to get back into app.js
module.exports = router;
