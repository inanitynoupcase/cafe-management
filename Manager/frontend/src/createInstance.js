import jwtDecode from 'jwt-decode';
import axios from 'axios';


axios.defaults.withCredentials = true
const RefreshToken = async () => {
  console.log('RefreshToken');
  try {
    const res = await axios.post('http://localhost:8000/manager/auth/refresh',{ 
      withCredentials: true,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },}
    )
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const decodedToken = jwtDecode(user?.accessToken);
      const date = new Date();

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await RefreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers.token = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
