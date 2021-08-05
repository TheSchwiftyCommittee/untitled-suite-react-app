import {USuiteApi, apiUrl} from "../api/USuiteApi";

const importData = async (path) => {
  try {
    const response = await USuiteApi.post(path, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
    });
    const data = await response.data;
    console.log(`Data has been sent to ${apiUrl}${path}`);
    return data;
  } catch (error) {
    console.log("Failed to post data");
  }
};

export default importData;
