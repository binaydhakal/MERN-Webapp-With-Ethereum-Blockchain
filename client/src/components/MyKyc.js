import React from 'react';
import Leftbody from './Leftbody';
import MeroKyc from './MeroKyc';
import Middlebody from './Middlebody';
import Rightbody from './Rightbody';

const MyKyc = () => {
    return (
        <div className="home">


            <div className="home__body">
                <div className="home__leftSide">
                    <Leftbody />
                </div>

                <div className="home__middleSide">
                    <MeroKyc />
                </div>

                <div className="home__rightSide">
                    <Rightbody />
                </div>
            </div>
        </div>
    )
}

export default MyKyc;
