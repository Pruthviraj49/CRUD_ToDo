import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Axios from "axios";
const inter = Inter({ subsets: ["latin"] });

function Home() {
  const [title, setTitle] = useState("");
  const [desp, setDesp] = useState("");
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addToDoList = () => {
    Axios.post("http://localhost:3001/insert", {
      title: title,
      desp: desp,
    });
  };
  return (
    <>
      <main className="flex flex-col max-w-5xl m-auto p-10 justify-center">
        <h1 className="text-5xl p-10 flex justify-center font-semibold">
          Todo List{" "}
        </h1>

        <label className="text-xl">Title: </label>
        <input
          className="p-2 m-2 rounded-md"
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>

        <label className="text-xl">Description: </label>
        <textarea
          className="p-2 m-2 rounded-md"
          rows="4"
          type="text"
          onChange={(event) => {
            setDesp(event.target.value);
          }}
        ></textarea>

        <div className="flex justify-center pt-10">
          <button
            onClick={addToDoList}
            className="w-32 h-12 bg-blue-500 rounded-lg text-md font-semibold"
          >
            Add
          </button>
        </div>

        <h1>ToDo's</h1>
        {notes.map((val, key) => {
          return (
            <div key={key}>
              <h1>{val.title}</h1>
              <p>{val.desp}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}
export default Home;
