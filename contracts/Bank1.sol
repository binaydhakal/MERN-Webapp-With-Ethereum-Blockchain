pragma solidity ^0.5.16;
// import "./Connection.sol";


contract Bank1 {
    
    
    struct User{
        uint uid;
        string username;
        string password;
    }
    
    struct Kyc{
        string fullname;
        string fathername;
        string gender;
        string dob;
    }
    
   
    
    mapping(address => User) public userDetails;
    
    mapping(address => Kyc ) public kycDetails;
    
    function random() private view returns (uint8) {
       return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
   }
    
    function loginCustomer(string memory _username, string memory _password) public view  returns(bool){
        
        
        
            
            
            if( keccak256(abi.encodePacked(userDetails[tx.origin].username)) == keccak256(abi.encodePacked(_username)) && keccak256(abi.encodePacked(userDetails[tx.origin].password)) == keccak256(abi.encodePacked(_password)))
                return true;
            
                    
    }
    

    
    function signUpCustomer(string memory _username, string memory _password) public payable returns(bool) {
        
        userDetails[tx.origin] = User(random(),_username,_password);
            return true;
        
    }
    

    
     function buildKyc(string memory _fullname, string memory _fathername, string memory _gender, string memory _dob) public {
         // Section where we store the kyc of the customer in blockchain
         kycDetails[tx.origin] = Kyc(_fullname,_fathername,_gender,_dob);
         
         
     } 
    
     function getKyc(address _myaddress) external view returns(string memory, string memory,string memory,string memory){
         // Section which will be called from outside the function
         return (kycDetails[_myaddress].fullname, kycDetails[_myaddress].fathername, kycDetails[_myaddress].gender, kycDetails[_myaddress].dob);
         
     }
    
}

 