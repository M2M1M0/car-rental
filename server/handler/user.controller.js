import User from "../model/user.model.js";

export const users = async (_, res, next) => {

    try {
        const users = await User.find();
        if (users) res.json(users)

    } catch (error) {
        next(error)
    }
}

export const showUserDetail = async (req, res, next) => {

    const { id } = req.params
    try {
        if (id === 'undefined') {
            next("Invalid ID")

        } else {

            let user;

            user = await User.findById({ _id: id })?.populate("cars");

            if (user?.rent?.length > 0) {
                user = await User
                    .findById({ _id: id })
                    ?.populate("cars")
                    ?.populate({ path: "rent", populate: { path: "car" } })
            }

            if (user) {
                res.status(200).json(user)
            }
        }

    } catch (error) {
        next(error)
    }
}

export const updateProfile = async (req, res, next) => {

    const { id } = req.params

    try {
        if (id === 'undefined') {
            next("Invalid ID")

        } else {

            await User.updateOne(
                { _id },
                {
                    username,
                    email,
                    // password,
                    profilePicture,
                    coverPicture
                })

            res.status(200).json("Profile Update Successfully")
        }

    } catch (error) {
        next(error)
    }
}
