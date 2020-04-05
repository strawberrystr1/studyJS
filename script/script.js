'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function () {

    do {
        money = prompt('Ваш ежемесячный доход?');
    } while (!isNumber(money));
    
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 90000,
    period: 12,

    asking: function () {
        
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for( let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов?')] = +prompt('Во сколько это обойдется?');
        }
    },

    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getExpensesMonth: function () {
        let sum = 0,
        value;
        for (let key in appData.expenses) {
            do {
                value = appData.expenses[key];
            } while(!isNumber(value));
            sum += value;
        }
        appData.expensesMonth = sum;
        console.log('Расходы за месяц: ', appData.expensesMonth);
    },

    getBudget: function () { 
        appData.budgetDay = Math.floor((appData.budget - appData.expensesMonth) / 30);
        appData.budgetMonth = appData.budget - appData.expensesMonth;
    },

    getTargetMonth: function () { 
        appData.period = appData.mission / appData.budgetMonth;            
        if (appData.period > 0) {
            console.log('Цель будет достигнута за: ' + appData.period + ' месяцев');
        } else {
            console.log('Цель не будет достигнута');
        }
    },

    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600) {
            console.log('У вас средний уровень дохода');
        } else if (600 > appData.budgetDay) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log ('Что то пошло не так');
        }
    }
};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' которые равны ' + appData[key]);
}




 