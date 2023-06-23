import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";


async function createUser(req, res) {
  try {
    if (!req.body.name || !req.body.email || !req.body.dni || !req.body.password) {
      return res.status(400).send({ success: false, error: "Falta uno o más campos obligatorios" });
    }
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
    await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      dni: req.body.dni,
      password: encryptedPassword,
    });
    res.send({success : true});
  } catch (err) {
    res.status(500).send(err);
  }
}

async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email });

    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: "missing data" });
    }

    if (!user) {
      res.send({ logged: false, message: "email not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.send({ logged: "found user" });
    } else {
      res.send({ logged: "wrong password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export { createUser, loginUser };
