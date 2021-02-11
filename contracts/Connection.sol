pragma solidity ^0.5.16;

interface Connection {
    function reqKyc(address _reqaddress, string calldata _bankname) external;
}