"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonVariables = exports.truncateAndCleanMessage = void 0;
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateAndCleanMessage(message, maxLength = 50) {
    let cleanedMessage = message.replace(/\r?\n|\r/g, " ").trim();
    if (cleanedMessage.length > maxLength) {
        cleanedMessage = cleanedMessage.substring(0, maxLength - 3) + "...";
    }
    return cleanedMessage;
}
exports.truncateAndCleanMessage = truncateAndCleanMessage;
function getCommonVariables(data) {
    const repoName = data.repository.name;
    const pusherName = data.pusher.name;
    const branch = data.ref.split("/").pop();
    const timestamp = new Date(Number(data.repository.pushed_at) * 1000);
    const formattedDate = timestamp.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const dateComponents = formattedDate.split(/[\s,]+/); // Split by spaces and commas
    const capitalizedDate = dateComponents.map(capitalizeFirstLetter).join(" ");
    const pusherAvatar = data.sender.avatar_url;
    return {
        repoName,
        pusherName,
        branch,
        capitalizedDate,
        pusherAvatar,
    };
}
exports.getCommonVariables = getCommonVariables;
