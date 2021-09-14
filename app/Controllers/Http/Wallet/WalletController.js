const ProcessWithdrawal = use("App/Controllers/Features/ProcessWithdrawalFeature");

const FetchWalletCashflowsFeature = use(
    "App/Controllers/Features/FetchWalletCashflowsFeature"
  );

class WalletController {
    async fetchCashflows({ request, response, auth }) {
        return new FetchWalletCashflowsFeature(response, auth).fetchCashflows();
    }

    async withdraw({ request, response, auth }) {
        return new ProcessWithdrawal(request, response, auth).processWithdrawal();
    }
}

module.exports = WalletController;
