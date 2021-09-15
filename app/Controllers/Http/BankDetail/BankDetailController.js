const FetchBankDetailFeature = use(
    "App/Controllers/Features/FetchBankDetailFeature"
  );

const EditBankDetailFeature = use(
    "App/Controllers/Features/EditBankDetailFeature"
  );

class BankDetailController {
    async fetchDetail({ request, response, auth }) {
        return new FetchBankDetailFeature(response, auth).fetchDetail();
    }

    async editDetail({ request, response, auth }) {
        return new EditBankDetailFeature(request, response, auth).editDetail();
    }
}

module.exports = BankDetailController;
