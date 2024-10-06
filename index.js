const core = require('@actions/core');
const SftpClient = require('ssh2-sftp-client');
const path = require('path');

async function run() {
  const sftp = new SftpClient();
  try {
    // Get inputs
    const host = core.getInput('host');
    const port = core.getInput('port') || 22; 
    const username = core.getInput('username');
    const password = core.getInput('password');
    const source = core.getInput('source') || './';
    const target = core.getInput('target');


    // Connect to the server
    await sftp.connect({
      host: host,
      username: username,
      password: password,
      port: parseInt(port, 10), 
    });


    // Upload the local folder to the remote folder
    await sftp.uploadDir(source, target);
    core.info(`Files uploaded successfully from ${source} to ${target}`);

  } catch (err) {
    core.setFailed(`Action failed: ${err.message}`);
  } finally {
    sftp.end();
  }
}
run();
