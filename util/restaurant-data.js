//add core node packages to top, then 3rd party packages
const fs = require('fs'); //fs file system package
const path = require('path'); 

/*
    open json file where we will store these recommendations
    moved out of the function so it is accessible by all functions
    in this filePath
*/
/*
    __dirname current directory, '..' up one directory, '
    data' back down into new directory
*/
const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
function getStoredRestaurants(){
     
     const fileData = fs.readFileSync(filePath);
     
     //data is in text format, so we need to parse into an array using parse function
     const storedRestaurants = JSON.parse(fileData);
    
    //return data - makes data accessible outside of this function
     return storedRestaurants;
};

function storeRestaurants(storeableRestaurants){
    // convert back to text to store in JSON file
    fs.writeFileSync(filePath, JSON.stringify(storeableRestaurants));
};

module.exports = {
    //function name as called in other files : function name
    /*  
        do not add () which calls the function, cause we are not
        using the function we are just making it available this.outside
        of this file
    */
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants
    /* functions in an object become a method */
};