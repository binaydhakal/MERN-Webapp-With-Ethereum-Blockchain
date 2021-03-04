const Kyc = require('../models/Kyc');


exports.create = async (req, res) => {

    console.log('From kycFromrequest Controller');

    const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom, idate, idatetype, pp, front, back, isvalid  } = req.body;

    console.log(req.body);
    try {

        const alreadyExit = await Kyc.findOne({
            main_id: req.user
        });

        if (alreadyExit) {
            return res.status(400).json({
                errorMessage: 'Sorry ! You Already Submitted Your KYC'
            });
        } else {

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
            kyc.pp = pp;
            kyc.front = front;
            kyc.back = back;
            kyc.isvalid = isvalid;

            console.log('save data');
            console.log(kyc);


        await kyc.save();
         
         res.json({
           successMessage: `${fullname} your KYC has been Submitted to the Bank.`,
               kyc
               });
        }

    } catch (error) {
        console.log('kycFromrequestcontroller.create error', error);
        res.status(500).json({
            errorMessage: 'Please try again later.'
        })
    }
};