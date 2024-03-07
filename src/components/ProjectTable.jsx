import React from "react";
import Spinner from "./Spinner/Spinner";
import { useProjects } from "../context/projects";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useModal } from "../context/modal";

const Table = () => {
  const { setCurrentId, setIsModalOpen } = useModal();
  const currentDate = new Date();

  // setting current project Id on this event
  const EditProject = (id) => {
    setCurrentId(id);
    setIsModalOpen(true);
  };

  const { projects, loading } = useProjects();

  if (!Array.isArray(projects)) {
    return <div>No projects available</div>;
  }
  // loading projects
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Start Date
              </th>

              <th scope="col" className="px-6 py-3">
                End Date
              </th>

              <th scope="col" className="px-6 py-3">
                is Running
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr
                key={project?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Link to={`/project-detail/${project._id}`}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {project?.name}
                  </td>
                </Link>

                <td className="px-6 py-4">
                  {format(new Date(project?.startDate), "MM/dd/yyyy")}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(project?.endDate), "MM/dd/yyyy")}
                </td>
                <td className="pl-10 py-4">
                  {currentDate <= new Date(project?.endDate) ? (
                    <MdOutlineCheckBoxOutlineBlank />
                  ) : (
                    <MdOutlineCheckBox />
                  )}
                </td>

                <td className=" py-4 ">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => EditProject(project?._id)}
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

export default Table;
