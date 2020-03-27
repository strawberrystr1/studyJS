let money,
income,
addExpenses,
deposit,
mission,
period;

alert ('First lesson');

console.log ('First lesson');

money = 9000;
income = 'игры';
addExpenses = 'интернет, комуналка, транспорт';
deposit = true;
mission = 900000;
period = 12;

console.log(typeof income);
console.log(typeof deposit);
console.log(typeof money);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев', 'Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);