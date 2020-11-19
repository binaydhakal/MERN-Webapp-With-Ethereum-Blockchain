import React, { useContext, useState } from 'react';
import BlockchainContext from "./BlockchainContext.js";
import { useHistory, Link } from "react-router-dom";
import "./Leftbody.css";
import { AiOutlineBank } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
import { BiWallet, BiHistory, BiDetail} from "react-icons/bi";

function Leftbody() {

    const { accounts, contract } = useContext(BlockchainContext);
    const [ name, setName] = useState('');
    const [ phone, setPhone] = useState('');

    // const findName = async() => {
    //     console.log("yes");
    //     const tep = await contract.methods.userDetails(accounts[0]).call({ from: accounts[0] });
    //     setName(tep[1]);
    //     setPhone(tep[2]);
    // }

    return (
        <div className="leftbody">
            <div className="leftbody__userInfo"> 
                <img className="leftbody__profilePicture" src="https://d7vw40z4bofef.cloudfront.net/static/img/profilepic.jpg" />
                <div className="leftbody__profileName">{name}</div>
                <div>{phone}</div>
            </div>

            <div className="leftbody__divider"></div>

            <div className="leftbody__downPortion">
                <Link >
                    <div className="leftbody__full">
                        <div><AiOutlineBank className="leftbody__image" style={{color: "blue"}} />My Bank</div>
                    </div>
                </Link>

                <Link >
                    <div className="leftbody__full">
                        <div><FcServices className="leftbody__image" />
                        Services </div>
                    </div>        
                </Link>

                <Link >
                    <div className="leftbody__full">
                        <div>
                        <VscAccount className="leftbody__image" style={{color: "lightgreen"}} />
                        Account</div>        
                    </div>
                </Link>

                <Link >
                    <div className="leftbody__full">
                        <div>
                        <BiWallet className="leftbody__image" style={{color: "pink"}} />
                        Wallet</div>
                    </div>        
                </Link>
   
                <Link >
                    <div className="leftbody__full">
                        <div>
                        <BiHistory className="leftbody__image" style={{color: "lightblue"}} />
                        Transaction History</div>  
                    </div>      
                </Link>

                <Link to='/mykyc' >
                    <div className="leftbody__full">
                        <div>
                        <BiDetail className="leftbody__image" style={{color: "lightsalmon"}} />
                        My KYC</div> 
                    </div>       
                </Link>

            </div>                  
              
        </div>
        
    )
}

export default Leftbody


