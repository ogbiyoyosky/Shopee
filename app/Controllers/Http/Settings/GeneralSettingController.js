'use strict'
const GeneralSetting = use("App/Models/GeneralSetting")

class GeneralSettingController {
    async fetchSettings({ response }) {
        try {
            const settings = await GeneralSetting.all()

            return this.response.status(200).send({
                message: `Successfully fetched the settings`,
                status_code: 200,
                status: "success",
                results: settings
            })

        } catch (fetchSettingsError) {
            console.log("fetchSettingsError", fetchSettingsError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }
}

module.exports = GeneralSettingController
