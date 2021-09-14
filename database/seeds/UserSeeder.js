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
const moment = require("moment");

class UserSeeder {
  async run() {
    await Database.raw("SET FOREIGN_KEY_CHECKS = 0;");
    await Database.truncate("users");
    await Database.truncate("profiles");
    await Database.truncate("wallets");

    const password = await Hash.make("secret");

    await Database.table("users").insert([
      {
        password,
        phone_number: 8101075052,
        email: "olamartins@gmail.com",
        is_activated_at: 1,
        role_id: 1,
        is_activated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        password,
        phone_number: 8075662786,
        email: "ogbiyoyosky@gmail.com",
        is_activated_at: 1,
        role_id: 2,
        is_activated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        password,
        phone_number: 8165634196,
        email: "haloendeliveries@gmail.com",
        is_activated_at: 1,
        role_id: 3,
        is_activated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        password,
        phone_number: 8051078832,
        email: "admin@timeshoppy.com",
        is_activated_at: 1,
        role_id: 1,
        is_activated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
    ]);

    await Database.table("profiles").insert([
      {
        user_id: 1,
        first_name: "Ola",
        last_name: "Martins",
        country_id: 1,
        province_id: 1,
        state_id: 1,
        gender: "Male",
      },
      {
        user_id: 2,
        first_name: "Emmanuel",
        last_name: "Ogbiyoyo",
        country_id: 1,
        province_id: 1,
        state_id: 1,
        gender: "Male",
      },
      {
        user_id: 3,
        first_name: "Caleb",
        last_name: "Mathew",
        country_id: 1,
        province_id: 1,
        state_id: 1,
        gender: "Male",
      },
      {
        user_id: 4,
        first_name: "Super",
        last_name: "Admin",
        country_id: 1,
        province_id: 1,
        state_id: 1,
        gender: "Male",
      },
    ]);

    await Database.table("wallets").insert([
      {
        user_id: 1,
        balance: 0,
      },
      {
        user_id: 2,
        balance: 0,
      },
      {
        user_id: 3,
        balance: 0,
      },
      {
        user_id: 4,
        balance: 0,
      },
    ]);

    await Database.raw("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

module.exports = UserSeeder;