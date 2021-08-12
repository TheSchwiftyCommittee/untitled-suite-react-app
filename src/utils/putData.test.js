import { USuiteApi } from "../api/USuiteApi";
import putData from "./putData";

jest.mock("../api/USuiteApi");
global.console.log = jest.fn();

describe("putData", () => {
  afterEach(jest.resetAllMocks);

  test("should fetch data", async () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    USuiteApi.put.mockResolvedValue(resp);

    const data = await putData("/users", {});
    // console.log(data)
    expect(data).toBe(users);
    expect(USuiteApi.put).toHaveBeenCalledTimes(1);
  });

  test("should log console if error", async () => {
    USuiteApi.get.mockRejectedValueOnce();

    await putData("/users", {});
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenLastCalledWith(
      expect.stringContaining("Failed to updated")
    );
  });
});