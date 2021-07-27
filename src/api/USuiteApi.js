const axios = require("axios");

const USuiteApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json",
  },
});

// export default USuiteGet;
module.exports = {
  USuiteApi,
}
