const express = require("express");
const router = express.Router();
const vehicleCtrl = require("../controllers/vehicleController");
const authCtrl = require("../controllers/authController");

router.get("/", vehicleCtrl.list);
router.get("/:id", vehicleCtrl.getById);

// admin
router.post(
  "/",
  authCtrl.verifyToken,
  authCtrl.ensureAdmin,
  vehicleCtrl.create,
);
router.put(
  "/:id",
  authCtrl.verifyToken,
  authCtrl.ensureAdmin,
  vehicleCtrl.update,
);
router.delete(
  "/:id",
  authCtrl.verifyToken,
  authCtrl.ensureAdmin,
  vehicleCtrl.remove,
);

module.exports = router;
