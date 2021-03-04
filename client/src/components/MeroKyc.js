import React, { useContext, useEffect, useState } from 'react';
import { createKycAddress, getKyc, getKycAddress } from '../api/kyc';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import BlockchainContext from './BlockchainContext';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';

const MeroKyc = () => {

    useEffect(() => {
        loadKyc();
        loadKycAddress();
    }, []);


    const [ errorMsg, setErrorMsg ] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('');
    const [ loading, setLoading ] = useState(false);


    const [ picturehash, setPicturehash ] = useState({
        profilePicture: '',
        identityFront: '',
        identityBack: ''
    })

    const { web3, accounts, contract } = useContext(BlockchainContext);

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
        isvalid: '',
        pp: '',
        front: '',
        back: '',
      });

      const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom,idate,idatetype, isvalid, pp, front, back } = kycData;


    const loadKycAddress = async () => {
      await getKycAddress()
              .then((response) => {
                setLocalStorage('kycAddress', response.data.kycAdd[0].kycaddress);
              })
              .catch((error) => {
                console.log(error)
              })
    }  

    const loadKyc = async() => {
        await getKyc()
                .then((response) => {
                    setLocalStorage('kyc', response.data.kyc);
                    setKycData({
                        ...kycData,
                        fullname: response.data.kyc[0].fullname,
                        fathername: response.data.kyc[0].fathername,
                        mothername: response.data.kyc[0].mothername,
                        grandfathername: response.data.kyc[0].grandfathername,
                        spousename: response.data.kyc[0].spousename,
                        district: response.data.kyc[0].district,
                        vdc: response.data.kyc[0].vdc,
                        ward: response.data.kyc[0].ward,
                        dob: response.data.kyc[0].dob,
                        datype: response.data.kyc[0].datype,
                        gender: response.data.kyc[0].gender,
                        itype: response.data.kyc[0].itype,
                        inumber: response.data.kyc[0].inumber,
                        ifrom: response.data.kyc[0].ifrom,
                        idate: response.data.kyc[0].idate,
                        idatetype: response.data.kyc[0].idatetype,
                        pp: response.data.kyc[0].pp,
                        front: response.data.kyc[0].front,
                        back: response.data.kyc[0].back,
                        isvalid: response.data.kyc[0].isvalid
                    });
                    console.log(pp,front,back)
               
                })
                .catch((error) => {
                    console.log(error);
                })
    }

    const [ captureFile, setCaptureFile ] = useState(null);


    const submitToBlockchain = async (e) => {



        //     const responseImage = await fetch(`http://localhost:6000/uploads/${pp}`);
        //     const imageBuffer = await (await responseImage.blob()).arrayBuffer(8);
    
        //     ipfs.files.add(Buffer.from(imageBuffer), (error,result) => {
        //         if(error){
        //             console.log('error from the ipfs server', error);
        //         }else{
        //             setPicturehash({
        //                 ...picturehash,
        //                 profilePicture: result[0].hash,
        //             });
        //             console.log('profile', picturehash.profilePicture);
        //             console.log(`https://ipfs.infura.io/ipfs/${picturehash.profilePicture}`)
        //         }
        //     });
            
        // } catch (error) {
        //     console.log(error);
        // }


 



    
        // //  <img src={`https://ipfs.infura.io/ipfs/${picturehash.profilePicture}`} alt=""  style={{ width: "100%", height: "100px" }} ></img>
    

        // try {
        //     const responseImage1 = await fetch(`http://localhost:6000/uploads/${front}`);
        //     const imageBuffer1 = await (await responseImage1.blob()).arrayBuffer(8);
    
        //     console.log(imageBuffer1);
    
        //     ipfs.files.add(Buffer.from(imageBuffer1), (error,result) => {
        //         if(error){
        //             console.log('error from the ipfs server', error);
        //         }else{
        //             setPicturehash({
        //                 ...picturehash,
        //                 identityFront: result[0].hash,
        //             });
        //             console.log('front', picturehash.identityFront);
        //             console.log(`https://ipfs.infura.io/ipfs/${picturehash.identityFront}`)
        //         }
        //     });
            
        // } catch (error) {
        //     console.log(error);
        // }


        // try {
        //     const responseImage2 = await fetch(`http://localhost:6000/uploads/${back}`);
        //     const imageBuffer2 = await (await responseImage2.blob()).arrayBuffer(8);
        //     console.log(imageBuffer2);
        //     ipfs.files.add(Buffer.from(imageBuffer2), (error,result) => {
        //         if(error){
        //             console.log(error);
        //         }else{
        //             setPicturehash({
        //                 ...picturehash,
        //                 identityBack: result[0].hash,
        //             });
        //             console.log('back', picturehash.identityBack);
        //             console.log(`https://ipfs.infura.io/ipfs/${picturehash.identityBack}`)
        //         }
        //     });
        // } catch (error) {
        //     console.log(error);
        // }


    if (getLocalStorage('kycAddress')) {
      setErrorMsg(`You Have Already Submitted Your KYC to Blockchain.
      And Your KYC Address is ${getLocalStorage('kycAddress')} `);
    }else{
    
      const familyinfo = [
        fullname.toString(),
          fathername.toString(),
          mothername.toString(),
          grandfathername.toString(),
          spousename.toString()
        ];
        const personaladd = [
          district.toString(),
          vdc.toString(),
          ward.toString(),
        ];
        const personalinfo = [
          dob.toString(),
          datype.toString(),
          gender.toString(),
        ];
        const iinfo = [
          itype.toString(),
          inumber.toString(),
          ifrom.toString(),
          idate.toString(),
          idatetype.toString(),
        ];
     const picture = [
            pp.toString(),
            front.toString(),
            back.toString(),
            isvalid.toString(),
   
        ]
            console.log(familyinfo);
            console.log(personaladd);
            console.log(personalinfo);
            console.log(iinfo);
            console.log(picture);

    try {

      await contract.methods.KycBlock(familyinfo, personaladd, personalinfo, iinfo, picture).send({ from: accounts[0] });

      const addres = await contract.methods
        .lastContractAddress()
        .call({ from: accounts[0] });
      setLocalStorage('kycAddress', addres);
      setSuccessMsg(`Your KYC has been posted in Blockchain at ${addres}.
      Please save your information `)
      
    } catch (error) {
      console.log(error);
      setErrorMsg('Ethereum Blockchain Error.')
    }
  }

  const add = getLocalStorage('kycAddress');

  const data = { add }


    createKycAddress(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })


   };


    return (
        <div>

        {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
             <div className="middletitle"> Your KYC </div>

                <div className="form__title">Family Information</div>
          
                <form>
                <div>
                    <div className="form__heading">Full Name: {fullname}</div>
                </div>

                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Father Name: {fathername}</div>
                    </div>

                    <div style={{ flex: '1' }}>
                <div className="form__heading">Mother Name: {mothername}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Grand father Name: {grandfathername}</div>
                    </div>

                    <div style={{ flex: '1' }}>
                    <div className="form__heading">Spouce Name: {spousename}</div>
                    </div>
                </div>
                </form>

                <div className="form__title">Permanent Address</div>
                <form>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">District: {district}</div>
                    </div>

                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">VDC/Municipality: {vdc}</div>
                    </div>

                    <div style={{ flex: '1' }}>
                    <div className="form__heading">Ward: {ward}</div>
                    </div>
                </div>
                </form>

                <div className="form__title">Personal Information</div>
                <form>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Date of birth: {dob}
                        </div>
                    </div>

                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Date type: {datype}</div>
                    </div>

                    <div style={{ flex: '1' }}>
                    <div className="form__heading">Gender: {gender}</div>
                    </div>
                </div>
                </form>

                <div className="form__title">Identity Information</div>
                <form>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Identity type: {itype}</div>
                    </div>

                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Identity number: {inumber}</div>
                    </div>

                    <div style={{ flex: '1' }}>
                    <div className="form__heading">Issued from: {ifrom}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Issued date: {idate}</div>
                    </div>

                    <div style={{ flex: '1', marginRight: '20px' }}>
                    <div className="form__heading">Issued date type: {idatetype}</div>
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
                id="img3"
                alt=""
                style={{ width: "100%", height: "100px" }}
              />
            </div>
          </div>

            <div>Validated: {isvalid === 0 && (
                <i className="fa fa-times" aria-hidden="true" style={{color: "red"}}></i>
            )} {isvalid === 1 && (
                <i className="fa fa-check" aria-hidden="true" style={{ color: "lightgreen" }}></i>
            )}  </div>


              {isvalid === 0 && (
                  <button type="button" className="btn btn-danger">KYC Not Validated</button>
              )}

              {isvalid === 1 && (
                  <button type="button" class="btn btn-success"  onClick={submitToBlockchain} >Publish to Blockchain</button>
              )}


        </div>

    )
}

export default MeroKyc;
