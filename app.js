const validator  = require('validator');
const chalk  = require('chalk');
const yargs  = require('yargs');
const notes = require('./notes.js');


/*-- create add command --*/
yargs.command({                       //to create a coommand in our app               [takes an object as argument]
    command: 'add',                   //name of the command
    describe: 'adding a note',        //description of the command
    builder: {                        //to create the options for the command         [its value is an object]
        title: {                      //first option                                  [its value is an object]
            describe: 'Note Title',   //description of the option
            demandOption: true,       //to make the option required ,set it to 'true' [by default it is false]
            type: 'string'            //to set the type of input
        },
        body: {                      //first option                                  [its value is an object]
            describe: 'Note body',   //description of the option
            demandOption: true,       //to make the option required ,set it to 'true' [by default it is false]
            type: 'string'            //to set the type of input
        },
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})



/*-- create remove command --*/
yargs.command({
    command: 'remove',
    describe: 'removing a note',
    builder : {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})



/*-- create list command --*/
yargs.command({
    command: 'list',
    describe: 'listing the note',
    handler(){
        notes.listNotes();
    }
})



/*-- create read command --*/
yargs.command({
    command: 'read',
    describe: 'read the note',
    builder: {
        title: {
            describe: 'title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})

yargs.parse();   //necessary ,it will parse the CLA and help above commands













/* -- tutorial -- 

// const add = require('./utils.js');

// const sum = add(3,6);
// console.log(sum);




// const result = getNotes();

// console.log(result);



// console.log(validator.isEmail('nitin.com'));

// console.log(validator.isURL('https:/nitin.com'));



// console.log(chalk.blue.bold("error!"));

// console.log(process.argv);

// console.log(process.argv[2]);

// const command = process.argv[2];

// if (command === 'add') {
//     console.log('adding notes!');
// } else if(command === 'remove') {
//     console.log('remove notes!');
// }




*/