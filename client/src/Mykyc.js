import React, { useState, useContext } from 'react'
import { FcUpload } from 'react-icons/fc'
import './Home.css'
import Header from './Header.js'
import Leftbody from './Leftbody.js'
import Rightbody from './Rightbody.js'
import './Mykyc.css'
import BlockchainContext from './BlockchainContext'

function Mykyc() {
  const { accounts, contract } = useContext(BlockchainContext)

  const [photo1, setPhoto1] = useState()
  const [photo2, setPhoto2] = useState()
  const [photo3, setPhoto3] = useState()

  const [fi, setFi] = useState({
    fullname: '',
    fathername: '',
    mothername: '',
    grandfathername: '',
    spousename: '',
  })
  const [pa, setPa] = useState({
    district: '',
    vdc: '',
    ward: '',
  })
  const [pi, setPi] = useState({
    dob: '',
    datype: '',
    gender: '',
  })
  const [ii, setIi] = useState({
    itype: '',
    inumber: '',
    ifrom: '',
    idate: '',
    idatetype: '',
  })
  const [proof, setProof] = useState({
    pp: '',
    front: '',
    back: '',
  })
  const [fathername, setFathername] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [add, setAdd] = useState()

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

  console.log(fi)

  const submitKyc = async (e) => {
    e.preventDefault()
    const familyinfo = [
      fi.fullname.toString(),
      fi.fathername.toString(),
      fi.mothername.toString(),
      fi.grandfathername.toString(),
      fi.spousename.toString(),
    ]
    const personaladd = [
      pa.district.toString(),
      pa.vdc.toString(),
      pa.ward.toString(),
    ]
    const personalinfo = [
      pi.dob.toString(),
      pi.datype.toString(),
      pi.gender.toString(),
    ]
    const iinfo = [
      ii.itype.toString(),
      ii.inumber.toString(),
      ii.ifrom.toString(),
      ii.idate.toString(),
      ii.idatetype.toString(),
    ]
    console.log(familyinfo)
    console.log(personaladd)
    console.log(personalinfo)
    console.log(iinfo)
    await contract.methods
      .buildKyc(familyinfo, personaladd, personalinfo, iinfo)
      .send({ from: accounts[0] })

    await contract.methods.KycBlock().send({ from: accounts[0] })

    const addres = await contract.methods
      .lastContractAddress()
      .call({ from: accounts[0] })

    setAdd(addres)

    if (addres) {
      document.getElementById('msg').style.display = 'block'
      console.log(`${add}`)
    } else {
      alert('Sorry Transaction Failed')
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
              <div className="form__heading">Full Name</div>
              <input
                placeholder="Enter full name"
                value={fi.fullname}
                onChange={(e) => setFi({ ...fi, fullname: e.target.value })}
                style={{ width: '100%', height: '25px' }}
              />
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Father Name</div>
                <input
                  placeholder="Enter fathers name"
                  value={fi.fathername}
                  onChange={(e) => setFi({ ...fi, fathername: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div className="form__heading">Mother Name</div>
                <input
                  placeholder="Enter mother name"
                  value={fi.mothername}
                  onChange={(e) => setFi({ ...fi, mothername: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Grand father Name</div>
                <input
                  placeholder="Enter grandfathers name"
                  value={fi.grandfathername}
                  onChange={(e) =>
                    setFi({ ...fi, grandfathername: e.target.value })
                  }
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div className="form__heading">Spouce Name</div>
                <input
                  placeholder="Enter spouce name"
                  value={fi.spousename}
                  onChange={(e) => setFi({ ...fi, spousename: e.target.value })}
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
                  placeholder="Select district"
                  value={pa.district}
                  onChange={(e) => setPa({ ...pa, district: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">VDC/Municipality</div>
                <input
                  placeholder="Enter VDC/Municipality"
                  value={pa.vdc}
                  onChange={(e) => setPa({ ...pa, vdc: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div className="form__heading">Ward</div>
                <input
                  placeholder="Enter ward number"
                  value={pa.ward}
                  onChange={(e) => setPa({ ...pa, ward: e.target.value })}
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
                  placeholder="Enter date"
                  value={pi.dob}
                  onChange={(e) => setPi({ ...pi, dob: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Date type</div>
                <input
                  placeholder="Select date type"
                  value={pi.datype}
                  onChange={(e) => setPi({ ...pi, datype: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div className="form__heading">Gender</div>
                <input
                  placeholder="Select gender"
                  value={pi.gender}
                  onChange={(e) => setPi({ ...pi, gender: e.target.value })}
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
                  placeholder="Enter identity type"
                  value={ii.itype}
                  onChange={(e) => setIi({ ...ii, itype: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Identity number</div>
                <input
                  placeholder="Enter identity number"
                  value={ii.inumber}
                  onChange={(e) => setIi({ ...ii, inumber: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div className="form__heading">Issued from</div>
                <input
                  placeholder="Enter issued address"
                  value={ii.ifrom}
                  onChange={(e) => setIi({ ...ii, ifrom: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Issued date</div>
                <input
                  placeholder="Enter issued date"
                  value={ii.idate}
                  onChange={(e) => setIi({ ...ii, idate: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>

              <div style={{ flex: '1', marginRight: '20px' }}>
                <div className="form__heading">Issued date type</div>
                <input
                  placeholder="Enter issued date type"
                  value={ii.idatetype}
                  onChange={(e) => setIi({ ...ii, idatetype: e.target.value })}
                  style={{ width: '100%', height: '25px' }}
                />
              </div>
            </div>
          </form>

          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <div className="form__heading">Photo(PP)</div>
              <input
                type="file"
                id="fileclick1"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler1}
              />
              <label htmlFor="fileclick1">
                <FcUpload style={{ fontSize: '40px', cursor: 'pointer' }} />
              </label>
              <img
                src={photo1}
                id="img1"
                alt=""
                style={{ display: 'none', width: '100%', height: '100px' }}
              />
            </div>

            <div style={{ flex: '1', marginRight: '20px' }}>
              <div className="form__heading">Identity(front)</div>
              <input
                type="file"
                id="fileclick2"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler2}
              />
              <label htmlFor="fileclick2">
                <FcUpload style={{ fontSize: '40px', cursor: 'pointer' }} />
              </label>
              <img
                src={photo2}
                id="img2"
                alt=""
                style={{ display: 'none', width: '100%', height: '100px' }}
              />
            </div>

            <div style={{ flex: '1' }}>
              <div className="form__heading">Identity(back)</div>
              <input
                type="file"
                id="fileclick3"
                hidden="hidden"
                accept="image/*"
                onChange={imageHandler3}
              />
              <label htmlFor="fileclick3">
                <FcUpload style={{ fontSize: '40px', cursor: 'pointer' }} />
              </label>
              <img
                src={photo3}
                id="img3"
                alt=""
                style={{ display: 'none', width: '100%', height: '100px' }}
              />
            </div>
          </div>

          <div className="message" id="msg" hidden="hidden">
            Congratulation your KYC has been put in the Blockchain and its
            address is {add}
          </div>

          <div className="kycbutton">
            <button className="kyc__submitbtn" onClick={submitKyc}>
              Submit
            </button>
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
