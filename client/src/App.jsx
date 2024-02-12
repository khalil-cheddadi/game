// import i18n from "./i18n";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

function App() {
  let [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="bg-blue-300 h-[100vh] w-full flex">
        <div className="w-1/4 max-w-lg h-full overflow-scroll bg-slate-700 flex flex-col gap-5 justify-center items-center">
          <div className="w-1/2 h-16 bg-green-300 rounded-lg flex  justify-center items-center font-bold text-xl">
            Easy
          </div>
          <div className="w-1/2 h-16 bg-yellow-300 rounded-lg flex  justify-center items-center font-bold text-xl">
            medium
          </div>
          <div className="w-1/2 h-16 bg-red-300 rounded-lg flex  justify-center items-center font-bold text-xl">
            hard
          </div>
          <div className="w-1/2 h-16 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">
            +
          </div>
        </div>
        <div
          className=" h-full bg-gray-900 flex flex-grow gap-5 flex-wrap justify-center items-center relative p-24"
          onClick={toggleModal}
        >
          <div
            className={`w-3/4 h-3/4 ${
              isOpen ? "flex" : "hidden"
            } bg-black/25 rounded-lg absolute`}
          ></div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q1</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q2</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q3</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q4</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q5</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q6</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q7</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q8</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q9</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q10</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q11</div>
          <div className="w-1/5 h-1/4 bg-gray-500 rounded-lg flex  justify-center items-center font-bold text-4xl">Q12</div>
        </div>
      </div>
    </>
  );
}

export default App;
