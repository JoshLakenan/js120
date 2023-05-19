/**
 It returns an invoice object, with phone and internet properties, and a total method.
The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
The function takes an object argument whose attributes override the default values.

Input - object - whose attributes override the default values
Ouptut - return an invoice object with phone, internet properties and a total method
Rules - The default value for the phone service is 3000
      - internet service is 5500
Algorithm
 */

/** Answer 3 **/
function createInvoice(services) {
  let invoiceObj = {
    phone : 3000,
    internet : 5500,
    amountPaid : 0,
    total() {
      return this.phone + this.internet;
    },
    amountDue() {
      return this.total() - this.amountPaid;
    },
    addPayments(paymentObjects) {
      [...paymentObjects].forEach(paymentObj => this.amountPaid += paymentObj.total());
    },
    addPayment(paymentObject) {
      this.amountPaid += paymentObject.total();
    }
  };

  if(services) {
    for(let prop in invoiceObj) {
      if (services.hasOwnProperty(prop)) invoiceObj[prop] = services[prop];
    }
  }

  return invoiceObj;
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

/** Answer 4 **/
function createPayment(services) {
  return Object.assign({total : function() {
    return Object.values(this).reduce((total, current) => {
      return typeof current === 'number' ? total + current : total;
      }, 0);
    }
  }, services);
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000


//Problem 5

/**
 * input - payment object : phone, internet, amount, total()
 * Output - mutate an invoice object, adding the payment
 */

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
