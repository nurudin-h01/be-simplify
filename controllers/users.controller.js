const UsersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken, verifyToken } = require("../helpers");

class UsersController {
    static async login(req, res){
        try {
            let {username, password} = req.body; 
            const existusername = await UsersModel.findOne({ username: username });
            if (existusername !== null) {
				let compare = bcrypt.compareSync(password, existusername.password);
				if (compare) {
					const tokenUser = {
						_id: existusername._id,
						username: username
					};
					const createToken = generateToken(tokenUser);
					res.status(200).send({ message: "welcome", token: createToken });
				} else {
					res.send("invalid");
				}
			} else {
				res.send("user is not exist");
			}
        } catch (error) {
            res.status(500).send({ err: error.message });
        }
    }
}

module.exports = UsersController;