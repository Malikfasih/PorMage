import React, { useState, useEffect } from "react";

import { useModal } from "../../context/modal";
import { useProjects } from "../../context/projects";
import { createTask, editTask, getProjects } from "../../api/api";
import { format } from "date-fns";

const initialState = {
  name: "",
  manager: "",
  description: "",
  startDate: "",
  endDate: "",
};

const Modal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    currentProjectId,
    setCurrentProjectId,
    currentTaskId,
    setCurrentTaskId,
    tasksData,
  } = useModal();
  const [singleTaskData, setSingleTaskData] = useState(initialState);
  const { setProjects } = useProjects();

  useEffect(() => {
    if (currentTaskId) {
      // Find the task and populate in the form
      const task = tasksData.find((task) => task._id === currentTaskId);

      if (task) setSingleTaskData(task);
    } else {
      // If creating new, reset the form
      setSingleTaskData(initialState);
    }
  }, [currentTaskId, tasksData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTaskId) {
        await editTask(currentTaskId, singleTaskData);
      } else {
        // Call createProject API function with singleTaskData
        await createTask(currentProjectId, singleTaskData);
      }
      // Update the projects in the context by refetching all projects
      setProjects(await getProjects());
      setIsModalOpen(false);
      setCurrentTaskId(null);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <div
        id="registeration-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          isModalOpen === true
            ? "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
            : "hidden"
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="registeration-modal"
              onClick={() => {
                setSingleTaskData(initialState);
                setIsModalOpen(false);
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white">
                {currentProjectId ? "Edit" : "Add New"}
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit} action="#">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Vehicle name"
                    value={
                      singleTaskData.startDate
                        ? format(
                            new Date(singleTaskData.startDate),
                            "yyyy-MM-dd"
                          )
                        : ""
                    }
                    onChange={(e) =>
                      setSingleTaskData({
                        ...singleTaskData,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Vehicle name"
                    value={
                      singleTaskData.endDate
                        ? format(new Date(singleTaskData.endDate), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={(e) =>
                      setSingleTaskData({
                        ...singleTaskData,
                        endDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="decription"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Project description"
                    value={singleTaskData.description || ""}
                    onChange={(e) =>
                      setSingleTaskData({
                        ...singleTaskData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label htmlFor="underline_select" className="">
                    Select Task Status
                  </label>
                  <select
                    id="status"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    onChange={(e) =>
                      setSingleTaskData({
                        ...singleTaskData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="not started">
                      {singleTaskData.status || ""}
                    </option>
                    <option>completed</option>
                    <option>not completed</option>
                    <option>started</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {currentTaskId ? "Edit" : "Add New"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
