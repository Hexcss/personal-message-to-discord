import { GithubWebhookBody } from '../interfaces/GitHubWebhookBody';

export function formatWhatsAppMessage(data: GithubWebhookBody): string {
    const repoName = data.repository.name;
    const pusherName = data.pusher.name;
    const branch = data.ref.split('/').pop();
    const timestamp = new Date(Number(data.repository.pushed_at)* 1000); 
    const formattedDate = timestamp.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const commits = data.commits;

    let commitMessages = "";
    commits.forEach((commit, index) => {
      commitMessages += `\n${index+1}. ${commit.message} (by ${commit.author.name})`;
    });

    const message = `A new push event was triggered in the repository *${repoName}*.\n\n*Details:*\n- Pusher: _${pusherName}_\n- Branch: _${branch}_\n- Time: _${formattedDate}_\n\n*Commits:*\n${commitMessages}\n`;

    return message;
}
