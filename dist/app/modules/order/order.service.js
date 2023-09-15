"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks: {
                create: orderedBooks,
            },
        },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                },
            },
        },
    });
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    if (user.role === 'customer') {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
            },
        });
    }
    else {
        result = yield prisma_1.default.order.findMany({});
    }
    return result;
});
const getOrderById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    if (user.role === 'customer') {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
                id,
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
    else {
        result = yield prisma_1.default.order.findMany({
            where: {
                id,
            },
            include: {
                orderedBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
    if (result.length == 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Order not found');
    }
    return result;
});
exports.orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
};
