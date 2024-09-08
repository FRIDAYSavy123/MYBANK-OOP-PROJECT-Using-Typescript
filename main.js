#!/usr/bin/env node
console.log("Hello, world!");
import inquirer from "inquirer";
// Bank Account Class
class BankAccount {
    accountNumber;
    Balance;
    constructor(accountNumber, Balance) {
        this.accountNumber = accountNumber;
        this.Balance = Balance;
    }
    //Debt Money
    WithDraw(amount) {
        if (this.Balance >= amount) {
            this.Balance -= amount;
            console.log(`WithDrawal of ${amount} successful. Remaining Balance is : ${this.Balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit Money
    Deposite(amount) {
        if (amount > 100) {
            amount -= 1; // if user deposite $100 so cut fee 1$
        }
        this.Balance += amount;
        console.log(`Deposite of ${amount} successfull . Remaining balance ${this.Balance}`);
    }
    // Check Balance
    CheckBalance() {
        console.log(`Current Balance ${this.Balance}`);
    }
}
// Customer Class
class Customer {
    firstName;
    lastName;
    Gender;
    Age;
    MobileNumber;
    Account;
    constructor(firstName, lasName, Gender, Age, MobileNumber, Account) {
        this.firstName = firstName;
        this.lastName = lasName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.Account = Account;
    }
}
// Create Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create Customers
const Customers = [
    new Customer("Hamza", "Khan", "Male", 20, 121212121, accounts[0]),
    new Customer("Abdul", "Raffay", "Male", 21, 1212121, accounts[1]),
    new Customer("Muhammad", "Ali", "Male", 24, 456788, accounts[2]),
];
//Function to interact with Bank Accounts
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "AccountNumber",
            type: "number",
            message: "Enter Your Account Number",
        });
        const Customer = Customers.find((Customer) => Customer.Account.accountNumber === accountNumberInput.AccountNumber);
        if (Customer) {
            console.log(`Welcome , ${Customer.firstName} ${Customer.lastName}! \n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposite", "WithDraw", "CheckBalance", "Exit"]
            });
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite",
                    });
                    Customer.Account.Deposite(depositeAmount.amount);
                    break;
                case "WithDraw":
                    const WithDrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw",
                    });
                    Customer.Account.WithDraw(WithDrawAmount.amount);
                    break;
                case "CheckBalance":
                    Customer.Account.CheckBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program");
                    console.log(" \n Thank you for using our service. Have a nice day \n");
                    return;
            }
        }
        else {
            console.log("Invalid account number . Please try again ");
        }
    } while (true);
}
service();
