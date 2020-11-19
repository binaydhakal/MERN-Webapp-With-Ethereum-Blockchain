import React from 'react';
import "./Home.css";
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import Middlebody from "./Middlebody.js";

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
                    <Middlebody />
                </div>

                <div className="home__rightSide">
                    <Rightbody />
                </div>
            </div>
        </div>
    )
}

export default Home
