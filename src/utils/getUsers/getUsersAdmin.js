import getData from "../getData";

const getUsersAdmin = async () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    params: {
      username: localStorage.getItem("username"),
      id: localStorage.getItem("user"),
    },
  };

  const data = await getData("/admins/user_index", config);
  return data
};

export default getUsersAdmin;