"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const github_webhook_1 = __importDefault(require("./github.webhook"));
const netlify_webhook_1 = __importDefault(require("./netlify.webhook"));
const router = (0, express_1.Router)();
router.use(github_webhook_1.default);
router.use(netlify_webhook_1.default);
exports.default = router;
