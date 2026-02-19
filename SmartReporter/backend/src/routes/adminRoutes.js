const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getComplaintsOnMap,
  assignComplaint,
  getAllUsers,
  updateUser,
  deleteUser,
  banUser,
  suspendUser,
  unsuspendUser,
  deleteComplaint
} = require("../controllers/adminController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.use(verifyToken, isAdmin);

router.get("/dashboard/stats", getDashboardStats);
router.get("/map", getComplaintsOnMap);
router.post("/assign", assignComplaint);
router.get("/users", getAllUsers);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
router.post("/users/:userId/ban", banUser);
router.post("/users/:userId/suspend", suspendUser);
router.post("/users/:userId/unsuspend", unsuspendUser);
router.delete("/complaints/:complaintId", deleteComplaint);

module.exports = router;