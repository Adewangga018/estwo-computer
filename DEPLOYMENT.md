# Production Deployment CI/CD

This repository includes a GitHub Actions workflow for automated deployment to production when a release tag is created.

## How it works

1. **Trigger**: The deployment runs automatically when a new release is published on GitHub
2. **Build Process**: 
   - Installs PHP and Node.js dependencies
   - Builds frontend assets using Vite
   - Creates an optimized deployment package
3. **Deployment**: Uses SCP to upload files to your shared hosting server
4. **Post-deployment**: Runs Laravel optimization commands on the server

## Required GitHub Secrets

You need to configure the following secrets in your GitHub repository settings:

### Server Access
- `SSH_PRIVATE_KEY`: Your SSH private key for connecting to the server
- `HOST`: Your server's hostname or IP address
- `USERNAME`: SSH username for your server
- `DEPLOY_PATH`: Full path to your deployment directory on the server

### Example Secret Values
```
SSH_PRIVATE_KEY: -----BEGIN OPENSSH PRIVATE KEY-----
                 your_private_key_content_here
                 -----END OPENSSH PRIVATE KEY-----

HOST: your-server.com
USERNAME: your_username
DEPLOY_PATH: /home/your_username/public_html
```

## Server Setup Requirements

### 1. SSH Key Authentication
Generate an SSH key pair on your local machine:
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com"
```

Add the public key to your server's `~/.ssh/authorized_keys` file.

### 2. Server Directory Structure
Your server should have this structure:
```
/home/your_username/
├── public_html/          # Your deployment directory
│   ├── current/          # Current active deployment
│   └── backup-*/         # Backup directories
```

### 3. Production Environment File
Copy `.env.production.example` to `.env.production` and update with your production values:
- Database credentials
- App URL
- Mail configuration
- Any other production-specific settings

## Frontend Build Process

Yes, you need to build frontend assets on every release because:

1. **Vite + React**: Your React components need to be compiled and bundled
2. **Inertia.js**: Client-side routing and components require compilation
3. **Production Optimization**: Minification, tree-shaking, and asset optimization
4. **Cache Busting**: New builds generate new asset hashes for cache invalidation

The build process:
- Runs `npm ci` to install exact dependency versions
- Executes `npm run build` to create production assets
- Assets are placed in `public/build/` directory

## Deployment Process

1. **Create a Release**: Go to GitHub → Releases → Create a new release
2. **Tag Creation**: Create a new tag (e.g., `v1.0.0`, `v1.1.0`)
3. **Automatic Deployment**: The workflow triggers automatically
4. **Monitor Progress**: Check the Actions tab for deployment status

## File Exclusions

The deployment excludes development files via `.deployignore`:
- `node_modules/`
- Test files
- Development configuration
- Git files
- IDE files

## Post-Deployment Commands

The workflow automatically runs these Laravel commands:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan optimize
```

## Rollback Strategy

If a deployment fails, the previous version is automatically backed up:
- Current deployment moved to `backup-YYYYMMDD-HHMMSS/`
- You can manually restore by renaming the backup directory to `current`

## Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH_PRIVATE_KEY secret is correct
   - Check HOST and USERNAME values
   - Ensure server allows SSH connections

2. **Permission Denied**
   - Check file permissions on server
   - Ensure SSH user has write access to DEPLOY_PATH

3. **Build Failures**
   - Check Node.js/PHP versions match your development environment
   - Verify all dependencies are properly declared in package.json/composer.json

4. **Laravel Errors**
   - Check .env.production file configuration
   - Verify database credentials and connectivity
   - Check storage directory permissions

### Debug Commands

SSH into your server to debug:
```bash
cd /path/to/deployment/current
php artisan config:clear
php artisan cache:clear
tail -f storage/logs/laravel.log
```

## Security Considerations

- SSH private keys are encrypted in GitHub Secrets
- Production environment variables are not stored in the repository
- Database credentials are configured on the server only
- Debug mode is disabled in production

## Monitoring

Consider adding:
- Application monitoring (e.g., Sentry, Bugsnag)
- Uptime monitoring
- Performance monitoring
- Log aggregation

## Manual Deployment

If you need to deploy manually:
```bash
# Build locally
npm run build
composer install --no-dev --optimize-autoloader

# Create archive
tar -czf deployment.tar.gz --exclude-from=.deployignore .

# Upload and extract on server
scp deployment.tar.gz user@server:/path/to/deployment/
ssh user@server "cd /path/to/deployment && tar -xzf deployment.tar.gz"
```
