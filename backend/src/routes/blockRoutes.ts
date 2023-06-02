import express from "express";
// import { CustomRequest } from "./blockController";
import blockController from "../controllers/blockController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

router.get("/", blockController.getAllBlocks);
router.get("/buy/:id", blockController.buyBlock);
router.get("/:id", blockController.getBlockById);
router.post("/", authenticateUser, blockController.createBlock);
router.put("/:id", authenticateUser, blockController.updateBlock);
router.delete("/:id", authenticateUser, blockController.deleteBlock);
router.get("/search", blockController.searchBlocks);
router.post("/:id/rate", authenticateUser, blockController.rateBlock);
router.post("/:id/favorite", authenticateUser, blockController.favoriteBlock);
router.get("/favorite", authenticateUser, blockController.getFavoriteBlocks);
router.get("/tags/:tag", authenticateUser, blockController.getBlocksByTag);

export default router;
