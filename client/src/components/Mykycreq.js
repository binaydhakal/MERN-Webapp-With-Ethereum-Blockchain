import React, { useContext, useState } from 'react';
import Header from "./Header.js";
import Leftbody from "./Leftbody.js";
import Rightbody from "./Rightbody.js";
import Middlebody from "./Middlebody.js";
import "./Home.css";
import "../css/Mykycreq.css";
import BlockchainContext from './BlockchainContext.js';
import ipfs from './ipfs.js';

function MyKycReq() {

    const { accounts, contract } = useContext(BlockchainContext);

    const [bank, setBank] = useState('');
    const [kycadd, setKycadd] = useState();

    const [name, setName] = useState('');
    const [fname, setFname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');


    const [ captureFile, setCaptureFile ] = useState(null);
    const [ hash, setHash ] = useState(null);


    const capturetheFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            setCaptureFile({captureFile: Buffer(reader.result)});
            console.log('buffer', captureFile);
        }
    }
    const submit = (e) => {
        e.preventDefault();
        ipfs.files.add(captureFile, (error,result) => {
            if(error){
                console.log(error);
            }else{
                console.log(result);
            }
           
        })
    }
    

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

            <div className="home__body">
                <div className="home__leftSide">
                    <Leftbody />
                </div>

                <div className="home__middleSide">
                    <div className="middletitle">Request KYC From Blockchain</div>
                    {/* <form>
                        <div>
                        <h4>Bank name</h4>
                        <input placeholder="Enter bank" value={bank} onChange={ e => setBank(e.target.value)} />
                        </div>
                        <div>
                        <h4>KYC Address</h4>
                        <input placeholder="Enter kyc address" value={kycadd} onChange={ e => setKycadd(e.target.value)} />
                        </div>
                    </form> */}

                        <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Bank Name</label>
                            <input type="text" className="form-control" value={bank} onChange={ e => setBank(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the name of the Bank " />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">KYC Address</label>
                            <input type="text" className="form-control" value={kycadd} onChange={ e => setKycadd(e.target.value)} id="exampleInputPassword1" placeholder="Enter your KYC smart Contract Address" />
                        </div>
                        </form>

                    <div className="req__kycbtn">
                        <button type="button" onClick={handleRequestkyc} className="btn btn-primary">Request KYC</button>
                    </div>

                    <img src={`https://ipfs.io/ipfs/${hash}`} alt=""></img>
                    <form onSubmit={submit}>
                        <input type="file" onChange={capturetheFile} />
                        <input type="submit" />
                    </form>

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

export default MyKycReq;


// import React, { useContext, useState } from 'react';
// import Header from "./Header.js";
// import Leftbody from "./Leftbody.js";
// import Rightbody from "./Rightbody.js";
// import Middlebody from "./Middlebody.js";
// import "./Home.css";
// // import "./Mykycreq.css";
// import BlockchainContext from './BlockchainContext.js';
// import { FcUpload } from 'react-icons/fc';

// function MyKycReq() {

//     const { accounts, contract } = useContext(BlockchainContext);

//     const [bank, setBank] = useState('');
//     const [kycadd, setKycadd] = useState();

//     const [name, setName] = useState('');
//     const [fname, setFname] = useState('');
//     const [gender, setGender] = useState('');
//     const [dob, setDob] = useState('');

//     const [photo1, setPhoto1] = useState()
//     const [photo2, setPhoto2] = useState()
//     const [photo3, setPhoto3] = useState()
  
//     const [fi, setFi] = useState({
//       fullname: '',
//       fathername: '',
//       mothername: '',
//       grandfathername: '',
//       spousename: '',
//     })
//     const [pa, setPa] = useState({
//       district: '',
//       vdc: '',
//       ward: '',
//     })
//     const [pi, setPi] = useState({
//       dob: '',
//       datype: '',
//       gender: '',
//     })
//     const [ii, setIi] = useState({
//       itype: '',
//       inumber: '',
//       ifrom: '',
//       idate: '',
//       idatetype: '',
//     })
//     const [proof, setProof] = useState({
//       pp: '',
//       front: '',
//       back: '',
//     }); 

//     const imageHandler1 = (e) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (reader.readyState === 2) {
//             setPhoto1(reader.result)
//           }
//         }
//         reader.readAsDataURL(e.target.files[0])
//         document.getElementById('img1').style.display = 'block'
//       }
    
//       const imageHandler2 = (e) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (reader.readyState === 2) {
//             setPhoto2(reader.result)
//           }
//         }
//         reader.readAsDataURL(e.target.files[0])
//         document.getElementById('img2').style.display = 'block'
//       }
    
//       const imageHandler3 = (e) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (reader.readyState === 2) {
//             setPhoto3(reader.result)
//           }
//         }
//         reader.readAsDataURL(e.target.files[0])
//         document.getElementById('img3').style.display = 'block'
//       }
    
    

//     const handleRequestkyc = async() => {

//         const data = await contract.methods.GetKyc(kycadd).call({ from: accounts[0] });

//         setFi({
//             fullname: data[0][0],
//             fathername: data[0][1],
//             mothername: data[0][2],
//             grandfathername: data[0][3],
//             spousename: data[0][4]
//         });
//         setPa({
//             district: data[1][0],
//             vdc: data[1][1],
//             ward: data[1][2],
//         });
//         setPi({
//             dob: data[2][0],
//             datype: data[2][0],
//             gender: data[2][0],
//         });
//         setIi({
//             itype: data[3][0],
//             inumber: data[3][1],
//             ifrom: data[3][2],
//             idate: data[3][3],
//             idatetype: data[3][4],
//         });
//         document.getElementById("dont").style.display = "block";

//     }

//     return (
//         <div className="home">


//                 <div className="home__middleSide">
//                     <div className="middletitle">Request KYC From Blockchain</div>
//                     <form>
//                         <div>
//                         <h4>Bank name</h4>
//                         <input placeholder="Enter bank" value={bank} onChange={ e => setBank(e.target.value)} />
//                         </div>
//                         <div>
//                         <h4>KYC Address</h4>
//                         <input placeholder="Enter kyc address" value={kycadd} onChange={ e => setKycadd(e.target.value)} />
//                         </div>
//                     </form>

//                     <div className="req__kycbtn">
//                         <button className="kycreqbtn" onClick={handleRequestkyc}>Request KYC</button>
//                     </div>

//                     <div id="dont" hidden="hidden">
//                     <div className="middletitle"> Your KYC </div>

//                         <div className="form__title">Family Information</div>

//                         <form>
//                         <div>
//                             <div className="form__heading">Full Name</div>
//                             <input
//                             placeholder="Enter full name"
//                             value={fi.fullname}
                            
//                             style={{ width: '100%', height: '25px' }}
//                             />
//                         </div>

//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Father Name</div>
//                             <input
//                                 placeholder="Enter fathers name"
//                                 value={fi.fathername}
                               
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1' }}>
//                             <div className="form__heading">Mother Name</div>
//                             <input
//                                 placeholder="Enter mother name"
//                                 value={fi.mothername}
                               
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>

//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Grand father Name</div>
//                             <input
//                                 placeholder="Enter grandfathers name"
//                                 value={fi.grandfathername}
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1' }}>
//                             <div className="form__heading">Spouce Name</div>
//                             <input
//                                 placeholder="Enter spouce name"
//                                 value={fi.spousename}
                                
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>
//                         </form>

//                         <div className="form__title">Permanent Address</div>
//                         <form>
//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">District</div>
//                             <input
//                                 placeholder="Select district"
//                                 value={pa.district}
                               
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">VDC/Municipality</div>
//                             <input
//                                 placeholder="Enter VDC/Municipality"
//                                 value={pa.vdc}
                              
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1' }}>
//                             <div className="form__heading">Ward</div>
//                             <input
//                                 placeholder="Enter ward number"
//                                 value={pa.ward}
                             
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>
//                         </form>

//                         <div className="form__title">Personal Information</div>
//                         <form>
//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Date of birth</div>
//                             <input
//                                 placeholder="Enter date"
//                                 value={pi.dob}
                                
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Date type</div>
//                             <input
//                                 placeholder="Select date type"
//                                 value={pi.datype}
                                
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1' }}>
//                             <div className="form__heading">Gender</div>
//                             <input
//                                 placeholder="Select gender"
//                                 value={pi.gender}
                               
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>
//                         </form>

//                         <div className="form__title">Identity Information</div>
//                         <form>
//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Identity type</div>
//                             <input
//                                 placeholder="Enter identity type"
//                                 value={ii.itype}
                              
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Identity number</div>
//                             <input
//                                 placeholder="Enter identity number"
//                                 value={ii.inumber}
                                
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1' }}>
//                             <div className="form__heading">Issued from</div>
//                             <input
//                                 placeholder="Enter issued address"
//                                 value={ii.ifrom}
                              
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>
//                         <div style={{ display: 'flex', marginTop: '20px' }}>
//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Issued date</div>
//                             <input
//                                 placeholder="Enter issued date"
//                                 value={ii.idate}
                              
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>

//                             <div style={{ flex: '1', marginRight: '20px' }}>
//                             <div className="form__heading">Issued date type</div>
//                             <input
//                                 placeholder="Enter issued date type"
//                                 value={ii.idatetype}
                               
//                                 style={{ width: '100%', height: '25px' }}
//                             />
//                             </div>
//                         </div>
//                         </form>

//                         <div className="kycbutton">
//                         <button className="kyc__submitbtn">
//                             Bank Submit
//                         </button>
//                         </div>
//                     </div>


//                 </div>

//                 <div className="home__rightSide">
//                     <Rightbody />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MyKycReq;