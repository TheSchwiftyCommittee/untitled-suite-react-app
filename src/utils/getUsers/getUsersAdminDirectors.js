import getData from "../getData";

const getUsersAdminDirectors = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    params: {
      username: localStorage.getItem("username"),
      id: localStorage.getItem("user"),
    },
  };

  try {
    const data = await getData("/admin_directors/user_index", config);
    return data
  } catch (error) {
    console.log("Failed to get User Data")
  }
};

export default getUsersAdminDirectors;