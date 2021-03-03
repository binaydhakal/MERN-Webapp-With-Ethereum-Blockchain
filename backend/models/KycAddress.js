const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const KycAddressSchema = new mongoose.Schema(
  {
    usermain_id: {
      type: ObjectId,
      required: true,
    },
    kycaddress: {
      type: String,
      required: true,
    },
    },{
    timestamps: true,
  },
)

const KycAddress = mongoose.model('KycAddress', KycAddressSchema)

module.exports = KycAddress;
