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



const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.incomeMonth = 0;
};

AppData.prototype.getStart = function () {
    if (salaryAmount.value !== '') {
        startButton.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {

    if (salaryAmount.value === '') {
        startButton.setAttribute('disabled', 'true');
        return;
    }

    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
    
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome(); 
    this.showResult();
    
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', () => {
        incomePeriodValue.value = this.budgetMonth * periodAmount.textContent;
    });
};

AppData.prototype.addExpensesBlock = function () {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesAddButton.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
        const _this = this;
        expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }

    });
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        incomeAddButton.style.display = 'none';
    }
    
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach (function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function (item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    addIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};


AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600) {
        console.log('У вас средний уровень дохода');
    } else if (600 > this.budgetDay) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = +prompt ('Какой годовой процент?', '10');
        } while (!isNumber(this.percentDeposit));
        do {
            this.moneyDeposit = +prompt('Какая сумма заложенна?', '10000');
        } while (!isNumber(this.moneyDeposit));
    }
};

AppData.prototype.calcSavedMoney = function () {
   return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getPeriodAmount = function () {
    let periodValue = periodSelect.value;
    periodAmount.textContent = periodValue;
};

AppData.prototype.hideInput = function () {
    
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i].type === 'text') {
            inputText[i].readOnly = true;
        }
    }
    incomeAddButton.setAttribute('disabled', 'true');
    expensesAddButton.setAttribute('disabled', 'true');
};

AppData.prototype.reset = function () {
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
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.addExpenses = [];
    this.moneyDeposit = 0;

    cancelButton.style.display = 'none';
    startButton.style.display = 'block';
    incomeAddButton.removeAttribute('disabled');
    expensesAddButton.removeAttribute('disabled');
    depositCheck.checked = false;
};

AppData.prototype.eventListeners = function () {

    salaryAmount.addEventListener('keyup', this.getStart);
    startButton.addEventListener('click', this.start.bind(this));
    startButton.addEventListener('click', this.hideInput);


    expensesAddButton.addEventListener('click', this.addExpensesBlock);
    incomeAddButton.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('change', this.getPeriodAmount);

    cancelButton.addEventListener('click', this.reset.bind(this));
};

const appData = new AppData ();
console.log('appData: ', appData);

appData.eventListeners();

   
  
    
    
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

