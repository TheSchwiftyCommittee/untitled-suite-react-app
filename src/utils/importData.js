import {USuiteApi, apiUrl} from "../api/USuiteApi";

const importData = async (path) => {
  try {
    const response = await USuiteApi.get(path, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    });
    const data = await response.data;
    console.log(`${apiUrl} Data has been loaded`);
    return data;
  } catch (error) {
    console.log("Failed to load data");
  }
};

export default importData;
