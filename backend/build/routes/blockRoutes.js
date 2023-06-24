"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { CustomRequest } from "./blockController";
const blockController_1 = __importDefault(require("../controllers/blockController"));
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router.use(authentication_1.authenticateUser);
router.get("/", blockController_1.default.getAllBlocks);
router.post("/buy/:id", blockController_1.default.buyBlock);
router.get("/block/:id", blockController_1.default.getBlockById);
router.post("/", blockController_1.default.createBlock);
router.get("/dashboard", blockController_1.default.getDashboard);
router.put("/block/:id", blockController_1.default.updateBlock);
router.delete("/block/:id", blockController_1.default.deleteBlock);
router.post("/search", blockController_1.default.searchBlocks);
router.post("/rate/:id", blockController_1.default.rateBlock);
router.post("/favorite/:id", blockController_1.default.favoriteBlock);
router.get("/favorites", blockController_1.default.getFavoriteBlocks);
router.get("/tags/:tag", blockController_1.default.getBlocksByTag);
router.get("/my-blocks", blockController_1.default.getMyBlocks);
router.get("/user-shelf", blockController_1.default.getUserShelfBlocks);
router.get("/home", blockController_1.default.getHomePage);
exports.default = router;