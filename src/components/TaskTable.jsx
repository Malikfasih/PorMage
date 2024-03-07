import React, { useEffect } from "react";
import { useProjects } from "../context/projects";
import { format } from "date-fns";
import { useModal } from "../context/modal";

const TaskTable = () => {
  const {
    setIsModalOpen,
    currentProjectId,
    setCurrentTaskId,
    tasksData,
    setTasksData,
  } = useModal();

  // setting current project Id on this event
  const editTask = (id) => {
    setCurrentTaskId(id);
    setIsModalOpen(true);
  };

  const { projects } = useProjects();

  useEffect(() => {
    const project = projects.find(
      (project) => project._id === currentProjectId
    );
    if (project && project.tasks && project.tasks.length > 0) {
      setTasksData(project.tasks);
    } else {
      setTasksData([]);
    }
  }, [projects, currentProjectId]);

  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  if (tasksData.length === 0) {
    return <div>No tasks found for this project.</div>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>

              <th scope="col" className="px-6 py-3">
                End Date
              </th>

              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {tasksData?.map((task) => (
              <tr
                key={task?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  {format(new Date(task?.startDate), "MM/dd/yyyy")}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(task?.endDate), "MM/dd/yyyy")}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium truncate text-gray-900 whitespace-nowrap dark:text-white"
                  style={{ maxWidth: "10rem" }}
                >
                  {task?.description}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task?.status}
                </td>

                <td className=" py-4 ">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => editTask(task?._id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskTable;
