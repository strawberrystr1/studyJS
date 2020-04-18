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
expTitle = document.querySelector('.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
addExpensesItem = document.querySelector('.additional_expenses-item'), 
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
cancelButton = document.getElementById('cancel'),
inputText = document.getElementsByTagName('input'),
resultInput = document.querySelectorAll('.result input[type = text]');
console.log('inputText: ', inputText);



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

    getStart: function () {
        
        if (salaryAmount.value !== '') {
            startButton.removeAttribute('disabled');
        }
    },

    start: function () {

        if (salaryAmount.value === '') {
            startButton.setAttribute('disabled', 'true');
            return;
        }

        startButton.style.display = 'none';
        cancelButton.style.display = 'block';
        
        
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.getInfoDeposit();
        appData.getStatusIncome(); 
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

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
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
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        if (this.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600) {
            console.log('У вас средний уровень дохода');
        } else if (600 > this.budgetDay) {
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
       return this.budgetMonth * periodSelect.value;
    },

    getPeriodAmount: function () {
        let periodValue = periodSelect.value;
        periodAmount.textContent = periodValue;
    },

    hideInput: function () {
        
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i].type === 'text') {
                inputText[i].readOnly = true;
            }
        }
        incomeAddButton.setAttribute('disabled', 'true');
        expensesAddButton.setAttribute('disabled', 'true');
    },

    reset: function () {
        let inputTextAll = document.querySelectorAll('.data input[type = text]');
        inputTextAll.forEach (function (elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = 0;
            periodAmount.innerHTML = periodSelect.value;
        });
        let resultInputAll = document.querySelectorAll('.result input[type = text]');
        resultInputAll.forEach(function (elem) {
            elem.value = '';
        });

        for ( let i =1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomeAddButton.style.display = 'block';
        }
        for ( let i =1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesAddButton.style.display = 'block';
        }
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.income = {};
        appData.incomeMonth = 0;
        appData.addIncome = [];
        appData.expenses = {};
        appData.expensesMonth = 0;
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.addExpenses = [];
        appData.moneyDeposit = 0;

        cancelButton.style.display = 'none';
        startButton.style.display = 'block';
        incomeAddButton.removeAttribute('disabled');
        expensesAddButton.removeAttribute('disabled');
        depositCheck.checked = false;
    }
    
};

   
    startButton.addEventListener('click', appData.start.bind(appData));
    salaryAmount.addEventListener('keyup', appData.getStart);
    startButton.addEventListener('click', appData.hideInput);


    expensesAddButton.addEventListener('click', appData.addExpensesBlock);
    incomeAddButton.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('change', appData.getPeriodAmount);

    cancelButton.addEventListener('click', appData.reset.bind(appData));
    
    
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

