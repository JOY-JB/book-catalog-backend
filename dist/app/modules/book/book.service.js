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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.book.findFirst({
        where: {
            title: data.title,
            author: data.author,
            genre: data.genre,
            price: data.price,
            publicationDate: data.publicationDate,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book already exist!');
    }
    const createdBook = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return createdBook;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (key === 'minPrice' || key === 'maxPrice') {
                    const operator = key === 'minPrice' ? 'gte' : 'lte';
                    return {
                        price: {
                            [operator]: parseFloat(filterData[key]),
                        },
                    };
                }
                else if (key === 'category') {
                    return {
                        categoryId: filterData[key],
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        skip,
        take: size,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: whereConditions,
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            total,
            page,
            size,
            totalPage,
        },
        data: result,
    };
});
const getBooksByCategory = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        skip,
        take: size,
        where: {
            categoryId,
        },
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book not Found!');
    }
    return bookData;
});
const updateBookById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book not Found!');
    }
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Book not Found!');
    }
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookService = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getBookById,
    updateBookById,
    deleteBookById,
};
