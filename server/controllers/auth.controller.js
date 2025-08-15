const { db } = require("../utils/dbconnect");
const usersCollection = db.collection("users");

const userRegistration = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const user = req.body;

  console.log(user);
  const query = { email: email };
  const options = { upsert: true };
  const isExist = await usersCollection.findOne(query);
  console.log("User found?----->", isExist);
  if (isExist) {
    if (user?.status === "Requested") {
      const result = await usersCollection.updateOne(
        query,
        {
          $set: user,
        },
        options
      );
      return res.send(result);
    } else {
      return res.send(isExist);
    }
  }
  const result = await usersCollection.updateOne(
    query,
    {
      $set: { ...user, timestamp: Date.now() },
    },
    options
  );
  res.send(result);
};

module.exports = { userRegistration };
