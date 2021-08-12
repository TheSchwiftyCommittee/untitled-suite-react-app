import { USuiteApi } from "../api/USuiteApi";
import getData from "./getData";

jest.mock("../api/USuiteApi");

describe("getData", () => {
  afterEach(jest.clearAllMocks)
  
  test("should fetch data", async () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    USuiteApi.get.mockResolvedValue(resp);
  
    const data = await getData("/users", {});
    // console.log(data)
    expect(data).toBe(users);
    expect(USuiteApi.get).toHaveBeenCalledTimes(1)
  });

})
