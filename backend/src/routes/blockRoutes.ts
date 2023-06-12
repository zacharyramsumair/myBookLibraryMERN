import express from "express";
// import { CustomRequest } from "./blockController";
import blockController from "../controllers/blockController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

router.get("/", blockController.getAllBlocks);
router.get("/buy/:id",authenticateUser, blockController.buyBlock);
router.get("/block/:id", blockController.getBlockById);
router.post("/", authenticateUser, blockController.createBlock);
router.get("/dashboard", blockController.getDashboard);
router.put("/block/:id", authenticateUser, blockController.updateBlock);
router.delete("/block/:id", authenticateUser, blockController.deleteBlock);
router.get("/search", blockController.searchBlocks);
router.post("/:id/rate", authenticateUser, blockController.rateBlock);
router.post("/:id/favorite", authenticateUser, blockController.favoriteBlock);
router.get("/favorite", authenticateUser, blockController.getFavoriteBlocks);
router.get("/tags/:tag", blockController.getBlocksByTag);
router.get("/my-blocks",authenticateUser, blockController.getMyBlocks);
router.get("/user-shelf",authenticateUser, blockController.getUserShelfBlocks);
router.get("/home", blockController.getHomePage);


export default router;
