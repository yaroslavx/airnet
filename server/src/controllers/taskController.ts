import {
  findAll,
  create,
  findByProfile,
  findAllProfiles,
  createProfile,
  remove,
} from '../models/table';

const { getPostData } = require('../utils/utils');
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Method': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000,
};

// @desc    Gets All Tasks
// @route   GET /api/tasks
async function getTasks(req, res) {
  try {
    const tasks = await findAll();

    res.writeHead(200, headers);
    res.end(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Profile Tasks
// @route   GET /api/tasks/:profile
async function getProfileTasks(req, res, profileId) {
  try {
    const tasks = await findByProfile(profileId);

    if (!tasks) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: 'Tasks Not Found' }));
    } else {
      res.writeHead(200, headers);
      res.end(JSON.stringify(tasks));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Task
// @route   POST /api/tasks
async function createTask(req, res) {
  try {
    const body = await getPostData(req);
    const { task, task_date, profileId } = JSON.parse(body as string);
    const createdTask = await create(task, task_date, profileId);
    res.writeHead(201, headers);
    return res.end(JSON.stringify(createdTask));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete a Task
// @route   DELETE /api/tasks
async function removeTask(req, res) {
  try {
    const body = await getPostData(req);
    const { taskId } = JSON.parse(body as string);
    const deletedTask = await remove(taskId);
    res.writeHead(201, headers);
    return res.end(JSON.stringify(deletedTask));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets All Profiles
// @route   GET /api/profiles
async function getProfiles(req, res) {
  try {
    const profiles = await findAllProfiles();
    res.writeHead(200, headers);
    res.end(JSON.stringify(profiles));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Profile
// @route   POST /api/profiles
async function createUser(req, res) {
  try {
    const body = await getPostData(req);
    const { profile } = JSON.parse(body as string);
    const createdProfile = await createProfile(profile);
    res.writeHead(201, headers);
    return res.end(JSON.stringify(createdProfile));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTasks,
  getProfileTasks,
  createTask,
  removeTask,
  getProfiles,
  createUser,
};
