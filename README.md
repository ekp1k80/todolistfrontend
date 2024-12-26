
# Deploy Next.js Application to Vercel

This guide explains how to deploy a Next.js application to [Vercel](https://vercel.com/).

## Prerequisites

- A Vercel account
- Node.js installed on your local machine
- Git installed on your local machine
- A basic understanding of Next.js

---

## Steps to Deploy

### 1. **Install Vercel CLI (optional)**

If you want to deploy via the command line, you can install the Vercel CLI.

1. Open your terminal and run:
   ```bash
   npm install -g vercel
   ```

2. After installation, you can run `vercel` commands to deploy your project.

---

### 2. **Create a Vercel Account**

1. Go to [Vercel](https://vercel.com/) and create a new account or log in if you already have one.

2. Once logged in, you’ll be redirected to the dashboard.

---

### 3. **Deploy Your Project**

There are two methods for deploying to Vercel: via the Vercel dashboard or through the Vercel CLI.

#### Method 1: **Deploy Using the Vercel Dashboard**

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **New Project** button.
3. Connect your GitHub, GitLab, or Bitbucket account.
4. Choose the repository that contains your Next.js project.
5. Vercel will automatically detect the project as a Next.js application and provide default build settings.
6. Click **Deploy**.

Vercel will automatically build and deploy your Next.js project.

#### Method 2: **Deploy Using Vercel CLI**

1. In your project directory, run:
   ```bash
   vercel
   ```

2. Follow the prompts to link your project to your Vercel account.
3. Once linked, Vercel will start the deployment process. After it's finished, it will provide you with a URL where your app is deployed.

---

### 4. **Configure Domain (Optional)**

If you want to set up a custom domain for your deployed project, follow these steps:

1. Go to the **Domains** tab in your Vercel dashboard.
2. Click **Add Domain** and follow the instructions to add your custom domain.
3. Update the DNS settings to point to the Vercel platform.

---

### 5. **Automatic Deployment on Push**

Every time you push changes to your repository, Vercel will automatically deploy the new version of your app.

1. Make sure your Git repository is connected to Vercel.
2. Push changes to your GitHub, GitLab, or Bitbucket repository.
3. Vercel will automatically deploy the updated version of your app.

---

### Conclusion

Your Next.js application is now deployed on Vercel! You can access it using the URL provided by Vercel or your custom domain if you've set one up.
