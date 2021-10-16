import faker from 'faker';
import _ from 'lodash';
import moment from 'moment';

export const temp = 'a';

export const TABLE_DATA = _.map(_.range(1, 40), (x, index) => ({
  companyName: faker.company.companyName(),
  signedAt: moment(faker.date.past()),
  companyAddress: faker.address.streetAddress(),
  createdAt: moment(faker.date.past()),
  index,

  address: faker.address.streetAddress(),
  zip: faker.address.zipCode(),
  email: faker.internet.email(),
  city: faker.address.city(),
  country: faker.address.country(),

  topUpData: _.map(_.range(1, 3), (x, index) => ({
    chargeAmount: _.random(300),
    paidAt: moment(faker.date.past()).format('DD/MM/YYYY'),
    status: 'Completed',
  })),

  phoneNumberData: _.map(_.range(1, 3), (x, index) => ({
    country: faker.address.country(),
    phoneNumbers: _.map(_.range(1, 3), () => faker.phone.phoneNumber()),
    amount: _.random(300),
    createdAt: moment(faker.date.past()).format('DD/MM/YYYY'),
    status: 'Completed',
    // country
    // phoneNumber => Arr
    // amount
    // createdAt
    //  Status = Completed
  })),
  unlimitedData: _.map(_.range(1, 3), (x, index) => ({
    name: faker.name.jobTitle(),
    price: _.random(300),
    createdAt: moment(faker.date.past()).format('DD/MM/YYYY'),
    status: 'Completed',
    // name => title
    // price
    // createdAt
    //  Status = Completed
  })),
  packageData: _.map(_.range(1, 3), (x, index) => ({
    name: faker.name.jobTitle(),
    price: _.random(300),
    amount: _.random(300),
    createdAt: moment(faker.date.past()).format('DD/MM/YYYY'),
    status: 'Completed',
    // name
    // price
    // amount
    // createdAt
    //  Status = Completed
  })),

}));
