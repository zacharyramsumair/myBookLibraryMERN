import express from "express";
// import { CustomRequest } from "./blockController";
import blockController from "../controllers/blockController";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

router.use(authenticateUser)


router.get("/", blockController.getAllBlocks);
router.post("/buy/:id", blockController.buyBlock);
router.get("/block/:id", blockController.getBlockById);
router.post("/", blockController.createBlock);
router.get("/dashboard", blockController.getDashboard);
router.put("/block/:id", blockController.updateBlock);
router.delete("/block/:id", blockController.deleteBlock);
router.get("/search", blockController.searchBlocks);
router.post("/rate/:id", blockController.rateBlock);
router.post("/favorite/:id", blockController.favoriteBlock);
router.get("/favorites", blockController.getFavoriteBlocks);
router.get("/tags/:tag", blockController.getBlocksByTag);
router.get("/my-blocks", blockController.getMyBlocks);
router.get("/user-shelf", blockController.getUserShelfBlocks);
router.get("/home", blockController.getHomePage);


export default router;
