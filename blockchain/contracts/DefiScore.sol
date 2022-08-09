// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

// Import this file to use console.log
import "hardhat/console.sol";

contract DefiScore {
    mapping(address => bool) public authorizedToRead;
    mapping(address => uint16) public creditScores;

    // The minimum price to pay user for his credit score
    uint256 public price;

    event ReadCreditScore(address read, address by);
    event GivePermission(address user);
    event PriceUpdated(uint256 price);

    constructor(uint256 _price) {
        price = _price;
        creditScores["address"] = 900;
        creditScores["address"] = 600;
        creditScores["address"] = 300;
    }

    function givePermission() public {
        authorizedToRead[msg.sender] = true;
        emit GivePermission(msg.sender);
    }

    function getCreditScore(address user) public {
        require(authorizedToRead[user] == true, "User did not give permission to read his credit score");

        emit ReadCreditScore(user, msg.sender);
    }
}
