"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");
const Hash = use("Hash");
const moment = require('moment')

class UserSeeder {
  async run() {
    await Database.raw("SET FOREIGN_KEY_CHECKS = 0;");
	await Database.truncate("users");
	await Database.truncate("profiles");
	await Database.truncate("wallets");

const superAdminPassword = await Hash.make("53cr3t");
		const country_id = 1

		const user = await Database
		.table('users')
		.insert([
			{
				password: superAdminPassword,
				phone_number: 8101075052,
				email: "olamartins@gmail.com",
				is_activated_at: 1,
				role_id: 1,
				is_activated_at:   moment().format('YYYY-MM-DD HH:mm:ss'),
			},
		])
		const profiles = await Database
		.table('profiles')
		.insert([
			{
				user_id: 1,
				first_name: "Ola",
				last_name: "Martins",
				country_id,
				province_id: 1,
				state_id: 1,
				gender: "Male"
			},
		])

		const wallet = await Database
		.table('wallets')
		.insert([
			{
				user_id: 1,
				balance: 0
			},
		])

    await Database.raw("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

module.exports = UserSeeder;
