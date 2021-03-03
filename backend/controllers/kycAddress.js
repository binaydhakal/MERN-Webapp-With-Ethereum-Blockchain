const KycAddress = require('../models/KycAddress');


exports.createAddress = async (req, res) => {

    const { add } = req.body
    try {

        const alreadyExit = await KycAddress.findOne({ usermain_id: req.user })

        if (alreadyExit) {
            return res.status(400).json({
                errorMessage: 'You forgot fool you already Updated  KYC to Blockchain'
            })
        }else {
                 
            let kycAdd = new KycAddress();
            kycAdd.usermain_id = req.user;
            kycAdd.kycaddress = add;

            await kycAdd.save();

            res.json({
                successMessage: ` Your KYC Address has been Submitted to Database`,
                kycAdd
            });
        }
   
    } catch (error) {
        console.log('kyccontroller.createAddress error', error);
        res.status(500).json({
            errorMessage: 'Please try again later.'
        })
    }
}



exports.readAddress = async (req, res) => {

   
    try {
        const findMatch = await KycAddress.findOne({ usermain_id: req.user });

        if (findMatch) {
            const kycAdd = await KycAddress.find({ usermain_id: req.user  });

            const { kycaddress } = kycAdd;

            console.log(kycaddress);
            console.log(kycAdd)

            res.json({
                kycAdd
            });

        }else {
            res.json({
                errorMessage: 'There is not your Kyc Address'
            })
        } 
   
    } catch (error) {
        console.log('kyccontroller.readAddress error', error);
        res.status(500).json({
            errorMessage: 'Please try again later.'
        })
    }
}