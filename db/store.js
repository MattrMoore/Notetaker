// Import required modules
const util = require('util'); 
const fs = require('fs'); 

const uuidv1 = require('uuid/v1'); 

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
 
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // Attempt to parse the notes, default to an empty array if an error occurs
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    // If the note doesn't contain a title or text, throw an error
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Create a new note object with a unique id
    const newNote = { title, text, id: uuidv1() };

    // Add the new note to the list of notes, write the updated list to db.json, and return the new note
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {

    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
