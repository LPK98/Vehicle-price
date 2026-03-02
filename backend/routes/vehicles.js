const express = require("express");
const router = express.Router();
const vehicleCtrl = require("../controllers/vehicleController");
const { verifyToken, ensureAdmin } = require("../middleware/auth");

router.get("/", vehicleCtrl.list);
router.get("/:id", vehicleCtrl.getById);

// admin-only routes
router.post("/", verifyToken, ensureAdmin, vehicleCtrl.create);
router.put("/:id", verifyToken, ensureAdmin, vehicleCtrl.update);
router.delete("/:id", verifyToken, ensureAdmin, vehicleCtrl.remove);

module.exports = router;
