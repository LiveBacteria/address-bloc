//const inquirer = require("inquirer");
const Contact = require("../db/models").Contact;

module.exports = class ContactController {
    constructor() {
        this.contacts = [];
        this.deleteQuestions = [{
            type: "confirm",
            name: "selected",
            message: "Please choose from an option below: ",
            choices: [
                "Delete Contact",
                "Main Menu"
            ]
        }];
        this.searchQuestions = [
            {
                type: "input",
                name: "name",
                message: "Name of contact to search - ",
                validate(val){
                    return val !== "";
                }
            }
        ];
        this.addContactQuestions = [
            {
                type: "input",
                name: "name",
                message: "Contact's name - ",
                validate(val) {
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "phone",
                message: "Contact's phone number - ",
                validate(val){
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "email",
                message: "Contact's email address - ",
                validate(val) {
                    return val !== "";
                }
            }
        ];

        this.deleteConfirmQuestions = [{
           type: "confirm",
           name: "confirmation",
           message: "are you sure you want to delete this contact?"
        }];
    }

    addContact(name, phone, email){
        return Contact.create({name, phone, email});
    }

    getContacts(){
        return Contact.findAll();
    }

    iterativeSearch(contacts, target){
        for(let contact of contacts){
            if(contact.name.toLowerCase() === target.toLowerCase()){
                return contact;
            }
        }
        return null;
    }

    binarySearch(contacts, target){
        let min = 0,
            max = contacts.length - 1,
            mid;

        while(mid < max){
            mid = Math.floor((mid + max) /2);
            let currentContact = contacts[mid];

            if(currecntContact.name > target){
                max = mid - 1;
            }else if(currentContact.name < target){
                min = mid + 1;
            }else {
                return contacts[mid];
            }
        }
        return null;
    }

    search(name){
        return Contact.findOne({where: {name}});
    }

    delete(id){
        return Contact.destroy({where: {id}});
    }
};