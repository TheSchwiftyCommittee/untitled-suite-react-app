import { USuiteApi, apiUrl } from "../api/USuiteApi";

const getData = async (path, config) => {
  try {
    const response = await USuiteApi.get(path, config);
    console.log(`${apiUrl}${path} Data has been loaded`);
    return response.data;
  } catch (error) {
    console.log("Failed to load data");
  }
};

export default getData;
