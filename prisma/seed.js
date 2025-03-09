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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../src/utils/prisma"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../src/config"));
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSuperAdminExist = yield prisma_1.default.user.findFirst({
            where: {
                role: client_1.UserRole.SUPER_ADMIN,
            },
        });
        if (isSuperAdminExist) {
            console.log("Super admin already exist!");
        }
        if (!isSuperAdminExist) {
            const hashedPassword = yield bcrypt_1.default.hash(config_1.default.super_admin.password, 12);
            const superAdmin = yield prisma_1.default.user.create({
                data: {
                    email: config_1.default.super_admin.email,
                    password: hashedPassword,
                    role: client_1.UserRole.SUPER_ADMIN,
                    username: config_1.default.super_admin.username,
                    name: config_1.default.super_admin.name,
                },
            });
            console.log(superAdmin);
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        prisma_1.default.$disconnect();
    }
});
seedSuperAdmin();
