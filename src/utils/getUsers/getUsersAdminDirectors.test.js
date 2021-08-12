import getUsersAdminDirectors from "./getUsersAdminDirectors";
import getData from "../getData";

jest.mock("../getData");
global.console.log = jest.fn();

describe("getData", () => {
  afterEach(jest.clearAllMocks);

  test("should fetch data", async () => {
    const users = [
      {
        username: "mortysmith",
        email: "mortysmith@test.com",
        first_name: "Morty",
        last_name: "Smith",
      },
    ];
    getData.mockResolvedValue(users);

    const data = await getUsersAdminDirectors();
    // console.log(data)
    expect(data).toBe(users);
    expect(getData).toHaveBeenCalledTimes(1);
  });

  test("should log console if error", async () => {
    getData.mockRejectedValueOnce();

    await getUsersAdminDirectors("/users", {});
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenLastCalledWith(
      expect.stringContaining("Failed to get User Data")
    );
  });
});
