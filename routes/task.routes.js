
const router = require("express").Router();

const {
    createTask,
    getTasks,
    getSingleTask,
    updateTask,
    deleteTask
} = require("../controller/task.controller");

router.post("/create", createTask);
router.get("/all", getTasks);
router.get("/:id", getSingleTask); 
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;
