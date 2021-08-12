import { USuiteApi } from "../api/USuiteApi";
import putData from "./putData";

jest.mock("../api/USuiteApi");
global.console.log = jest.fn();

describe("putData", () => {
  afterEach(jest.resetAllMocks);

  test("should fetch data", async () => {
    const users = [
      {
        username: "mortysmith",
        email: "mortysmith@test.com",
        first_name: "Morty",
        last_name: "Smith",
      },
    ];
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
