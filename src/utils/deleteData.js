import { USuiteApi, apiUrl } from "../api/USuiteApi";

const deleteData = async (path, body) => {
  try {
    const response = await USuiteApi.delete(path, body);
    console.log(`Data has been deleted from ${apiUrl}${path}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to delete data from ${apiUrl}${path}`);
  }
};

export default deleteData;
