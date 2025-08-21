# Complete Setup Guide for Interview Drills Application

This comprehensive guide will help you set up the Interview Drills application from scratch, regardless of your technical background.

## 🎯 What You'll Accomplish

By following this guide, you'll have:
- A fully functional interview practice application
- Google sign-in capability
- The ability to take practice drills and track your progress
- A local development environment running on your machine

## 📋 Prerequisites

### Required Software

You'll need to install these programs on your computer:

1. **Docker Desktop** (Recommended - makes setup much easier)
2. **Git** (to download the project code)
3. **A text editor** (VS Code recommended, but any will work)

### Required Accounts

- **Google Account** (for OAuth setup)
- **Google Cloud Console access** (free with any Google account)

## 🔧 Step 1: Install Required Software

### Install Docker Desktop

Docker packages our application so it runs the same way on every computer.

#### Windows:
1. Visit https://www.docker.com/products/docker-desktop/
2. Click "Download for Windows"
3. Run the downloaded installer
4. Follow installation wizard (accept all defaults)
5. Restart your computer when prompted
6. Launch Docker Desktop from Start menu
7. Wait for Docker to start (whale icon appears in system tray)

#### macOS:
1. Visit https://www.docker.com/products/docker-desktop/
2. Click "Download for Mac" (choose your chip type: Intel or Apple Silicon)
3. Open the downloaded .dmg file
4. Drag Docker icon to Applications folder
5. Open Docker from Applications
6. Grant necessary permissions when prompted

#### Linux:
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and back in

# Or follow official guide: https://docs.docker.com/desktop/install/linux-install/
```

**Verify Docker Installation:**
```bash
# Open terminal/command prompt and run:
docker --version
# Should show: Docker version 24.x.x or similar
```

### Install Git

Git helps us download and manage the project code.

#### Windows:
1. Visit https://git-scm.com/download/win
2. Download and run the installer
3. Accept all default settings during installation

#### macOS:
```bash
# Open Terminal and run:
git --version
# If not installed, it will prompt you to install Xcode Command Line Tools
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# CentOS/RHEL/Fedora
sudo dnf install git
```

**Verify Git Installation:**
```bash
git --version
# Should show: git version 2.x.x or similar
```

## 🔧 Step 2: Download the Project

### Clone the Repository

1. **Open Terminal/Command Prompt:**
   - Windows: Press Win + R, type `cmd`, press Enter
   - macOS: Press Cmd + Space, type `terminal`, press Enter
   - Linux: Press Ctrl + Alt + T

2. **Navigate to desired location:**
   ```bash
   # Go to Desktop (or wherever you want the project)
   cd Desktop
   ```

3. **Download the project:**
   ```bash
   git clone <your-repository-url>
   cd interview-drills
   ```

4. **Verify download:**
   ```bash
   ls
   # Should show folders: api, web, docs, etc.
   ```

## 🔧 Step 3: Google OAuth Setup (CRITICAL STEP)

⚠️ **WARNING**: The application will NOT work without proper Google OAuth configuration. This is the most important step.

### 3.1 Access Google Cloud Console

1. Open your web browser
2. Go to https://console.cloud.google.com/
3. Sign in with your Google account
4. Accept any terms of service if prompted

### 3.2 Create a New Project

1. **Find the project selector:**
   - Look at the top of the page for a dropdown that says "Select a project"
   - Click on it

2. **Create new project:**
   - Click "NEW PROJECT" button
   - Project name: Enter "Interview Drills" (or any name you prefer)
   - Organization: Leave as default (usually "No organization")
   - Click "CREATE"

3. **Wait for creation:**
   - This takes about 30-60 seconds
   - You'll see a notification when it's ready

4. **Select your project:**
   - Make sure your new project is selected in the dropdown at the top

### 3.3 Enable Required APIs

1. **Navigate to APIs:**
   - In the left sidebar, click "APIs & Services"
   - Click "Library"

2. **Enable Google+ API:**
   - In the search box, type "Google+ API"
   - Click on "Google+ API" from the search results
   - Click the blue "ENABLE" button
   - Wait for it to enable (about 10-15 seconds)

### 3.4 Configure OAuth Consent Screen

1. **Go to OAuth consent screen:**
   - In the left sidebar, click "APIs & Services"
   - Click "OAuth consent screen"

2. **Choose user type:**
   - Select "External" (unless you have a Google Workspace account)
   - Click "CREATE"

3. **Fill in App Information:**
   - App name: "Interview Drills"
   - User support email: Your email address
   - App logo: Skip this (optional)
   - App domain: Leave blank for now
   - Developer contact information: Your email address
   - Click "SAVE AND CONTINUE"

4. **Scopes (Step 2):**
   - Click "SAVE AND CONTINUE" (no changes needed)

5. **Test users (Step 3):**
   - Add your email address as a test user
   - Click "SAVE AND CONTINUE"

6. **Summary (Step 4):**
   - Review your settings
   - Click "BACK TO DASHBOARD"

### 3.5 Create OAuth Credentials

1. **Go to Credentials:**
   - In the left sidebar, click "APIs & Services"
   - Click "Credentials"

2. **Create OAuth client ID:**
   - Click "CREATE CREDENTIALS" button
   - Select "OAuth client ID"

3. **Configure the OAuth client:**
   - Application type: Select "Web application"
   - Name: "Interview Drills Web Client"
   - Authorized JavaScript origins: Add these URLs:
     - `http://localhost:3000`
   - Authorized redirect URIs: Add these URLs:
     - `http://localhost:4000/auth/google/callback`
   - Click "CREATE"

4. **Save your credentials:**
   - A popup will show your Client ID and Client Secret
   - **IMPORTANT**: Copy both values immediately
   - Keep this information secure and private

## 🔧 Step 4: MongoDB Configuration

You have two options for the database:

### Option A: Local Docker (Recommended for beginners)
- Docker Compose already includes a mongo service
- No extra credentials required for local development
- Use the default MONGO_URI from .env.example

### Option B: MongoDB Atlas (Cloud database)
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Create a database user with read/write permissions
5. Get the connection string
6. Replace `<password>` and `<dbname>` in the connection string

For this guide, we'll use **Option A (Local Docker)** as it's simpler.

## 🔧 Step 5: Environment Configuration

### 5.1 Create Environment File

1. **Copy the example file:**
   ```bash
   # In your project directory
   cp .env.example .env
   ```

2. **Open the .env file in a text editor:**
   - Use VS Code, Notepad, TextEdit, or any text editor
   - The file should be in the root of your project folder

### 5.2 Fill in Required Values

Edit your `.env` file with these values:

```bash
# MongoDB Connection (use this for local Docker setup)
MONGO_URI=mongodb://mongo:27017/drillsdb

# Google OAuth (REQUIRED - Replace with your actual values)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

# Application URLs
WEB_BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:4000

# Security (Generate random strings for these)
COOKIE_SECRET=your_super_secret_key_here_make_it_long_and_random_at_least_32_characters
SESSION_SECRET=another_secret_key_for_sessions_also_make_it_long_and_random

# Development Settings
NODE_ENV=development
COOKIE_SECURE=false

# Performance Settings (Optional)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
CACHE_TTL_SECONDS=60
```

**IMPORTANT REPLACEMENTS:**
- Replace `your_google_client_id_here` with your actual Google Client ID
- Replace `your_google_client_secret_here` with your actual Google Client Secret
- Replace the secret keys with long, random strings (at least 32 characters each)

**Example of good secret keys:**
```bash
COOKIE_SECRET=my_super_long_random_string_for_cookies_security_12345678
SESSION_SECRET=another_very_long_random_string_for_sessions_87654321
```

## 🔧 Step 6: Seed Sample Data

Before starting the application, let's add some sample interview questions:

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Add sample data to the database
npm run seed

# Go back to the project root
cd ..
```

## 🔧 Step 7: Start the Application

### Using Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   # Build and start all containers
   docker compose up --build
   ```

2. **Or run in background:**
   ```bash
   # Run in detached mode (background)
   docker compose up --build -d
   ```

3. **Wait for startup:**
   - This may take 2-5 minutes the first time
   - You'll see logs from different services
   - Wait until you see "Server running on port 4000" and "Ready on http://localhost:3000"

### What's Starting Up

The Docker setup starts these services:
- **MongoDB database** (port 27017)
- **Backend API server** (port 4000)
- **Frontend web server** (port 3000)
- **MongoDB admin interface** (port 8081)

## 🔧 Step 8: Test the Application

### 8.1 Access the Application

1. Open your web browser
2. Go to: http://localhost:3000
3. You should see: The Interview Drills landing page with a "Sign in with Google" button

### 8.2 Test Google Authentication

1. Click "Sign in with Google"
2. You'll be redirected to Google's login page
3. Sign in with your Google account
4. Grant permissions when prompted
5. You should be redirected back to: http://localhost:3000/dashboard

### 8.3 Test Taking a Drill

1. On the dashboard, you should see available interview drills
2. Click "Open" on any drill
3. Answer the questions in the text areas
4. Click "Submit Answers"
5. You should see your score displayed

### 8.4 Test History

1. Navigate to: http://localhost:3000/history
2. You should see your previous drill attempts

## 🔧 Step 9: Verify Everything is Working

### Quick Health Checks

```bash
# Test API health
curl http://localhost:4000/api/health
# Should return: {"status":"ok","timestamp":"..."}

# Test database connection
curl http://localhost:4000/api/drills
# Should return: {"data":[...]} with drill data
```

### Access Admin Interfaces

- **MongoDB Admin**: http://localhost:8081 (to view database contents)
- **API Health**: http://localhost:4000/api/health
- **Frontend**: http://localhost:3000

## 🎉 Congratulations!

You now have a fully functional Interview Drills application running locally. You can:
- Sign in with Google
- Take interview practice drills
- View your progress and history
- Practice as much as you want

## 🐛 Common Issues

### Docker Issues
- **Docker not starting**: Restart Docker Desktop
- **Port conflicts**: Make sure ports 3000, 4000, 8081, and 27017 are not in use by other applications

### Google OAuth Issues
- **OAuth error**: Double-check your Client ID and Secret in the `.env` file
- **Redirect URI error**: Ensure `http://localhost:4000/auth/google/callback` is added to your Google OAuth configuration

### Database Issues
- **Connection refused**: Wait a bit longer for MongoDB to start, or restart with `docker compose restart`

## 🔧 Development Commands

```bash
# Stop all services
docker compose down

# Rebuild and restart
docker compose up --build

# View logs
docker compose logs

# Access database directly
docker exec -it interview-drills-mongo-1 mongosh
```