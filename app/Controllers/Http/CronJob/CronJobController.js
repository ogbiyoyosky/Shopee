'use strict'
const User = use("App/Models/User")
const moment = require("moment")
class CronJobController {
    async thirtyDaysBan({ response }) {
        try {



            const users = await User.all()

            const serializedUsers = users.toJSON()

            return response.send({ users })

            for (var user in serializedUsers) {

            }
            // await User.query()
            //     .where('last_login_at' > '30')
            //     .update({ banned_at: banTime })


        } catch (thirtyDaysBanError) {
            console.log("thirtyDaysBanError", thirtyDaysBanError)
            return response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }

    }
}

module.exports = CronJobController
