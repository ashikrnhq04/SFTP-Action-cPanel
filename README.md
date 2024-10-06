## GitHub Action for cPanel

Implement continuous integration for your GitHub project and deploy it to cPanel Hosting using SFTP.
<p align="center">
<img  alt="GitHub-Action-cPanel"  src="images/github-to-cpanel.png" width="500">
</p>
## Usage

```yml
name: Deploy to cPanel  

on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Deploy to cPanel
      uses: jakirseu/SFTP-Action-cPanel@main
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        source: './'  #  Project directory to deploy
        target: 'public_html/' # server directory

```
 

## Variables 
| Config |Required| Example |Description|
|--|--|--| --|--| --|
| host | yes | example.com | Server IP or FTP URL.|
| username|yes |cPane_username | FTP Username|
|passowrd|yes|cPanel_Password| FTP Password|
|source|no|`'./'`| GitHub project directory. You can deploy sub directory from your repository|
|target|yes|`'public_html/'`| Destination. Mainly public_html folder. If you are planning to deploy on a subdomain or sub directory, include it here and add a slash(/) in the end.|



### Steps to Set Up GitHub Actions for cPanel Deployment

#### 1. **Create a New GitHub Action Workflow**

Inside your project repository, create a workflow file to automate the deployment process. You’ll define it inside `.github/workflows/deploy.yml`.

You can manually create the file inside .github/workflows directory. You can also create one in your GitHub repository by visiting **Action > Simple workflow**. 

#### 2. **Example Workflow Configuration (`deploy.yml`)**:

```yml
name: Deploy to cPanel  

on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Deploy to cPanel
      uses: jakirseu/SFTP-Action-cPanel@main
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        source: './'  #  Project directory to deploy
        target: 'public_html/' # server directory

```

This workflow will trigger when changes are pushed to the `main` branch, and it will transfer the repository files to your cPanel server via SFTP.

#### 3. **Store Sensitive Information in GitHub Secrets**:

To keep your credentials secure, store the SFTP credentials (like server, username, and password) in GitHub Secrets. Follow these steps:

1.  In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
2.  Add the following secrets:
    -   **`USERNAME`**: Your cPanel username.
    -   **`PASSWORD`**: Your cPanel password (or use SSH private key instead if available).
3.  You can now access these secrets in your workflow file using `${{ secrets.SECRET_NAME }}`.
