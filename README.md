# VNU LIC Dashboard - React Application

A modern, responsive SaaS dashboard built with React, featuring real-time metrics, interactive charts, and seamless backend integration.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Data**: Live updates every 30 seconds
- **Interactive Charts**: CAC & CLTV, MRR Growth, and percentage charts
- **Date Filtering**: Month and year selection
- **Backend Ready**: Easy API integration with Axios and React Query
- **Responsive Design**: Works on all devices
- **TypeScript Support**: Optional TypeScript configuration

## 📦 Tech Stack

- **Frontend**: React 18, React Router, Styled Components
- **Charts**: Chart.js with React Chart.js 2
- **State Management**: React Query for server state
- **HTTP Client**: Axios
- **Date Handling**: React DatePicker, date-fns
- **Icons**: React Icons (Font Awesome)
- **Build Tool**: Create React App

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

### Backend Integration

The dashboard is designed to work with a REST API. Update the API endpoints in `src/services/dashboardService.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
```

## 📊 API Endpoints

The dashboard expects the following API endpoints:

### Dashboard Data
- `GET /api/dashboard` - Get complete dashboard data
- `GET /api/metrics` - Get metrics data
- `GET /api/charts/cac-cltv` - Get CAC & CLTV chart data
- `GET /api/charts/mrr-growth` - Get MRR growth chart data
- `GET /api/charts/mrr-percentage` - Get MRR percentage data

### Real-time Updates
- `GET /api/dashboard/realtime` - Get real-time updates

### Data Management
- `PUT /api/metrics/:id` - Update metric value
- `GET /api/dashboard/export` - Export dashboard data

## 🎨 Customization

### Colors and Themes

Update the color scheme in `src/App.css`:

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

Modify chart options in individual chart components:
- `src/components/CACCLTVChart.js`
- `src/components/MRRGrowthChart.js`
- `src/components/MRRPercentageChart.js`

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔄 Real-time Updates

The dashboard automatically updates every 30 seconds. To modify the update interval:

```javascript
// In src/hooks/useDashboard.js
refetchInterval: 30000, // Change to desired milliseconds
```

## 📈 Performance Optimization

- **React Query**: Efficient data caching and background updates
- **Code Splitting**: Lazy loading for better performance
- **Memoization**: Optimized re-renders
- **Image Optimization**: Compressed assets

## 🧪 Testing

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

## 🔐 Authentication

The dashboard includes authentication support:

```javascript
// Add auth token to requests
const token = localStorage.getItem('authToken');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## 📝 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with basic dashboard functionality
- **v1.1.0** - Added real-time updates and improved charts
- **v1.2.0** - Enhanced responsive design and performance

---

Built with ❤️ using React and modern web technologies.
