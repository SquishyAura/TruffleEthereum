pragma solidity ^0.4.23;

contract Banking {
    struct Account {
        uint balance;
    }

    mapping(address => Account) accounts; 

    function getMyBalance() public view returns (uint){
        return accounts[msg.sender].balance;
    }

    function deposit(uint amount) public{
        accounts[msg.sender].balance += amount;
    }

    function withdraw(uint amount) public{
        require(amount <= accounts[msg.sender].balance);
        accounts[msg.sender].balance -= amount;
    }
}
