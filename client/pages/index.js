import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import TimeStamps from "../components/TimeStamps";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Home() {
  const [title, setTitle] = useState("");
  const [desp, setDesp] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const addToDoList = () => {
    if (!title || !desp) {
      alert("Please fill in all fields.");
      return;
    }

    Axios.post("http://localhost:3001/insert", {
      title: title,
      desp: desp,
    });
    alert(`Added ${title}`);

    Axios.get("http://localhost:3001/read").then((response) => {
      setNotes(response.data);
    });
  };

  const deleteNote = (id, title) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    alert(`Deleted ${title}`);
    Axios.get("http://localhost:3001/read").then((response) => {
      setNotes(response.data);
    });
  };
  return (
    <>
      <main className="flex flex-col max-w-5xl m-auto p-10 justify-center">
        <div>
          <h1 className="text-5xl p-10 flex justify-center font-semibold">
            Todo List{" "}
          </h1>
          <form className="flex flex-col">
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
          </form>

          <h1 className="text-2xl pt-10 font-bold">ToDo's</h1>

          {notes.map((val, key) => {
            return (
              <div key={key} className="p-5">
                <div className="flex justify-between bg-slate-700 p-2 rounded-lg px-5 items-center">
                  <div>
                    <h1 className="text-xl font-semibold ">{val.title}</h1>
                    <p className="pl-5 text-lg">{val.desp}</p>
                  </div>
                  <div className="flex justify-center gap-5">
                    <TimeStamps timestamp={val.updatedAt} />
                    <div className="flex justify-center gap-2">
                      <RiDeleteBinLine
                        color="red"
                        size={25}
                        onClick={() => {
                          deleteNote(val._id, val.title);
                        }}
                      />
                      <TiEdit color="green" size={25} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
export default Home;
