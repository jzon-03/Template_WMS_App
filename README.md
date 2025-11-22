# Custom WMS - Warehouse Management System

A modern, full-featured warehouse management system built with HTML5, CSS3, and vanilla JavaScript. Designed for efficiency, usability, and scalability.

![Custom WMS Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Custom+WMS+Dashboard)

## Features

### 📊 Dashboard
- Real-time analytics and KPI tracking
- Interactive charts powered by Chart.js
- Quick action shortcuts
- System alerts and notifications
- Recent activity feed

### 📦 Inventory Management
- Complete product catalog management
- Real-time stock tracking
- Batch operations (bulk edit, delete, export)
- Advanced filtering and sorting
- Barcode scanning support
- Low stock alerts
- Product image management

### 🛒 Order Management
- Full order lifecycle management
- Kanban-style order board
- Order status tracking
- Customer management
- Shipping integration
- Order analytics and reporting

### 🏭 Warehouse Layout
- Interactive warehouse visualization
- Zone-based organization
- Heat maps for activity tracking
- Space utilization analytics
- Location management

### 👥 User Management
- Role-based access control (Admin, Manager, Supervisor, Operator, Viewer)
- User administration panel
- Permission management
- User activity tracking
- Bulk user operations

### ⚙️ Settings & Configuration
- System-wide configuration options
- Notification preferences
- Security settings
- Integration management
- Backup and restore functionality
- Data export capabilities

## Technology Stack

### Frontend
- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Modern styling with Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Modular architecture with vanilla JS
- **Chart.js** - Interactive charts and data visualization
- **Font Awesome** - Comprehensive icon library
- **Inter Font** - Modern, readable typography

### Architecture
- **Modular Design** - Component-based architecture
- **Responsive Layout** - Mobile-first design approach
- **Progressive Enhancement** - Works on all modern browsers
- **Accessibility** - WCAG 2.1 compliant
- **Performance Optimized** - Fast loading and smooth interactions

## Project Structure

```
Custom WMS/
├── index.html              # Main application entry point
├── css/
│   ├── styles.css          # Core styles and design system
│   ├── components.css      # Reusable UI components
│   ├── dashboard.css       # Dashboard-specific styles
│   ├── settings.css        # Settings module styles
│   ├── animations.css      # Modern animations and interactions
│   └── responsive.css      # Mobile responsiveness
├── js/
│   ├── app.js             # Main application controller
│   ├── inventory.js       # Inventory management module
│   ├── orders.js          # Order management module
│   ├── warehouse.js       # Warehouse layout module
│   ├── users.js           # User management module
│   └── settings.js        # Settings configuration module
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- Local web server (optional, for development)

### Installation

1. **Clone or download** the project files to your local machine

2. **Open the project** in your preferred code editor

3. **Launch the application** by opening `index.html` in your web browser
   
   Or serve it locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the application** at `http://localhost:8000` (if using local server)

### Default Login
- **Username**: admin
- **Password**: admin123
- **Role**: Administrator

## User Roles & Permissions

| Role       | Dashboard | Inventory | Orders | Warehouse | Users | Settings |
|------------|-----------|-----------|--------|-----------|-------|----------|
| Admin      | ✅ Full   | ✅ Full   | ✅ Full| ✅ Full   | ✅ Full| ✅ Full  |
| Manager    | ✅ Full   | ✅ Full   | ✅ Full| ✅ View   | ✅ View| ✅ View  |
| Supervisor | ✅ View   | ✅ Edit   | ✅ Edit| ✅ View   | ❌     | ❌       |
| Operator   | ✅ View   | ✅ View   | ✅ View| ✅ View   | ❌     | ❌       |
| Viewer     | ✅ View   | ✅ View   | ✅ View| ✅ View   | ❌     | ❌       |

## Core Modules

### Dashboard Module (`js/app.js`)
- System overview and KPI display
- Real-time charts and metrics
- Quick access to common tasks
- Alert notifications

### Inventory Module (`js/inventory.js`)
- Product catalog management
- Stock level tracking
- Inventory adjustments
- Reporting and analytics

### Orders Module (`js/orders.js`)
- Order creation and management
- Status tracking and updates
- Customer management
- Shipping coordination

### Warehouse Module (`js/warehouse.js`)
- Layout visualization
- Zone management
- Space optimization
- Activity tracking

### User Module (`js/users.js`)
- User account management
- Role assignment
- Access control
- Activity monitoring

### Settings Module (`js/settings.js`)
- System configuration
- User preferences
- Integration management
- Backup utilities

## Customization

### Themes
The system supports light and dark themes with CSS custom properties:

```css
:root {
    --color-primary: #3B82F6;
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-danger: #EF4444;
    /* ... more variables */
}
```

### Adding New Modules
1. Create a new JavaScript file in the `js/` directory
2. Follow the existing module pattern
3. Add navigation link in `index.html`
4. Update the router in `js/app.js`

### Integration APIs
The system is designed to integrate with:
- ERP systems
- E-commerce platforms
- Shipping carriers
- Payment gateways
- Barcode scanners

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 88+     | ✅ Full Support |
| Firefox | 85+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 88+     | ✅ Full Support |

## Performance Features

- **Lazy Loading** - Modules load on demand
- **Optimized Animations** - Hardware-accelerated transitions
- **Responsive Images** - Adaptive image loading
- **Caching Strategy** - Local storage optimization
- **Minimal Dependencies** - Vanilla JS for better performance

## Security Features

- **Role-Based Access Control** - Granular permissions
- **Session Management** - Automatic timeout and security
- **Data Validation** - Client-side input sanitization
- **Audit Logging** - User activity tracking
- **Secure Storage** - Encrypted local data

## Accessibility

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Compatible** - Proper ARIA labels
- **High Contrast Support** - Accessible color schemes
- **Focus Management** - Clear focus indicators

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Roadmap

### Phase 1 (Current)
- ✅ Core WMS functionality
- ✅ Modern UI/UX design
- ✅ Responsive layout
- ✅ User management

### Phase 2 (Future)
- [ ] PWA capabilities
- [ ] Offline functionality
- [ ] Real-time notifications
- [ ] Advanced analytics

### Phase 3 (Extended)
- [ ] Mobile app companion
- [ ] API integration
- [ ] Multi-warehouse support
- [ ] Advanced reporting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@customwms.com or join our [Discord community](https://discord.gg/customwms).

## Acknowledgments

- **Chart.js** - For beautiful charts and graphs
- **Font Awesome** - For comprehensive iconography
- **Inter Font** - For modern typography
- **CSS Grid** - For powerful layout capabilities

---

**Custom WMS** - Streamlining warehouse operations with modern technology.

Built with ❤️ by the Custom WMS Team