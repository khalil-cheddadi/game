import { useState } from "react";
import PopUp from "./PopUp";

export default function Questions({ setQuestionIndex, setCategories, category, setQuestions, categories }) {
	const [isOpen, setIsOpen] = useState(false);
	const [current, setCurrent] = useState();

	function openPopUp() {
		setCurrent(null);
		setIsOpen(true);
	}

	return (
		<>
			{category.questions.map((question, index) => (
				<div
					key={index}
					onClick={() => {
						setCurrent(question);
						setIsOpen(true);
						setQuestionIndex("Q" + (index + 1));
					}}
					className="w-1/5 h-1/4 bg-gray-500 hover:bg-gray-600 rounded-lg flex  justify-center items-center font-bold text-4xl text-white"
				>
					Q{index + 1}
				</div>
			))}
			<div
				className={`w-1/5 h-1/4 bg-gray-600 rounded-lg border-4 border-dashed  hover:scale-105 duration-150 cursor-pointer ${category.length > 11 || category.length == 0 ? "hidden" : "flex"
					}  justify-center items-center font-bold text-4xl text-white`}
				onClick={openPopUp}
			>
				+
			</div>
			{isOpen &&
				<PopUp setIsOpen={setIsOpen} isOpen={isOpen} setCategories={setCategories} category={category} setQuestionIndex={setQuestionIndex} current={current} />
			}
		</>
	);
}