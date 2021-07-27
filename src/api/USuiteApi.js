const axios = require("axios");

const USuiteApi = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json",
  },
});

const USuiteGet = (path) => {
  USuiteApi.get(path);
};

// export default USuiteGet;
module.exports = {
  USuiteApi,
  USuiteGet
}
