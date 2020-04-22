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
    resultInput = document.querySelectorAll('.result input[type = text]'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');



class AppData {

    constructor() {
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
    }

    getStart() {
        if (salaryAmount.value !== '') {
            startButton.removeAttribute('disabled');
        }
    }

    start() {

        if (salaryAmount.value === '') {
            startButton.setAttribute('disabled', 'true');
            return;
        }

        startButton.style.display = 'none';
        cancelButton.style.display = 'block';

        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.getStatusIncome();
        this.showResult();

    }

    showResult() {
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
    }



    getExpInc() {

        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    addIcnExpBlock() {

        const startStr = event.target.className.split(' ')[1].split('_')[0];
        if (startStr === 'income') {
            const cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
            incomeItems = document.querySelectorAll(`.${startStr}-items`);
            if (incomeItems.length === 3) {
                incomeAddButton.style.display = 'none';
            }
        } else {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
            expensesItems = document.querySelectorAll(`.${startStr}-items`);
            if (expensesItems.length === 3) {
                expensesAddButton.style.display = 'none';
            }
        }
    }

    getAddExpenses() {
        const _this = this;
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
        addIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }


    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        const monthDepodit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDepodit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600) {
            console.log('У вас средний уровень дохода');
        } else if (600 > this.budgetDay) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так');
        }
    }

    

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    getPeriodAmount() {
        let periodValue = periodSelect.value;
        periodAmount.textContent = periodValue;
    }

    hideInput() {

        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i].type === 'text' && salaryAmount.value !== '') {
                inputText[i].readOnly = true;
            }
        }
        incomeAddButton.setAttribute('disabled', 'true');
        expensesAddButton.setAttribute('disabled', 'true');
    }

    reset() {
        const inputTextAll = document.querySelectorAll('.data input[type = text]');
        inputTextAll.forEach(function (elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = 0;
            periodAmount.innerHTML = periodSelect.value;
        });
        const resultInputAll = document.querySelectorAll('.result input[type = text]');
        resultInputAll.forEach(function (elem) {
            elem.value = '';
        });

        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            incomeAddButton.style.display = 'block';
        }
        for (let i = 1; i < expensesItems.length; i++) {
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
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i].type === 'text') {
                inputText[i].readOnly = false;
            }
        }
    }

    getInfoDeposit() {
        if (this.deposit === true) {
           this.percentDeposit = depositPercent.value;
           this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent () {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositBank.value = depositPercent.value;
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }

        depositPercent.addEventListener('change', () => {
            if(depositPercent.value > 100 || depositPercent < 0 || !isNumber(depositPercent.value)) {
                alert('Введите корректное значение в поле проценты');
                startButton.setAttribute('disabled', 'true');
                return;
            } else {
                startButton.removeAttribute('disabled');
            }
        });
        
    }

    depositHandler () {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositPercent.value = '';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {

        salaryAmount.addEventListener('keyup', this.getStart);
        startButton.addEventListener('click', this.start.bind(this));
        startButton.addEventListener('click', this.hideInput);


        expensesAddButton.addEventListener('click', this.addIcnExpBlock);
        incomeAddButton.addEventListener('click', this.addIcnExpBlock);
        periodSelect.addEventListener('change', this.getPeriodAmount);

        cancelButton.addEventListener('click', this.reset.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();
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