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
exports.categoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryInfo = yield prisma_1.default.category.findFirst({
        where: {
            title: data.title,
        },
    });
    if (categoryInfo) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category already exist!');
    }
    const result = yield prisma_1.default.category.create({
        data,
    });
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({});
    return result;
});
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryInfo = yield prisma_1.default.category.findFirst({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    if (!categoryInfo) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found!');
    }
    return categoryInfo;
});
const updateCategoryById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield prisma_1.default.category.findFirst({
        where: {
            id,
        },
    });
    if (!categoryData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield prisma_1.default.category.findFirst({
        where: {
            id,
        },
    });
    if (!categoryData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const result = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
