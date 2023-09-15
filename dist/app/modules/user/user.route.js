"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.getAllUser);
router.get('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.getUserById);
router.patch('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.updateUserById);
router.delete('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.deleteUserById);
exports.userRoutes = router;