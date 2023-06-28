import { useState } from 'react'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

const  App = () => {
  const [notes, setNotes] = useState<DiaryEntry[]>([
    { 
      id: 1, 
      date: "2023-2-2",
     weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "hot!" 
    }
  ]);
  const [newNote, setNewNote] = useState<NewDiaryEntry>({} as NewDiaryEntry);


  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const noteToAdd = {
      ...newNote,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteToAdd as DiaryEntry));
    setNewNote({} as NewDiaryEntry);
  };

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <form onSubmit={noteCreation}>
        <div>
          date
          <input
            value={newNote.date}
            onChange={(event) =>
              setNewNote({
                ...newNote,
                date: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          weather
          <input
            value={newNote.weather}
            onChange={(event) =>
              setNewNote({
                ...newNote,
                weather: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          visibility
          <input
            value={newNote.visibility}
            onChange={(event) =>
              setNewNote({
                ...newNote,
                visibility: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          comment
          <input
            value={newNote.comment}
            onChange={(event) =>
              setNewNote({
                ...newNote,
                comment: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul style={{ margin: 0, padding: 0 }}>
        {notes.map((note) => (
          <div key={note.id}>
            <h3>{note.date}</h3>
            <div>weather: {note.weather}</div>
            <div>visibility: {note.visibility}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
