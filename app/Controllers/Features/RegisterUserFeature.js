'use strict';
const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Wallet = use('App/Models/Wallet');
const Profile = use('App/Models/Profile');
const Env = use('Env');
const CountryCode = use('App/Models/CountryCode');
const BankDetail = use('App/Models/BankDetail');
const Event = use('Event');
const randomString = require('randomstring');

class RegisterUserFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async registerUser() {
    try {
      const {
        first_name,
        last_name,
        state_id,
        reg_type_id,
        email,
        gender,
        password,
        country_id,
        province_id,
        phone_number,
      } = this.request.all();

      const confirmation_token = randomString.generate({
        length: 5,
        charset: 'numeric',
      });

      let role_label;
      role_label = 'Customer';
      const role = await Role.findBy('role_label', role_label);

      const user = new User();
      user.email = email;
      user.password = password;
      user.phone_number = phone_number;
      user.confirmation_token = confirmation_token;
      user.role_id = role.id;
      await user.save();

      //wallet
      const wallet = new Wallet();
      wallet.user_id = user.id;
      await wallet.save();

      // bank detail
      // const bankDetail = new BankDetail();
      // bankDetail.user_id = user.id;
      // await bankDetail.save();

      //profile
      const profile = new Profile();
      profile.user_id = user.id;
      profile.first_name = first_name;
      profile.last_name = last_name;
      profile.country_id = country_id;
      profile.state_id = state_id;
      profile.province_id = province_id;
      profile.gender = gender;
      await profile.save();

      //phone recipient
      const country = await CountryCode.findBy('id', country_id);
      const sms_recipient = country.dial_code + user.phone_number.toString();

      const mailDetails = {
        user,
        profile,
        frontend_url: Env.get('FRONTEND_URL'),
      };

      // const textDetails = {
      //   sms_recipient,
      //   user
      // }

      Event.fire('new::customer', mailDetails);
      //Event.fire('new::regtext', textDetails )

      return this.response.status(201).send({
        status: 'Success',
        message: 'Successfully Registered',
        status_code: 201,
      });
    } catch (registerUserError) {
      console.log('registerUserError', registerUserError);
      return this.response.status(500).send({
        status: 'Fail',
        message: 'Internal Server Error',
        status_code: 500,
      });
    }
  }
}
module.exports = RegisterUserFeature;
