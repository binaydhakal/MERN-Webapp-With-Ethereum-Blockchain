const Kyc = require('../models/Kyc');



exports.create = async (req, res) => {

    const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom,idate,idatetype } = req.body;
    try {

        const alreadyExit = await Kyc.findOne({ main_id: req.user })

        if (alreadyExit) {
            return res.status(400).json({
                errorMessage: 'You forgot fool you already submitted KYC'
            })
        }else {
                 
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
            kyc.pp = req.files.pp[0];
            kyc.front = req.files.front[0];
            kyc.back = req.files.back[0];

            await kyc.save();

            res.json({
                successMessage: `${fullname} your KYC has been Submitted for Validation`,
                kyc
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
        const findMatch = await Kyc.findOne({ main_id: req.user });

        if (findMatch) {
            const kyc = await Kyc.find({ main_id: req.user  });

            const { fullname, fathername, mothername, grandfathername, spousename, district, vdc, ward, dob, datype, gender, itype, inumber,ifrom,idate,idatetype, isvalid } = kyc;

            res.json({
                kyc
            });

        }else {
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




