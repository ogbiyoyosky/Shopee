"use strict";

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
const Route = use("Route");

// Route.on('/').render('welcome')
Route.get("/", ({
  view
}) => {
  return {
    Shopee: "Welcome to Shopee Api"
  };
});

Route.post("webhook/deploy", "Webhook/WebhookController.deploy");

Route.get("/api/v1", () => {
  return {
    Shopee: "This is the version 1 of shopee api"
  };
});

Route.group(() => {
  //meta
  Route.get("/MetaData", "Meta/MetaDatumController.showMetadata");
  Route.get(
    "MetaData/States/:country_id",
    "Meta/MetaDatumController.fetchState"
  );
  Route.get(
    "MetaData/Provinces/:state_id",
    "Meta/MetaDatumController.fetchProvince"
  );
  Route.get(
    "Product/ProductSubCategory/:category_id",
    "Store/StoreController.fetchProductCategory"
  ); //.middleware(['auth','shopAdmin'])

  Route.post(
    "Auth/Register",
    "Authentication/AuthController.register"
  ).validator("Register");
  Route.get(
    "Auth/Confirm/:confirmation_token",
    "Authentication/AuthController.confirmAccount"
  );
  Route.post("Auth/Logout", "Authentication/AuthController.logout").middleware(
    "auth"
  );
  Route.post(
    "Auth/GenerateToken",
    "Authentication/AuthController.generateToken"
  ).middleware("auth");
  Route.post("Auth/Authenticate", "Authentication/AuthController.loginUser");
  Route.post(
    "Password/SendPasswordResetLink",
    "PasswordMgt/PasswordController.sendLink"
  ).validator("SendLink");
  Route.post(
    "Password/PasswordReset",
    "PasswordMgt/PasswordController.resetPassword"
  );
  Route.post("Store/CreateStore", "Store/StoreController.createStore")
    .middleware(["auth", "shopAdmin"])
    .validator("Store");
  Route.post(
      "Store/ActivateStore/:store_id",
      "Store/StoreController.activateStore"
    )
    .middleware(["auth", "superAdmin"])
    .validator("ActivateStore");
  Route.get(
    "Store/FetchStores",
    "Store/StoreController.fetchStoresInUsersLocation"
  );
  Route.get(
    "Profile/Info",
    "Profile/ProfileController.fetchProfile"
  ).middleware(["auth"]);
  Route.put("EditProfile/Info", "Profile/ProfileController.editProfile")
    .middleware(["auth"])
    .validator("EditProfile");
  //paystack integration
  Route.post("Paystack/Pay", "Payment/PaymentController.payWithPayStack")
    .middleware(["auth"])
    .validator("Payment");
  Route.get(
    "Paystack/VerifyPayment",
    "Payment/PaymentController.verifyPayment"
  );
  Route.get(
    "Transaction/ProcessTransaction",
    "Payment/PaymentController.processTransaction"
  );

  //store
  Route.get('Store/AllStores', 'Store/StoreController.listStores').middleware(['auth', 'superAdmin'])
  Route.post('Store/AddProduct/:store_id', 'Store/StoreController.addProduct').middleware(['auth', 'shopAdmin']).validator('AddProduct')

  Route.get('Store/:store_id/Product', 'Store/StoreController.listProduct').middleware(['auth', 'shopAdmin'])

  Route.post("Product/:product_id/AddVariant", 'Store/StoreController.addVariant').middleware(['auth', 'shopAdmin'])

}).prefix('api/v1')
