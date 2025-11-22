// Users Management Module
window.UsersModule = {
    currentView: 'list',
    filters: {
        role: 'all',
        status: 'all',
        search: ''
    },
    sortBy: 'name',
    sortOrder: 'asc',

    load() {
        this.render();
        this.bindEvents();
        this.loadUsersData();
    },

    render() {
        const content = `
            <div class="users-header">
                <div class="users-controls">
                    <div class="control-group">
                        <button class="btn btn-primary" id="addUserBtn">
                            <i class="fas fa-user-plus"></i>
                            Add User
                        </button>
                        <button class="btn btn-secondary" id="bulkActionsBtn">
                            <i class="fas fa-tasks"></i>
                            Bulk Actions
                        </button>
                        <button class="btn btn-secondary" id="exportUsersBtn">
                            <i class="fas fa-download"></i>
                            Export Users
                        </button>
                        <button class="btn btn-secondary" id="importUsersBtn">
                            <i class="fas fa-upload"></i>
                            Import Users
                        </button>
                    </div>
                </div>

                <div class="users-filters">
                    <div class="filter-group">
                        <div class="form-group">
                            <input type="text" placeholder="Search users..." class="form-input" id="searchUsersInput">
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="roleFilter">
                                <option value="all">All Roles</option>
                                <option value="admin">Administrator</option>
                                <option value="manager">Manager</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="operator">Operator</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="statusFilter">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary" id="clearUsersFiltersBtn">
                            <i class="fas fa-times"></i>
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div class="users-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Total Users</div>
                            <div class="stat-icon" style="background-color: var(--primary-light); color: var(--primary-color);">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="totalUsers">47</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>3 new this month</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Active Sessions</div>
                            <div class="stat-icon" style="background-color: #d1fae5; color: var(--success-color);">
                                <i class="fas fa-circle"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="activeSessions">23</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>5 more than yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Administrators</div>
                            <div class="stat-icon" style="background-color: #fef3c7; color: var(--warning-color);">
                                <i class="fas fa-user-shield"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="adminUsers">5</div>
                        <div class="stat-change neutral">
                            <i class="fas fa-minus"></i>
                            <span>No change</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Security Alerts</div>
                            <div class="stat-icon" style="background-color: #fee2e2; color: var(--error-color);">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="securityAlerts">2</div>
                        <div class="stat-change negative">
                            <i class="fas fa-arrow-up"></i>
                            <span>New today</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="users-content">
                <div class="table-container">
                    <table class="table" id="usersTable">
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="selectAllUsers"></th>
                                <th class="sortable" data-sort="name">Name <i class="fas fa-sort"></i></th>
                                <th class="sortable" data-sort="email">Email <i class="fas fa-sort"></i></th>
                                <th class="sortable" data-sort="role">Role <i class="fas fa-sort"></i></th>
                                <th class="sortable" data-sort="status">Status <i class="fas fa-sort"></i></th>
                                <th class="sortable" data-sort="lastLogin">Last Login <i class="fas fa-sort"></i></th>
                                <th>Permissions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            <!-- Users will be populated here -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Add User Modal -->
            <div class="modal" id="addUserModal">
                <div class="modal-header">
                    <h3 class="modal-title">Add New User</h3>
                    <button class="modal-close" data-modal="addUserModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addUserForm">
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">First Name</label>
                                    <input type="text" class="form-input" name="firstName" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Last Name</label>
                                    <input type="text" class="form-input" name="lastName" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input" name="email" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" class="form-input" name="phone">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Role</label>
                                    <select class="form-select" name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="admin">Administrator</option>
                                        <option value="manager">Manager</option>
                                        <option value="supervisor">Supervisor</option>
                                        <option value="operator">Operator</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Department</label>
                                    <select class="form-select" name="department">
                                        <option value="">Select Department</option>
                                        <option value="warehouse">Warehouse</option>
                                        <option value="inventory">Inventory</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="receiving">Receiving</option>
                                        <option value="admin">Administration</option>
                                        <option value="it">IT</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Permissions</label>
                            <div class="permissions-grid">
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="dashboard.view"> Dashboard View
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="inventory.view"> Inventory View
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="inventory.edit"> Inventory Edit
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="orders.view"> Orders View
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="orders.edit"> Orders Edit
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="warehouse.view"> Warehouse View
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="reports.view"> Reports View
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="users.manage"> Manage Users
                                </label>
                                <label class="permission-item">
                                    <input type="checkbox" name="permissions" value="settings.manage"> Manage Settings
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Temporary Password</label>
                                    <input type="password" class="form-input" name="password" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" class="form-input" name="confirmPassword" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="permission-item">
                                <input type="checkbox" name="requirePasswordChange" checked>
                                Require password change on first login
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="addUserModal">Cancel</button>
                    <button type="submit" form="addUserForm" class="btn btn-primary">Add User</button>
                </div>
            </div>

            <!-- Edit User Modal -->
            <div class="modal" id="editUserModal">
                <div class="modal-header">
                    <h3 class="modal-title">Edit User</h3>
                    <button class="modal-close" data-modal="editUserModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="editUserContent">
                        <!-- Edit user form will be populated here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="editUserModal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveUserChanges">Save Changes</button>
                </div>
            </div>

            <!-- User Permissions Modal -->
            <div class="modal" id="userPermissionsModal">
                <div class="modal-header">
                    <h3 class="modal-title">Manage Permissions</h3>
                    <button class="modal-close" data-modal="userPermissionsModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="userPermissionsContent">
                        <!-- Permissions content will be populated here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="userPermissionsModal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="savePermissions">Save Permissions</button>
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // Add User button
        document.getElementById('addUserBtn').addEventListener('click', () => {
            this.showModal('addUserModal');
        });

        // Filter controls
        document.getElementById('searchUsersInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.filterAndSort();
        });

        ['roleFilter', 'statusFilter'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', (e) => {
                const filterType = filterId.replace('Filter', '');
                this.filters[filterType] = e.target.value;
                this.filterAndSort();
            });
        });

        document.getElementById('clearUsersFiltersBtn').addEventListener('click', () => {
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

        // Add user form
        document.getElementById('addUserForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addUser(e.target);
        });

        // Bulk actions and export
        document.getElementById('bulkActionsBtn').addEventListener('click', () => {
            this.showBulkActions();
        });

        document.getElementById('exportUsersBtn').addEventListener('click', () => {
            this.exportUsers();
        });

        document.getElementById('importUsersBtn').addEventListener('click', () => {
            this.importUsers();
        });

        // Role-based permission presets
        document.querySelector('[name="role"]').addEventListener('change', (e) => {
            this.applyRolePermissions(e.target.value);
        });
    },

    loadUsersData() {
        // Sample users data
        this.usersData = [
            {
                id: 1,
                firstName: "John",
                lastName: "Smith",
                email: "john.smith@company.com",
                phone: "+1 (555) 123-4567",
                role: "admin",
                department: "admin",
                status: "active",
                lastLogin: "2024-01-15T10:30:00Z",
                createdDate: "2023-06-15",
                permissions: ["dashboard.view", "inventory.view", "inventory.edit", "orders.view", "orders.edit", "warehouse.view", "reports.view", "users.manage", "settings.manage"],
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            },
            {
                id: 2,
                firstName: "Sarah",
                lastName: "Johnson",
                email: "sarah.johnson@company.com",
                phone: "+1 (555) 123-4568",
                role: "manager",
                department: "warehouse",
                status: "active",
                lastLogin: "2024-01-15T14:20:00Z",
                createdDate: "2023-08-20",
                permissions: ["dashboard.view", "inventory.view", "inventory.edit", "orders.view", "orders.edit", "warehouse.view", "reports.view"],
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b08c?w=40&h=40&fit=crop&crop=face"
            },
            {
                id: 3,
                firstName: "Mike",
                lastName: "Wilson",
                email: "mike.wilson@company.com",
                phone: "+1 (555) 123-4569",
                role: "supervisor",
                department: "shipping",
                status: "active",
                lastLogin: "2024-01-15T09:15:00Z",
                createdDate: "2023-09-10",
                permissions: ["dashboard.view", "inventory.view", "orders.view", "orders.edit", "warehouse.view"],
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
            },
            {
                id: 4,
                firstName: "Emma",
                lastName: "Davis",
                email: "emma.davis@company.com",
                phone: "+1 (555) 123-4570",
                role: "operator",
                department: "inventory",
                status: "active",
                lastLogin: "2024-01-14T16:45:00Z",
                createdDate: "2023-10-05",
                permissions: ["dashboard.view", "inventory.view", "orders.view", "warehouse.view"],
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
            },
            {
                id: 5,
                firstName: "Robert",
                lastName: "Brown",
                email: "robert.brown@company.com",
                phone: "+1 (555) 123-4571",
                role: "viewer",
                department: "admin",
                status: "inactive",
                lastLogin: "2024-01-10T11:20:00Z",
                createdDate: "2023-11-15",
                permissions: ["dashboard.view", "inventory.view", "reports.view"],
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
            }
        ];

        this.filteredData = [...this.usersData];
        this.renderUsersTable();
    },

    renderUsersTable() {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = this.filteredData.map(user => this.renderUserRow(user)).join('');
        this.bindUserEvents();
    },

    renderUserRow(user) {
        const statusBadge = this.getStatusBadge(user.status);
        const roleBadge = this.getRoleBadge(user.role);
        const lastLogin = new Date(user.lastLogin).toLocaleDateString();
        
        return `
            <tr data-id="${user.id}">
                <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
                <td>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.firstName}" class="user-avatar-table">
                        <div class="user-details">
                            <div class="user-name">${user.firstName} ${user.lastName}</div>
                            <div class="user-department">${user.department}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="user-email">${user.email}</div>
                    <div class="user-phone">${user.phone || 'N/A'}</div>
                </td>
                <td>${roleBadge}</td>
                <td>${statusBadge}</td>
                <td>${lastLogin}</td>
                <td>
                    <span class="permissions-count">${user.permissions.length} permissions</span>
                    <button class="btn btn-secondary btn-sm" data-action="permissions" data-id="${user.id}">
                        <i class="fas fa-key"></i>
                    </button>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary btn-sm btn-icon" data-action="edit" data-id="${user.id}" title="Edit User">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-warning btn-sm btn-icon" data-action="suspend" data-id="${user.id}" title="Suspend User">
                            <i class="fas fa-user-lock"></i>
                        </button>
                        <button class="btn btn-info btn-sm btn-icon" data-action="reset-password" data-id="${user.id}" title="Reset Password">
                            <i class="fas fa-key"></i>
                        </button>
                        <button class="btn btn-error btn-sm btn-icon" data-action="delete" data-id="${user.id}" title="Delete User">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    bindUserEvents() {
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
                this.handleUserAction(action, id);
            });
        });

        // Select all checkbox
        const selectAll = document.getElementById('selectAllUsers');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                document.querySelectorAll('.user-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });
        }
    },

    getStatusBadge(status) {
        const badges = {
            'active': '<span class="badge badge-success">Active</span>',
            'inactive': '<span class="badge badge-gray">Inactive</span>',
            'suspended': '<span class="badge badge-error">Suspended</span>'
        };
        return badges[status] || '<span class="badge badge-gray">Unknown</span>';
    },

    getRoleBadge(role) {
        const badges = {
            'admin': '<span class="badge badge-error">Administrator</span>',
            'manager': '<span class="badge badge-warning">Manager</span>',
            'supervisor': '<span class="badge badge-primary">Supervisor</span>',
            'operator': '<span class="badge badge-info">Operator</span>',
            'viewer': '<span class="badge badge-gray">Viewer</span>'
        };
        return badges[role] || '<span class="badge badge-gray">Unknown</span>';
    },

    applyRolePermissions(role) {
        const rolePermissions = {
            'admin': ["dashboard.view", "inventory.view", "inventory.edit", "orders.view", "orders.edit", "warehouse.view", "reports.view", "users.manage", "settings.manage"],
            'manager': ["dashboard.view", "inventory.view", "inventory.edit", "orders.view", "orders.edit", "warehouse.view", "reports.view"],
            'supervisor': ["dashboard.view", "inventory.view", "orders.view", "orders.edit", "warehouse.view"],
            'operator': ["dashboard.view", "inventory.view", "orders.view", "warehouse.view"],
            'viewer': ["dashboard.view", "inventory.view", "reports.view"]
        };

        const permissions = rolePermissions[role] || [];
        
        // Clear all checkboxes first
        document.querySelectorAll('[name="permissions"]').forEach(cb => {
            cb.checked = false;
        });

        // Check permissions for the selected role
        permissions.forEach(permission => {
            const checkbox = document.querySelector(`[name="permissions"][value="${permission}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    },

    filterAndSort() {
        let filtered = [...this.usersData];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(user => 
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.department.toLowerCase().includes(searchTerm)
            );
        }

        // Apply role filter
        if (this.filters.role !== 'all') {
            filtered = filtered.filter(user => user.role === this.filters.role);
        }

        // Apply status filter
        if (this.filters.status !== 'all') {
            filtered = filtered.filter(user => user.status === this.filters.status);
        }

        this.filteredData = filtered;
        this.renderUsersTable();
    },

    clearFilters() {
        this.filters = {
            role: 'all',
            status: 'all',
            search: ''
        };

        document.getElementById('searchUsersInput').value = '';
        document.getElementById('roleFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';

        this.filteredData = [...this.usersData];
        this.renderUsersTable();
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

            if (field === 'name') {
                aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
                bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
            } else if (field === 'lastLogin') {
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

        this.renderUsersTable();
    },

    handleUserAction(action, id) {
        const user = this.usersData.find(u => u.id === parseInt(id));
        
        switch(action) {
            case 'edit':
                this.editUser(user);
                break;
            case 'permissions':
                this.managePermissions(user);
                break;
            case 'suspend':
                this.suspendUser(user);
                break;
            case 'reset-password':
                this.resetPassword(user);
                break;
            case 'delete':
                this.deleteUser(user);
                break;
        }
    },

    addUser(form) {
        const formData = new FormData(form);
        const permissions = Array.from(document.querySelectorAll('[name="permissions"]:checked')).map(cb => cb.value);
        
        // Validate passwords match
        if (formData.get('password') !== formData.get('confirmPassword')) {
            window.app.showNotification('Passwords do not match', 'error');
            return;
        }

        const newUser = {
            id: Math.max(...this.usersData.map(u => u.id)) + 1,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            department: formData.get('department'),
            status: 'active',
            lastLogin: new Date().toISOString(),
            createdDate: new Date().toISOString().split('T')[0],
            permissions: permissions,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        };

        this.usersData.push(newUser);
        this.filteredData = [...this.usersData];
        this.renderUsersTable();
        this.hideModal('addUserModal');
        form.reset();

        window.app.showNotification('User added successfully!', 'success');
    },

    editUser(user) {
        window.app.showNotification('Edit user functionality coming soon!', 'info');
    },

    managePermissions(user) {
        const permissionsHTML = `
            <div class="user-permissions">
                <div class="user-info-header">
                    <img src="${user.avatar}" alt="${user.firstName}" class="user-avatar">
                    <div class="user-details">
                        <h4>${user.firstName} ${user.lastName}</h4>
                        <div class="user-role">${this.getRoleBadge(user.role)}</div>
                    </div>
                </div>
                
                <div class="permissions-section">
                    <h5>Current Permissions</h5>
                    <div class="permissions-grid">
                        ${[
                            { key: "dashboard.view", label: "Dashboard View" },
                            { key: "inventory.view", label: "Inventory View" },
                            { key: "inventory.edit", label: "Inventory Edit" },
                            { key: "orders.view", label: "Orders View" },
                            { key: "orders.edit", label: "Orders Edit" },
                            { key: "warehouse.view", label: "Warehouse View" },
                            { key: "reports.view", label: "Reports View" },
                            { key: "users.manage", label: "Manage Users" },
                            { key: "settings.manage", label: "Manage Settings" }
                        ].map(permission => `
                            <label class="permission-item">
                                <input type="checkbox" name="userPermissions" value="${permission.key}" 
                                       ${user.permissions.includes(permission.key) ? 'checked' : ''}>
                                ${permission.label}
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('userPermissionsContent').innerHTML = permissionsHTML;
        document.getElementById('savePermissions').onclick = () => {
            this.updateUserPermissions(user.id);
        };
        this.showModal('userPermissionsModal');
    },

    updateUserPermissions(userId) {
        const permissions = Array.from(document.querySelectorAll('[name="userPermissions"]:checked')).map(cb => cb.value);
        const user = this.usersData.find(u => u.id === userId);
        
        if (user) {
            user.permissions = permissions;
            this.renderUsersTable();
            this.hideModal('userPermissionsModal');
            window.app.showNotification('Permissions updated successfully!', 'success');
        }
    },

    suspendUser(user) {
        if (confirm(`Are you sure you want to suspend ${user.firstName} ${user.lastName}?`)) {
            user.status = user.status === 'active' ? 'suspended' : 'active';
            this.renderUsersTable();
            window.app.showNotification(`User ${user.status === 'suspended' ? 'suspended' : 'reactivated'} successfully!`, 'success');
        }
    },

    resetPassword(user) {
        if (confirm(`Reset password for ${user.firstName} ${user.lastName}?`)) {
            window.app.showNotification('Password reset email sent successfully!', 'success');
        }
    },

    deleteUser(user) {
        if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
            this.usersData = this.usersData.filter(u => u.id !== user.id);
            this.filteredData = [...this.usersData];
            this.renderUsersTable();
            window.app.showNotification('User deleted successfully!', 'success');
        }
    },

    showBulkActions() {
        const selectedUsers = document.querySelectorAll('.user-checkbox:checked');
        if (selectedUsers.length === 0) {
            window.app.showNotification('Please select users for bulk actions', 'warning');
            return;
        }
        
        window.app.showNotification('Bulk actions functionality coming soon!', 'info');
    },

    exportUsers() {
        window.app.showNotification('Exporting users...', 'info');
    },

    importUsers() {
        window.app.showNotification('Import users functionality coming soon!', 'info');
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