const Kyc = require('../models/Kyc');
const fs = require('fs');
const ipfs = require('../middleware/ipfs');



exports.create = async (req, res) => {

    console.log('From kyc Controller');

    const {
        fullname,
        fathername,
        mothername,
        grandfathername,
        spousename,
        district,
        vdc,
        ward,
        dob,
        datype,
        gender,
        itype,
        inumber,
        ifrom,
        idate,
        idatetype
    } = req.body;
    try {

        const alreadyExit = await Kyc.findOne({
            main_id: req.user
        })

        if (alreadyExit) {
            return res.status(400).json({
                errorMessage: 'You Have Already SUbmitted Your KYC.'
            })
        } else {


            var data = Buffer.from(fs.readFileSync(req.files.pp[0].path));

            var data1 = Buffer.from(fs.readFileSync(req.files.front[0].path));

            var data2 = Buffer.from(fs.readFileSync(req.files.back[0].path));

            let kyc = new Kyc();
            kyc.main_id = req.user;
            kyc.fullname = fullname;
            kyc.fathername = fathername;
            kyc.mothername = mothername;
            kyc.grandfathername = grandfathername;
            kyc.spousename = spousename;
            kyc.district = district;
            kyc.vdc = vdc;
            kyc.ward = ward;
            kyc.dob = dob;
            kyc.datype = datype;
            kyc.gender = gender;
            kyc.itype = itype;
            kyc.inumber = inumber;
            kyc.ifrom = ifrom;
            kyc.idate = idate;
            kyc.idatetype = idatetype;

            await ipfs.add(data, async function (err, file) {
                if (err) {
                    console.log(err);
                }
                console.log(file);
                console.log(file[0].hash);

                kyc.pp = file[0].hash.toString();

                await ipfs.add(data1, async function (err, file) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(file);
                    console.log(file[0].hash.toString());
    
                    kyc.front = file[0].hash.toString();
    
    
                    await ipfs.add(data2, async function (err, file) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(file);
                        console.log(file[0].hash);
    
                        kyc.back = file[0].hash.toString();

                        console.log(kyc);
                        
    
                         kyc.save()
                         .then(kyc=>{
                            res.json({
                            successMessage: `${fullname} your KYC has been Submitted for Validation`,
                            kyc
                        });
                         })
                         .catch(err=>{
                             res.json({err: err})
                         });
                       

                    });
                });

            });

            
        }

    } catch (error) {
        console.log('kyccontroller.create', error);
        res.status(500).json({
            errorMessage: 'Please try again later.'
        })
    }
};

exports.read = async (req, res) => {


    try {
        const findMatch = await Kyc.findOne({
            main_id: req.user
        });

        if (findMatch) {
            const kyc = await Kyc.find({
                main_id: req.user
            });

            const {
                fullname,
                fathername,
                mothername,
                grandfathername,
                spousename,
                district,
                vdc,
                ward,
                dob,
                datype,
                gender,
                itype,
                inumber,
                ifrom,
                idate,
                idatetype,
                isvalid
            } = kyc;

            res.json({
                kyc
            });

        } else {
            res.json({
                errorMessage: 'Please Submit Your Kyc'
            })
        }

    } catch (error) {
        console.log('kyccontroller.read', error);
        res.status(500).json({
            errorMessage: 'Please try again later.'
        })
    }
}