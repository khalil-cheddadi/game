// import i18n from "./i18n";

import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [questionIndex, setQuestionIndex] = useState("");
  const [current, setCurrent] = useState("");
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", color: "" });
  const colors = [];
  const categories = [];

  return (
    <>
      <div className="bg-blue-300 h-[100vh] w-full flex flex-col md:flex-row select-none ">
        <div className="w-full md:w-1/4 md:max-w-lg h-1/4 md:h-full overflow-scroll bg-slate-700 flex flex-col gap-5 justify-center items-center">
          <div className="p-5 m-5 absolute top-0 text-yellow-300  font-mono font-bold text-4xl capitalize">
            edit mode
          </div>
          {categories.map((category, index) => (
            <div
              onClick={() => {
                setQuestions(category.questions);
                setCategoryName(category.name);
              }}
              className={`w-1/2 h-16 ${category.color} hover:scale-110 duration-75 rounded-lg flex justify-center items-center font-bold text-xl cursor-pointer`}
            >
              {category.name}
            </div>
          ))}
          <div
            className={`w-1/2 ${
              newCategoryOpen ? "h-32" : "h-0 border-0"
            } overflow-hidden bg-gray-600 rounded-lg duration-150 ${
              categories.length > 3 ? "hidden" : "flex"
            }  justify-center items-center font-bold`}
          >
            <input
              onChange={(e) =>
                setNewCategory((prev) => ({
                  name: e.target.value,
                  color: prev.color,
                }))
              }
              value={newCategory.name}
              type="text"
              placeholder="easy"
              className="bg-transparent max-w-min text-center outline-none"
            />
          </div>
          <div
            className={`w-1/2 h-16 bg-gray-600 rounded-lg cursor-pointer  hover:scale-110 duration-75 ${
              // categories.length > 3 || newCategoryOpen ? "hidden" : "flex"
              "flex"
            }  justify-center items-center font-bold text-4xl border-2 border-dashed text-white`}
            onClick={() => setNewCategoryOpen(!newCategoryOpen)}
          >
            <p className={`${newCategoryOpen ? "rotate-45" : ""}`}>+</p>
          </div>
        </div>
        <div className="h-3/4 md:h-full bg-gray-900 flex flex-grow gap-5 flex-wrap justify-center items-center relative p-24">
          <p className="absolute top-0 left-0 m-5 p-5 text-white text-3xl">
            {categoryName}/{questionIndex}
          </p>
          <div
            className={`z-10 w-3/4 h-3/4 ${
              isOpen ? "flex" : "hidden"
            } bg-black rounded-lg absolute justify-center items-center text-white text-5xl`}
          >
            {current}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setQuestionIndex("");
              }}
              className="absolute p-5 bg-red-500 bottom-0 right-0 m-5 text-xl rounded-lg"
            >
              click
            </button>
          </div>
          {questions.map((question, index) => (
            <div
              onClick={() => {
                setCurrent(question.a);
                setIsOpen(true);
                setQuestionIndex("Q" + (index + 1));
              }}
              className="w-1/5 h-1/4 bg-gray-500 hover:bg-gray-600 rounded-lg flex  justify-center items-center font-bold text-4xl text-white"
            >
              Q{index + 1}
            </div>
          ))}
          <div
            className={`w-1/5 h-1/4 bg-gray-600 rounded-lg border-4 border-dashed  hover:scale-105 duration-150 cursor-pointer ${
              questions.length > 11 || questions.length == 0 ? "hidden" : "flex"
            }  justify-center items-center font-bold text-4xl text-white`}
          >
            +
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
