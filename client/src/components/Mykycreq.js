import React, { useContext, useState } from 'react';
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import "./Home.css";
import BlockchainContext from './BlockchainContext.js';
import { createKycFromRequest } from '../api/kyc.js';
import { setLocalStorage } from '../helpers/localStorage.js';
import { showErrorMsg, showSuccessMsg } from '../helpers/message.js';
import { showLoading } from '../helpers/loading.js';

function MyKycReq() {

    const { accounts, contract } = useContext(BlockchainContext);

    const [bank, setBank] = useState('');
    const [kycadd, setKycadd] = useState();

    const [photo1, setPhoto1] = useState()
    const [photo2, setPhoto2] = useState()
    const [photo3, setPhoto3] = useState()

    const [ errorMsg, setErrorMsg ] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const [kycData, setKycData ] = useState({
        fullname: "",
        fathername: "",
        mothername: "",
        grandfathername: "",
        spousename: "",
        district: "",
        vdc: "",
        ward: "",
        dob: "",
        datype: "",
        gender: "",
        itype: "",
        inumber: "",
        ifrom: "",
        idate: "",
        idatetype: "",
        pp: '',
        front: null,
        back: null,
        isvalid: ''
      });
    
      const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom,idate,idatetype, pp, front, back, isvalid } = kycData;
    

    const imageHandler1 = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPhoto1(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
        document.getElementById('img1').style.display = 'block'
      }
    
      const imageHandler2 = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPhoto2(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
        document.getElementById('img2').style.display = 'block'
      }
    
      const imageHandler3 = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPhoto3(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
        document.getElementById('img3').style.display = 'block'
      }
    
    

    const handleRequestkyc = async() => {

        const data = await contract.methods.GetKyc(kycadd).call({ from: accounts[0] });
        console.log(data);

        setKycData({
            ...kycData,
            fullname: data[0][0],
            fathername: data[0][1],
            mothername: data[0][2],
            grandfathername: data[0][3],
            spousename: data[0][4],
            district: data[1][0],
            vdc: data[1][1],
            ward: data[1][2],
            dob: data[2][0],
            datype: data[2][1],
            gender: data[2][2],
            itype: data[3][0],
            inumber: data[3][1],
            ifrom: data[3][2],
            idate: data[3][3],
            idatetype: data[3][4],
            pp: data[4][0],
            front: data[4][1],
            back: data[4][2],
            isvalid: data[4][3]
        })
        console.log(kycData);
        document.getElementById("dont").style.display = "block";

    }


    const bankSubmit = (e) => {
        e.preventDefault();

        // let formData = new FormData();
        // formData.append('fullname', fullname);
        // formData.append('fathername', fathername);
        // formData.append('mothername', mothername);
        // formData.append('grandfathername', grandfathername);
        // formData.append('spousename', spousename);
        // formData.append('district', district);
        // formData.append('vdc', vdc);
        // formData.append('ward', ward);
        // formData.append('dob', dob);
        // formData.append('datype', datype);
        // formData.append('gender', gender);
        // formData.append('itype', itype);
        // formData.append('inumber', inumber);
        // formData.append('ifrom', ifrom);
        // formData.append('idate', idate);
        // formData.append('idatetype', idatetype);
        // formData.append('pp', pp);
        // formData.append('front', front);
        // formData.append('back', back);
        // formData.append('isvalid', isvalid);

        const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom, idate, idatetype, pp, front, back, isvalid  } = kycData;

        const data = { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom, idate, idatetype, pp, front, back, isvalid  } 

        setLoading(true);

        createKycFromRequest(data)
          .then((response) => {
            setKycData({
              fullname: "",
              fathername: "",
              mothername: "",
              grandfathername: "",
              spousename: "",
              district: "",
              vdc: "",
              ward: "",
              dob: "",
              datype: "",
              gender: "",
              itype: "",
              inumber: "",
              ifrom: "",
              idate: "",
              idatetype: "",
              pp: '',
              front: null,
              back: null,
            });
            setPhoto1(null);
            setPhoto2(null);
            setPhoto3(null);
            setLoading(false);
            setSuccessMsg(response.data.successMessage);
            document.getElementById("img1").style.display = "hidden";
            document.getElementById("img2").style.display = "hidden";
            document.getElementById("img3").style.display = "hidden";

            setLocalStorage('kyc', response.data.kyc);


          })
          .catch((err) => {
            setLoading(false);
            setErrorMsg(err.response.data.errorMessage);
          });
          document.getElementById("dont").style.display = "block";

    }

    return (
        <div className="home">

            
            <div className="home__body">
                 <div className="home__leftSide">
                     <Leftbody />          
                     
                     </div>
                <div className="home__middleSide">


                    {successMsg && showSuccessMsg(successMsg)}
                        {errorMsg && showErrorMsg(errorMsg)}
                        {loading && showLoading()}
                    <div className="middletitle">Request KYC From Blockchain</div>

                         <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Bank Name</label>
                                <input type="text" className="form-control" value={bank} onChange={ e => setBank(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the name of the Bank " />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">KYC Address</label>
                                <input className="form-control" value={kycadd} onChange={ e => setKycadd(e.target.value)} id="exampleInputPassword1" placeholder="Enter your KYC smart Contract Address" />
                            </div>
                            </form>

                            <div className="req__kycbtn">
                            <button type="button" onClick={handleRequestkyc} className="btn btn-primary">Request KYC</button>
                            </div>

                    <div id="dont" >
                    <div className="middletitle"> Your KYC </div>

                        <div className="form__title">Family Information</div>

                        <form>
                        <div>
                            <div className="form__heading">Full Name</div>
                            <input
                            name="fullname"
                            placeholder="Enter full name"
                            value={fullname}
                            
                            style={{ width: '100%', height: '25px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Father Name</div>
                            <input
                                placeholder="Enter fathers name"
                                name="fathername"
                                value={fathername}
                               
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1' }}>
                            <div className="form__heading">Mother Name</div>
                            <input
                                name="mothername"
                                placeholder="Enter mother name"
                                value={mothername}
                               
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Grand father Name</div>
                            <input
                             name="grandfathername"
                                placeholder="Enter grandfathers name"
                                value={grandfathername}
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1' }}>
                            <div className="form__heading">Spouce Name</div>
                            <input
                             name="spousename"
                                placeholder="Enter spouce name"
                                value={spousename}
                                
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>
                        </form>

                        <div className="form__title">Permanent Address</div>
                        <form>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">District</div>
                            <input
                                name="district"
                                placeholder="Select district"
                                value={district}
                               
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">VDC/Municipality</div>
                            <input
                                  name="vdc"
                                placeholder="Enter VDC/Municipality"
                                value={vdc}
                              
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1' }}>
                            <div className="form__heading">Ward</div>
                            <input
                               name="ward"
                                placeholder="Enter ward number"
                                value={ward}
                             
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>
                        </form>

                        <div className="form__title">Personal Information</div>
                        <form>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Date of birth</div>
                            <input
                                name="dob"
                                placeholder="Enter date"
                                value={dob}
                                
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Date type</div>
                            <input
                                 name="datype"
                                placeholder="Select date type"
                                value={datype}
                                
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1' }}>
                            <div className="form__heading">Gender</div>
                            <input
                            name="gender"
                                placeholder="Select gender"
                                value={gender}
                               
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>
                        </form>

                        <div className="form__title">Identity Information</div>
                        <form>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Identity type</div>
                            <input
                            name="itype"
                                placeholder="Enter identity type"
                                value={itype}
                              
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Identity number</div>
                            <input
                            name="inumber"
                                placeholder="Enter identity number"
                                value={inumber}
                                
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1' }}>
                            <div className="form__heading">Issued from</div>
                            <input
                               name="ifrom"
                                placeholder="Enter issued address"
                                value={ifrom}
                              
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Issued date</div>
                            <input
                               name="idate"
                                placeholder="Enter issued date"
                                value={idate}
                              
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>

                            <div style={{ flex: '1', marginRight: '20px' }}>
                            <div className="form__heading">Issued date type</div>
                            <input
                               name="idatetype"
                                placeholder="Enter issued date type"
                                value={idatetype}
                               
                                style={{ width: '100%', height: '25px' }}
                            />
                            </div>
                        </div>
                        </form>

                        
                        <div style={{ display: "flex", marginTop: "20px" }}>
                                <div style={{ flex: "1", marginRight: "20px" }}>
                                <div className="form__heading">Photo(PP)</div>
                                <img
                                    src={`https://ipfs.infura.io/ipfs/${pp}`}
                                    id="img1"
                                    alt=""
                                    style={{ width: "100%", height: "100px" }}
                                />
                                </div>

                                <div style={{ flex: "1", marginRight: "20px" }}>
                                <div className="form__heading">Identity(front)</div>
                                <img
                                    src={`https://ipfs.infura.io/ipfs/${front}`}
                                    id="img2"
                                    alt=""
                                    style={{  width: "100%", height: "100px" }}
                                />
                                </div>

                                <div style={{ flex: "1" }}>
                                <div className="form__heading">Identity(back)</div>
                                <img
                                    src={`https://ipfs.infura.io/ipfs/${back}`}
                                    name="back"
                                    id="img3"
                                    alt=""
                                    style={{ width: "100%", height: "100px" }}
                                />
                                </div>
                            </div>


                            <div >Validated: {parseInt(isvalid) === 0 && (
                                    <i className="fa fa-times" aria-hidden="true" style={{color: "red"}}></i>
                                )} {parseInt(isvalid) === 1 && (
                                    <i className="fa fa-check" aria-hidden="true" style={{ color: "lightgreen" }}></i>
                                )}  </div>


                        {parseInt(isvalid) === 0 && (
                            <button type="button" className="btn btn-danger">KYC Not Validated</button>
                                )}

                                {parseInt(isvalid) === 1 && (
                                    <button type="button" class="btn btn-success"  onClick={bankSubmit} >Bank Submit</button>
                                )}
                     </div>


                </div>

                <div className="home__rightSide">
                    <Rightbody />
                </div>
        </div>
        </div>
    )
}

export default MyKycReq;