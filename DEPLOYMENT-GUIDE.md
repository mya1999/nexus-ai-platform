# 🚀 Production Deployment Guide - NexusAI Platform

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup

Create a `.env.local` file (or configure in your hosting platform):

```bash
# Required API Keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
GOOGLE_API_KEY=AIzaSyxxxxxxxxxxxxxx

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NODE_ENV=production

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Security
JWT_SECRET=your-secret-key-here
ENCRYPTION_KEY=your-encryption-key

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

---

### Option 2: Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Strict-Transport-Security = "max-age=63072000"
```

---

### Option 3: AWS Amplify

1. **Connect Repository**:
   - Go to AWS Amplify Console
   - Connect your GitHub/GitLab repository

2. **Build Settings**:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### Option 4: Docker Deployment

**Dockerfile**:
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Deploy**:
```bash
docker build -t nexusai .
docker run -p 3000:3000 --env-file .env.local nexusai
```

---

## 🔒 Security Configuration

### SSL Certificate
- **Vercel/Netlify**: Automatic HTTPS
- **Custom Domain**: Use Let's Encrypt or Cloudflare

### Security Headers (Already Configured)
✅ Strict-Transport-Security
✅ X-Frame-Options
✅ X-Content-Type-Options
✅ Content-Security-Policy
✅ X-XSS-Protection

### Rate Limiting
- Configured: 100 requests per 15 minutes
- Customizable via environment variables

---

## 📊 Monitoring & Analytics

### 1. Google Analytics
Add your GA ID to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. Vercel Analytics
Enable in Vercel dashboard (free tier available)

### 3. Error Tracking
- Integrate Sentry (optional):
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## 🎯 Performance Optimization

### CDN Configuration
- **Vercel**: Automatic global CDN
- **Cloudflare**: Add as reverse proxy for any hosting

### Caching Strategy
```javascript
// Already configured in next.config.js
- Static assets: 1 year cache
- Images: 60s minimum TTL
- API responses: No cache (dynamic)
```

### Image Optimization
```javascript
// Automatically optimized with:
- AVIF format (next-gen)
- WebP fallback
- Responsive sizes
- Lazy loading
```

---

## 🌍 Domain Configuration

### Custom Domain Setup

#### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Cloudflare:
1. Add site to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3
   - 0-RTT Connection Resumption

---

## 🔍 SEO Configuration

### Google Search Console
1. Verify ownership
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Request indexing

### Structured Data
Already implemented:
- Organization
- WebApplication
- BreadcrumbList

### Meta Tags
All pages have:
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Alternate language URLs

---

## 📱 PWA Installation

Users can install the app:
- **Chrome**: Click "Install" icon in address bar
- **Safari**: Add to Home Screen
- **Edge**: Click "Install app" in menu

---

## 🧪 Testing Before Production

### 1. Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

### 2. Security Headers Test
```bash
curl -I https://yourdomain.com
```

### 3. Mobile Testing
- Chrome DevTools (Mobile view)
- BrowserStack
- Real devices

---

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Errors
- Check environment variables
- Verify API keys are valid
- Check rate limits

### Performance Issues
- Enable CDN
- Optimize images
- Check bundle size: `npm run build -- --profile`

---

## 📈 Post-Deployment

### 1. Monitor Analytics
- Track page views
- Monitor error rates
- Analyze user behavior

### 2. Regular Updates
```bash
# Update dependencies monthly
npm update
npm audit fix
```

### 3. Backup Database (if applicable)
- Set up automated backups
- Test restore procedures

---

## 🎉 Success Metrics

After deployment, you should see:
- ✅ Lighthouse Score: 95+
- ✅ Page Load Time: <2s
- ✅ First Contentful Paint: <1.5s
- ✅ Time to Interactive: <2.5s
- ✅ Security Headers: All passing

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Repository URL]
- Documentation: [Docs URL]
- Email: support@nexusai.dev

---

**Last Updated**: November 3, 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
