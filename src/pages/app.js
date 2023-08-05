import axios from 'axios';

const makeApiCall = (requestData) => {
  const { apiurl, endpoint, method, body, sessionId = '' } = requestData;

  return axios({
    url:  "http://localhost:3000/generic",
    method: 'POST',
    data: requestData,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default makeApiCall;

