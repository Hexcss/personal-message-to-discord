"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const formatNetlifyDiscordMessage_1 = require("../utils/formatNetlifyDiscordMessage");
const router = (0, express_1.Router)();
router.post("/webhook_netlify", (req, res) => {
    const data = req.body;
    const discordMessage = (0, formatNetlifyDiscordMessage_1.formatNetlifyDiscordMessage)(data);
    console.log(process.env.DISCORD_NETLIFY_WEBHOOK);
    axios_1.default
        .post(process.env.DISCORD_NETLIFY_WEBHOOK, discordMessage)
        .then((response) => {
        console.log(response.data);
        res.sendStatus(200);
    })
        .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});
exports.default = router;
