// Orders Management Module
window.OrdersModule = {
    currentView: 'list',
    filters: {
        status: 'all',
        priority: 'all',
        dateRange: 'all',
        search: ''
    },
    sortBy: 'orderDate',
    sortOrder: 'desc',

    load() {
        this.render();
        this.bindEvents();
        this.loadOrdersData();
    },

    render() {
        const content = `
            <div class="orders-header">
                <div class="orders-controls">
                    <div class="control-group">
                        <button class="btn btn-primary" id="createOrderBtn">
                            <i class="fas fa-plus"></i>
                            Create Order
                        </button>
                        <button class="btn btn-secondary" id="batchProcessBtn">
                            <i class="fas fa-tasks"></i>
                            Batch Process
                        </button>
                        <button class="btn btn-secondary" id="printLabelsBtn">
                            <i class="fas fa-print"></i>
                            Print Labels
                        </button>
                        <button class="btn btn-secondary" id="exportOrdersBtn">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                    </div>
                    
                    <div class="view-controls">
                        <div class="btn-group">
                            <button class="btn btn-secondary active" id="listViewBtn" data-view="list">
                                <i class="fas fa-list"></i>
                                List
                            </button>
                            <button class="btn btn-secondary" id="kanbanViewBtn" data-view="kanban">
                                <i class="fas fa-columns"></i>
                                Kanban
                            </button>
                        </div>
                    </div>
                </div>

                <div class="orders-filters">
                    <div class="filter-group">
                        <div class="form-group">
                            <input type="text" placeholder="Search orders..." class="form-input" id="searchInput">
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="statusFilter">
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="picking">Picking</option>
                                <option value="packing">Packing</option>
                                <option value="ready">Ready to Ship</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="priorityFilter">
                                <option value="all">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="dateRangeFilter">
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary" id="clearFiltersBtn">
                            <i class="fas fa-times"></i>
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div class="orders-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Today's Orders</div>
                            <div class="stat-icon" style="background-color: var(--primary-light); color: var(--primary-color);">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="todayOrders">156</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>8% vs yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Pending Orders</div>
                            <div class="stat-icon" style="background-color: #fef3c7; color: var(--warning-color);">
                                <i class="fas fa-clock"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="pendingOrders">23</div>
                        <div class="stat-change negative">
                            <i class="fas fa-arrow-up"></i>
                            <span>3 more than yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Revenue Today</div>
                            <div class="stat-icon" style="background-color: #d1fae5; color: var(--success-color);">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="todayRevenue">$48,392</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>15% vs yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Avg Processing Time</div>
                            <div class="stat-icon" style="background-color: #dbeafe; color: var(--info-color);">
                                <i class="fas fa-stopwatch"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="avgProcessTime">2.4h</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-down"></i>
                            <span>12% faster</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="orders-content">
                <div id="ordersContainer">
                    <!-- Orders content will be populated by JavaScript -->
                </div>
            </div>

            <!-- Create Order Modal -->
            <div class="modal" id="createOrderModal" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title">Create New Order</h3>
                    <button class="modal-close" data-modal="createOrderModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="createOrderForm">
                        <div class="tabs">
                            <ul class="tab-list">
                                <li><button type="button" class="tab-button active" data-tab="customer">Customer Info</button></li>
                                <li><button type="button" class="tab-button" data-tab="items">Order Items</button></li>
                                <li><button type="button" class="tab-button" data-tab="shipping">Shipping</button></li>
                            </ul>
                        </div>

                        <div class="tab-content">
                            <div class="tab-pane active" id="customerTab">
                                <div class="form-row">
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Customer Name</label>
                                            <input type="text" class="form-input" name="customerName" required>
                                        </div>
                                    </div>
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Customer Email</label>
                                            <input type="email" class="form-input" name="customerEmail" required>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number</label>
                                            <input type="tel" class="form-input" name="customerPhone">
                                        </div>
                                    </div>
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Priority</label>
                                            <select class="form-select" name="priority">
                                                <option value="low">Low</option>
                                                <option value="medium" selected>Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Billing Address</label>
                                    <textarea class="form-textarea" name="billingAddress" rows="3" required></textarea>
                                </div>
                            </div>

                            <div class="tab-pane" id="itemsTab">
                                <div class="order-items-section">
                                    <div class="section-header">
                                        <h4>Order Items</h4>
                                        <button type="button" class="btn btn-secondary btn-sm" id="addItemBtn">
                                            <i class="fas fa-plus"></i>
                                            Add Item
                                        </button>
                                    </div>
                                    
                                    <div id="orderItemsList">
                                        <!-- Order items will be added here -->
                                    </div>
                                    
                                    <div class="order-summary">
                                        <div class="summary-row">
                                            <span>Subtotal:</span>
                                            <span id="subtotal">$0.00</span>
                                        </div>
                                        <div class="summary-row">
                                            <span>Tax (8.5%):</span>
                                            <span id="tax">$0.00</span>
                                        </div>
                                        <div class="summary-row">
                                            <span>Shipping:</span>
                                            <span id="shipping">$0.00</span>
                                        </div>
                                        <div class="summary-row total">
                                            <span>Total:</span>
                                            <span id="total">$0.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane" id="shippingTab">
                                <div class="form-row">
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Shipping Method</label>
                                            <select class="form-select" name="shippingMethod">
                                                <option value="standard">Standard (5-7 days) - $5.99</option>
                                                <option value="express">Express (2-3 days) - $12.99</option>
                                                <option value="overnight">Overnight - $24.99</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-col">
                                        <div class="form-group">
                                            <label class="form-label">Requested Delivery Date</label>
                                            <input type="date" class="form-input" name="deliveryDate">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Shipping Address</label>
                                    <div class="form-row">
                                        <div class="form-col">
                                            <input type="checkbox" id="sameAsBilling"> 
                                            <label for="sameAsBilling">Same as billing address</label>
                                        </div>
                                    </div>
                                    <textarea class="form-textarea" name="shippingAddress" rows="3"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Special Instructions</label>
                                    <textarea class="form-textarea" name="instructions" rows="3" placeholder="Any special handling or delivery instructions..."></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="createOrderModal">Cancel</button>
                    <button type="submit" form="createOrderForm" class="btn btn-primary">Create Order</button>
                </div>
            </div>

            <!-- Order Details Modal -->
            <div class="modal" id="orderDetailsModal" style="max-width: 900px;">
                <div class="modal-header">
                    <h3 class="modal-title">Order Details</h3>
                    <button class="modal-close" data-modal="orderDetailsModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="orderDetailsContent">
                        <!-- Order details will be populated here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="orderDetailsModal">Close</button>
                    <button type="button" class="btn btn-primary" id="printOrderBtn">Print</button>
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // Create Order button
        document.getElementById('createOrderBtn').addEventListener('click', () => {
            this.showModal('createOrderModal');
        });

        // View toggle buttons
        document.getElementById('listViewBtn').addEventListener('click', () => {
            this.setView('list');
        });

        document.getElementById('kanbanViewBtn').addEventListener('click', () => {
            this.setView('kanban');
        });

        // Filter controls
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.filterAndSort();
        });

        ['statusFilter', 'priorityFilter', 'dateRangeFilter'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', (e) => {
                const filterType = filterId.replace('Filter', '');
                this.filters[filterType] = e.target.value;
                this.filterAndSort();
            });
        });

        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Modal events
        document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                if (modalId) {
                    this.hideModal(modalId);
                }
            });
        });

        // Create order form and tabs
        this.bindCreateOrderEvents();

        // Batch operations
        document.getElementById('batchProcessBtn').addEventListener('click', () => {
            this.batchProcess();
        });

        document.getElementById('printLabelsBtn').addEventListener('click', () => {
            this.printLabels();
        });

        document.getElementById('exportOrdersBtn').addEventListener('click', () => {
            this.exportOrders();
        });
    },

    bindCreateOrderEvents() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // Create order form submission
        document.getElementById('createOrderForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createOrder(e.target);
        });

        // Add item button
        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.addOrderItem();
        });

        // Same as billing checkbox
        document.getElementById('sameAsBilling').addEventListener('change', (e) => {
            if (e.target.checked) {
                const billingAddress = document.querySelector('[name="billingAddress"]').value;
                document.querySelector('[name="shippingAddress"]').value = billingAddress;
            }
        });

        // Shipping method change
        document.querySelector('[name="shippingMethod"]').addEventListener('change', () => {
            this.updateOrderSummary();
        });
    },

    loadOrdersData() {
        // Sample data - in real app, this would come from API
        this.ordersData = [
            {
                id: 12001,
                orderNumber: "ORD-2024-001",
                customerName: "John Smith",
                customerEmail: "john.smith@example.com",
                status: "processing",
                priority: "high",
                orderDate: "2024-01-15T10:30:00Z",
                deliveryDate: "2024-01-17",
                total: 299.97,
                items: [
                    { name: "iPhone 14 Pro", sku: "IPH14P-256-BLK", quantity: 1, price: 999.99 },
                    { name: "Phone Case", sku: "PC-IPH14P-BLK", quantity: 1, price: 29.99 }
                ],
                shippingAddress: "123 Main St, City, State 12345",
                notes: "Urgent delivery requested"
            },
            {
                id: 12002,
                orderNumber: "ORD-2024-002",
                customerName: "Sarah Johnson",
                customerEmail: "sarah.j@example.com",
                status: "picking",
                priority: "medium",
                orderDate: "2024-01-15T14:20:00Z",
                deliveryDate: "2024-01-18",
                total: 456.78,
                items: [
                    { name: "Samsung Galaxy S23", sku: "SGS23-128-WHT", quantity: 2, price: 799.99 }
                ],
                shippingAddress: "456 Oak Ave, City, State 12345",
                notes: ""
            },
            {
                id: 12003,
                orderNumber: "ORD-2024-003",
                customerName: "Mike Wilson",
                customerEmail: "m.wilson@example.com",
                status: "shipped",
                priority: "low",
                orderDate: "2024-01-14T09:15:00Z",
                deliveryDate: "2024-01-16",
                total: 89.97,
                items: [
                    { name: "Nike Air Max 270", sku: "NAM270-9-BLK", quantity: 1, price: 150.00 },
                    { name: "Sports Socks", sku: "SS-WHT-L", quantity: 3, price: 12.99 }
                ],
                shippingAddress: "789 Pine St, City, State 12345",
                notes: "Leave at front door"
            },
            {
                id: 12004,
                orderNumber: "ORD-2024-004",
                customerName: "Emma Davis",
                customerEmail: "emma.davis@example.com",
                status: "pending",
                priority: "high",
                orderDate: "2024-01-15T16:45:00Z",
                deliveryDate: "2024-01-17",
                total: 234.56,
                items: [
                    { name: "Garden Hose 50ft", sku: "GH50-GRN", quantity: 2, price: 29.99 },
                    { name: "Sprinkler System", sku: "SS-AUTO-001", quantity: 1, price: 89.99 }
                ],
                shippingAddress: "321 Elm St, City, State 12345",
                notes: "Fragile items"
            },
            {
                id: 12005,
                orderNumber: "ORD-2024-005",
                customerName: "Robert Brown",
                customerEmail: "r.brown@example.com",
                status: "delivered",
                priority: "medium",
                orderDate: "2024-01-13T11:20:00Z",
                deliveryDate: "2024-01-15",
                total: 67.89,
                items: [
                    { name: "The Great Gatsby", sku: "TGG-1925-PB", quantity: 5, price: 12.99 }
                ],
                shippingAddress: "654 Maple Ave, City, State 12345",
                notes: ""
            }
        ];

        this.filteredData = [...this.ordersData];
        this.renderOrders();
    },

    renderOrders() {
        const container = document.getElementById('ordersContainer');
        
        if (this.currentView === 'list') {
            this.renderOrdersList(container);
        } else {
            this.renderOrdersKanban(container);
        }
    },

    renderOrdersList(container) {
        const table = `
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="selectAllOrders"></th>
                            <th class="sortable" data-sort="orderNumber">Order # <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="customerName">Customer <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="status">Status <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="priority">Priority <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="orderDate">Order Date <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="deliveryDate">Delivery <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="total">Total <i class="fas fa-sort"></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.filteredData.map(order => this.renderOrderRow(order)).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        container.innerHTML = table;
        this.bindOrderEvents();
    },

    renderOrderRow(order) {
        const statusBadge = this.getStatusBadge(order.status);
        const priorityBadge = this.getPriorityBadge(order.priority);
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const deliveryDate = new Date(order.deliveryDate).toLocaleDateString();
        
        return `
            <tr data-id="${order.id}">
                <td><input type="checkbox" class="order-checkbox" value="${order.id}"></td>
                <td>
                    <div class="order-info">
                        <div class="order-number">${order.orderNumber}</div>
                        <div class="order-items-count">${order.items.length} item(s)</div>
                    </div>
                </td>
                <td>
                    <div class="customer-info">
                        <div class="customer-name">${order.customerName}</div>
                        <div class="customer-email text-muted">${order.customerEmail}</div>
                    </div>
                </td>
                <td>${statusBadge}</td>
                <td>${priorityBadge}</td>
                <td>${orderDate}</td>
                <td>${deliveryDate}</td>
                <td><strong>$${order.total.toFixed(2)}</strong></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary btn-sm btn-icon" data-action="view" data-id="${order.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary btn-sm btn-icon" data-action="process" data-id="${order.id}" title="Process Order">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="btn btn-success btn-sm btn-icon" data-action="ship" data-id="${order.id}" title="Ship Order">
                            <i class="fas fa-shipping-fast"></i>
                        </button>
                        <button class="btn btn-error btn-sm btn-icon" data-action="cancel" data-id="${order.id}" title="Cancel Order">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    renderOrdersKanban(container) {
        const statuses = ['pending', 'processing', 'picking', 'packing', 'ready', 'shipped'];
        const statusLabels = {
            pending: 'Pending',
            processing: 'Processing',
            picking: 'Picking',
            packing: 'Packing',
            ready: 'Ready to Ship',
            shipped: 'Shipped'
        };

        const kanbanHTML = `
            <div class="kanban-board">
                ${statuses.map(status => {
                    const orders = this.filteredData.filter(order => order.status === status);
                    return `
                        <div class="kanban-column" data-status="${status}">
                            <div class="kanban-header">
                                <h3>${statusLabels[status]}</h3>
                                <span class="badge badge-gray">${orders.length}</span>
                            </div>
                            <div class="kanban-cards">
                                ${orders.map(order => this.renderKanbanCard(order)).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        container.innerHTML = kanbanHTML;
        this.bindOrderEvents();
    },

    renderKanbanCard(order) {
        const priorityBadge = this.getPriorityBadge(order.priority);
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        
        return `
            <div class="kanban-card" data-id="${order.id}">
                <div class="card-header">
                    <div class="order-number">${order.orderNumber}</div>
                    ${priorityBadge}
                </div>
                <div class="card-body">
                    <div class="customer-name">${order.customerName}</div>
                    <div class="order-total">$${order.total.toFixed(2)}</div>
                    <div class="order-date">${orderDate}</div>
                    <div class="order-items">${order.items.length} item(s)</div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" data-action="view" data-id="${order.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-primary btn-sm" data-action="process" data-id="${order.id}">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        `;
    },

    bindOrderEvents() {
        // Sort headers
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                const sortField = header.getAttribute('data-sort');
                this.sort(sortField);
            });
        });

        // Action buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const id = btn.getAttribute('data-id');
                this.handleOrderAction(action, id);
            });
        });

        // Select all checkbox
        const selectAll = document.getElementById('selectAllOrders');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                document.querySelectorAll('.order-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });
        }
    },

    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
        document.getElementById('kanbanViewBtn').classList.toggle('active', view === 'kanban');
        
        this.renderOrders();
    },

    getStatusBadge(status) {
        const badges = {
            'pending': '<span class="badge badge-warning">Pending</span>',
            'processing': '<span class="badge badge-info">Processing</span>',
            'picking': '<span class="badge badge-primary">Picking</span>',
            'packing': '<span class="badge badge-primary">Packing</span>',
            'ready': '<span class="badge badge-success">Ready to Ship</span>',
            'shipped': '<span class="badge badge-success">Shipped</span>',
            'delivered': '<span class="badge badge-success">Delivered</span>',
            'cancelled': '<span class="badge badge-error">Cancelled</span>',
            'returned': '<span class="badge badge-gray">Returned</span>'
        };
        return badges[status] || '<span class="badge badge-gray">Unknown</span>';
    },

    getPriorityBadge(priority) {
        const badges = {
            'high': '<span class="badge badge-error">High</span>',
            'medium': '<span class="badge badge-warning">Medium</span>',
            'low': '<span class="badge badge-gray">Low</span>'
        };
        return badges[priority] || '<span class="badge badge-gray">Normal</span>';
    },

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabId}Tab`).classList.add('active');
    },

    addOrderItem() {
        const itemsList = document.getElementById('orderItemsList');
        const itemIndex = itemsList.children.length;
        
        const itemHTML = `
            <div class="order-item" data-index="${itemIndex}">
                <div class="form-row">
                    <div class="form-col">
                        <select class="form-select product-select" name="items[${itemIndex}][product]" required>
                            <option value="">Select Product</option>
                            <option value="IPH14P-256-BLK" data-price="999.99">iPhone 14 Pro - $999.99</option>
                            <option value="SGS23-128-WHT" data-price="799.99">Samsung Galaxy S23 - $799.99</option>
                            <option value="NAM270-9-BLK" data-price="150.00">Nike Air Max 270 - $150.00</option>
                            <option value="GH50-GRN" data-price="29.99">Garden Hose 50ft - $29.99</option>
                        </select>
                    </div>
                    <div class="form-col" style="flex: 0 0 100px;">
                        <input type="number" class="form-input quantity-input" name="items[${itemIndex}][quantity]" min="1" value="1" required>
                    </div>
                    <div class="form-col" style="flex: 0 0 120px;">
                        <input type="number" class="form-input price-input" name="items[${itemIndex}][price]" step="0.01" readonly>
                    </div>
                    <div class="form-col" style="flex: 0 0 120px;">
                        <input type="number" class="form-input total-input" name="items[${itemIndex}][total]" step="0.01" readonly>
                    </div>
                    <div class="form-col" style="flex: 0 0 40px;">
                        <button type="button" class="btn btn-error btn-sm btn-icon remove-item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        itemsList.insertAdjacentHTML('beforeend', itemHTML);
        
        // Bind events for new item
        const newItem = itemsList.lastElementChild;
        this.bindOrderItemEvents(newItem);
    },

    bindOrderItemEvents(itemElement) {
        const productSelect = itemElement.querySelector('.product-select');
        const quantityInput = itemElement.querySelector('.quantity-input');
        const priceInput = itemElement.querySelector('.price-input');
        const totalInput = itemElement.querySelector('.total-input');
        const removeBtn = itemElement.querySelector('.remove-item');

        // Product selection
        productSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const price = selectedOption.getAttribute('data-price');
            priceInput.value = price || 0;
            this.updateItemTotal(itemElement);
        });

        // Quantity change
        quantityInput.addEventListener('input', () => {
            this.updateItemTotal(itemElement);
        });

        // Remove item
        removeBtn.addEventListener('click', () => {
            itemElement.remove();
            this.updateOrderSummary();
        });
    },

    updateItemTotal(itemElement) {
        const price = parseFloat(itemElement.querySelector('.price-input').value) || 0;
        const quantity = parseInt(itemElement.querySelector('.quantity-input').value) || 0;
        const total = price * quantity;
        
        itemElement.querySelector('.total-input').value = total.toFixed(2);
        this.updateOrderSummary();
    },

    updateOrderSummary() {
        const items = document.querySelectorAll('.order-item');
        let subtotal = 0;
        
        items.forEach(item => {
            const total = parseFloat(item.querySelector('.total-input').value) || 0;
            subtotal += total;
        });
        
        const taxRate = 0.085; // 8.5%
        const tax = subtotal * taxRate;
        
        // Get shipping cost from selected method
        const shippingSelect = document.querySelector('[name="shippingMethod"]');
        let shippingCost = 0;
        if (shippingSelect && shippingSelect.value) {
            const shippingCosts = { standard: 5.99, express: 12.99, overnight: 24.99 };
            shippingCost = shippingCosts[shippingSelect.value] || 0;
        }
        
        const total = subtotal + tax + shippingCost;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shippingCost.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    },

    filterAndSort() {
        let filtered = [...this.ordersData];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(order => 
                order.orderNumber.toLowerCase().includes(searchTerm) ||
                order.customerName.toLowerCase().includes(searchTerm) ||
                order.customerEmail.toLowerCase().includes(searchTerm)
            );
        }

        // Apply status filter
        if (this.filters.status !== 'all') {
            filtered = filtered.filter(order => order.status === this.filters.status);
        }

        // Apply priority filter
        if (this.filters.priority !== 'all') {
            filtered = filtered.filter(order => order.priority === this.filters.priority);
        }

        // Apply date range filter
        if (this.filters.dateRange !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (this.filters.dateRange) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case 'quarter':
                    filterDate.setMonth(now.getMonth() - 3);
                    break;
            }
            
            filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
        }

        this.filteredData = filtered;
        this.renderOrders();
    },

    clearFilters() {
        this.filters = {
            status: 'all',
            priority: 'all',
            dateRange: 'all',
            search: ''
        };

        document.getElementById('searchInput').value = '';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('priorityFilter').value = 'all';
        document.getElementById('dateRangeFilter').value = 'all';

        this.filteredData = [...this.ordersData];
        this.renderOrders();
    },

    sort(field) {
        if (this.sortBy === field) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = field;
            this.sortOrder = 'asc';
        }

        this.filteredData.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            if (field === 'orderDate' || field === 'deliveryDate') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (this.sortOrder === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });

        this.renderOrders();
    },

    handleOrderAction(action, id) {
        const order = this.ordersData.find(o => o.id === parseInt(id));
        
        switch(action) {
            case 'view':
                this.viewOrderDetails(order);
                break;
            case 'process':
                this.processOrder(order);
                break;
            case 'ship':
                this.shipOrder(order);
                break;
            case 'cancel':
                this.cancelOrder(order);
                break;
        }
    },

    viewOrderDetails(order) {
        const detailsHTML = `
            <div class="order-details">
                <div class="order-header">
                    <div class="order-info">
                        <h4>${order.orderNumber}</h4>
                        <div class="order-meta">
                            ${this.getStatusBadge(order.status)}
                            ${this.getPriorityBadge(order.priority)}
                        </div>
                    </div>
                    <div class="order-dates">
                        <div>Order Date: ${new Date(order.orderDate).toLocaleDateString()}</div>
                        <div>Delivery Date: ${new Date(order.deliveryDate).toLocaleDateString()}</div>
                    </div>
                </div>
                
                <div class="customer-details">
                    <h5>Customer Information</h5>
                    <div class="detail-grid">
                        <div>
                            <strong>Name:</strong> ${order.customerName}
                        </div>
                        <div>
                            <strong>Email:</strong> ${order.customerEmail}
                        </div>
                        <div>
                            <strong>Shipping Address:</strong><br>
                            ${order.shippingAddress}
                        </div>
                        ${order.notes ? `<div><strong>Notes:</strong><br>${order.notes}</div>` : ''}
                    </div>
                </div>
                
                <div class="order-items-details">
                    <h5>Order Items</h5>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td><code>${item.sku}</code></td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.price.toFixed(2)}</td>
                                    <td>$${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="order-total">
                        <strong>Total: $${order.total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('orderDetailsContent').innerHTML = detailsHTML;
        this.showModal('orderDetailsModal');
    },

    createOrder(form) {
        const formData = new FormData(form);
        
        // Extract order items
        const items = [];
        const itemsData = document.querySelectorAll('.order-item');
        itemsData.forEach((item, index) => {
            const productSelect = item.querySelector('.product-select');
            const quantity = item.querySelector('.quantity-input').value;
            const price = item.querySelector('.price-input').value;
            
            if (productSelect.value && quantity && price) {
                items.push({
                    name: productSelect.selectedOptions[0].textContent.split(' - ')[0],
                    sku: productSelect.value,
                    quantity: parseInt(quantity),
                    price: parseFloat(price)
                });
            }
        });
        
        if (items.length === 0) {
            window.app.showNotification('Please add at least one item to the order', 'error');
            return;
        }
        
        // Calculate total
        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const tax = subtotal * 0.085;
        const shippingCosts = { standard: 5.99, express: 12.99, overnight: 24.99 };
        const shipping = shippingCosts[formData.get('shippingMethod')] || 0;
        const total = subtotal + tax + shipping;
        
        // Generate new order
        const newOrder = {
            id: Math.max(...this.ordersData.map(o => o.id)) + 1,
            orderNumber: `ORD-2024-${String(this.ordersData.length + 1).padStart(3, '0')}`,
            customerName: formData.get('customerName'),
            customerEmail: formData.get('customerEmail'),
            status: 'pending',
            priority: formData.get('priority'),
            orderDate: new Date().toISOString(),
            deliveryDate: formData.get('deliveryDate'),
            total: total,
            items: items,
            shippingAddress: formData.get('shippingAddress'),
            notes: formData.get('instructions') || ''
        };
        
        this.ordersData.unshift(newOrder);
        this.filteredData = [...this.ordersData];
        this.renderOrders();
        this.hideModal('createOrderModal');
        form.reset();
        document.getElementById('orderItemsList').innerHTML = '';
        this.updateOrderSummary();
        
        window.app.showNotification('Order created successfully!', 'success');
    },

    processOrder(order) {
        order.status = 'processing';
        this.renderOrders();
        window.app.showNotification(`Order ${order.orderNumber} is now being processed`, 'success');
    },

    shipOrder(order) {
        order.status = 'shipped';
        this.renderOrders();
        window.app.showNotification(`Order ${order.orderNumber} has been shipped`, 'success');
    },

    cancelOrder(order) {
        if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
            order.status = 'cancelled';
            this.renderOrders();
            window.app.showNotification(`Order ${order.orderNumber} has been cancelled`, 'warning');
        }
    },

    batchProcess() {
        const selectedOrders = document.querySelectorAll('.order-checkbox:checked');
        if (selectedOrders.length === 0) {
            window.app.showNotification('Please select orders to process', 'warning');
            return;
        }
        
        window.app.showNotification(`Processing ${selectedOrders.length} orders...`, 'info');
    },

    printLabels() {
        const selectedOrders = document.querySelectorAll('.order-checkbox:checked');
        if (selectedOrders.length === 0) {
            window.app.showNotification('Please select orders to print labels for', 'warning');
            return;
        }
        
        window.app.showNotification(`Printing labels for ${selectedOrders.length} orders...`, 'info');
    },

    exportOrders() {
        window.app.showNotification('Exporting orders...', 'info');
    },

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.getElementById('modalBackdrop').classList.add('active');
    },

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.getElementById('modalBackdrop').classList.remove('active');
    }
};