'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let 
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
incomeItems = document.querySelectorAll('.income-items'),
expTitle = document.querySelector('.expenses-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
addExpensesItem = document.querySelector('.additional_expenses-item'), 
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount');


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    incomeMonth: 0,
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
    },

    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = appData.budgetMonth * periodAmount.textContent;
        });
    },

    addExpensesBlock: function () {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesAddButton.style.display = 'none';
        }
    },

    getExpenses: function () {
            expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomeAddButton.style.display = 'none';
        }
    },

    getIncome: function () {
       
        incomeItems.forEach (function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && itemIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        addIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },


    getExpensesMonth: function () {
        let sum = 0,
            value;
        for (let key in appData.expenses) {
            do {
                value = appData.expenses[key];
            } while (!isNumber(value));
            sum += +value;
        }
        appData.expensesMonth = sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
       return appData.budgetMonth * periodSelect.value;
    },

    getPeriodAmount: function () {
        let periodValue = periodSelect.value;
        periodAmount.textContent = periodValue;
    },

    getStart: function () {
        if (salaryAmount.value === '') {
            startButton.disabled = true;
        } else {
            appData.start();
        }
    }
};

    

    startButton.addEventListener('click', appData.getStart);


    expensesAddButton.addEventListener('click', appData.addExpensesBlock);
    incomeAddButton.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('change', appData.getPeriodAmount)
    

    // for (let key in appData) {
    //     console.log('Наша программа включает в себя данные: ' + key + ' которые равны ' + appData[key]);
    // }

    // appData.getInfoDeposit();

// let addExpArr = [];

    
//     for (let item of appData.addExpenses) {
//         let addExp = item[0].toUpperCase() + item.slice(1);
//         addExpArr.push(addExp);
//     }


// console.log(addExpArr.join(', '));

