import User from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    const { email, username, password } = req.body
    try {

        const user = await User.findOne({ username: username.toLowerCase() })
        if (user) {
            return res.status(409).json("User Already Found")
        }
        // Encrypt Password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // ======== Register
        const createUser = new User({
            email,
            username: username.toLowerCase(),
            password: hashedPassword
        })

        await createUser.save()
        res.status(201).json(createUser)


    } catch (error) {
        console.log(error, "Register Err")
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username: username.toLowerCase() })

        if (!user) {
            console.log("Wrong Credentials")

            return res.status(404).json("Wrong Credentials")
        }
        // check Password
        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) return res.status(409).json("Wrong credential")

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");

        const cookieOptions = {
            maxAge: 60 * 60 * 1000, // 1 hour 
            httpOnly: true,
        }
        res
            .cookie("access_token", token, cookieOptions)
            .status(200)
            .json(user)

    } catch (error) {
        console.log(error, "Login Err")
        next(error)
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: false
    }).status(200).json("User has been logged out.")
}