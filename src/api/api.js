import axios from "axios";

const baseURL = "http://localhost:8080";

const api = axios.create({
  baseURL,
});

// API functions

// Projects

// const getProjects = () => api.get("/projects/get-projects");
const getProjects = (page, limit) =>
  api.get(`/projects/get-projects?page=${page}&limit=${limit}`);

const editProject = (projectId, projectData) =>
  api.patch(`/projects/edit-project/${projectId}`, projectData);
const createProject = (projectData) =>
  api.post("/projects/create-project", projectData);

// Tasks
const getTasks = () => api.get("/tasks");
const editTask = (taskId, taskData) =>
  api.patch(`/tasks/edit-task/${taskId}`, taskData);
const createTask = (projectId, taskData) =>
  api.post(`/tasks/project/${projectId}/create-task`, taskData);

// Manager
const getManagers = () => api.get("/managers/get-managers");
const getManager = (managerId) => api.get(`/managers/get-manager/${managerId}`);

export {
  getProjects,
  editProject,
  createProject,
  getTasks,
  editTask,
  createTask,
  getManagers,
  getManager,
};
