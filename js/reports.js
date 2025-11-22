// Reports Module
window.ReportsModule = {
    currentReport: 'overview',
    dateRange: 'last30days',

    load() {
        this.render();
        this.bindEvents();
        this.loadReportData();
    },

    render() {
        const content = `
            <div class="reports-container">
                <div class="reports-header">
                    <div class="reports-header-left">
                        <h1 class="reports-title">Reports & Analytics</h1>
                        <p class="reports-subtitle">Comprehensive warehouse performance insights</p>
                    </div>
                    <div class="reports-header-right">
                        <div class="date-range-selector">
                            <select class="form-select" id="dateRangeSelect">
                                <option value="today">Today</option>
                                <option value="last7days">Last 7 Days</option>
                                <option value="last30days" selected>Last 30 Days</option>
                                <option value="last90days">Last 90 Days</option>
                                <option value="lastyear">Last Year</option>
                                <option value="custom">Custom Range</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="exportReportBtn">
                            <i class="fas fa-download"></i>
                            Export Report
                        </button>
                    </div>
                </div>

                <div class="reports-nav">
                    <div class="reports-tabs">
                        <button class="reports-tab active" data-report="overview">
                            <i class="fas fa-chart-line"></i>
                            Overview
                        </button>
                        <button class="reports-tab" data-report="inventory">
                            <i class="fas fa-boxes"></i>
                            Inventory
                        </button>
                        <button class="reports-tab" data-report="orders">
                            <i class="fas fa-shopping-cart"></i>
                            Orders
                        </button>
                        <button class="reports-tab" data-report="performance">
                            <i class="fas fa-tachometer-alt"></i>
                            Performance
                        </button>
                        <button class="reports-tab" data-report="financial">
                            <i class="fas fa-dollar-sign"></i>
                            Financial
                        </button>
                        <button class="reports-tab" data-report="compliance">
                            <i class="fas fa-shield-alt"></i>
                            Compliance
                        </button>
                    </div>
                </div>

                <div class="reports-content" id="reportsContent">
                    <!-- Report content will be loaded here -->
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.reports-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const report = e.currentTarget.getAttribute('data-report');
                this.switchReport(report);
            });
        });

        // Date range selector
        document.getElementById('dateRangeSelect').addEventListener('change', (e) => {
            this.dateRange = e.target.value;
            this.loadReportData();
        });

        // Export button
        document.getElementById('exportReportBtn').addEventListener('click', () => {
            this.exportReport();
        });
    },

    switchReport(reportType) {
        // Update active tab
        document.querySelectorAll('.reports-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-report="${reportType}"]`).classList.add('active');

        this.currentReport = reportType;
        this.loadReportData();
    },

    loadReportData() {
        const reportsContent = document.getElementById('reportsContent');
        
        switch(this.currentReport) {
            case 'overview':
                reportsContent.innerHTML = this.renderOverviewReport();
                break;
            case 'inventory':
                reportsContent.innerHTML = this.renderInventoryReport();
                break;
            case 'orders':
                reportsContent.innerHTML = this.renderOrdersReport();
                break;
            case 'performance':
                reportsContent.innerHTML = this.renderPerformanceReport();
                break;
            case 'financial':
                reportsContent.innerHTML = this.renderFinancialReport();
                break;
            case 'compliance':
                reportsContent.innerHTML = this.renderComplianceReport();
                break;
        }

        // Initialize charts after content is rendered
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    },

    renderOverviewReport() {
        return `
            <div class="report-section">
                <div class="report-metrics">
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">1,247</div>
                            <div class="metric-label">Total Products</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +5.2%
                            </div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">342</div>
                            <div class="metric-label">Orders Processed</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +12.8%
                            </div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">$89,432</div>
                            <div class="metric-label">Revenue</div>
                            <div class="metric-change positive">
                                <i class="fas fa-arrow-up"></i> +8.7%
                            </div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">2.4h</div>
                            <div class="metric-label">Avg. Processing Time</div>
                            <div class="metric-change negative">
                                <i class="fas fa-arrow-down"></i> -15.3%
                            </div>
                        </div>
                    </div>
                </div>

                <div class="report-charts">
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Order Volume Trend</h3>
                            <canvas id="orderVolumeChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Revenue Growth</h3>
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Top Products by Sales</h3>
                            <canvas id="topProductsChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Order Status Distribution</h3>
                            <canvas id="orderStatusChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderInventoryReport() {
        return `
            <div class="report-section">
                <div class="inventory-summary">
                    <div class="summary-card">
                        <h3>Inventory Health</h3>
                        <div class="health-metrics">
                            <div class="health-item">
                                <span class="health-label">Stock Value:</span>
                                <span class="health-value">$234,567</span>
                            </div>
                            <div class="health-item">
                                <span class="health-label">Turn Rate:</span>
                                <span class="health-value">4.2x</span>
                            </div>
                            <div class="health-item">
                                <span class="health-label">Accuracy:</span>
                                <span class="health-value">98.7%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="summary-card">
                        <h3>Stock Alerts</h3>
                        <div class="alert-metrics">
                            <div class="alert-item critical">
                                <span class="alert-count">12</span>
                                <span class="alert-label">Out of Stock</span>
                            </div>
                            <div class="alert-item warning">
                                <span class="alert-count">28</span>
                                <span class="alert-label">Low Stock</span>
                            </div>
                            <div class="alert-item info">
                                <span class="alert-count">5</span>
                                <span class="alert-label">Overstock</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="report-charts">
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Inventory Movement</h3>
                            <canvas id="inventoryMovementChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Category Distribution</h3>
                            <canvas id="categoryChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="detailed-table">
                    <h3>Top Moving Products</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Current Stock</th>
                                <th>Units Moved</th>
                                <th>Turn Rate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wireless Mouse</td>
                                <td>Electronics</td>
                                <td>45</td>
                                <td>234</td>
                                <td>5.2x</td>
                                <td><span class="badge badge-success">Healthy</span></td>
                            </tr>
                            <tr>
                                <td>Office Chair</td>
                                <td>Furniture</td>
                                <td>12</td>
                                <td>89</td>
                                <td>7.4x</td>
                                <td><span class="badge badge-warning">Low Stock</span></td>
                            </tr>
                            <tr>
                                <td>Laptop Stand</td>
                                <td>Accessories</td>
                                <td>78</td>
                                <td>156</td>
                                <td>2.0x</td>
                                <td><span class="badge badge-success">Healthy</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderOrdersReport() {
        return `
            <div class="report-section">
                <div class="order-summary">
                    <div class="summary-grid">
                        <div class="summary-item">
                            <div class="summary-label">Total Orders</div>
                            <div class="summary-value">1,247</div>
                            <div class="summary-change positive">+12.5%</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Avg Order Value</div>
                            <div class="summary-value">$156.78</div>
                            <div class="summary-change positive">+5.2%</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Fulfillment Rate</div>
                            <div class="summary-value">94.7%</div>
                            <div class="summary-change negative">-1.3%</div>
                        </div>
                        <div class="summary-item">
                            <div class="summary-label">Return Rate</div>
                            <div class="summary-value">2.8%</div>
                            <div class="summary-change positive">-0.5%</div>
                        </div>
                    </div>
                </div>

                <div class="report-charts">
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Order Fulfillment Timeline</h3>
                            <canvas id="fulfillmentChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Order Value Distribution</h3>
                            <canvas id="orderValueChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="performance-metrics">
                    <h3>Performance Metrics</h3>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <div class="metric-title">Pick Accuracy</div>
                            <div class="metric-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 96%"></div>
                                </div>
                                <span class="progress-text">96%</span>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-title">On-time Shipping</div>
                            <div class="metric-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 89%"></div>
                                </div>
                                <span class="progress-text">89%</span>
                            </div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-title">Customer Satisfaction</div>
                            <div class="metric-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 92%"></div>
                                </div>
                                <span class="progress-text">92%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderPerformanceReport() {
        return `
            <div class="report-section">
                <div class="performance-overview">
                    <h3>Warehouse Performance Overview</h3>
                    <div class="kpi-grid">
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <i class="fas fa-shipping-fast"></i>
                                <span>Throughput</span>
                            </div>
                            <div class="kpi-value">1,247</div>
                            <div class="kpi-unit">orders/day</div>
                            <div class="kpi-trend positive">↑ 15%</div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <i class="fas fa-clock"></i>
                                <span>Cycle Time</span>
                            </div>
                            <div class="kpi-value">2.4</div>
                            <div class="kpi-unit">hours</div>
                            <div class="kpi-trend negative">↓ 8%</div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <i class="fas fa-users"></i>
                                <span>Productivity</span>
                            </div>
                            <div class="kpi-value">87</div>
                            <div class="kpi-unit">picks/hour</div>
                            <div class="kpi-trend positive">↑ 12%</div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <i class="fas fa-percentage"></i>
                                <span>Utilization</span>
                            </div>
                            <div class="kpi-value">78%</div>
                            <div class="kpi-unit">capacity</div>
                            <div class="kpi-trend positive">↑ 5%</div>
                        </div>
                    </div>
                </div>

                <div class="report-charts">
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Daily Throughput</h3>
                            <canvas id="throughputChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Resource Utilization</h3>
                            <canvas id="utilizationChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="benchmarking">
                    <h3>Industry Benchmarking</h3>
                    <div class="benchmark-grid">
                        <div class="benchmark-item">
                            <div class="benchmark-metric">Pick Rate</div>
                            <div class="benchmark-comparison">
                                <div class="benchmark-bar">
                                    <div class="benchmark-you" style="width: 87%">Your WMS: 87/hr</div>
                                    <div class="benchmark-industry" style="left: 65%">Industry: 65/hr</div>
                                </div>
                            </div>
                        </div>
                        <div class="benchmark-item">
                            <div class="benchmark-metric">Order Accuracy</div>
                            <div class="benchmark-comparison">
                                <div class="benchmark-bar">
                                    <div class="benchmark-you" style="width: 96%">Your WMS: 96%</div>
                                    <div class="benchmark-industry" style="left: 92%">Industry: 92%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderFinancialReport() {
        return `
            <div class="report-section">
                <div class="financial-summary">
                    <div class="summary-cards">
                        <div class="finance-card">
                            <div class="finance-header">
                                <h4>Total Revenue</h4>
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="finance-amount">$245,678</div>
                            <div class="finance-change positive">+12.5% vs last month</div>
                        </div>
                        <div class="finance-card">
                            <div class="finance-header">
                                <h4>Operating Costs</h4>
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="finance-amount">$58,432</div>
                            <div class="finance-change negative">+3.2% vs last month</div>
                        </div>
                        <div class="finance-card">
                            <div class="finance-header">
                                <h4>Gross Profit</h4>
                                <i class="fas fa-hand-holding-usd"></i>
                            </div>
                            <div class="finance-amount">$187,246</div>
                            <div class="finance-change positive">+15.8% vs last month</div>
                        </div>
                        <div class="finance-card">
                            <div class="finance-header">
                                <h4>Profit Margin</h4>
                                <i class="fas fa-percentage"></i>
                            </div>
                            <div class="finance-amount">76.2%</div>
                            <div class="finance-change positive">+2.1% vs last month</div>
                        </div>
                    </div>
                </div>

                <div class="report-charts">
                    <div class="chart-row">
                        <div class="chart-container">
                            <h3>Revenue vs Costs</h3>
                            <canvas id="revenueCostChart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Cost Breakdown</h3>
                            <canvas id="costBreakdownChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="cost-analysis">
                    <h3>Cost Analysis</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Current Month</th>
                                <th>Previous Month</th>
                                <th>Change</th>
                                <th>% of Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Labor Costs</td>
                                <td>$28,450</td>
                                <td>$27,200</td>
                                <td class="negative">+4.6%</td>
                                <td>48.7%</td>
                            </tr>
                            <tr>
                                <td>Equipment</td>
                                <td>$12,300</td>
                                <td>$12,800</td>
                                <td class="positive">-3.9%</td>
                                <td>21.1%</td>
                            </tr>
                            <tr>
                                <td>Utilities</td>
                                <td>$8,750</td>
                                <td>$8,950</td>
                                <td class="positive">-2.2%</td>
                                <td>15.0%</td>
                            </tr>
                            <tr>
                                <td>Maintenance</td>
                                <td>$5,680</td>
                                <td>$5,200</td>
                                <td class="negative">+9.2%</td>
                                <td>9.7%</td>
                            </tr>
                            <tr>
                                <td>Other</td>
                                <td>$3,252</td>
                                <td>$3,180</td>
                                <td class="negative">+2.3%</td>
                                <td>5.6%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderComplianceReport() {
        return `
            <div class="report-section">
                <div class="compliance-overview">
                    <div class="compliance-score">
                        <div class="score-circle">
                            <div class="score-value">94%</div>
                            <div class="score-label">Overall Compliance Score</div>
                        </div>
                        <div class="score-breakdown">
                            <div class="score-item">
                                <span class="score-category">Safety</span>
                                <span class="score-percentage">98%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-category">Quality</span>
                                <span class="score-percentage">96%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-category">Documentation</span>
                                <span class="score-percentage">89%</span>
                            </div>
                            <div class="score-item">
                                <span class="score-category">Environmental</span>
                                <span class="score-percentage">92%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="compliance-alerts">
                    <h3>Compliance Alerts</h3>
                    <div class="alerts-grid">
                        <div class="alert-card warning">
                            <div class="alert-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="alert-content">
                                <div class="alert-title">Safety Inspection Due</div>
                                <div class="alert-description">Annual safety inspection required within 15 days</div>
                                <div class="alert-date">Due: Dec 7, 2025</div>
                            </div>
                        </div>
                        <div class="alert-card info">
                            <div class="alert-icon">
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="alert-content">
                                <div class="alert-title">Documentation Update</div>
                                <div class="alert-description">SOP documents need quarterly review</div>
                                <div class="alert-date">Due: Jan 15, 2026</div>
                            </div>
                        </div>
                        <div class="alert-card success">
                            <div class="alert-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="alert-content">
                                <div class="alert-title">Quality Audit Passed</div>
                                <div class="alert-description">Recent quality audit completed successfully</div>
                                <div class="alert-date">Completed: Nov 18, 2025</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="audit-trail">
                    <h3>Recent Audit Activities</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Auditor</th>
                                <th>Area</th>
                                <th>Result</th>
                                <th>Action Required</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nov 18, 2025</td>
                                <td>Quality</td>
                                <td>J. Smith</td>
                                <td>Receiving</td>
                                <td><span class="badge badge-success">Pass</span></td>
                                <td>None</td>
                            </tr>
                            <tr>
                                <td>Nov 15, 2025</td>
                                <td>Safety</td>
                                <td>M. Johnson</td>
                                <td>Warehouse Floor</td>
                                <td><span class="badge badge-warning">Minor Issues</span></td>
                                <td>Update signage</td>
                            </tr>
                            <tr>
                                <td>Nov 10, 2025</td>
                                <td>Environmental</td>
                                <td>K. Davis</td>
                                <td>Waste Management</td>
                                <td><span class="badge badge-success">Pass</span></td>
                                <td>None</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    initializeCharts() {
        // Initialize different charts based on current report
        switch(this.currentReport) {
            case 'overview':
                this.initializeOverviewCharts();
                break;
            case 'inventory':
                this.initializeInventoryCharts();
                break;
            case 'orders':
                this.initializeOrderCharts();
                break;
            case 'performance':
                this.initializePerformanceCharts();
                break;
            case 'financial':
                this.initializeFinancialCharts();
                break;
        }
    },

    initializeOverviewCharts() {
        // Order Volume Chart
        const orderVolumeCtx = document.getElementById('orderVolumeChart');
        if (orderVolumeCtx) {
            new Chart(orderVolumeCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Orders',
                        data: [65, 78, 90, 85],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Revenue',
                        data: [15000, 22000, 28000, 24000],
                        backgroundColor: 'rgba(16, 185, 129, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Top Products Chart
        const topProductsCtx = document.getElementById('topProductsChart');
        if (topProductsCtx) {
            new Chart(topProductsCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Wireless Mouse', 'Office Chair', 'Laptop Stand', 'Desk Lamp', 'Others'],
                    datasets: [{
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(245, 158, 11)',
                            'rgb(239, 68, 68)',
                            'rgb(156, 163, 175)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Order Status Chart
        const orderStatusCtx = document.getElementById('orderStatusChart');
        if (orderStatusCtx) {
            new Chart(orderStatusCtx, {
                type: 'pie',
                data: {
                    labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
                    datasets: [{
                        data: [65, 20, 12, 3],
                        backgroundColor: [
                            'rgb(16, 185, 129)',
                            'rgb(59, 130, 246)',
                            'rgb(245, 158, 11)',
                            'rgb(239, 68, 68)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    },

    initializeInventoryCharts() {
        // Inventory Movement Chart
        const movementCtx = document.getElementById('inventoryMovementChart');
        if (movementCtx) {
            new Chart(movementCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Stock In',
                        data: [150, 180, 165, 195, 220, 210],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }, {
                        label: 'Stock Out',
                        data: [120, 140, 155, 170, 180, 190],
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Category Distribution Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            new Chart(categoryCtx, {
                type: 'polarArea',
                data: {
                    labels: ['Electronics', 'Furniture', 'Accessories', 'Supplies', 'Tools'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.7)',
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(239, 68, 68, 0.7)',
                            'rgba(156, 163, 175, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    },

    initializeOrderCharts() {
        // Fulfillment Chart
        const fulfillmentCtx = document.getElementById('fulfillmentChart');
        if (fulfillmentCtx) {
            new Chart(fulfillmentCtx, {
                type: 'line',
                data: {
                    labels: ['0-2h', '2-4h', '4-8h', '8-24h', '24h+'],
                    datasets: [{
                        label: 'Orders',
                        data: [120, 180, 95, 45, 12],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Order Value Distribution
        const orderValueCtx = document.getElementById('orderValueChart');
        if (orderValueCtx) {
            new Chart(orderValueCtx, {
                type: 'histogram',
                data: {
                    labels: ['$0-50', '$50-100', '$100-200', '$200-500', '$500+'],
                    datasets: [{
                        label: 'Orders',
                        data: [45, 85, 120, 78, 24],
                        backgroundColor: 'rgba(16, 185, 129, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
    },

    initializePerformanceCharts() {
        // Throughput Chart
        const throughputCtx = document.getElementById('throughputChart');
        if (throughputCtx) {
            new Chart(throughputCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Orders Processed',
                        data: [245, 289, 267, 298, 312, 156, 89],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Utilization Chart
        const utilizationCtx = document.getElementById('utilizationChart');
        if (utilizationCtx) {
            new Chart(utilizationCtx, {
                type: 'radar',
                data: {
                    labels: ['Staff', 'Equipment', 'Space', 'Time', 'Resources'],
                    datasets: [{
                        label: 'Current',
                        data: [78, 85, 72, 91, 67],
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)'
                    }, {
                        label: 'Target',
                        data: [85, 90, 80, 95, 75],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { r: { beginAtZero: true, max: 100 } }
                }
            });
        }
    },

    initializeFinancialCharts() {
        // Revenue vs Cost Chart
        const revenueCostCtx = document.getElementById('revenueCostChart');
        if (revenueCostCtx) {
            new Chart(revenueCostCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [180000, 195000, 210000, 225000, 240000, 245000],
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }, {
                        label: 'Costs',
                        data: [52000, 54000, 55000, 57000, 58000, 58500],
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Cost Breakdown Chart
        const costBreakdownCtx = document.getElementById('costBreakdownChart');
        if (costBreakdownCtx) {
            new Chart(costBreakdownCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Labor', 'Equipment', 'Utilities', 'Maintenance', 'Other'],
                    datasets: [{
                        data: [48.7, 21.1, 15.0, 9.7, 5.5],
                        backgroundColor: [
                            'rgb(59, 130, 246)',
                            'rgb(16, 185, 129)',
                            'rgb(245, 158, 11)',
                            'rgb(239, 68, 68)',
                            'rgb(156, 163, 175)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    },

    exportReport() {
        window.app.showNotification('Exporting report...', 'info');
        
        // Simulate export process
        setTimeout(() => {
            const reportName = `${this.currentReport}_report_${new Date().toISOString().split('T')[0]}.pdf`;
            window.app.showNotification(`Report exported: ${reportName}`, 'success');
        }, 2000);
    }
};