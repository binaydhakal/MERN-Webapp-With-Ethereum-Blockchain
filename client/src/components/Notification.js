import React, { useContext, useState, useEffect } from 'react';
import "./Home.css";
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import BlockchainContext from './BlockchainContext';

function Home() {

    const { accounts, contract } = useContext(BlockchainContext);

    const [bank, setBank] = useState('');
    const [address, setAddress] = useState();





    const handleNotification = async() => {
        await contract.events.RequestKyc({},
        function(error, event){ console.log(event); })
        .on('data',
        function(event){console.log(event);})
        .on('changed',
        function(event){console.log(event);})
        .on('error', console.error);

        // request.watch( (error, result) => {
        //     if(!error){
        //         setAddress(result[0]);
        //         setBank(result[1]);
        //         console.log("hellothere");

        //         document.getElementById("notification__hide").style.display = "block";
        //     }
        //     else{
        //         console.log(error);
        // //     }
        // } )

    }

    const handleAllow = async() => {
        await contract.methods.acceptRequest();
        await contract.methods.sendKyc(address);
    }


    const handleDecline = async() => {
        await contract.methods.declineRequest();
        await contract.methods.sendKyc(address);
    }

    useEffect(() => {
       
        handleNotification();

    }, [])

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

                    <h3>Your NOtification are Listed below</h3>

                    <div hidden="hidden" id="notification__hide" className="kycreq__notification">
                        <h4>You have got a new notification from {bank} as a KYC Request from this {address} account address</h4>
                        <button onClick={handleAllow}>Allow</button>
                        <button onClick={handleDecline}>Decline</button>
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
