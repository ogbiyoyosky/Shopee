"use strict";
const CountryCode = use("App/Models/CountryCode");
const TransactionTypeSetting = use("App/Models/TransactionTypeSetting");
const Setting = use("App/Models/GeneralSetting");

class FetchMetaDatumFeature {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async fetchMetaDatum() {
    try {
      const country_code = await CountryCode.query()
        .select("id", "dial_code", "name", "code")
        .fetch();

      const settings = await Setting.all();

      const serializedeSettings = settings.toJSON();
      const serialized_country = country_code.toJSON();

      const transaction_type = await TransactionTypeSetting.query()
        .select("id", "transaction_type_label")
        .fetch();

      const serialized_transaction_type = transaction_type.toJSON();

      const meta = {
        countries: serialized_country,
        transaction_type: serialized_transaction_type,
        general_settings: serializedeSettings,
      };

      return this.response.status(200).send({
        message: "Successfully fetch all Metadata",
        status_code: 200,
        status: "Success",
        result: meta,
      });
    } catch (FetchMetaDatumFeatureError) {
      console.log("FetchMetaDatumFeatureError", FetchMetaDatumFeatureError);
      return this.response.status(500).send({
        status: "Fail",
        message: "Internal Server Error",
        status_code: 500,
      });
    }
  }
}
module.exports = FetchMetaDatumFeature;
