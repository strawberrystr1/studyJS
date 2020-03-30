'use strict';

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

money = prompt('Ваш ежемесячный доход?');
addExpenses = prompt ('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = Number(money) - Number(amount1) - Number(amount2);
console.log('Бюджет на семяц: ', budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за: ', period + ' месяцев');

budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600) {
    console.log('У вас средний уровень дохода');
} else if (600 > budgetDay) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log ('Что то пошло не так');
}