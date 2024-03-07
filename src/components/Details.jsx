import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

import { getManager } from "../api/api";
import { useManagers } from "../context/manager";

const Details = ({ project }) => {
  const { managerName, setManagerName } = useManagers();

  //  Get single manager name
  const fetchManager = async () => {
    const managerId = project.manager;
    const response = await getManager(managerId);

    setManagerName(response.data.manager.name);
  };
  fetchManager();

  return (
    <>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col w-1/2">
          <h1 className="text-3xl font-semibold">{project?.name}</h1>
          <p className="text-sm mt-3">{project?.description}</p>
        </div>

        <div className="flex w-1/3">
          <div className="flex-1">
            <h2 className="text-sm font-semibold">Manager</h2>
            <div className="border border-b-3 w-48 h-8 mt-3">
              {/* <p>{project?.manager}</p> */}
              <p>{managerName}</p>
            </div>
          </div>
          <div className="flex-1 flex flex-wrap">
            <div className="mb-7">
              <h2 className="text-sm font-semibold">Start Date</h2>
              <div className="flex border border-b-3 w-48 h-8 mt-3 justify-between items-center">
                <div className="">
                  <p>
                    {project?.startDate
                      ? format(new Date(project?.startDate), "d MMMM yyyy")
                      : ""}
                  </p>
                </div>
                <div>
                  <FaRegCalendarAlt />
                </div>
              </div>
            </div>

            <div className="">
              <h2 className="text-sm font-semibold">End Date</h2>
              <div className="flex border border-b-3 w-48 h-8 mt-3 justify-between items-center">
                <div className="">
                  <p>
                    {project?.endDate
                      ? format(new Date(project?.endDate), "d MMMM yyyy")
                      : ""}
                  </p>
                </div>
                <div>
                  <FaRegCalendarAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
