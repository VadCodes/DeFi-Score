// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

// Import this file to use console.log
import "hardhat/console.sol";

contract DefiScore {
    mapping(address => bool) public authorizedToRead;
    mapping(address => uint16) public creditScores;
    mapping(address => address[]) public readCreditScores;

    // The minimum price to pay user for his credit score
    uint256 public price;

    event ReadCreditScore(address read, address by);
    event GivePermission(address user);
    event PriceUpdated(uint256 price);

    /**
     * @notice Require that the sender is the dafounders DAO.
     */
    modifier minimumPrice() {
        require(msg.value >= price, 'Must send at least minimum price');
        _;
    }

    constructor() {
         price = 1;
        // creditScores["address"] = 900;
        // creditScores["address"] = 600;
        // creditScores["address"] = 300;
    }

    function givePermission() public {
        authorizedToRead[msg.sender] = true;
        emit GivePermission(msg.sender);
    }

    function getCreditScore(address user) public payable minimumPrice returns (uint16) {
        require(authorizedToRead[user] == true, "User did not give permission to read his credit score");
        
        readCreditScores[user].push(msg.sender);
        emit ReadCreditScore(user, msg.sender);
        payable(user).transfer(msg.value);
        return creditScores[user];
    }
}
