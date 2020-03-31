'use strict';

let money,
income,
addExpenses,
deposit,
mission,
period;

money = +prompt('Ваш ежемесячный доход?', 60000);;
income = 'игры';
addExpenses = ['интернет', 'комуналка', 'транспорт'];
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 900000;
period = 12;

function showTypeof (data) {
    console.log(typeof(data));
}

showTypeof(income);
showTypeof(deposit);
showTypeof(money);

console.log(addExpenses);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?', 6000),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = +prompt('Во сколько это обойдется?', 2000);

const getExpensesMonth = function (count1, count2) {
    let sum = count1 + count2 ;
    return sum;
};

console.log(getExpensesMonth(amount1, amount2));

const getAccumulatedMonth = function (income, expenses) { 
    let accumulate = income - expenses;
    return accumulate;
};

let accumulatedMonth = getAccumulatedMonth(money, amount1+amount2);

const getTargetMonth = function (accum, mission) { 
    let period = mission / accum;
    return period;
};

console.log(getTargetMonth(accumulatedMonth, mission));

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

const getStatusIncome = function () {
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600) {
    console.log('У вас средний уровень дохода');
} else if (600 > budgetDay) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log ('Что то пошло не так');
}
};

getStatusIncome();