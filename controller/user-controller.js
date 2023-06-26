import User from "../model/userSchema.js";

export const userSingup = async (req, res) => {
  try {
    //to check if user already exits
    const userExists = await User.findOne({ username: req.body.username });

    if (userExists) {
      return res.status(401).json({ message: "Username alredy exists" });
    }
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    console.log(newUser);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogIn = async (request, response) => {
  try {
    let user = await User.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    if (user) {
      return response
        .status(200)
        .json(`${request.body.username} login successfull`);
    } else { 
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    response.json("Error: ", error.message);
  }
};
