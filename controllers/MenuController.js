const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor() {
        this.clear();
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option from below: ",
                choices: [
                    "Add new contact",
                    "View all contacts",
                    "Search for a contact",
                    "Date",
                    "Exit"
                ]
            }
        ];
        this.book = new ContactController();
    }
    main(){
        console.log("Welcome to AddressBloc! ");
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                    this.addContact();
                    break;
                case "View all contacts":
                    this.getContacts();
                    break;
                case "Search for a contact":
                    this.search();
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
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
           this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
               console.log("Contact: " + contact.dataValues.name + " was added successfully!");
               this.main();
           }).catch((err) => {
               console.log(err);
               this.main();
           });
        });
    }

    getContacts(){
        this.clear();

        this.book.getContacts().then((contacts) => {
            for (let contact of contacts) {
                console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
                );
            }
            this.main();
        }).catch((err) => {
            console.log(err);
            this.main();
        });
    }

    search(){
        this.clear();
        inquirer.prompt(this.book.searchQuestions).then((target) => {
            this.book.search(target.name).then((contact) => {
                if(contact === null){
                    this.clear();
                    console.log("Contact not found!");
                    this.search();
                }else{
                    this.showContact(contact);
                    console.log("\n Shown for 5 seconds....");
                    setTimeout(() => {
                        this.clear();
                        this.main();
                    }, 5000);
                }
            })
        })
        this.main();
    }

    showContact(contact){
        this._printContact(contact);
        inquirer.prompt(this.book.showContactQuestions).then((answer) => {
           switch(answer.selected){
               case "Delete Contact":
                   this.delete(contact);
                   break;
               case "Main Menu":
                   this.main();
                   break;
               default:
                   console.log("Something went wrong! ");
                   this.showContact(contact);
           }
        }).catch((err) => {
            console.log(err);
            this.showContact(contact);
        })
    }

    delete(contact){
        inquirer.prompt(this.book.deleteConfirmQuestions).then((answer) => {
            if(answer.confirmation){
                this.book.delete(contact.id);
                console.log("contact deleted!");
                this.main();
            }else{
                console.log("contact not deleted");
                this.showContact(contact);
            }
        }).then((err) => {
           console.log(err);
           this.main();
        });
    }

    _printContact(contact){
        console.log(`
        name: ${contact.name}
        phone number: ${contact.phone}
        email: ${contact.email}
        ---------------`
        );
    }

    getDate() {
        // Clears the screen
        this.clear();

        // Declares and sets the date variables to be equal to the current date time I actually wrote this code back in december for my work :)
        let dt = new Date(),
            result = (dt.getFullYear() + "/" + (''+(dt.getMonth()+1)).padStart(2,'0') + "/" + (''+dt.getDate()).padStart(2,'0') + " " + (''+dt.getHours()).padStart(2,'0') + ":" + (''+dt.getMinutes()).padStart(2,'0'));

        // Logs the result date time variable
        console.log("The current date and time is: " + result);

        // Calls main method to continue program
        this.main();
    }

    remindMe() {
        return "Learning is a life-long pursuit"
    }

    exit(){
        console.log("Thanks for using AddressBloc :) ");
        process.exit();
    }
};