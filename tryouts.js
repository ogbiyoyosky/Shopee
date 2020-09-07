const moment = require('moment');

const getLedgerBalance = ({ balance, cashflows }) => {
  const sumOfUnclearedWalletInflows = cashflows.reduce(
    (accumulator, cashflow) => {
      if (cashflow.type === 'credit') {
        return accumulator + cashflow.amount;
      }

      if (cashflow.type === 'debit') {
        return accumulator - cashflow.amount;
      }
    },
    0
  );

  return sumOfUnclearedWalletInflows;
};

const getTotalUnclearedInflows = ({ balance, cashflows }) => {
  const sumOfUnclearedWalletInflows = cashflows.reduce(
    (accumulator, cashflow) => {
      if (cashflow.type === 'credit' && cashflow.is_cleared === false) {
        return accumulator + cashflow.amount;
      }

      return accumulator;
    },
    0
  );

  return sumOfUnclearedWalletInflows;
};

const wallet = {
  balance: 10,
  cashflows: [
    {
      amount: 30,
      type: 'credit',
      is_cleared: true,
    },
    {
      amount: 10,
      type: 'debit',
      is_cleared: true,
    },
    {
      amount: 20,
      type: 'credit',
      is_cleared: true,
    },
    {
      amount: 15,
      type: 'credit',
      is_cleared: true,
    },
    {
      amount: 5,
      type: 'debit',
      is_cleared: true,
    },
  ],
};

// const ledgerBalance = getLedgerBalance(wallet);
// const totalUnclearedInflows = getTotalUnclearedInflows(wallet);

// console.log('Ledger balance:', ledgerBalance);
// console.log('Uncleared balance:', totalUnclearedInflows);
// console.log('Available balance:', ledgerBalance - totalUnclearedInflows);

const yesterday = new Date('2020-09-03');

const momentInstance = moment(yesterday);

console.log(yesterday);
console.log(momentInstance.add(24, 'hours').isSameOrBefore(moment.now()));

const baseCode = String(0000000000);
const placementCode = String(baseCode);
const completedOrderCode = 'F' + placementCode;
const returnedOrderCode = 'Z' + completedOrderCode.slice(1);

console.log(baseCode, placementCode, completedOrderCode, returnedOrderCode);

console.log(`${Date.now()}`);

const currentTimestamp = Date.now();
let orderBasedData = 99999999999 + 5000000 + currentTimestamp;

const randomFactor = Math.floor(Math.random() * 1000000);
console.log(randomFactor + orderBasedData);
