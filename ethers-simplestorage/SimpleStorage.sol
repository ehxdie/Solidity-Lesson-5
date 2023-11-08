// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract SimpleStorage {
    // Datatypes examples
    uint256 public favoriteNumber;

    // Struct
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    /*Creating instances of the struct
    People public person = People(1,"Jeff");*/

    /*
    People public person = People({favoriteNumber: 1, name: "jeff"})
    This above way of creating a variable from a defined data typed can
    be used when the data being inserted is not neccesarily using the same
    entry arrangement as the defined structure, if not a simple
    People public person = People(1,"jeff") syntax can be used
    */

    // Creating a sort of dictionary that returns the favorite number of
    // a user

    mapping(string => uint256) public nameToFavoriteNumber;

    // Creating arrays
    People[] public peopleList;

    // Writing a function that adds people to the peopleList array
    function addPeople(uint256 _favoriteNumber, string memory _name) public {
        peopleList.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    // Functions
    /* This function takes in a number of datatype uint256 and then
    sets the favorite number variable to that value
    */
    function store(uint256 newFavoriteNumber) public virtual {
        favoriteNumber = newFavoriteNumber;
    }

    // Writing a function that retrieves the favorite number
    // Functionally lol
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
