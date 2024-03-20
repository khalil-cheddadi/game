import { useState } from "react";
import { CirclePicker } from "react-color";

export function MenuModeMenu({ setMode }) {
  return (
    <>
      <span className="p-5 m-5 uppercase absolute top-0 text-yellow-300  font-mono font-bold text-4xl">
        main menu
      </span>
      <button
        className="flex justify-center items-center p-5 font-bold capitalize bg-green-500 rounded text-black"
        onClick={() => setMode("play")}
      >
        play mode
      </button>
      <button
        className="flex justify-center items-center p-5 font-bold capitalize bg-yellow-500 rounded text-black"
        onClick={() => setMode("edit")}
      >
        edit mode
      </button>
    </>
  );
}

export function EditModeMenu({
  setMode,
  categories,
  setCategories,
  setOpenCategory,
}) {
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", color: "#000" });
  const [colors, setColors] = useState([
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
  ]);

  const createCategory = () => {
    const data = {
      name: newCategory.name,
      color: newCategory.color,
      questions: [],
    };

    const prev = categories;
    prev.push(data);
    setCategories(prev);
    setCreateCategoryOpen(false);
    setNewCategory({ name: "", color: "#000" });
  };

  return (
    <>
      <span className="p-5 m-5 uppercase absolute top-0 text-yellow-300  font-mono font-bold text-4xl">
        Edit mode
      </span>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => {
            setOpenCategory(categories[index]);
          }}
          style={{ backgroundColor: category.color }}
          className="w-1/2 h-16 hover:scale-110 duration-75 rounded-lg flex justify-center items-center font-bold text-xl capitalize text-black"
        >
          {category.name}
        </button>
      ))}
      {categories.length < 4 && (
        <div
          className={`w-1/2 ${
            createCategoryOpen ? "" : "h-16 border border-dashed"
          } overflow-hidden bg-gray-600 rounded-lg duration-150 flex flex-col gap-5 p-2 justify-center items-center font-bold relative`}
        >
          {createCategoryOpen ? (
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
                style={{ backgroundColor: newCategory.color }}
                className="w-3/4 h-8 flex items-center justify-center border-double border-4 border-black"
              >
                color
              </div>
              <CirclePicker
                onChange={(color) =>
                  setNewCategory((prev) => ({
                    name: prev.name,
                    color: color.hex,
                  }))
                }
                colors={colors}
                circleSize={15}
                width="120px"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCreateCategoryOpen(false);
                    setNewCategory({ name: "", color: "#000" });
                  }}
                  className="relative bottom-0 right-0 p-2 rounded-md bg-red-400"
                >
                  close
                </button>
                <button
                  onClick={() => {
                    createCategory();
                  }}
                  disabled={
                    newCategory.name == "" || newCategory.color == "#000"
                  }
                  className="relative bottom-0 right-0 p-2 bg-green-500 disabled:bg-slate-500 rounded-md"
                >
                  Create
                </button>
              </div>
            </>
          ) : (
            <button
              className="w-full h-full bg-gray-600 rounded-lg duration-75 flex justify-center items-center font-bold text-4xl border-2  text-white"
              onClick={() => setCreateCategoryOpen(true)}
            >
              +
            </button>
          )}
        </div>
      )}

      <button
        className="flex justify-center items-center p-5 font-bold capitalize bg-yellow-500 rounded text-black absolute bottom-0 m-5"
        onClick={() => {
          setMode("menu");
          setOpenCategory({});
        }}
      >
        back to menu
      </button>
    </>
  );
}
