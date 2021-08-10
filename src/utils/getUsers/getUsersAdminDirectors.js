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

  const data = await getData("/admin_directors/user_index", config);
  return data
};

export default getUsersAdminDirectors;