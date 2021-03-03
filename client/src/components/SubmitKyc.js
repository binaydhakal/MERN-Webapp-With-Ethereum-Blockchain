import React, { useState, useContext } from "react";
import { FcUpload } from "react-icons/fc";
import "./Home.css";
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import isEmpty from 'validator/lib/isEmpty';
import "../css/Mykyc.css";
import BlockchainContext from "./BlockchainContext";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { createKyc } from "../api/kyc";
import { setLocalStorage } from "../helpers/localStorage";

function SubmitKyc() {
  const { accounts, contract } = useContext(BlockchainContext);

  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);

  const [ errorMsg, setErrorMsg ] = useState('');
  const [ successMsg, setSuccessMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [proof, setProof] = useState({
    pp: "",
    front: "",
    back: "",
  });

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
  });

  const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom,idate,idatetype, pp, front, back } = kycData;


  const handleKycChange = (e) => {
    setKycData({
      ...kycData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg('');
    setSuccessMsg('');
    console.log(kycData);
  }

  const imageHandler1 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto1(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setKycData({
      ...kycData,
      pp: e.target.files[0]
    });
    console.log(e.target.files[0]);
    console.log(pp)
    document.getElementById("img1").style.display = "block";
  };

  const imageHandler2 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto2(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setKycData({
      ...kycData,
      front: e.target.files[0]
    });
    console.log(e.target.files[0]);
    document.getElementById("img2").style.display = "block";
  };

  const imageHandler3 = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto3(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setKycData({
      ...kycData,
       back: e.target.files[0]
    });
    document.getElementById("img3").style.display = "block";
  };


  const handleKycSubmit = (e) => {

    console.log(kycData);
    console.log(pp, front, back)
    e.preventDefault();

    if( (pp || front || back) === null){
      setErrorMsg('Identification images are Compulsory');
    } else if ( isEmpty(fullname) || isEmpty(fathername) || isEmpty(mothername) || isEmpty(grandfathername) || isEmpty(district) || isEmpty(vdc) || isEmpty(ward) || 
      isEmpty(dob) || isEmpty(datype) || isEmpty(gender) || isEmpty(itype) || isEmpty(inumber) || isEmpty(ifrom) || isEmpty(idate) || isEmpty(idatetype) ) {
        setErrorMsg('All fields are compulsory except spouce name');
      } else {

        let formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('fathername', fathername);
        formData.append('mothername', mothername);
        formData.append('grandfathername', grandfathername);
        formData.append('spousename', spousename);
        formData.append('district', district);
        formData.append('vdc', vdc);
        formData.append('ward', ward);
        formData.append('dob', dob);
        formData.append('datype', datype);
        formData.append('gender', gender);
        formData.append('itype', itype);
        formData.append('inumber', inumber);
        formData.append('ifrom', ifrom);
        formData.append('idate', idate);
        formData.append('idatetype', idatetype);
        formData.append('pp', pp);
        formData.append('front', front);
        formData.append('back', back);

        createKyc(formData)
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
            setSuccessMsg(response.data.successMessage);
            document.getElementById("img1").style.display = "hidden";
            document.getElementById("img2").style.display = "hidden";
            document.getElementById("img3").style.display = "hidden";

            setLocalStorage('kyc', response.data.kyc);


          })
          .catch((err) => {
            setErrorMsg(err.response.data.errorMessage);
          });

      

      }



  }

  // const submitKyc = async (e) => {
  //   e.preventDefault();
  //   const familyinfo = [
  //     kycData.fullname.toString(),
  //     kycData.fathername.toString(),
  //     kycData.mothername.toString(),
  //     kycData.grandfathername.toString(),
  //     kycData.spousename.toString(),
  //   ];
  //   const personaladd = [
  //     kycData.district.toString(),
  //     kycData.vdc.toString(),
  //     kycData.ward.toString(),
  //   ];
  //   const personalinfo = [
  //     kycData.dob.toString(),
  //     kycData.datype.toString(),
  //     kycData.gender.toString(),
  //   ];
  //   const iinfo = [
  //     kycData.itype.toString(),
  //     kycData.inumber.toString(),
  //     kycData.ifrom.toString(),
  //     kycData.idate.toString(),
  //     kycData.idatetype.toString(),
  //   ];
  //   console.log(familyinfo);
  //   console.log(personaladd);
  //   console.log(personalinfo);
  //   console.log(iinfo);
  //   await contract.methods
  //     .buildKyc(familyinfo, personaladd, personalinfo, iinfo)
  //     .send({ from: accounts[0] });

  //   await contract.methods.KycBlock().send({ from: accounts[0] });

  //   const addres = await contract.methods
  //     .lastContractAddress()
  //     .call({ from: accounts[0] });

  //   setAdd(addres);

  //   if (addres) {
  //     document.getElementById("msg").style.display = "block";
  //     console.log(`${add}`);
  //   } else {
  //     alert("Sorry Transaction Failed");
  //   }
  // };

  return (
    <div className="home">

      <div className="home__body">
        <div className="home__leftSide">
          <Leftbody />
        </div>

        <div className="home__middleSide">

        {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
          <div className="middletitle">Fill Up Your KYC </div>

          <div className="form__title">Family Information</div>

          <form>
            <div>
              <div className="form__heading">Full Name</div>
              <input
                placeholder="Enter full name"
                name="fullname"
                value={fullname}
                onChange={handleKycChange}
                style={{ width: "100%", height: "25px" }}
              />
            </div>

            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Father Name</div>
                <input
                  placeholder="Enter fathers name"
                  name="fathername"
                  value={fathername}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1" }}>
                <div className="form__heading">Mother Name</div>
                <input
                  placeholder="Enter mother name"
                  name="mothername"
                  value={mothername}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Grand father Name</div>
                <input
                  placeholder="Enter grandfathers name"
                  name="grandfathername"
                  value={grandfathername}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1" }}>
                <div className="form__heading">Spouce Name</div>
                <input
                  placeholder="Enter spouce name"
                  name="spousename"
                  value={spousename}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>
          </form>

          <div className="form__title">Permanent Address</div>
          <form>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">District</div>
                <input
                  placeholder="Select district"
                  name="district"
                  value={district}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">VDC/Municipality</div>
                <input
                  placeholder="Enter VDC/Municipality"
                  name="vdc"
                  value={vdc}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1" }}>
                <div className="form__heading">Ward</div>
                <input
                  placeholder="Enter ward number"
                  name="ward"
                  value={ward}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>
          </form>

          <div className="form__title">Personal Information</div>
          <form>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Date of birth</div>
                <input
                  placeholder="Enter date"
                  name="dob"
                  value={dob}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Date type</div>
                <input
                  placeholder="Select date type"
                  name="datype"
                  value={datype}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1" }}>
                <div className="form__heading">Gender</div>
                <input
                  placeholder="Select gender"
                  name="gender"
                  value={gender}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>
          </form>

          <div className="form__title">Identity Information</div>
          <form>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Identity type</div>
                <input
                  placeholder="Enter identity type"
                  name="itype"
                  value={itype}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Identity number</div>
                <input
                  placeholder="Enter identity number"
                  name="inumber"
                  value={inumber}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1" }}>
                <div className="form__heading">Issued from</div>
                <input
                  placeholder="Enter issued address"
                  name="ifrom"
                  value={ifrom}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Issued date</div>
                <input
                  placeholder="Enter issued date"
                  name="idate"
                  value={idate}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>

              <div style={{ flex: "1", marginRight: "20px" }}>
                <div className="form__heading">Issued date type</div>
                <input
                  placeholder="Enter issued date type"
                  name="idatetype"
                  value={idatetype}
                  onChange={handleKycChange}
                  style={{ width: "100%", height: "25px" }}
                />
              </div>
            </div>
          </form>

          <div style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ flex: "1", marginRight: "20px" }}>
              <div className="form__heading">Photo(PP)</div>
              <input
                type="file"
                id="fileclick1"
                name="pp"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler1}
              />
              <label htmlFor="fileclick1">
                <FcUpload style={{ fontSize: "40px", cursor: "pointer" }} />
              </label>
              <img
                src={photo1}
                id="img1"
                alt=""
                style={{ display: "none", width: "100%", height: "100px" }}
              />
            </div>

            <div style={{ flex: "1", marginRight: "20px" }}>
              <div className="form__heading">Identity(front)</div>
              <input
                type="file"
                id="fileclick2"
                name="front"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler2}
              />
              <label htmlFor="fileclick2">
                <FcUpload style={{ fontSize: "40px", cursor: "pointer" }} />
              </label>
              <img
                src={photo2}
                id="img2"
                alt=""
                style={{ display: "none", width: "100%", height: "100px" }}
              />
            </div>

            <div style={{ flex: "1" }}>
              <div className="form__heading">Identity(back)</div>
              <input
                type="file"
                id="fileclick3"
                name="back"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler3}
              />
              <label htmlFor="fileclick3">
                <FcUpload style={{ fontSize: "40px", cursor: "pointer" }} />
              </label>
              <img
                src={photo3}
                id="img3"
                alt=""
                style={{ display: "none", width: "100%", height: "100px" }}
              />
            </div>
          </div>

          <div className="message" id="msg" hidden="hidden">
            Congratulation your KYC has been put in the Blockchain and its
            address is 
          </div>

          <div className="kycbutton">
            <button className="kyc__submitbtn" onClick={handleKycSubmit}>
              Submit
            </button>
          </div>
        </div>

        <div className="home__rightSide">
          <Rightbody />
        </div>
      </div>
    </div>
  );
}

export default SubmitKyc;
