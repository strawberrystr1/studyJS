'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
income,
addExpenses,
deposit,
mission,
period;


income = 'игры';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
mission = 900000;
period = 12;

do {
    money = prompt('Ваш ежемесячный доход?');
} while (!isNumber(money));

// let start = function () {
//     money = prompt('Ваш ежемесячный доход?');

//     while (!isNumber(money)) {
//         money = prompt('Ваш ежемесячный доход?');
//     }
// };

// start();

function showTypeof (data) {
    console.log(typeof(data));
}

showTypeof(income);
showTypeof(deposit);
showTypeof(money);

console.log(addExpenses.toLowerCase().split(','));

const getExpensesMonth = function () {
    let sum = 0;
    let expenses = [];
    let value = 0;
    for( let i = 0; i < 2; i++) {
     
        expenses[i] = prompt('Введите обязательную статью расходов?');
        do {
            value = prompt('Во сколько это обойдется?');
        } while(!isNumber(value));
        sum += value;
    }
    
    console.log(expenses);
    return sum;
};

let expensesMonth = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesMonth);

const getAccumulatedMonth = function (income, expenses) { 
    let accumulate = income - expenses;
    return accumulate;
};
 
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

const getTargetMonth = function (accum, mission) { 
    let period = mission / accum;
    if (period > 0) {
        console.log('Цель будет достигнута за: ' + period + ' месяцев');
    } else {
        console.log('Цель не будет достигнута');
    }
    return period;
};

getTargetMonth(accumulatedMonth, mission);

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