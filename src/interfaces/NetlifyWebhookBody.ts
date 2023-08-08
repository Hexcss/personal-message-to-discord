export interface NetlifyWebhookBody {
  site_url: string;
  name: string;
  state: string; // 'building', 'deployed', etc.
  title: string;
  context: string; // e.g., 'production', 'deploy-preview'
}
