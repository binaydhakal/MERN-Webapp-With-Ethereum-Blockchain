import React from 'react';
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import Middlebody from "./Middlebody.js";
import "./Home.css";
import "./Mykycreq.css";

function Home() {
    return (
        <div className="home">
            <div className="home__header">
                <Header />
            </div>

            <div className="home__body">
                <div className="home__leftSide">
                    <Leftbody />
                </div>

                <div className="home__middleSide">
                    <div className="middletitle">Request KYC From Blockchain</div>
                    <form>
                        <div>
                        <h4>Bank name</h4>
                        <input placeholder="Enter bank" />
                        </div>
                        <div>
                        <h4>Account Address</h4>
                        <input placeholder="Enter bank account" />
                        </div>
                    </form>

                    <div className="req__kycbtn">
                        <button className="kycreqbtn">Request KYC</button>
                    </div>
                </div>

                <div className="home__rightSide">
                    <Rightbody />
                </div>
            </div>
        </div>
    )
}

export default Home
