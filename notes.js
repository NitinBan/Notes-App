const fs = require('fs');
const chalk = require('chalk');


//function to add notes
const addNotes = (title, body) => {
    const notes  = loadNotes();

    //to check if Note Title Taken or not
    //notes.filter will return the note thats title matched till all notes are checked
    //and we don't waant to search through all notes. we will use find method
    // and save it to duplicateNotes
    

    //using arrow function
    //const duplicateNotes = notes.filter((note) => note.title === title);

    //find method will return the first match and 'undefined' in case of no match
    const duplicateNote = notes.find((note) => note.title === title);

    //OR with standard JS function
    // const duplicateNotes = notes.filter(function(note) {
    //     return note.title === title;
    // });


    //if length = 0 i.e. there is nothing in duplicateNotes i.e. there is no same title
    if(!duplicateNote) {
        //for the first time adding first note to the empty array
        //for snext times appending next notes to the array of objects
        notes.push({
            title: title,
            body: body
        })
         saveNotes(notes);
         console.log(chalk.green.inverse('note added'));

    }else {
        //this means the length of duplicateNotes is not 0 i.e. there is a duplicate title exist.
        console.log(chalk.red.inverse('Note Title Taken'));
    }


}

//function to remove notes
const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title);
    const isNoteExist = notes.filter((note) => note.title === title);

    if(isNoteExist.length === 1) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('note removed'));
    } else {
        console.log(chalk.red.inverse('no such note exist'));
    }
} 

//function to list notes
const listNotes = () => {
    const notes = loadNotes();
    
    console.log(chalk.blue('your notes:- '));

    notes.forEach(function(note) {
        console.log(note.title);
    });
    
}

const readNotes = (title) => {
    const notes = loadNotes();

    const noteFound = notes.find((note) => note.title === title);
    
    if(noteFound) {
        console.log(chalk.yellow.underline.inverse(noteFound.title));
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse('note not found'));
    }

}


//function to save notes to json file
const saveNotes = (notes) => {
    //converting the 'notes' array to JSON format
    const dataJSON = JSON.stringify(notes);

    //writing the notes back to the JSON file
    fs.writeFileSync('notes.json',dataJSON);
}

//function to load notes from the json file
const loadNotes = () => {
    try {
        //below lines may cause error when there is no file to read
        //  -- load and parse json data--
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        //when that error occur an empty array will be returned to store first note
        //this array will be written in the file
        //when next note is being added the file will exist and 'try' statement will run
        return []
    }
    
}

//to export multiple data
module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}