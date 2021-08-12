import { USuiteApi } from "../api/USuiteApi";
import deleteData from "./deleteData";

jest.mock("../api/USuiteApi");
console.log = jest.fn();

describe("postData", () => {
  afterEach(jest.resetAllMocks);

  test("should fetch data", async () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    USuiteApi.delete.mockResolvedValue(resp);

    const data = await deleteData("/users", {});
    // console.log(data)
    expect(data).toBe(users);
    expect(USuiteApi.delete).toHaveBeenCalledTimes(1);
  });

  test("should log console if error", async () => {
    USuiteApi.delete.mockRejectedValueOnce();

    await deleteData("/users", {});
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenLastCalledWith(
      expect.stringContaining("Failed to delete data")
    );
  });
});
