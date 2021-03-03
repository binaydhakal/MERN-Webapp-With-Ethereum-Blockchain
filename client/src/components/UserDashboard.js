import React from 'react'
import Leftbody from './Leftbody';
import Middlebody from './Middlebody';
import Rightbody from './Rightbody';

const UserDashboard = () => {
    return (
        <div className="home">


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

export default UserDashboard;
