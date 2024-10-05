const core = require('@actions/core');
const SftpClient = require('ssh2-sftp-client');
const path = require('path');

async function run() {
  const sftp = new SftpClient();
  try {
    // Get inputs
    const host = core.getInput('host');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const localPath = core.getInput('local_path');
    const remotePath = core.getInput('remote_path');

    // Connect to the cPanel server
    await sftp.connect({
      host: host,
      username: username,
      password: password,
      port: 22, // Default SFTP port
    });
    

    // Upload the local folder to the remote folder
    await sftp.uploadDir(localPath, remotePath);
    core.info(`Files uploaded successfully from ${localPath} to ${remotePath}`);

  } catch (err) {
    core.setFailed(`Action failed: ${err.message}`);
  } finally {
    sftp.end();
  }
}
run();
