'use strict'
const User = use('App/Models/User')


class FetchProfileFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async fetchProfile () {
      try {
        const user_id = this.auth.current.user.id
        const profile = await User
        .query()
        .select('users.id','email','phone_number',
        'is_activated_at','country_codes.dial_code','users.phone_number ' , 'role_label','first_name',
        'last_name','states.state_label','provinces.province_label','country_codes.name as country',
        'gender','balance as wallet_balance')
        .where('users.id',user_id)
        .innerJoin('roles', 'users.role_id','roles.id')
        .innerJoin('wallets', 'users.id','wallets.user_id')
        .innerJoin('profiles', 'users.id','profiles.user_id')
        .innerJoin('country_codes', 'profiles.country_id','country_codes.id')
        .innerJoin('states', 'profiles.state_id','states.id')
        .innerJoin('provinces', 'profiles.province_id','provinces.id')
        .fetch()

        const serializedResult = profile.toJSON()

        return this.response.status(200).send({
          message: 'Successfully fetched the users profile',
          status_code: 200,
          status: 'success',
          result:  serializedResult[0]
        })
      } catch (error) {
        console.log('profile Error -> ', error);
        return this.response.status(400).send({
          status: 'fail',
          status_code: 400,
          message: 'Email Or Password Incorrect'
        })
      }
    }

  
}
module.exports = FetchProfileFeature