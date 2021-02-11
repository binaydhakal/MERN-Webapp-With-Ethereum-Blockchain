import React, { useContext, useState } from 'react';
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import Middlebody from "./Middlebody.js";
import "./Home.css";
import "./Mykycreq.css";
import BlockchainContext from './BlockchainContext.js';

function Home() {

    const { accounts, contract } = useContext(BlockchainContext);

    const [bank, setBank] = useState('');
    const [kycadd, setKycadd] = useState();

    const [name, setName] = useState('');
    const [fname, setFname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    

    const handleRequestkyc = async() => {

        const data = await contract.methods.GetKyc(kycadd).call({ from: accounts[0] });

        setName(data[0]);
        setFname(data[1]);
        setGender(data[2]);
        setDob(data[3]);
        document.getElementById("dont").style.display = "block";

    }

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
                        <input placeholder="Enter bank" value={bank} onChange={ e => setBank(e.target.value)} />
                        </div>
                        <div>
                        <h4>KYC Address</h4>
                        <input placeholder="Enter kyc address" value={kycadd} onChange={ e => setKycadd(e.target.value)} />
                        </div>
                    </form>

                    <div className="req__kycbtn">
                        <button className="kycreqbtn" onClick={handleRequestkyc}>Request KYC</button>
                    </div>

                    <div id="dont" hidden="hidden">
                        <h3 style={{ opacity: "0.75" }}>Full Name: {name}</h3>
                        <h3 style={{ opacity: "0.75" }}>Father Name: {fname}</h3>
                        <h3 style={{ opacity: "0.75" }}>Gender: {gender}</h3>
                        <h3 style={{ opacity: "0.75" }}>Date Of Birth: {dob}</h3>
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
