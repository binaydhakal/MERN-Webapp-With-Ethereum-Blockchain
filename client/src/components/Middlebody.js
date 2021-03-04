import React from 'react';
import "../css/Middlebody.css";
import { Link } from "react-router-dom";
import { FaEthereum, FaCoins } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import Imageslider from './Imageslider';
import { FcMoneyTransfer, FcComboChart, FcBullish, FcPhoneAndroid } from "react-icons/fc";

function Middlebody() {
    return (
        <div className="middlebody">
            <div className="middlebody__firstPart">
                <Link>
                <div className="firstpart__link"> 
                    <FaEthereum className="firstpart__icon" style={{ color: "rgb(92, 224, 80)"}} />
                    <span>Ether Transfer</span>
                </div>
                </Link>

                <Link to="/user/mykyc">
                <div className="firstpart__link">
                    <FaCoins className="firstpart__icon" style={{ color: "rgb(223, 124, 124)"}} />
                    <span>KYC Validation</span>
                    </div>
                </Link>

                
                <Link to="/mykycreq">
                <div className="firstpart__link">
                    <FcViewDetails className="firstpart__icon" />
                    <span>KYC Request</span>
                </div>
                </Link>

            </div>

            <div className="middlebody__secondPart">
                {/* <Imageslider /> */}
            </div>

            <div className="middlebody__thirdPart">

                <h3>Submitted Your KYC??</h3>

                <p>It is necessary to submit know your customer detail to the bank for the 
                    transaction to proceed.
                </p>

                <p>We provide the efficent and new method for our customer for no need to 
                    submit their KyC to each and every bank, you can now request for your 
                    submitted kyc from other bank using Blockchain.
                </p>

            </div>

            <div className="middlebody__fourthPart">
                <div className="fourthpart__isServices">
                    <span>Services</span>
                    <div style={{display: "flex", marginTop: "20px", marginLeft: "15px"}}>
                    <Link>
                        <div className="fourthpart__insideLink">
                            <FcMoneyTransfer style={{ fontSize: "45px"}} />
                            <span>International Money Transfer</span>
                        </div>
                    </Link>
                    <Link>
                        <div className="fourthpart__insideLink">
                            <FcViewDetails style={{ fontSize: "45px"}} />
                            <span>Bank To Bank Transfer</span>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Middlebody
