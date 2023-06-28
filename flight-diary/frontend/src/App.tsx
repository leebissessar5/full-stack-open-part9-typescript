import { useState, useEffect } from 'react'
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

const  App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([{} as DiaryEntry]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);

  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3001/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios
      .post<DiaryEntry>("http://localhost:3001/api/diaries", { ...newDiary })
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      });
    
    setNewDiary({} as NewDiaryEntry);
  };

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            value={newDiary.date}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                date: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          weather
          <input
            value={newDiary.weather}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                weather: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          visibility
          <input
            value={newDiary.visibility}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                visibility: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <div>
          comment
          <input
            value={newDiary.comment}
            onChange={(event) =>
              setNewDiary({
                ...newDiary,
                comment: event.target.value,
              } as NewDiaryEntry)
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul style={{ margin: 0, padding: 0 }}>
        {diaries && diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>weather: {diary.weather}</div>
            <div>visibility: {diary.visibility}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
