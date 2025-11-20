import { Client } from 'basic-ftp';
import path from 'path';

async function deploy() {
  const password = process.env.FTP_PASSWORD;
  if (!password) {
    console.error('Error: FTP_PASSWORD environment variable not set');
    console.error('Usage: FTP_PASSWORD="your-password" node scripts/deploy-ftp.mjs');
    process.exit(1);
  }

  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: '191.101.13.61',
      user: 'u951885034',
      password: password,
      secure: false,
      secureOptions: null,
      passvTimeout: 10000
    });

    console.log('Connected to Hostinger FTP');

    // Navigate to the public_html directory
    await client.cd('/domains/agentic-saas-talks.com/public_html');
    console.log('Changed to public_html directory');

    // Upload the out directory contents
    const localDir = path.join(process.cwd(), 'out');
    console.log(`Uploading from: ${localDir}`);

    await client.uploadFromDir(localDir, '/domains/agentic-saas-talks.com/public_html');

    console.log('Deployment complete!');
    console.log('Site live at: https://agentic-saas-talks.com');

  } catch (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
