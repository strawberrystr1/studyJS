'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
startButton = document.getElementById('start'),
incomeAddButton = document.getElementsByTagName('button')[0],
expensesAddButton = document.getElementsByTagName('button')[1],
depositCheck = document.querySelector('#deposit-check'),
addIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.querySelector('.budget_month-value'),
budgetDayValue = document.querySelector('.budget_day-value'),
expensesMonthValue = document.querySelector('.expenses_month-value'),
addIncomeValue = document.querySelector('.additional_income-value'),
addExpensesValue = document.querySelector('.additional_expenses-value'),
incomePeriodValue = document.querySelector('.income_period-value'),
targetMonthValue = document.querySelector('.target_month-value'),
salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('.income-title'),
incomeAmount = document.querySelector('.income-amount'),
expTitle = document.querySelector('.expenses-amount'),
expAmount = document.querySelector('.expenses-amount'),
addExpensesItem = document.querySelector('.additional_expenses-item'), 
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select');





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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 90000,
    period: 12,

    asking: function () {

        if (confirm('Есть ли у вас дополнительный заработок?')) {

            let itemIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'taxi');
            } while (isNumber(itemIncome));
            
            let cashIncome; 
            do {
                cashIncome = +prompt ('Сколько зарабатываете в месяц на этом ?', '4000');
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        } while (isNumber(addExpenses));
        
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        console.log('appData.addExpenses: ', appData.addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let itemExpenses;
            do { 
                itemExpenses = prompt('Введите обязательную статью расходов?');
            } while (isNumber(itemExpenses));
            let cashExpenses;
            do {
                cashExpenses = +prompt('Во сколько это обойдется?');
            } while (!isNumber(cashExpenses));
            appData.expenses[itemExpenses] = cashExpenses;
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
            } while (!isNumber(value));
            sum += value;
        }
        appData.expensesMonth = sum;
        console.log('Расходы за месяц: ', appData.expensesMonth);
    },

    getBudget: function () {
        appData.budgetDay = Math.floor(appData.budget / 30);
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
            console.log('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt ('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложенна?', '10000');
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
       return appData.budgetMonth * appData.period;
    }
};



    appData.asking();
    console.log('appData.asking();: ', appData.addExpenses);
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getTargetMonth();
    appData.getStatusIncome();

    for (let key in appData) {
        console.log('Наша программа включает в себя данные: ' + key + ' которые равны ' + appData[key]);
    }

    appData.getInfoDeposit();

let addExpArr = [];

    
    for (let item of appData.addExpenses) {
        let addExp = item[0].toUpperCase() + item.slice(1);
        addExpArr.push(addExp);
    }


console.log(addExpArr.join(', '));
