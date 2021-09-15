'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

//Route.on('/').render('welcome')

Route.get('/', () => {
  return {
    Shopee: 'Welcome to Shopee Api',
  };
});

Route.group(() => {
  Route.get('/', () => {
    return {
      Shopee: 'Welcome to Shopee Api subdomains',
    };
  });
});

Route.post('/webhook/deploy', 'Webhook/WebhookController.deploy');

Route.get('/api/v1', () => {
  return {
    Shopee: 'This is the version 1 of shopee api',
  };
});

Route.group(() => {
  //meta
  Route.get('/MetaData', 'Meta/MetaDatumController.showMetadata');
  Route.get(
    'MetaData/Countries/',
    'Meta/MetaDatumController.fetchCountries'
  );
  Route.get(
    'MetaData/States/:country_id',
    'Meta/MetaDatumController.fetchState'
  );
  Route.get(
    'MetaData/Provinces/:state_id',
    'Meta/MetaDatumController.fetchProvince'
  );
  Route.get(
    'Product/ProductSubCategory/:category_id',
    'Store/StoreController.fetchProductCategory'
  ); //.middleware(['auth','shopAdmin'])

  Route.post(
    'Auth/Register',
    'Authentication/AuthController.register'
  ).validator('Register');
  Route.get(
    'Auth/Confirm/:confirmation_token',
    'Authentication/AuthController.confirmAccount'
  );
  Route.post(
    '/users/:user_id/ban',
    'Authentication/AuthController.ban'
  ).middleware(['auth', 'superAdmin']);

  Route.get('/users', 'UserManagement/UserController.fetchUsers').middleware([
    'auth',
    'superAdmin',
  ]);

  Route.post('Auth/Logout', 'Authentication/AuthController.logout').middleware(
    'auth'
  );
  Route.post(
    'Auth/GenerateToken',
    'Authentication/AuthController.generateToken'
  ).middleware('auth');
  Route.post('Auth/Authenticate', 'Authentication/AuthController.loginUser');
  Route.post(
    'Password/SendPasswordResetLink',
    'PasswordMgt/PasswordController.sendLink'
  ).validator('SendLink');
  Route.post(
    'Password/PasswordReset',
    'PasswordMgt/PasswordController.resetPassword'
  );
  Route.post('Store/CreateStore', 'Store/StoreController.createStore')
    .middleware(['auth', 'customer'])
    .validator('Store');
  Route.post(
    'Store/ActivateStore/:store_id',
    'Store/StoreController.activateStore'
  )
    .middleware(['auth'])
    .validator('ActivateStore');
  Route.get(
    'Store/FetchStores',
    'Store/StoreController.fetchStoresInUsersLocation'
  );
  Route.get(
    'Profile/Info',
    'Profile/ProfileController.fetchProfile'
  ).middleware(['auth']);
  Route.put('EditProfile/Info', 'Profile/ProfileController.editProfile')
    .middleware(['auth'])
    .validator('EditProfile');

  // Payments
  Route.post('Paystack/Pay', 'Payment/PaymentController.initializePayment')
    .middleware(['auth'])
    .validator('Payment');
  Route.get('payments/verify/:reference', 'Payment/PaymentController.verifyPayment');
  Route.post('/payments/webhook', 'Webhook/WebhookController.payment');

  //store
  Route.get('Store/AllStores', 'Store/StoreController.listStores').middleware([
    'auth',
    'superAdmin',
  ]);
  Route.post('Store/:store_id/AddProduct/', 'Store/StoreController.addProduct')
    .middleware(['auth', 'shopAdmin'])
    .validator('AddProduct');

  Route.put(
    'Store/:product_id/EditProduct',
    'Store/StoreController.editProduct'
  )
    .middleware(['auth', 'shopAdmin'])
    .validator('EditProduct');

  Route.get('Store/Product', 'Store/StoreController.listProduct').middleware([
    'auth',
    'shopAdmin',
  ]);

  Route.delete(
    'Product/:product_id/DeleteProduct',
    'Store/StoreController.deleteProduct'
  ).middleware(['auth', 'shopAdmin']);

  Route.get('Product/categories', 'Product/ProductController.getCategories');

  Route.get('products', 'Product/ProductController.fetchProduct');

  Route.get(
    'products/:product_id',
    'Product/ProductController.fetchProductById'
  );

  
  // Banks
  Route.get('banks', 'Meta/MetaDatumController.fetchBanks').middleware([ 'auth' ]);
  
  // Bank Details
  Route.get('bank-details', 'BankDetail/BankDetailController.fetchDetail').middleware([ 'auth' ]);
  Route.patch('bank-details', 'BankDetail/BankDetailController.editDetail').middleware([ 'auth' ]);


  // Wallet and Wallet Cashflows
  Route.get('wallets/transactions', 'Wallet/WalletController.fetchCashflows').middleware([ 'auth' ]);
  Route.post('wallets/withdraw', 'Wallet/WalletController.withdraw').middleware([ 'auth' ]);
  Route.post('/withdrawals/verifications', 'Withdrawal/WithdrawalController.verify');

  // Orders
  Route.post('orders', 'Order/OrderController.createOrder').middleware([
    'auth',
  ]);
  Route.post('order/pay', 'Order/OrderController.payForOrder').middleware([
    'auth',
  ]);
  Route.get(
    'seller/orders',
    'Order/OrderController.fetchSellerOrderNotifications'
  ).middleware(['auth', 'shopAdmin']);
  Route.get(
    'buyer/orders',
    'Order/OrderController.fetchBuyerOrderNotification'
  ).middleware(['auth']);
  Route.get('orders/:order_id', 'Order/OrderController.viewOrder').middleware([
    'auth',
  ]);
  Route.post(
    'orders/:order_id/processRefund',
    'Order/OrderController.processRefund'
  ).middleware(['auth']);
  Route.post('chat', 'Chat/ChatController.sendMessage').middleware(['auth']);
  Route.get('chat/:order_id', 'Chat/ChatController.fetchMessage').middleware([
    'auth',
  ]);
  Route.put('orders/:order_id', 'Order/OrderController.editOrder').middleware([
    'auth',
  ]);
  Route.patch(
    'orders/:order_id/add-shipping-cost',
    'Order/OrderController.addShippingCost'
  ).middleware(['auth', 'shopAdmin']);
  Route.get('products', 'Product/ProductController.fetchProduct');
  Route.get('search', 'SearchController.index');
  Route.get(
    'order/delivered/:order_id',
    'Order/OrderController.delivered'
  ).middleware(['auth', 'shopAdmin']);
  Route.get('admin/orders/', 'Order/OrderController.allOrders').middleware([
    'auth',
    'superAdmin',
  ]);
  Route.get(
    'order/confirmDelivery/:order_id',
    'Order/OrderController.confirmDelivered'
  ).middleware(['auth']);
  Route.get(
    'order/extendTime/:order_id',
    'Order/OrderController.extendTime'
  ).middleware(['auth']);

  Route.get(
    '/thirtyRemoveProduct',
    'CronJob/CronJobController.removeProductAfterThirtyDays'
  );

  Route.get(
    '/clearInflowsForWithdrawal',
    'CronJob/CronJobController.clearInflowsForWithdrawalAfterTwentyFourHours'
  );

  Route.get('/analytics', 'Analytic/AnalyticController.fetchAnalytics');
}).prefix('api/v1');
