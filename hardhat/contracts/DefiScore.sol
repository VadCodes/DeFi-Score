// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

// Import this file to use console.log
import "hardhat/console.sol";

contract DefiScore {
    mapping(address => bool) public authorizedToRead;
    mapping(address => address[]) public readCreditScores;
        mapping(address => uint16) private creditScores;

    // The minimum price to pay user for his credit score
    uint256 public price;

    event ReadCreditScore(address read, address by);
    event GivePermission(address user);
    event RevokePermission(address user);
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
        creditScores[address(0x0000000000000000000000000000000002da48a1)] = 800;
    }

    function getAuthorizedToRead(address user) public view returns (bool) {
        return authorizedToRead[user];
    }
    

    function getCreditScores(address user) public view returns (uint16) {
        require(msg.sender == user, 'You can only read your own credit score');
        return creditScores[user];
    }

    function getReadCreditScores() public view returns (address[] memory) {
        return readCreditScores[msg.sender];
    }

    function givePermission() public {
        authorizedToRead[msg.sender] = true;
        emit GivePermission(msg.sender);
    }

    function revokePermission() public {
        authorizedToRead[msg.sender] = false;
        emit RevokePermission(msg.sender);
    }

    function getCreditScore(address user) public payable minimumPrice returns (uint16) {
        require(authorizedToRead[user] == true, "User did not give permission to read his credit score");
        
        readCreditScores[user].push(msg.sender);
        emit ReadCreditScore(user, msg.sender);
        payable(user).transfer(msg.value);
        return creditScores[user];
    }
}
