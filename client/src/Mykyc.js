import React, { useState, useContext } from 'react';
import { FcUpload } from "react-icons/fc";
import "./Home.css";
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import "./Mykyc.css";
import BlockchainContext from './BlockchainContext';


function Mykyc() {

    const { accounts, contract } = useContext(BlockchainContext);

    const [ photo1, setPhoto1 ] = useState();
    const [ photo2, setPhoto2 ] = useState();
    const [ photo3, setPhoto3 ] = useState();

    const [ fullname, setFullname ] = useState('');
    const [ fathername, setFathername ] = useState('');
    const [ dob, setDob ] = useState('');
    const [ gender, setGender ] = useState('')

    const imageHandler1 = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
           
            if(reader.readyState === 2){
                setPhoto1(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        document.getElementById("img1").style.display = "block";
        
    }

    const imageHandler2 = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
           
            if(reader.readyState === 2){
                setPhoto2(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        document.getElementById("img2").style.display = "block";
        
    }

    const imageHandler3 = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
           
            if(reader.readyState === 2){
                setPhoto3(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        document.getElementById("img3").style.display = "block";
        
    }

    const submitKyc = async(e) => {
        e.preventDefault();

        const les = await contract.methods.buildkyc(fullname,fathername,gender,dob).send({ form: accounts[0] });

        if (les){
            document.getElementById("msg").style.display = "block";
        }
        else{
            alert("Sorry Transaction Failed")
        }
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
                <div className="middletitle">Fill Up Your KYC </div>

                <div className="form__title">Family Information</div>
                
                <form>
                    <div>
                    <div className="form__heading" value={fullname} onchange={e => setFullname(e.target.value)}>Full Name</div>
                    <input placeholder="Enter name" style={{ width: "100%", height: "25px" }} />
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading" value={fathername} onchange={e => setFathername(e.target.value)}>Father Name</div>
                        <input placeholder="Enter fathers name" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                        <div className="form__heading">Mother Name</div>
                        <input placeholder="Enter mother name" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading">Grand father Name</div>
                        <input placeholder="Enter grandfathers name" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                        <div className="form__heading">Spouce Name</div>
                        <input placeholder="Enter spouce name" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>
                </form>

                <div className="form__title">Permanent Address</div>
                <form>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading">District</div>
                        <input placeholder="Select district" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1", marginRight: "20px"}}>
                        <div className="form__heading">VDC/Municipality</div>
                        <input placeholder="Enter VDC/Municipality" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                        <div className="form__heading">Ward</div>
                        <input placeholder="Enter ward number" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>
                </form>

                <div className="form__title">Personal Information</div>
                <form>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading" value={dob} onchange={e => setDob(e.target.value)}>Date of birth</div>
                        <input placeholder="Enter date" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1", marginRight: "20px"}}>
                        <div className="form__heading">Date type</div>
                        <input placeholder="Select date type" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                        <div className="form__heading" value={gender} onchange={e => setGender(e.target.value)}>Gender</div>
                        <input placeholder="Select gender" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>
                </form>

                <div className="form__title">Identity Information</div>
                <form>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading">Identity type</div>
                        <input placeholder="Enter identity type" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1", marginRight: "20px"}}>
                        <div className="form__heading">Identity number</div>
                        <input placeholder="Enter identity number" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                        <div className="form__heading">Issued from</div>
                        <input placeholder="Enter issued address" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                        <div className="form__heading">Issued date</div>
                        <input placeholder="Enter issued date" style={{ width: "100%", height: "25px" }} />
                        </div>

                        <div style={{ flex: "1", marginRight: "20px"}}>
                        <div className="form__heading">Issued date type</div>
                        <input placeholder="Enter issued date type" style={{ width: "100%", height: "25px" }} />
                        </div>
                    </div>
                </form>

                <div style={{ display: "flex", marginTop: "20px" }}>
                        <div style={{ flex: "1", marginRight: "20px" }}>
                            <div className="form__heading">Photo(PP)</div>
                            <input type="file" id="fileclick1" hidden="hidden" accept="image/*" onChange={imageHandler1} />
                            <label htmlFor="fileclick1">
                            <FcUpload  style={{ fontSize: "40px", cursor: "pointer" }}  />
                            </label>
                            <img src={photo1} id="img1" alt="" style={{ display: "none", width: "100%", height: "100px" }} />
                        </div>

                        <div style={{ flex: "1", marginRight: "20px"}}>
                            <div className="form__heading">Identity(front)</div>
                            <input type="file" id="fileclick2" hidden="hidden" accept="image/*" onChange={imageHandler2} />
                            <label htmlFor="fileclick2">
                            <FcUpload  style={{ fontSize: "40px", cursor: "pointer" }}  />
                            </label>
                            <img src={photo2} id="img2" alt="" style={{ display: "none", width: "100%", height: "100px" }} />
                        </div>

                        <div style={{ flex: "1"}}>
                             <div className="form__heading">Identity(back)</div>
                            <input type="file" id="fileclick3" hidden="hidden" accept="image/*" onChange={imageHandler3} />
                            <label htmlFor="fileclick3">
                            <FcUpload  style={{ fontSize: "40px", cursor: "pointer" }}  />
                            </label>
                            <img src={photo3} id="img3" alt="" style={{ display: "none", width: "100%", height: "100px" }} />
                        </div>
                    </div>

                    <div className="message" id="msg" hidden="hidden">Congratulation your KYC has been put in the Blockchain</div>

                    <div className="kycbutton">
                        <button className="kyc__submitbtn" onClick={submitKyc}>Submit</button>
                    </div>   

            </div>

            <div className="home__rightSide">
                <Rightbody />
            </div>
        </div>
    </div>
    )
}

export default Mykyc
