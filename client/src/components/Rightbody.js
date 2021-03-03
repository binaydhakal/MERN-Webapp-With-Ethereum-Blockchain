import React from 'react';
import "../css/Rightbody.css";
import { FcMoneyTransfer, FcComboChart, FcBullish, FcPhoneAndroid } from "react-icons/fc";
import { FiPhoneCall, FiMail } from "react-icons/fi";

function Rightbody() {
    return (
        <div className="rightbody">
            <div className="rightbody__uperPart">
                <div style={{border:"1px solid rgb(241, 241, 241"}}></div>
                <div className="rightbody__uperTitle1">
                    <div className="uppertitle__balance">
                    <span style={{marginBottom:"15px"}}><h5 style={{textTransform:"uppercase"}}>Your Balance</h5></span>
                    <span style={{marginBottom:"15px"}}>Rs. <strong>40</strong></span>
                    </div>
                    <div className="rightbody__uperTitlebuttom">
                    <button type="button" class="btn btn-success">Transfer Funds</button>
                    </div>
                </div>
                
                <div style={{border:"1px solid rgb(241, 241, 241"}}></div>

                <div className="rightbody__uperTitle2">
                    <div >
                        <FcMoneyTransfer className="rightbody__image" />
                    </div>
                    <div className="uppertitle__balance">
                    <span style={{marginBottom:"15px"}}><h5 style={{textTransform:"uppercase"}}>Main Balance</h5></span>
                    <span style={{marginBottom:"15px"}}>Rs. <strong>40</strong></span>
                    </div>
                </div>

                <div style={{border:"1px solid rgb(241, 241, 241"}}></div>

                <div className="rightbody__uperTitle3">
                    <div >
                        <FcComboChart className="rightbody__image" />
                    </div>
                    <div className="uppertitle__balance">
                    <span style={{marginBottom:"15px"}}><h5 style={{textTransform:"uppercase"}}>Bonous Balance</h5></span>
                    <span style={{marginBottom:"15px"}}>Rs. <strong>40</strong></span>
                    </div>
                </div>

                <div style={{border:"1px solid rgb(241, 241, 241"}}></div>

                <div className="rightbody__uperTitle4">
                    <div >
                        <FcBullish className="rightbody__image" />
                    </div>
                    <div className="uppertitle__balance">
                    <span style={{marginBottom:"15px"}}><h5 style={{textTransform:"uppercase"}}>Bonous Points</h5></span>
                    <span style={{marginBottom:"15px"}}> <strong>0</strong></span>
                </div>
                </div>
            </div>

            <div className="rightbody__lowerPart">
                <div className="rightbody__lowerItems">
                    <h4 style={{textTransform: "capitalize", opacity: "0.75"}}>want help ??</h4>

                    <div className="items__icon">
                        <FiPhoneCall /><span>064-256484</span>
                    </div>

                    <div className="items__icon">
                        <FiPhoneCall /><span>1880-01-256(Troll Free)</span>
                    </div>

                    <div className="items__icon">
                        <FcPhoneAndroid /><span>9801254892</span>
                    </div>

                    <div className="items__icon">
                        <FiMail /><span>gguys@gmail.com</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Rightbody
