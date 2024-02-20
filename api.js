import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("notes.db");

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)',
      [],
      (_, result) => resolve(result),
      (_, error) => reject(error)
      );
    });
  });
};

export const getNotes = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM notes', [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getNote = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM notes WHERE id = ?', [id],
        (_, result) => resolve(result.rows.item(0)),
        (_, error) => reject(error)
      );
    });
  });
};

export const saveNote = (newNote, callback) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO notes (title, body) values (?, ?)', [newNote.title, newNote.body],
       (_, result) => resolve(result.insertId),
       (_, error) => reject(error) 
      );
    });
  });
};

export const deleteNote = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM notes WHERE id = ?', [id],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => reject(error)
      );
    });
  });
};

export const updateNote = (id, newNote) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE notes SET title = ?, body = ?, id = ?',
      [newNote.title, newNote.body, id],
      (_, result) => resolve(result.rowsAffected),
      (_, error) => reject(error)
      );
    });
  });
};

// const eliminarTabla = () => {
//   db.transaction(tx => {
//     tx.executeSql('DROP TABLE IF EXISTS NOTES;', [], (txObj, resultSet) => {
//       console.log('Tabla eliminada con éxito.');
//     },
//     (txObj, error) => {
//       console.error('Error al eliminar la tabla:', error);
//     });
//   });
// };

// eliminarTabla();