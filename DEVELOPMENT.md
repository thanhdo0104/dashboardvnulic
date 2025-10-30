# Development Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Development Mode (Default)
The application runs in development mode by default, which means:
- ✅ Uses mock data (no backend required)
- ✅ Shows debug information
- ✅ Enables detailed error logging
- ❌ Disables real-time API calls

### Production Mode
To run in production mode:
1. Set environment variables:
   ```bash
   # Create .env file
   REACT_APP_USE_MOCK_DATA=false
   REACT_APP_API_BASE_URL=http://your-api-server.com/api
   REACT_APP_ENABLE_LOGGING=false
   ```

2. Build and start:
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```

## 🛠️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_USE_MOCK_DATA` | `true` | Use mock data instead of API calls |
| `REACT_APP_API_BASE_URL` | `http://localhost:3001/api` | Backend API URL |
| `REACT_APP_WS_URL` | `ws://localhost:3001` | WebSocket URL for real-time updates |
| `REACT_APP_ENABLE_LOGGING` | `true` | Enable console logging |

## 🔄 Switching Between Modes

### Using Mock Data (Development)
```bash
# No additional setup needed - works out of the box
npm start
```

### Using Real API (Production)
1. Create `.env` file:
   ```env
   REACT_APP_USE_MOCK_DATA=false
   REACT_APP_API_BASE_URL=http://your-backend.com/api
   ```

2. Start the application:
   ```bash
   npm start
   ```

## 📊 Mock Data

The application includes comprehensive mock data for:
- **9 KPI Metrics**: MRR, Active Accounts, New Accounts, CAC, CLTV, etc.
- **3 Chart Types**: CAC & CLTV, MRR Growth, MRR Percentage
- **Realistic Values**: Based on typical SaaS metrics

## 🐛 Troubleshooting

### Network Error
If you see "Network Error":
- ✅ **This is normal** in development mode
- The app automatically falls back to mock data
- No backend server is required

### API Connection Issues
If you want to connect to a real API:
1. Set `REACT_APP_USE_MOCK_DATA=false` in `.env`
2. Ensure your backend server is running
3. Update `REACT_APP_API_BASE_URL` to point to your server

### Chart Not Loading
- Check browser console for errors
- Ensure Chart.js dependencies are installed
- Verify data format matches expected structure

## 🔌 Backend Integration

### Required API Endpoints
```
GET /api/dashboard?month=March&year=2024
GET /api/metrics?month=March&year=2024
GET /api/charts/cac-cltv?month=March&year=2024
GET /api/charts/mrr-growth?month=March&year=2024
GET /api/charts/mrr-percentage?month=March&year=2024
```

### Expected Response Format
```json
{
  "metrics": [
    {
      "id": 1,
      "title": "Monthly Recurring Revenue (MRR)",
      "value": "$293,000",
      "icon": "fas fa-dollar-sign",
      "color": "purple-dark",
      "trend": "+12.5%"
    }
  ],
  "charts": {
    "cacCltv": {
      "labels": ["Jan", "Feb", "Mar"],
      "cacData": [18.50, 19.20, 19.80],
      "cltvData": [2100, 2150, 2200]
    }
  }
}
```

## 🎨 Customization

### Colors and Themes
Update colors in `src/App.css`:
```css
:root {
  --primary-color: #e91e63;
  --secondary-color: #9c27b0;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --error-color: #c62828;
}
```

### Chart Configuration
Modify chart options in:
- `src/components/CACCLTVChart.js`
- `src/components/MRRGrowthChart.js`
- `src/components/MRRPercentageChart.js`

## 📱 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 📝 Development Tips

1. **Hot Reload**: Changes are automatically reflected in the browser
2. **Error Overlay**: React shows helpful error messages during development
3. **Debug Info**: Check the bottom-right corner for current mode information
4. **Console Logs**: Detailed logging is enabled in development mode
5. **Mock Data**: All data is realistic and representative of real SaaS metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Happy coding! 🎉

