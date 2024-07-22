import inquirer from "inquirer";
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is $${this.balance}`);
        }
        else {
            console.log('Insufficient Balance!');
        }
    }
    deposit(amount) {
        if (amount > 100) {
            this.balance += amount - 1;
            console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log('Deposit amount must be greater than $100');
        }
    }
    checkBalance() {
        console.log(`Current balance is $${this.balance}`);
    }
}
class Customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
const customers = [
    new Customer("Farrukh", "Hashmi", "Male", 24, 13345890093, accounts[0]),
    new Customer("Alisha", "Khan", "Female", 22, 15675896593, accounts[1]),
    new Customer("Bushra", "Asim", "Female", 24, 3456789065, accounts[2])
];
async function service() {
    while (true) {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation:",
                choices: ["deposit", "withdraw", "check balance", "exit"]
            });
            switch (ans.select) {
                case "deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "check balance":
                    customer.account.checkBalance();
                    break;
                case "exit":
                    console.log("Exiting the program...");
                    console.log("Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again!");
        }
    }
}
service();
