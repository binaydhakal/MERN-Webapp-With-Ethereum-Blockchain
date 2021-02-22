pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Bank1 {
    
    
    struct User{
        uint uid;
        string username;
        string password;
    }
    
    struct Kyc{
        string[5] familyinfo;
        string[3] personaladd;
        string[3] personalinfo;
        string[5] identityinfo;
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
    
    mapping(address => Kyc ) private kycDetails;
    
    
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
    
    
    function buildKyc(string[5] memory fi, string[3] memory pa, string[3] memory pi, string[5] memory ii) public {
         // Section where we store the kyc of the customer in blockchain

        
         kycDetails[msg.sender] = Kyc(fi,pa,pi,ii);
        
             
    } 
     
    function KycBlock() public payable{
        
        
        KYC kyc = new KYC(kycDetails[msg.sender].familyinfo,kycDetails[msg.sender].personaladd,kycDetails[msg.sender].personalinfo,kycDetails[msg.sender].identityinfo);
        
        lastContractAddress = address(kyc);
        emit NewKycAddress(lastContractAddress);
        
    } 
     
    function GetKyc(address _youraddress) public view returns(string[5] memory, string[3] memory, string[3] memory, string[5] memory){
        
        return KYC(_youraddress).giveKyc();
    }



}


contract KYC {
    
    
        
    struct Kyc{
        string[5] _familyinfo;
        string[3] _personaladd;
        string[3] _personalinfo;
        string[5] _identityinfo;
    }
    
    mapping( uint => Kyc ) private newKyc;
    
    constructor(string[5] memory fai, string[3] memory padd, string[3] memory pin, string[5] memory iinf) public payable {
        newKyc[1]._familyinfo = fai;
        newKyc[1]._personaladd = padd;
        newKyc[1]._personalinfo = pin;
        newKyc[1]._identityinfo = iinf;
        
    }
    
    function giveKyc() public view returns(string[5] memory, string[3] memory, string[3] memory, string[5] memory){

        return(newKyc[1]._familyinfo,newKyc[1]._personaladd,newKyc[1]._personalinfo,newKyc[1]._identityinfo);
    }
    
}


