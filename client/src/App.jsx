import { useState } from "react";
import { MenuModeMenu, EditModeMenu } from "./Menus";
import { MenuModeBody, EditModeBody } from "./Bodies";

function App() {
  const [mode, setMode] = useState("menu");
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState({});

  return (
    <>
      <div
        id="main"
        className="h-[100vh] min-h-96 w-full min-w-[960px] flex select-none text-white font-mono"
      >
        <nav
          id="menu"
          className="w-1/4 max-w-lg h-full bg-slate-700 flex flex-col gap-5 justify-center items-center relative"
        >
          {mode == "menu" && <MenuModeMenu setMode={setMode} />}
          {mode == "edit" && (
            <EditModeMenu
              setMode={setMode}
              categories={categories}
              setCategories={setCategories}
              setOpenCategory={setOpenCategory}
            />
          )}
        </nav>
        <div
          id="body"
          className="h-full bg-gray-900 flex flex-grow gap-5 flex-wrap justify-center items-center relative py-20 "
        >
          {mode == "menu" && <MenuModeBody />}
          {mode == "edit" && (
            <EditModeBody
              categories={categories}
              setCategories={setCategories}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
