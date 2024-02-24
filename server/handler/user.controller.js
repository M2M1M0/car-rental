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
            next("Invalid ID for show user details")
            return
        } else {

            let user;

            user = await User.findById({ _id: id })?.populate({ path: "cars", populate: { path: "images" } });

            if (user?.rent?.length > 0) {
                user = await User
                    .findById({ _id: id })
                    ?.populate({ path: "cars", populate: { path: "images" } })
                    ?.populate({ path: "rent", populate: { path: "car", populate: { path: "images" } } })
            }

            if (user) {
                res.status(200).json(user)
            }

        }

    } catch (error) {
        console.log(error, "Show user details errro")
        next(error)
    }
}

export const updateProfile = async (req, res, next) => {
    const { id } = req.params
    const { email, username } = req.body

    let coverPicture, profilePicture;

    if (req?.files?.coverPicture?.length > 0) {
        coverPicture = req?.files?.coverPicture[0]?.path
    }
    if (req?.files?.profilePicture?.length > 0) {
        profilePicture = req?.files?.profilePicture[0]?.path
    }

    try {
        if (id === 'undefined') {
            next("Invalid ID for update profile")

        } else {

            await User.updateOne(
                { _id: id },
                {
                    username,
                    email,
                    profilePicture,
                    coverPicture
                })

            res.status(200).json("Profile Update Successfully")
        }

    } catch (error) {
        console.log(error, "User update error");
        next(error)
    }
}
