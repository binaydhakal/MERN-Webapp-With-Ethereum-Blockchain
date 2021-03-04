import React, { useContext, useState } from 'react';
import BlockchainContext from "./BlockchainContext.js";
import { useHistory, Link } from "react-router-dom";
import "../css/Leftbody.css";
import { AiOutlineBank } from "react-icons/ai";
import { FcServices } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
import { BiWallet, BiHistory, BiDetail} from "react-icons/bi";
import { getLocalStorage } from '../helpers/localStorage.js';

function Leftbody() {

    const { accounts, contract } = useContext(BlockchainContext);
    const [ name, setName] = useState('');
    const [ phone, setPhone] = useState('');

    const findName = async() => {
        console.log("yes");
        const tep = await contract.methods.userDetails(accounts[0]).call({ from: accounts[0] });
        setName(tep[1]);
        setPhone(tep[2]);
    }

    return (
        <div className="leftbody">
            <div className="leftbody__userInfo"> 
            {/* onLoad={findName}  */}
                <img className="leftbody__profilePicture" src="https://d7vw40z4bofef.cloudfront.net/static/img/profilepic.jpg" />
                <div className="leftbody__profileName">{getLocalStorage('user').username}</div>
                <div>{getLocalStorage('user').phonenumber}</div>
            </div>

            <div className="leftbody__divider"></div>

            <div className="leftbody__downPortion">
                <Link className="text-decoration-none" to='/user/dashboard' >
                    <div className="leftbody__full">
                        <div><AiOutlineBank className="leftbody__image" style={{color: "blue"}} />My Bank</div>
                    </div>
                </Link>

                <Link className="text-decoration-none" >
                    <div className="leftbody__full">
                        <div><FcServices className="leftbody__image" />
                        My Details</div>
                    </div>        
                </Link>

                <Link to='/mykycreq' className="text-decoration-none" >
                    <div className="leftbody__full">
                        <div>
                        <VscAccount className="leftbody__image" style={{color: "lightgreen"}} />
                        KYC Request</div>        
                    </div>
                </Link>

                <Link className="text-decoration-none" >
                    <div className="leftbody__full">
                        <div>
                        <BiWallet className="leftbody__image" style={{color: "pink"}} />
                        Wallet</div>
                    </div>        
                </Link>
   
                <Link className="text-decoration-none" to="/user/mykyc" >
                    <div className="leftbody__full">
                        <div>
                        <BiHistory className="leftbody__image" style={{color: "lightblue"}} />
                        My KYC</div>  
                    </div>      
                </Link>

                <Link to='/user/submitkyc'className="text-decoration-none" >
                    <div className="leftbody__full">
                        <div>
                        <BiDetail className="leftbody__image" style={{color: "lightsalmon"}} />
                        Submit KYC</div> 
                    </div>       
                </Link>

            </div>                  
              
        </div>
        
    )
}

export default Leftbody


