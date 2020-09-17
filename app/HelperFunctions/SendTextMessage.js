const { customPostRequest } = use('App/HelperFunctions/ExternalApiCalls');
const Env = use('Env');
const MultitexterKey = Env.get('MULTI_TEXTER_APIKEY');
const TextMessageException = use('App/Exceptions/TextMessageException');

async function sendTextMessage(message, country_code, phone_number) {
  try {
    const stripped_dial_code = country_code.replace('+', '');

    const data = {
      message: message,
      sender_name: 'Farmer1st',
      recipients: stripped_dial_code + phone_number,
    };
    const headerOpt = {
      headers: {
        Authorization: `Bearer ${MultitexterKey}`,
        Accept: 'application/json',
      },
    };

    return await customPostRequest(
      'https://app.multitexter.com/v2/app/sendsms',
      data,
      headerOpt
    );
  } catch (error) {
    console.log('text error', error);
    throw new TextMessageException();
  }
}

module.exports = { sendTextMessage };
