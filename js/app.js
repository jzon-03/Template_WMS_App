// Main Application JavaScript
class WMSApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPage('dashboard');
        this.initializeComponents();
    }

    bindEvents() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Modal backdrop
        const modalBackdrop = document.getElementById('modalBackdrop');
        modalBackdrop.addEventListener('click', () => this.closeAllModals());

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Responsive sidebar for mobile
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        // Store preference
        localStorage.setItem('sidebar-collapsed', this.sidebarCollapsed);
    }

    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update page title
        const titles = {
            dashboard: { title: 'Dashboard', subtitle: 'Overview of warehouse operations' },
            inventory: { title: 'Inventory Management', subtitle: 'Track and manage warehouse stock' },
            orders: { title: 'Orders Management', subtitle: 'Process and fulfill customer orders' },
            warehouse: { title: 'Warehouse Layout', subtitle: 'Visualize and optimize storage locations' },
            reports: { title: 'Reports & Analytics', subtitle: 'Insights and performance metrics' },
            users: { title: 'User Management', subtitle: 'Manage system users and permissions' },
            settings: { title: 'System Settings', subtitle: 'Configure warehouse management system' }
        };

        const pageInfo = titles[page];
        document.getElementById('pageTitle').textContent = pageInfo.title;
        document.getElementById('pageSubtitle').textContent = pageInfo.subtitle;

        // Load page content
        this.loadPage(page);
        this.currentPage = page;

        // Update URL without reload
        window.history.pushState({ page }, '', `#${page}`);
    }

    loadPage(page) {
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = '';
        contentContainer.className = 'content-container fade-in';

        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'inventory':
                this.loadInventory();
                break;
            case 'orders':
                this.loadOrders();
                break;
            case 'warehouse':
                this.loadWarehouse();
                break;
            case 'reports':
                this.loadReports();
                break;
            case 'users':
                this.loadUsers();
                break;
            case 'settings':
                this.loadSettings();
                break;
            default:
                this.loadDashboard();
        }
    }

    loadDashboard() {
        const content = `
            <div class="alerts-container">
                <div class="alert-item critical">
                    <i class="fas fa-exclamation-triangle alert-item-icon"></i>
                    <div class="alert-item-content">
                        <div class="alert-item-title">Low Stock Alert</div>
                        <div class="alert-item-desc">5 items are running low on stock</div>
                    </div>
                    <a href="#" class="alert-item-action">View Details</a>
                </div>
                <div class="alert-item warning">
                    <i class="fas fa-clock alert-item-icon"></i>
                    <div class="alert-item-content">
                        <div class="alert-item-title">Pending Orders</div>
                        <div class="alert-item-desc">12 orders are waiting for processing</div>
                    </div>
                    <a href="#" class="alert-item-action">Process Now</a>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Total Products</div>
                        <div class="stat-icon" style="background-color: var(--primary-light); color: var(--primary-color);">
                            <i class="fas fa-boxes"></i>
                        </div>
                    </div>
                    <div class="stat-value">2,847</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>12% vs last month</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Orders Today</div>
                        <div class="stat-icon" style="background-color: #d1fae5; color: var(--success-color);">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="stat-value">156</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>8% vs yesterday</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Revenue</div>
                        <div class="stat-icon" style="background-color: #fef3c7; color: var(--warning-color);">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                    <div class="stat-value">$48,392</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>15% vs last week</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Active Users</div>
                        <div class="stat-icon" style="background-color: #dbeafe; color: var(--info-color);">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="stat-value">23</div>
                    <div class="stat-change neutral">
                        <i class="fas fa-minus"></i>
                        <span>No change</span>
                    </div>
                </div>
            </div>

            <div class="quick-actions">
                <a href="#" class="quick-action" data-action="add-product">
                    <i class="fas fa-plus"></i>
                    <div class="quick-action-title">Add Product</div>
                    <div class="quick-action-desc">Add new item to inventory</div>
                </a>
                <a href="#" class="quick-action" data-action="create-order">
                    <i class="fas fa-shopping-cart"></i>
                    <div class="quick-action-title">Create Order</div>
                    <div class="quick-action-desc">Process new customer order</div>
                </a>
                <a href="#" class="quick-action" data-action="stock-adjustment">
                    <i class="fas fa-edit"></i>
                    <div class="quick-action-title">Stock Adjustment</div>
                    <div class="quick-action-desc">Adjust inventory levels</div>
                </a>
                <a href="#" class="quick-action" data-action="generate-report">
                    <i class="fas fa-chart-line"></i>
                    <div class="quick-action-title">Generate Report</div>
                    <div class="quick-action-desc">Create custom reports</div>
                </a>
            </div>

            <div class="dashboard-grid">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Inventory Status</div>
                        <div class="card-subtitle">Current stock levels by category</div>
                    </div>
                    <div class="card-body">
                        <div class="inventory-status">
                            <div class="status-item">
                                <div class="status-info">
                                    <div class="status-indicator high"></div>
                                    <div class="status-label">Electronics</div>
                                </div>
                                <div class="status-count">1,247</div>
                            </div>
                            <div class="status-item">
                                <div class="status-info">
                                    <div class="status-indicator medium"></div>
                                    <div class="status-label">Clothing</div>
                                </div>
                                <div class="status-count">856</div>
                            </div>
                            <div class="status-item">
                                <div class="status-info">
                                    <div class="status-indicator low"></div>
                                    <div class="status-label">Books</div>
                                </div>
                                <div class="status-count">167</div>
                            </div>
                            <div class="status-item">
                                <div class="status-info">
                                    <div class="status-indicator high"></div>
                                    <div class="status-label">Home & Garden</div>
                                </div>
                                <div class="status-count">577</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Order Pipeline</div>
                        <div class="card-subtitle">Current order processing status</div>
                    </div>
                    <div class="card-body">
                        <div class="order-pipeline">
                            <div class="pipeline-step completed">
                                <div class="pipeline-icon">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="pipeline-label">Received</div>
                                <div class="pipeline-count">45</div>
                            </div>
                            <div class="pipeline-step active">
                                <div class="pipeline-icon">
                                    <i class="fas fa-cog"></i>
                                </div>
                                <div class="pipeline-label">Processing</div>
                                <div class="pipeline-count">23</div>
                            </div>
                            <div class="pipeline-step">
                                <div class="pipeline-icon">
                                    <i class="fas fa-truck"></i>
                                </div>
                                <div class="pipeline-label">Shipped</div>
                                <div class="pipeline-count">12</div>
                            </div>
                            <div class="pipeline-step">
                                <div class="pipeline-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="pipeline-label">Delivered</div>
                                <div class="pipeline-count">156</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Recent Activity</div>
                        <div class="card-subtitle">Latest warehouse operations</div>
                    </div>
                    <div class="card-body">
                        <ul class="activity-list">
                            <li class="activity-item">
                                <div class="activity-icon success">
                                    <i class="fas fa-plus"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">New stock received</div>
                                    <div class="activity-desc">50 units of iPhone 14 Pro added to inventory</div>
                                </div>
                                <div class="activity-time">2 min ago</div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon info">
                                    <i class="fas fa-shipping-fast"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">Order shipped</div>
                                    <div class="activity-desc">Order #12345 shipped to customer</div>
                                </div>
                                <div class="activity-time">15 min ago</div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon warning">
                                    <i class="fas fa-exclamation"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">Low stock warning</div>
                                    <div class="activity-desc">Samsung Galaxy S23 stock below threshold</div>
                                </div>
                                <div class="activity-time">1 hour ago</div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon success">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">Order completed</div>
                                    <div class="activity-desc">Order #12340 successfully delivered</div>
                                </div>
                                <div class="activity-time">2 hours ago</div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-secondary btn-sm">View All Activity</a>
                    </div>
                </div>

                <div class="chart-container">
                    <div class="chart-header">
                        <div>
                            <div class="chart-title">Sales Overview</div>
                            <div class="chart-subtitle">Daily sales for the past 7 days</div>
                        </div>
                        <div class="chart-actions">
                            <button class="btn btn-secondary btn-sm">
                                <i class="fas fa-download"></i>
                                Export
                            </button>
                        </div>
                    </div>
                    <canvas id="salesChart" width="400" height="200"></canvas>
                </div>
            </div>
        `;
        
        document.getElementById('contentContainer').innerHTML = content;
        this.initializeDashboardCharts();
        this.bindQuickActionEvents();
    }

    initializeDashboardCharts() {
        // Sales Chart
        const ctx = document.getElementById('salesChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Sales',
                        data: [12000, 15000, 18000, 14000, 22000, 25000, 19000],
                        borderColor: 'rgb(37, 99, 235)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }

    bindQuickActionEvents() {
        document.querySelectorAll('.quick-action').forEach(action => {
            action.addEventListener('click', (e) => {
                e.preventDefault();
                const actionType = action.getAttribute('data-action');
                this.handleQuickAction(actionType);
            });
        });
    }

    handleQuickAction(actionType) {
        // Placeholder for quick action handlers
        console.log(`Quick action triggered: ${actionType}`);
        
        // Show a simple notification for demo purposes
        this.showNotification(`${actionType.replace('-', ' ')} action triggered`, 'success');
    }

    initializeComponents() {
        // Load sidebar state
        const sidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (sidebarCollapsed) {
            document.getElementById('sidebar').classList.add('collapsed');
            this.sidebarCollapsed = true;
        }

        // Initialize dropdowns
        this.initializeDropdowns();

        // Initialize tooltips
        this.initializeTooltips();
    }

    initializeDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            if (toggle && menu) {
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', () => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    initializeTooltips() {
        // Simple tooltip implementation
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                // Tooltip functionality would go here
            });
        });
    }

    handleSearch(query) {
        // Placeholder for search functionality
        console.log(`Searching for: ${query}`);
    }

    handleResize() {
        const width = window.innerWidth;
        const sidebar = document.getElementById('sidebar');
        
        if (width < 768) {
            // Mobile view - hide sidebar by default
            if (!sidebar.classList.contains('collapsed')) {
                this.toggleSidebar();
            }
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-input').focus();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }

    closeAllModals() {
        const backdrop = document.getElementById('modalBackdrop');
        backdrop.classList.remove('active');
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Placeholder methods for other pages
    loadInventory() {
        // Will be implemented in inventory.js
        if (window.InventoryModule) {
            window.InventoryModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Inventory Module Loading...</h2></div>';
        }
    }

    loadOrders() {
        // Will be implemented in orders.js
        if (window.OrdersModule) {
            window.OrdersModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Orders Module Loading...</h2></div>';
        }
    }

    loadWarehouse() {
        // Will be implemented in warehouse.js
        if (window.WarehouseModule) {
            window.WarehouseModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Warehouse Module Loading...</h2></div>';
        }
    }

    loadReports() {
        // Will be implemented in reports.js
        if (window.ReportsModule) {
            window.ReportsModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Reports Module Loading...</h2></div>';
        }
    }

    loadUsers() {
        // Will be implemented in users.js
        if (window.UsersModule) {
            window.UsersModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Users Module Loading...</h2></div>';
        }
    }

    loadSettings() {
        // Will be implemented in settings.js
        if (window.SettingsModule) {
            window.SettingsModule.load();
        } else {
            document.getElementById('contentContainer').innerHTML = '<div class="text-center"><h2>Settings Module Loading...</h2></div>';
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WMSApp();
});

// Handle browser navigation
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        window.app.navigateToPage(e.state.page);
    }
});