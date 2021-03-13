import { InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

// interface TransferRecipientPayload {
//   name : string;
//   account_number: string;
//   bank_code: string;
//   currency: string;
// }

// interface TransferPayload {
//     amount: number;
//     recipient: string;
//     reason: string;
// }

// interface BankQueryFilter {
//     country?: string;
//     use_cursor?: boolean;
//     perPage?: number;
// }

class PaystackClient {
  baseURL = 'https://api.paystack.co';
  authorization = `Bearer ${process.env.PAYSTACK_SECRET}`;

  parseResponse(response) {
    if (response) {
      console.log(response.data.error);
    }

    return response.data;
  }

  handleError(error) {
    const fallbackMessage = 'Unable to complete request at this time. Please contact support';

    if (error.response) {

      console.log(`PAYSTACK ERROR OBJECT: `, error.response);
      console.log(`PAYSTACK ERROR: `, error.response.data);
    } else {
      console.log(error);
    }

    throw new InternalServerErrorException(fallbackMessage);
  }

  composeEndpoint(path) {
    return `${this.baseURL}${path}`;
  }
  
  async getBanks(filter = {}) {
    try {
      let path = `/bank`;
      
      const filterKeys = Object.keys(filter);
      let prefix = '?';
      
      filterKeys.forEach(key => {
        path = path + `${prefix}${key}=${filter[key]}`;
        
        if (prefix === '?') {
          prefix = '&';
        }
      });
      
      const endpoint = this.composeEndpoint(path);
      const response = await axios.get(endpoint, {
        headers: { Authorization: this.authorization }
      });
      
      return this.parseResponse(response);
      
    } catch (error) {
      this.handleError(error) ;
    }
  }

  async resolveAccount(accountNumber, bankCode) {
    try {
      const endpoint = this.composeEndpoint(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`);
      const response = await axios.get(endpoint, {
        headers: { Authorization: this.authorization }
      });
      
      return this.parseResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createRecipientClient(payload) {
    try {
      const endpoint = this.composeEndpoint(`/transferrecipient`);
      const response = await axios.post(endpoint, { type: 'nuban', ...payload }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authorization
        }
      });
      
      return this.parseResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }


  async initiateTransfer(payload) {
    try {
      const endpoint = this.composeEndpoint(`/transfer`);
      const response = await axios.post(endpoint, { source: 'balance', ...payload }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authorization
        }
      });
      
      return this.parseResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new PaystackClient();
