import axios from "axios";

// save user info into the database
export const saveUser = async (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    firebaseUserId: user.uid,
    role: "user",
  };
  const { data } = await axios.put(`/users/${user?.email}`, currentUser);
  return data;
};
