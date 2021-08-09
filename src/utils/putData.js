import { USuiteApi, apiUrl } from "../api/USuiteApi";

const putData = async (path, body) => {
  try {
    const response = await USuiteApi.put(path, body, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "Accept": "application/json",
      },
    });
    console.log(`Data has been updated to ${apiUrl}${path}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to updated data to ${apiUrl}${path}`);
  }
};

export default putData;
