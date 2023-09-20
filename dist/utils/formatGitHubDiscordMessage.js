"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatGitHubDiscordMessage = void 0;
const functions_1 = require("./functions");
function branchCreatedEmbed(data) {
    const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = (0, functions_1.getCommonVariables)(data);
    return {
        embeds: [
            {
                title: "🌱 New Branch Created",
                url: `https://github.com/${pusherName}/${repoName}`,
                color: 65280,
                author: {
                    name: pusherName,
                    icon_url: pusherAvatar,
                },
                description: `Branch \`${branch}\` has been created.`,
                fields: [
                    {
                        name: "Repository",
                        value: `[${repoName}](https://github.com/${pusherName}/${repoName})`,
                        inline: true,
                    },
                    {
                        name: "Branch",
                        value: branch,
                        inline: true,
                    },
                    {
                        name: "Time",
                        value: capitalizedDate,
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
                },
                footer: {
                    text: "Branch creation event",
                },
                timestamp: new Date().toISOString(),
            },
        ],
    };
}
function branchDeletedEmbed(data) {
    const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = (0, functions_1.getCommonVariables)(data);
    return {
        embeds: [
            {
                title: "🔥 Branch Deleted",
                url: `https://github.com/${pusherName}/${repoName}`,
                color: 16711680,
                author: {
                    name: pusherName,
                    icon_url: pusherAvatar,
                },
                description: `Branch \`${branch}\` has been deleted.`,
                fields: [
                    {
                        name: "Repository",
                        value: `[${repoName}](https://github.com/${pusherName}/${repoName})`,
                        inline: true,
                    },
                    {
                        name: "Branch",
                        value: branch,
                        inline: true,
                    },
                    {
                        name: "Time",
                        value: capitalizedDate,
                        inline: true,
                    },
                ],
                thumbnail: {
                    url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
                },
                footer: {
                    text: "Branch deletion event",
                },
                timestamp: new Date().toISOString(),
            },
        ],
    };
}
function pushEventEmbed(data) {
    const { repoName, pusherName, branch, capitalizedDate, pusherAvatar } = (0, functions_1.getCommonVariables)(data);
    const commits = data.commits;
    let commitMessages = "";
    commits.forEach((commit, index) => {
        const cleanedCommitMessage = (0, functions_1.truncateAndCleanMessage)(commit.message);
        commitMessages += `\n**[${index + 1}. ${cleanedCommitMessage}]** (by *${commit.author.name}*)`;
    });
    return {
        embeds: [
            {
                title: "📣 New Push Event",
                url: `https://github.com/${pusherName}/${repoName}`,
                color: 3447003,
                author: {
                    name: pusherName,
                    icon_url: pusherAvatar,
                },
                fields: [
                    {
                        name: "Repository",
                        value: `[${repoName}](https://github.com/${pusherName}/${repoName})`,
                        inline: true,
                    },
                    {
                        name: "Branch",
                        value: branch,
                        inline: true,
                    },
                    {
                        name: "Time",
                        value: capitalizedDate,
                        inline: true,
                    },
                    {
                        name: "Commits",
                        value: commitMessages,
                    },
                ],
                image: {
                    url: "https://opensource.com/sites/default/files/styles/image-full-size/public/lead-images/github-universe.jpg?itok=lwRZddXA",
                },
                thumbnail: {
                    url: "https://blog.rapidapi.com/wp-content/uploads/2017/01/octocat.gif",
                },
                footer: {
                    text: `${data.commits.length} commits in this push`,
                },
                timestamp: new Date().toISOString(),
            },
        ],
    };
}
function formatGitHubDiscordMessage(data) {
    if (data.deleted)
        return branchDeletedEmbed(data);
    if (data.created)
        return branchCreatedEmbed(data);
    return pushEventEmbed(data);
}
exports.formatGitHubDiscordMessage = formatGitHubDiscordMessage;
