import { USuiteApi, apiUrl } from "../api/USuiteApi";

const postData = async (path, data) => {
  try {
    const response = await USuiteApi.post(path, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        Accept: "application/json",
      },
    });
    console.log(`Data has been sent to ${apiUrl}${path}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to post data to ${apiUrl}${path}`);
  }
};

export default postData;
