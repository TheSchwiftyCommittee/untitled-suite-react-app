const axios = require("axios");

const setApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://untitled-suite-api.herokuapp.com/api"
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000/api"
  }
}
const apiUrl = setApiUrl()

const USuiteApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
  },
});

// export default USuiteGet;
module.exports = {
  USuiteApi,
  apiUrl
}
