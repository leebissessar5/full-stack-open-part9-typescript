import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDiaries, createDiary } from './diaryService';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

const  App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([{} as DiaryEntry]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setNewDiary({} as NewDiaryEntry);
        setError(null);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data as string);
        } else {
          setError("An error occurred while creating the diary entry.");
        }
      })
  };

  return (
    <div className="App">
      <h2>Add new entry</h2>
      {error && <div style={{color: "red", }}>{error}</div>}
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
        {diaries &&
          diaries.map((diary) => (
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
