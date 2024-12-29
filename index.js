const core = require('@actions/core');
const ftp = require('basic-ftp');

async function run() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    // Get inputs
    const host = core.getInput('host');
    const port = core.getInput('port') || 21;
    const username = core.getInput('username');
    const password = core.getInput('password');
    const source = core.getInput('source') || './';
    const target = core.getInput('target');

    if (!host || !username || !password || !target) {
      core.setFailed('Required inputs (host, username, password, target) are missing.');
      return;
    }

    // Connect to the server
    core.info(`Connecting to ${host}:${port}`);
    await client.access({
      host,
      port: parseInt(port, 10),
      user: username,
      password,
      secure: false, // Set to 'true' if FTPS is required
    });

    // Upload the local folder to the remote folder
    core.info(`Uploading files from ${source} to ${target}...`);
    await client.uploadFromDir(source, target);
    core.info(`Files uploaded successfully from ${source} to ${target}`);

  } catch (err) {
    core.setFailed(`Action failed: ${err.message}`);
  } finally {
    client.close();
  }
}
run();
