// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getdata() pure public returns (uint) {
    uint data = 9;
    return data;
  }
}
