const router = require("express").Router();
const { createUser, readUser, getCurrentUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", readUser);
router.get("/get-current-user", authMiddleware,getCurrentUser );

module.exports = router;
