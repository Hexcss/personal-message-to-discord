import { GithubWebhookBody } from "../interfaces/GitHubWebhookBody";

export function formatDiscordMessage(data: GithubWebhookBody): any {
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
  const commits = data.commits;

  let commitMessages = "";
  commits.forEach((commit, index) => {
    commitMessages += `\n${index + 1}. ${commit.message} (by ${
      commit.author.name
    })`;
  });

  // Use embed format
  const message = {
    embeds: [
      {
        title: "📣 New Push Event",
        color: 3447003,
        fields: [
          {
            name: "Repository",
            value: repoName,
            inline: true,
          },
          {
            name: "Pusher",
            value: pusherName,
            inline: true,
          },
          {
            name: "Branch",
            value: branch,
            inline: true,
          },
          {
            name: "Time",
            value: formattedDate,
            inline: true,
          },
          {
            name: "Commits",
            value: commitMessages,
          },
        ],
      },
    ],
  };

  return message;
}
