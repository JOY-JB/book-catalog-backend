"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.createCategory);
router.get('/', category_controller_1.categoryController.getAllCategories);
router.get('/:id', category_controller_1.categoryController.getCategoryById);
router.patch('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.updateCategoryById);
router.delete('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.deleteCategoryById);
exports.categoryRoutes = router;
