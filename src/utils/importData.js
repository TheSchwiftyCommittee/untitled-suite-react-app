import {USuiteApi, USuiteGet} from "../api/USuiteApi";

const importData = async (path) => {
  try {
    const response = await USuiteApi.get(path);
    const data = await response.data;
    console.log("Data has been loaded");
    return data;
  } catch (error) {
    console.log("Failed to load data");
  }
};

export default importData;
