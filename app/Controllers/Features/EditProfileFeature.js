'use strict'
const Profile = use('App/Models/Profile')
const User = use('App/Models/User')

class EditProfileFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }
    async editProfile(){
        try {
            const {
                email,
                phone_number,
                country_id,
                password,
                first_name,
                last_name,
                state_id,
                province_id,
                gender
            }= this.request.all()

            if(email) {
                const emaiExist = await User.findBy('email', email)
                if(emaiExist) {
                    if(emaiExist.id != this.auth.current.user.id) {
                        return this.response.status(400).send({
                            message: "Another user currently have email address.",
                            status: 'fail',
                            status_code: 400,
                        })
                    }
                }
               
            }

            if(phone_number) {
                const phoneExist = await User.findBy('phone_number', phone_number) 
                if(phoneExist) {
                    if(phoneExist.id != this.auth.current.user.id) {
                        return this.response.status(400).send({
                            message: "Another user currently have phone number.",
                            status: 'fail',
                            status_code: 400,
                        })
                    }
                } 
            }
            
            const user = this.auth.current.user
            user.merge({
                phone_number: phone_number,
                email: email,
                password: password
            })
            await user.save()

            const profile = await Profile.findBy('user_id', user.id)
            profile.merge({
                country_id,
                first_name,
                last_name,
                state_id,
                province_id,
                gender
            })
            await profile.save()

            return this.response.status(200).send({
                message: "Successfully updated the profile.",
                status: 'Success',
                status_code: 200,
            })

        
        } catch (editProfileError) {
            console.log("editProfileError",editProfileError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
        }
    }
    

  
}
module.exports = EditProfileFeature