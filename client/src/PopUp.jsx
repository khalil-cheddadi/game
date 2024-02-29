import {  useState } from "react";

export default function PopUp({ isOpen, setIsOpen, setCategories, category, setQuestionIndex, current }) {
	const [newQst, setNewQst] = useState(current || null);

	function createQuestion(e) {
		e.preventDefault();
		
		setCategories(prev => {
			const index = prev.findIndex((el) => el.name == category.name);
			if(current) {
				const qstIndex = prev[index].questions.findIndex(el => el.name === current.name);
				prev[index].questions[qstIndex] = newQst

				return [...prev]
			}

			prev[index].questions = [...prev[index].questions, newQst]
			return [...prev]
		})

		setIsOpen(false);
	}

	return (
		<form
			id="popup"
			className={`z-10 w-3/4 h-3/4 flex flex-col justify-center items-center bg-slate-700	 rounded-lg absolute text-white text-5xl`}
		>
			<div className="text-2xl [&>*]:mb-2 text-black">
				<div>
					<p className="text-white">Name</p>
					<input className="outline-green" value={newQst?.name} onChange={(e) => setNewQst(prev => ({...prev, name: e.target.value}))} type="text" placeholder="name" />
				</div>
				<div>
					<p className="text-white">Question</p>
					<textarea value={newQst?.question} onChange={(e) => setNewQst(prev => ({...prev, question: e.target.value}))} className="resize-none" type="text" placeholder="question" />
				</div>
				<div>
					<p className="text-white">Answer</p>
					<textarea value={newQst?.answer} onChange={(e) => setNewQst(prev => ({...prev, answer: e.target.value}))} className="resize-none" type="text" placeholder="answer" />
				</div>
				<div>
					<p className="text-white">Timer</p>
					<input value={newQst?.timer} onChange={(e) => setNewQst(prev => ({...prev, timer: e.target.valueAsNumber}))} type="number" placeholder="30" />
				</div>
			</div>
			<div className="flex gap-1">
				<button
					onClick={(e) => {
						e.preventDefault();
						setIsOpen(!isOpen);
						setQuestionIndex("");
					}}
					className="p-5 bg-red-500 bottom-0 right-0 m-5 text-xl rounded-lg"
				>
					close
				</button>
				<button
					type="submit"
					onClick={createQuestion}
					className="p-5 bg-green-500 bottom-0 right-0 m-5 text-xl rounded-lg"
				>
					save
				</button>
			</div>
		</form>
	)
}