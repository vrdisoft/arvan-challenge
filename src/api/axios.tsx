import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";
axios.defaults.baseURL = BASE_URL;

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  return !!storedToken ? storedToken : "";
};

const request = ({
  url,
  type = "post",
  data,
}: {
  url: string;
  type?: string;
  data?: object;
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${retrieveStoredToken()}`;

  return axios({
    method: type,
    url: url,
    data: data,
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error?.response;
    });
};

export default request;
