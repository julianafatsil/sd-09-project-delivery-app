import { useState } from 'react';
import axios from 'axios';

const useSellers = () => {
  const [sellers, setDataSellers] = useState();

  const setSellers = async (token) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3001/users/sellers',
        headers: { Authorization: token },
      });
      console.log(response.data);
      setDataSellers(response.data);
    } catch (error) {
      console.log(error.response.data);
      setDataSellers(error.response.data);
    }
  };

  return [sellers, setSellers];
};

export default useSellers;