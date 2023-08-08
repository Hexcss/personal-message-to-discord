import express, { Request, Response } from 'express';
import axios from 'axios';

interface GithubWebhookBody {
    repository: {
        name: string,
        pushed_at: string
    },
    pusher: {
        name: string
    },
    ref: string
}

const app = express();

app.use(express.json());

app.post('/webhook_handler', (req: Request<{}, {}, GithubWebhookBody>, res: Response) => {
    const data = req.body;
    const repoName = data.repository.name;
    const pusherName = data.pusher.name;
    const branch = data.ref.split('/').pop();
    const timestamp = data.repository.pushed_at;

    const slackWebhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
    const slackMessage = {
        text: `Repo: ${repoName}\nBranch: ${branch}\nPushed by: ${pusherName}\nWhen: ${timestamp}`
    };

    axios.post(slackWebhookUrl, slackMessage);

    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
