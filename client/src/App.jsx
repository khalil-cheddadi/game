import { useState } from "react";

function App() {
  const colors = ["bg-red-300", "bg-orange-300", "bg-green-300", "bg-blue-300"];
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState({});
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState("");
  const [current, setCurrent] = useState("");
  const [newCategoryOpen, setNewCategoryOpen] = useState({
    isOpen: false,
    index: null,
  });
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [categories, setCategories] = useState([]);

  const valideNewCategory = (cat) => {
    if (cat.name != "" && cat.color != "") return true;
    else return false;
  };

  const createCategory = () => {
    const data = {
      name: newCategory.name,
      color: colors[3 - categories.length],
      questions: [],
    };

    const prev = categories;
    prev.push(data);
    setCategories(prev);
    setNewCategoryOpen({
      isOpen: false,
      index: null,
    });
    setNewCategory({ name: "" });
  };

  return (
    <>
      <div className="bg-blue-300 h-[100vh] w-full flex flex-col md:flex-row select-none ">
        <div
          id="menu"
          className="w-full md:w-1/4 md:max-w-lg h-1/4 md:h-full overflow-scroll bg-slate-700 flex flex-col gap-5 justify-center items-center"
        >
          <div
            id="game-mode"
            className="p-5 m-5 absolute top-0 text-yellow-300  font-mono font-bold text-4xl capitalize"
          >
            edit mode
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                setCategory(category);
                setQuestions(category.questions);
              }}
              className={`w-1/2 h-16 ${category.color} hover:scale-110 duration-75 rounded-lg flex justify-center items-center font-bold text-xl cursor-pointer`}
            >
              {category.name}
            </div>
          ))}
          {Array(4 - categories.length)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className={`w-1/2 ${
                  newCategoryOpen.isOpen && newCategoryOpen.index == index
                    ? ""
                    : "h-16 border border-dashed"
                } overflow-hidden bg-gray-600 rounded-lg duration-150 flex flex-col gap-5 p-2 justify-center items-center font-bold relative`}
              >
                {newCategoryOpen.isOpen && newCategoryOpen.index == index ? (
                  <>
                    <input
                      onChange={(e) =>
                        setNewCategory((prev) => ({
                          name: e.target.value,
                          color: prev.color,
                        }))
                      }
                      value={newCategory.name}
                      type="text"
                      placeholder="Category name"
                      className="bg-transparent max-w-min text-center outline-none "
                    />
                    <div
                      className={`w-3/4 h-8 flex items-center justify-center border-double border-4 border-black ${
                        colors[3 - categories.length]
                      }`}
                    >
                      color
                    </div>
                    <div className="flex gap-2">
                      <div
                        onClick={() => setNewCategoryOpen(false)}
                        className={`relative bottom-0 right-0 p-2 rounded-md bg-red-400 cursor-pointer`}
                      >
                        close
                      </div>
                      <button
                        onClick={
                          newCategory.name != ""
                            ? () => {
                                createCategory();
                              }
                            : () => console.log("err")
                        }
                        className={`relative bottom-0 right-0 p-2 rounded-md  ${
                          newCategory.name != ""
                            ? "bg-green-400 cursor-pointer"
                            : "bg-slate-400 "
                        }`}
                      >
                        Create
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className={`w-full h-full bg-gray-600 rounded-lg cursor-pointer  hover:scale-110 duration-75 flex justify-center items-center font-bold text-4xl border-2  text-white`}
                    onClick={() =>
                      setNewCategoryOpen({ isOpen: true, index: index })
                    }
                  >
                    +
                  </div>
                )}
              </div>
            ))}
        </div>
        <div
          id="questions"
          className="h-3/4 md:h-full bg-gray-900 flex flex-grow gap-5 flex-wrap justify-center items-center relative p-24"
        >
          <p className="absolute top-0 left-0 m-5 p-5 text-white text-3xl">
            {category.name}/{questionIndex}
          </p>
          <div
            id="popup"
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
              category.length > 11 || category.length == 0 ? "hidden" : "flex"
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
