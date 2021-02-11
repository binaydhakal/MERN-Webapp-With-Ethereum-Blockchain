pragma solidity ^0.5.16;

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
    
    
    enum Status {
        Idle,
        Accept,
        Decline
    }
    
    
    event RequestKyc (
        address requesterAddress,
        string bankname
        );
        
    event NewKycAddress (
        address contractAddress
        );

    address public lastContractAddress;
    
    address[] public contracts;
        
    Status public status;
   
    mapping(address => User) public userDetails;
    
    mapping(address => Kyc ) public kycDetails;
    
    
    //     constructor() public {
    
    //     address myconnectionaddress = 0xd9145CCE52D386f254917e481eB44e9943F39138;
    //     myconnection = Connection(myconnectionaddress);
        
    // }
    
    
    
    
    
    function random() private view returns (uint8) {
       return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
   }
    
    function loginCustomer(string memory _username, string memory _password) public view  returns(bool){
        
        
        
            
            
            if( keccak256(abi.encodePacked(userDetails[msg.sender].username)) == keccak256(abi.encodePacked(_username)) && keccak256(abi.encodePacked(userDetails[msg.sender].password)) == keccak256(abi.encodePacked(_password))){
                return true;
            }
                    
    }
    

    
    function signUpCustomer(string memory _username, string memory _password) public payable returns(bool) {
        
        userDetails[msg.sender] = User(random(),_username,_password);
        
        
        if(loginCustomer(_username,_password) == true)
            return true;
        
    }
    

    
    function buildKyc(string memory _fullname, string memory _fathername, string memory _gender, string memory _dob) public {
         // Section where we store the kyc of the customer in blockchain
         kycDetails[msg.sender] = Kyc(_fullname,_fathername,_gender,_dob);
             
    } 
     
    function KycBlock() public payable{
        
        KYC kyc = new KYC(kycDetails[msg.sender].fullname, kycDetails[msg.sender].fathername, kycDetails[msg.sender].gender, kycDetails[msg.sender].dob);
        
        lastContractAddress = address(kyc);
        emit NewKycAddress(lastContractAddress);
        
    } 
     
    function GetKyc(address _youraddress) public view returns(string memory _fullname, string memory _fathername, string memory _dob, string memory _gender){
        
        return KYC(_youraddress).giveKyc();
    }



}


contract KYC {
    
    
        
    struct Kyc{
        string fullname;
        string fathername;
        string gender;
        string dob;
    }
    
    mapping( uint => Kyc ) public newKyc;
    
    constructor(string memory _fullname, string memory _fathername, string memory _gender, string memory _dob) public payable {
        newKyc[1].fullname = _fullname;
        newKyc[1].fathername = _fathername;
        newKyc[1].gender = _gender;
        newKyc[1].dob = _dob;
        
    }
    
    function giveKyc() public view returns(string memory _fullname, string memory _fathername, string memory _dob, string memory _gender){
        
        return(newKyc[1].fullname, newKyc[1].fathername, newKyc[1].gender, newKyc[1].dob);
    }
    
}

