const axios = require("axios");

const setApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://untitled-suite-production.herokuapp.com"
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000"
  }
}
const apiUrl = setApiUrl()

const USuiteApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
    withCredentials: true,
  },
});

// export default USuiteGet;
module.exports = {
  USuiteApi,
  apiUrl
}
