const Task = require("../model/task.model");
const { successResponse, errorResponse } = require("../utils/response");

// CREATE
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return successResponse(res, "Task Created Successfully", task);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// READ ALL
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return successResponse(res, "All Tasks", tasks);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// READ SINGLE
exports.getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return errorResponse(res, "Task not found");
        }

        return successResponse(res, "Single Task", task);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// UPDATE
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedTask) {
            return errorResponse(res, "Task not found");
        }

        return successResponse(res, "Task Updated Successfully", updatedTask);
    } catch (err) {
        return errorResponse(res, err);
    }
};

// DELETE
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return errorResponse(res, "Task not found");
        }

        return successResponse(res, "Task Deleted Successfully");
    } catch (err) {
        return errorResponse(res, err);
    }
};