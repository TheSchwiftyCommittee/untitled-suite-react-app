import { USuiteApi } from "../api/USuiteApi";
import putData from "./putData";

jest.mock("../api/USuiteApi");

xtest("should error if insufficient data", () => {
  const path = "/lists/1";

  let formData = new FormData();
  formData.append("username", "morty");
  formData.append("title", "Gym");
  formData.append("id", 1);

  const headers = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      Accept: "application/json",
    },
  };

  const response = USuiteApi.put(path, formData, headers)
});
