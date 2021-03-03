const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const KycSchema = new mongoose.Schema({
    main_id: {
        type: ObjectId,
        required: true
    },
    fullname: {
        type: String,
        required: true,
      },
      fathername: {
        type: String,
        required: true,
      },
      mothername: {
        type: String,
        required: true,
      },
      grandfathername: {
        type: String,
        required: true,
      },
      spousename: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true,
      },
      vdc: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      dob: {
        type: String,
        required: true,
      },
      datype: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      itype: {
        type: String,
        required: true,
      },
      inumber: {
        type: String,
        required: true,
      },
      ifrom: {
        type: String,
        required: true,
      },
      idate: {
        type: String,
        required: true,
      },
      idatetype: {
        type: String,
        required: true,
      },
      pp: {
        type: Array,
        required: true,
      },
      front: {
        type: Array,
        required: true,
      },
      back: {
        type: Array,
        required: true,
      },
      isvalid: {
        type: Number,
        default: 0,
      },
}, { timestamps: true })



const Kyc = mongoose.model('Kyc', KycSchema);

module.exports = Kyc;
