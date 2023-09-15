"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const role_1 = require("../../../enums/role");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(role_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.orderController.createOrder);
router.get('/', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.orderController.getAllOrders);
router.get('/:id', (0, auth_1.default)(role_1.ENUM_USER_ROLE.ADMIN, role_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.orderController.getOrderById);
exports.orderRoutes = router;
