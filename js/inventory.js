// Inventory Management Module
window.InventoryModule = {
    currentView: 'list',
    filters: {
        category: 'all',
        status: 'all',
        search: ''
    },
    sortBy: 'name',
    sortOrder: 'asc',

    load() {
        this.render();
        this.bindEvents();
        this.loadInventoryData();
    },

    render() {
        const content = `
            <div class="inventory-header">
                <div class="inventory-controls">
                    <div class="control-group">
                        <button class="btn btn-primary" id="addProductBtn">
                            <i class="fas fa-plus"></i>
                            Add Product
                        </button>
                        <button class="btn btn-secondary" id="bulkImportBtn">
                            <i class="fas fa-upload"></i>
                            Bulk Import
                        </button>
                        <button class="btn btn-secondary" id="exportBtn">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                    </div>
                    
                    <div class="view-controls">
                        <div class="btn-group">
                            <button class="btn btn-secondary active" id="listViewBtn" data-view="list">
                                <i class="fas fa-list"></i>
                            </button>
                            <button class="btn btn-secondary" id="gridViewBtn" data-view="grid">
                                <i class="fas fa-th"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="inventory-filters">
                    <div class="filter-group">
                        <div class="form-group">
                            <input type="text" placeholder="Search products..." class="form-input" id="searchInput">
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="categoryFilter">
                                <option value="all">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                                <option value="home-garden">Home & Garden</option>
                                <option value="sports">Sports & Outdoors</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="statusFilter">
                                <option value="all">All Status</option>
                                <option value="in-stock">In Stock</option>
                                <option value="low-stock">Low Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                                <option value="discontinued">Discontinued</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary" id="clearFiltersBtn">
                            <i class="fas fa-times"></i>
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            <div class="inventory-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Total Products</div>
                            <div class="stat-icon" style="background-color: var(--primary-light); color: var(--primary-color);">
                                <i class="fas fa-boxes"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="totalProducts">2,847</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>12 new this week</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Low Stock Items</div>
                            <div class="stat-icon" style="background-color: #fef3c7; color: var(--warning-color);">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="lowStockItems">23</div>
                        <div class="stat-change negative">
                            <i class="fas fa-arrow-up"></i>
                            <span>5 more than yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Total Value</div>
                            <div class="stat-icon" style="background-color: #d1fae5; color: var(--success-color);">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="totalValue">$2.4M</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>8% vs last month</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Categories</div>
                            <div class="stat-icon" style="background-color: #dbeafe; color: var(--info-color);">
                                <i class="fas fa-tags"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="totalCategories">12</div>
                        <div class="stat-change neutral">
                            <i class="fas fa-minus"></i>
                            <span>No change</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="inventory-content">
                <div id="inventoryTable" class="table-container">
                    <!-- Table will be populated by JavaScript -->
                </div>
            </div>

            <!-- Add Product Modal -->
            <div class="modal" id="addProductModal">
                <div class="modal-header">
                    <h3 class="modal-title">Add New Product</h3>
                    <button class="modal-close" data-modal="addProductModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addProductForm">
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Product Name</label>
                                    <input type="text" class="form-input" name="name" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">SKU</label>
                                    <input type="text" class="form-input" name="sku" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Category</label>
                                    <select class="form-select" name="category" required>
                                        <option value="">Select Category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="books">Books</option>
                                        <option value="home-garden">Home & Garden</option>
                                        <option value="sports">Sports & Outdoors</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Brand</label>
                                    <input type="text" class="form-input" name="brand">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Price</label>
                                    <input type="number" step="0.01" class="form-input" name="price" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Cost</label>
                                    <input type="number" step="0.01" class="form-input" name="cost">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Initial Stock</label>
                                    <input type="number" class="form-input" name="stock" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Minimum Stock</label>
                                    <input type="number" class="form-input" name="minStock">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-textarea" name="description" rows="3"></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Location</label>
                                    <input type="text" class="form-input" name="location" placeholder="e.g., A1-B2-C3">
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Supplier</label>
                                    <input type="text" class="form-input" name="supplier">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="addProductModal">Cancel</button>
                    <button type="submit" form="addProductForm" class="btn btn-primary">Add Product</button>
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // Add Product button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.showModal('addProductModal');
        });

        // View toggle buttons
        document.getElementById('listViewBtn').addEventListener('click', () => {
            this.setView('list');
        });

        document.getElementById('gridViewBtn').addEventListener('click', () => {
            this.setView('grid');
        });

        // Filter controls
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.filterAndSort();
        });

        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.filterAndSort();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.filterAndSort();
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

        // Add product form
        document.getElementById('addProductForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProduct(e.target);
        });

        // Export and bulk import
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportInventory();
        });

        document.getElementById('bulkImportBtn').addEventListener('click', () => {
            this.showBulkImport();
        });
    },

    loadInventoryData() {
        // Sample data - in real app, this would come from API
        this.inventoryData = [
            {
                id: 1,
                name: "iPhone 14 Pro",
                sku: "IPH14P-256-BLK",
                category: "electronics",
                brand: "Apple",
                price: 999.99,
                cost: 750.00,
                stock: 45,
                minStock: 10,
                location: "A1-B2-C3",
                supplier: "Apple Inc.",
                status: "in-stock",
                lastUpdated: "2024-01-15"
            },
            {
                id: 2,
                name: "Samsung Galaxy S23",
                sku: "SGS23-128-WHT",
                category: "electronics",
                brand: "Samsung",
                price: 799.99,
                cost: 600.00,
                stock: 8,
                minStock: 15,
                location: "A1-B2-C4",
                supplier: "Samsung Electronics",
                status: "low-stock",
                lastUpdated: "2024-01-14"
            },
            {
                id: 3,
                name: "Nike Air Max 270",
                sku: "NAM270-9-BLK",
                category: "clothing",
                brand: "Nike",
                price: 150.00,
                cost: 90.00,
                stock: 23,
                minStock: 20,
                location: "B2-C3-D1",
                supplier: "Nike Inc.",
                status: "in-stock",
                lastUpdated: "2024-01-13"
            },
            {
                id: 4,
                name: "The Great Gatsby",
                sku: "TGG-1925-PB",
                category: "books",
                brand: "Scribner",
                price: 12.99,
                cost: 7.50,
                stock: 0,
                minStock: 5,
                location: "C1-D2-E3",
                supplier: "Simon & Schuster",
                status: "out-of-stock",
                lastUpdated: "2024-01-12"
            },
            {
                id: 5,
                name: "Garden Hose 50ft",
                sku: "GH50-GRN",
                category: "home-garden",
                brand: "FlexiGarden",
                price: 29.99,
                cost: 18.00,
                stock: 67,
                minStock: 25,
                location: "D1-E2-F3",
                supplier: "Garden Supply Co.",
                status: "in-stock",
                lastUpdated: "2024-01-11"
            }
        ];

        this.renderTable();
    },

    renderTable() {
        const tableContainer = document.getElementById('inventoryTable');
        
        if (this.currentView === 'list') {
            const table = `
                <table class="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="selectAll"></th>
                            <th class="sortable" data-sort="name">Product Name <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="sku">SKU <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="category">Category <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="stock">Stock <i class="fas fa-sort"></i></th>
                            <th class="sortable" data-sort="price">Price <i class="fas fa-sort"></i></th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.inventoryData.map(item => this.renderTableRow(item)).join('')}
                    </tbody>
                </table>
            `;
            tableContainer.innerHTML = table;
        } else {
            // Grid view implementation
            const grid = `
                <div class="inventory-grid">
                    ${this.inventoryData.map(item => this.renderGridCard(item)).join('')}
                </div>
            `;
            tableContainer.innerHTML = grid;
        }

        this.bindTableEvents();
    },

    renderTableRow(item) {
        const statusBadge = this.getStatusBadge(item.status);
        const stockWarning = item.stock <= item.minStock ? 'text-warning' : '';
        
        return `
            <tr data-id="${item.id}">
                <td><input type="checkbox" class="item-checkbox" value="${item.id}"></td>
                <td>
                    <div class="product-info">
                        <div class="product-name">${item.name}</div>
                        <div class="product-brand text-muted">${item.brand}</div>
                    </div>
                </td>
                <td><code>${item.sku}</code></td>
                <td><span class="badge badge-gray">${this.formatCategory(item.category)}</span></td>
                <td>
                    <span class="${stockWarning}">
                        ${item.stock}
                        ${item.stock <= item.minStock ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                    </span>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${statusBadge}</td>
                <td>${item.location}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary btn-sm btn-icon" data-action="edit" data-id="${item.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-secondary btn-sm btn-icon" data-action="view" data-id="${item.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-warning btn-sm btn-icon" data-action="adjust" data-id="${item.id}" title="Adjust Stock">
                            <i class="fas fa-plus-minus"></i>
                        </button>
                        <button class="btn btn-error btn-sm btn-icon" data-action="delete" data-id="${item.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    renderGridCard(item) {
        const statusBadge = this.getStatusBadge(item.status);
        const stockWarning = item.stock <= item.minStock ? 'low-stock' : '';
        
        return `
            <div class="inventory-card ${stockWarning}" data-id="${item.id}">
                <div class="card-header">
                    <h4 class="card-title">${item.name}</h4>
                    <div class="card-actions">
                        <button class="btn btn-secondary btn-sm btn-icon" data-action="edit" data-id="${item.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="product-details">
                        <div class="detail-row">
                            <span class="detail-label">SKU:</span>
                            <span class="detail-value"><code>${item.sku}</code></span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Category:</span>
                            <span class="detail-value">${this.formatCategory(item.category)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Stock:</span>
                            <span class="detail-value ${stockWarning}">
                                ${item.stock}
                                ${item.stock <= item.minStock ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                            </span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Price:</span>
                            <span class="detail-value">$${item.price.toFixed(2)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${item.location}</span>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
            </div>
        `;
    },

    bindTableEvents() {
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
                this.handleAction(action, id);
            });
        });

        // Select all checkbox
        const selectAll = document.getElementById('selectAll');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                document.querySelectorAll('.item-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });
        }
    },

    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
        document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
        
        this.renderTable();
    },

    getStatusBadge(status) {
        const badges = {
            'in-stock': '<span class="badge badge-success">In Stock</span>',
            'low-stock': '<span class="badge badge-warning">Low Stock</span>',
            'out-of-stock': '<span class="badge badge-error">Out of Stock</span>',
            'discontinued': '<span class="badge badge-gray">Discontinued</span>'
        };
        return badges[status] || '<span class="badge badge-gray">Unknown</span>';
    },

    formatCategory(category) {
        return category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    },

    filterAndSort() {
        let filtered = [...this.inventoryData];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.sku.toLowerCase().includes(searchTerm) ||
                item.brand.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(item => item.category === this.filters.category);
        }

        // Apply status filter
        if (this.filters.status !== 'all') {
            filtered = filtered.filter(item => item.status === this.filters.status);
        }

        this.inventoryData = filtered;
        this.renderTable();
    },

    clearFilters() {
        this.filters = {
            category: 'all',
            status: 'all',
            search: ''
        };

        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';

        this.loadInventoryData(); // Reload original data
    },

    sort(field) {
        if (this.sortBy === field) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = field;
            this.sortOrder = 'asc';
        }

        this.inventoryData.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (this.sortOrder === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });

        this.renderTable();
    },

    handleAction(action, id) {
        const item = this.inventoryData.find(i => i.id === parseInt(id));
        
        switch(action) {
            case 'edit':
                this.editProduct(item);
                break;
            case 'view':
                this.viewProduct(item);
                break;
            case 'adjust':
                this.adjustStock(item);
                break;
            case 'delete':
                this.deleteProduct(item);
                break;
        }
    },

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
        document.getElementById('modalBackdrop').classList.add('active');
    },

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        document.getElementById('modalBackdrop').classList.remove('active');
    },

    addProduct(form) {
        const formData = new FormData(form);
        const productData = Object.fromEntries(formData);
        
        // Generate new ID
        const newId = Math.max(...this.inventoryData.map(i => i.id)) + 1;
        
        const newProduct = {
            id: newId,
            name: productData.name,
            sku: productData.sku,
            category: productData.category,
            brand: productData.brand || 'N/A',
            price: parseFloat(productData.price),
            cost: parseFloat(productData.cost) || 0,
            stock: parseInt(productData.stock),
            minStock: parseInt(productData.minStock) || 0,
            location: productData.location || 'TBD',
            supplier: productData.supplier || 'N/A',
            status: parseInt(productData.stock) > parseInt(productData.minStock) ? 'in-stock' : 'low-stock',
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        this.inventoryData.push(newProduct);
        this.renderTable();
        this.hideModal('addProductModal');
        form.reset();

        window.app.showNotification('Product added successfully!', 'success');
    },

    editProduct(item) {
        // Implementation for editing product
        console.log('Editing product:', item);
        window.app.showNotification('Edit functionality coming soon!', 'info');
    },

    viewProduct(item) {
        // Implementation for viewing product details
        console.log('Viewing product:', item);
        window.app.showNotification('View details functionality coming soon!', 'info');
    },

    adjustStock(item) {
        // Implementation for stock adjustment
        console.log('Adjusting stock for:', item);
        window.app.showNotification('Stock adjustment functionality coming soon!', 'info');
    },

    deleteProduct(item) {
        if (confirm(`Are you sure you want to delete ${item.name}?`)) {
            this.inventoryData = this.inventoryData.filter(i => i.id !== item.id);
            this.renderTable();
            window.app.showNotification('Product deleted successfully!', 'success');
        }
    },

    exportInventory() {
        // Implementation for exporting inventory data
        console.log('Exporting inventory...');
        window.app.showNotification('Export functionality coming soon!', 'info');
    },

    showBulkImport() {
        // Implementation for bulk import
        console.log('Opening bulk import...');
        window.app.showNotification('Bulk import functionality coming soon!', 'info');
    }
};