'use strict'
const User = use("App/Models/User")
const Role = use("App/Models/Role")

class UserController {
    async fetchUsers({ response }) {
        try {
            const { id } = await Role.findBy("role_label", "Super Admin")

            const users = await User.query()
                .whereNot("role_id", id)
                .with("profile")
                .fetch()

            return response.status(200).send({
                message: "Successfully fetch all users",
                status_code: 200,
                status: "Success",
                result: users
            })

        } catch (fetchUsersError) {
            console.log("fetchUsersError", fetchUsersError)
            return response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }
}

module.exports = UserController
