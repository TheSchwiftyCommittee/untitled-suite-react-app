import { USuiteApi } from "../api/USuiteApi";
import postData from "./postData";

jest.mock("../api/USuiteApi");
console.log = jest.fn();

describe("postData", () => {
  afterEach(jest.resetAllMocks);

  test("should fetch data", async () => {
    const users = [{ name: "Bob" }];
    const resp = { data: users };
    USuiteApi.post.mockResolvedValue(resp);

    const data = await postData("/users", {});
    // console.log(data)
    expect(data).toBe(users);
    expect(USuiteApi.post).toHaveBeenCalledTimes(1);
  });

  test("should log console if error", async () => {
    USuiteApi.get.mockRejectedValueOnce();

    await postData("/users", {});
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenLastCalledWith(
      expect.stringContaining("Failed to post data")
    );
  });
});
