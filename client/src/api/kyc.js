import axios from 'axios';

export const createKyc = async (data) => {

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    

    const response = await axios.post('/api/kyc', data, config);
    return response;

}

export const getKyc = async () => {


  const response = await axios.get('/api/kyc');
  return response;

}

export const getKycAddress = async () => {


  const response = await axios.get('/api/kycAddress');
  return response;

}

export const createKycAddress = async (data) => {

  // const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  

  const response = await axios.post('/api/kycAddress', data);
  return response;

}