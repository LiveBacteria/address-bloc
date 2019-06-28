const inquirer = require('inquirer');

module.exports = class MenuController {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option from below: ",
                choices: [
                    "Add new contact",
                    "Date",
                    "Exit"
                ]
            }
        ];
        this.contacts = [];
    }
    main(){
        console.log("Welcome to AddressBloc! ");
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "Date":
                    this.getDate();
                    break;
                case "Exit":
                    this.exit();
                default:
                    console.log("Invaild Input ");
                    this.main();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    clear(){
        // Useful to know
        console.log("Clearing the screen! ");
        console.log("\x1Bc");
    }

    addContact(){
        this.clear();
        console.log("addContact called ");
        this.main();
    }

    getDate() {
        // Clears the screen
        this.clear();

        // Declares and sets the date variables to be equal to the current date time I actually wrote this code back in december for my work :)
        let dt = new Date(),
            result = (dt.getFullYear() + "/" + (''+(dt.getMonth()+1)).padStart(2,'0') + ('/'+dt.getDate()).padStart(2,'0') + " " + (''+dt.getHours()).padStart(2,'0') + ":" + (''+dt.getMinutes()).padStart(2,'0'));

        // Logs the result date time variable
        console.log("The current date and time is: " + result);

        // Calls main method to continue program
        this.main();
    }

    exit(){
        console.log("Thanks for using AddressBloc :) ");
        process.exit();
    }
}