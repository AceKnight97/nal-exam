

export const CUSTOMER_CONTACT_TABS = {
  TOP_UP: 'Top Up',
  PHONE_NUMBERS: 'Phone Numbers',
  UNLIMITED: 'Unlimited',
  SPECIAL_PACKAGES: 'Special Packages',
};

export const PHONE_NUMBER_TYPES = {
  RANDOM: 'A group of random numbers',
  MANUAL: 'Manual selection',
};

export const CONTRACT_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DISPLAY: 'DISPLAY',
};

export const TOP_UP_AMOUNTS = [5, 10, 20, 50, 100];

export const PHONE_AMOUNTS_DATA = [5, 10, 15, 20, 50, 100];

export const PACKAGE_NAMES = [
  'Germany Voice 500 Landlines',
  'Germany Voice 250 Mobile',
  'Germany Voice 500',
  'Germany Voice Flat',
  'Germany and Greece Voice Flat',
];

export const PACKAGE_DESCRIPTION = [
  'Package of 500 calling minutes to German landlines',
  'Package of 250 calling minutes to German Mobile',
  'Package of 500 calling minutes to German mobiles and landlines',
  'Unlimited calling minutes to German mobiles and landlines',
  'Unlimited calling minutes to German and Greek mobiles and landlines',
];

export const DESTINATIONS_DATA = [
  '492;493;494;495;496;497;498;499',
  '4915;4916;4917',
  '4915;4916;4917;492;493;494;495;496;497;498;499',
  '4915;4916;4917;492;493;494;495;496;497;498;499',
  '4915;4916;4917;492;493;494;495;496;497;498;499;302;306',
];

export const MINUTES_DATA = [
];
export const PRICE_PER_USER = [2.49, 2.49, 4.95, 9.95, 12.95];

// package name	package description	destinations	minutes	messages	all users	price per user
// Germany Voice 500 Landlines	Package of 500 calling minutes to German landlines	492;493;494;495;496;497;498;499	500	0	0	2.49
// Germany Voice 250 Mobile	Package of 250 calling minutes to German Mobile	4915;4916;4917	250	0	0	2.49
// Germany Voice 500	Package of 500 calling minutes to German mobiles and landlines	4915;4916;4917;492;493;494;495;496;497;498;499	500	0	0	4.95
// Germany Voice Flat	Unlimited calling minutes to German mobiles and landlines	4915;4916;4917;492;493;494;495;496;497;498;499	2000	0	1	9.95
// Germany and Greece Voice Flat	Unlimited calling minutes to German and Greek mobiles and landlines	4915;4916;4917;492;493;494;495;496;497;498;499;302;306	2000	0	1	12.95


export const BILL_CATEGORIES = {
  CREDIT: 'CREDIT',
  NUMBERS: 'NUMBERS',
  RANDOM_NUMBERS: 'RANDOM_NUMBERS',
  UNLIMITED_PACKAGES: 'UNLIMITED_PACKAGES',
  SPECIAL_PACKAGES: 'SPECIAL_PACKAGES',
};

export const PHONE_CATEGORIES = {
  RANDOM_NUMBERS: 'Random Numbers',
  NUMBERS: 'Numbers',
};

export const SERVICE_TYPES = {
  UNLIMITED: 'UNLIMITED',
  SPECIAL_PACKAGE: 'SPECIAL_PACKAGE',
};
