import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export function MenuModeBody() {
  return (
    <>
      <span className="text-3xl font-mono absolute bottom-0 m-2">
        made with ❤️ by OSCA
      </span>
    </>
  );
}

export function EditModeBody({
  categories,
  setCategories,
  openCategory,
  setOpenCategory,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function openDeleteModal() {
    setIsDeleteOpen(true);
  }

  function closeCreateModal() {
    setIsCreateOpen(false);
  }

  function openCreateModal() {
    setIsCreateOpen(true);
  }

  const deleteCategory = () => {
    const index = categories.indexOf(openCategory);

    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
    setOpenCategory({});
  };

  function createQuestion(newQst) {
    const index = categories.indexOf(openCategory);
    if (openQuestion) {
      const qstIndex = openCategory.questions.indexOf(openQuestion);
    } else {
      const newQuestions = [...openCategory.questions, newQst];
      const newCategory = openCategory;
      newCategory.questions = newQuestions;
      setOpenCategory(newCategory);
      const newCategories = [...categories];
      newCategories[index] = openCategory;
      setCategories(newCategories);
      closeCreateModal();
    }
  }

  return (
    <>
      {openCategory.name ? (
        <>
          <span className="text-3xl font-mono font-bold absolute top-0 left-0 m-5 capitalize">
            {openCategory.name}/
          </span>

          {openCategory.questions.map((question, index) => (
            <div
              key={index}
              onClick={() => {
                setOpenQuestion(question);

                openCreateModal();
              }}
              style={{ backgroundColor: openCategory.color }}
              className="w-1/5 h-1/5 rounded-lg flex justify-center items-center font-bold text-2xl text-black hover:scale-105 transition-all duration-150 opacity-75 hover:opacity-100"
            >
              Q{index + 1}
            </div>
          ))}
          {openCategory.questions.length < 12 && (
            <div
              onClick={() => {
                setOpenQuestion(null);
                openCreateModal();
              }}
              className="w-1/5 h-1/5 bg-gray-600 rounded-lg border-4 border-dashed  hover:scale-105 duration-150 cursor-pointer flex justify-center items-center font-bold text-4xl text-white"
            >
              +
            </div>
          )}
          <div className="absolute bottom-0 right-0 m-5 flex gap-5">
            <button
              onClick={openDeleteModal}
              className=" p-3 font-bold rounded-md bg-red-700 hover:bg-red-500 capitalize"
            >
              Delete category
            </button>
          </div>
          <DeleteModal
            isDeleteOpen={isDeleteOpen}
            closeDeleteModal={closeDeleteModal}
            openCategory={openCategory}
            deleteCategory={deleteCategory}
          />
          <CreateModal
            isCreateOpen={isCreateOpen}
            closeCreateModal={closeCreateModal}
            openQuestion={openQuestion}
            createQuestion={createQuestion}
          />
        </>
      ) : (
        <div className="text-3xl">select/create a category to edit</div>
      )}
    </>
  );
}

function DeleteModal({
  isDeleteOpen,
  closeDeleteModal,
  openCategory,
  deleteCategory,
}) {
  return (
    <>
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-orange-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white font-bold"
                  >
                    Delete Category
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      are you sure you want to delete the '
                      <span className="font-bold capitalize">
                        {openCategory.name}
                      </span>
                      ' category?
                      <br />
                      it has {openCategory.questions.length} questions
                    </p>
                  </div>

                  <div className="mt-4 flex gap-5 relative justify-end bottom-0 right-0">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteModal}
                    >
                      cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        deleteCategory();
                        closeDeleteModal();
                      }}
                    >
                      delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function CreateModal({
  isCreateOpen,
  closeCreateModal,
  createQuestion,
  openQuestion,
}) {
  const [newQst, setNewQst] = useState(null);
  useEffect(() => {
    setNewQst(openQuestion);
  }, [openQuestion]);

  return (
    <>
      <Transition appear show={isCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCreateModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl h-[100vh] max-h-[85vh] transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-white font-bold"
                  >
                    Create/Edit Question
                  </Dialog.Title>
                  <div className="text-2xl [&>*]:mb-2 text-black">
                    <div>
                      <p className="text-white">Name</p>
                      <input
                        className="outline-green"
                        value={newQst?.name}
                        onChange={(e) =>
                          setNewQst((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="name"
                      />
                    </div>
                    <div>
                      <p className="text-white">Question</p>
                      <textarea
                        value={newQst?.question}
                        onChange={(e) =>
                          setNewQst((prev) => ({
                            ...prev,
                            question: e.target.value,
                          }))
                        }
                        className="resize-none"
                        type="text"
                        placeholder="question"
                      />
                    </div>
                    <div>
                      <p className="text-white">Answer</p>
                      <textarea
                        value={newQst?.answer}
                        onChange={(e) =>
                          setNewQst((prev) => ({
                            ...prev,
                            answer: e.target.value,
                          }))
                        }
                        className="resize-none"
                        type="text"
                        placeholder="answer"
                      />
                    </div>
                    <div>
                      <p className="text-white">Timer</p>
                      <input
                        value={newQst?.timer}
                        onChange={(e) =>
                          setNewQst((prev) => ({
                            ...prev,
                            timer: e.target.valueAsNumber,
                          }))
                        }
                        type="number"
                        placeholder="30"
                      />
                    </div>
                  </div>
                  <div className="m-5 flex gap-5 absolute justify-end bottom-0 right-0">
                    {openQuestion && (
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeCreateModal}
                      >
                        delete
                      </button>
                    )}
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeCreateModal}
                    >
                      cancel
                    </button>
                    <button
                      disabled={
                        newQst == null ||
                        newQst.name == null ||
                        newQst.name == "" ||
                        newQst.question == null ||
                        newQst.question == "" ||
                        newQst.answer == null ||
                        newQst.answer == "" ||
                        newQst.timer == null ||
                        newQst.timer < 30
                      }
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-500 enabled:hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        createQuestion(newQst);
                      }}
                    >
                      save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
