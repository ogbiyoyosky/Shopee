const FetchWalletCashflowsFeature = use(
    "App/Controllers/Features/FetchWalletCashflowsFeature"
  );

class WalletController {
    async fetchCashflows({ request, response, auth }) {
        return new FetchWalletCashflowsFeature(response, auth).fetchCashflows();
    }
}

module.exports = WalletController;
