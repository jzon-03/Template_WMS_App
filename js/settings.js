// Settings Module
window.SettingsModule = {
    currentTab: 'general',
    settings: {},

    load() {
        this.render();
        this.bindEvents();
        this.loadSettings();
    },

    render() {
        const content = `
            <div class="settings-container">
                <div class="settings-nav">
                    <div class="settings-nav-header">
                        <h3>Settings</h3>
                    </div>
                    <ul class="settings-nav-menu">
                        <li class="settings-nav-item active" data-tab="general">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-cog"></i>
                                <span>General</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="warehouse">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-warehouse"></i>
                                <span>Warehouse</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="inventory">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-boxes"></i>
                                <span>Inventory</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="orders">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-shopping-cart"></i>
                                <span>Orders</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="notifications">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-bell"></i>
                                <span>Notifications</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="security">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-shield-alt"></i>
                                <span>Security</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="integrations">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-plug"></i>
                                <span>Integrations</span>
                            </a>
                        </li>
                        <li class="settings-nav-item" data-tab="backup">
                            <a href="#" class="settings-nav-link">
                                <i class="fas fa-database"></i>
                                <span>Backup & Restore</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="settings-content">
                    <div class="settings-header">
                        <div class="settings-header-left">
                            <h1 class="settings-title" id="settingsTitle">General Settings</h1>
                            <p class="settings-subtitle" id="settingsSubtitle">Configure basic system preferences</p>
                        </div>
                        <div class="settings-header-right">
                            <button class="btn btn-secondary" id="resetSettingsBtn">
                                <i class="fas fa-undo"></i>
                                Reset to Defaults
                            </button>
                            <button class="btn btn-primary" id="saveSettingsBtn">
                                <i class="fas fa-save"></i>
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <div class="settings-body" id="settingsBody">
                        <!-- Settings content will be loaded here -->
                    </div>
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // Settings navigation
        document.querySelectorAll('.settings-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = item.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Save and reset buttons
        document.getElementById('saveSettingsBtn').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('resetSettingsBtn').addEventListener('click', () => {
            this.resetSettings();
        });
    },

    loadSettings() {
        // Load settings from localStorage or default values
        this.settings = {
            general: {
                companyName: 'Custom WMS',
                timeZone: 'America/New_York',
                dateFormat: 'MM/DD/YYYY',
                currency: 'USD',
                language: 'en',
                theme: 'light'
            },
            warehouse: {
                defaultLocation: 'Main Warehouse',
                autoAssignLocations: true,
                requireLocationScan: true,
                enableCycleCounting: true,
                cycleCountFrequency: 30,
                lowStockThreshold: 10
            },
            inventory: {
                trackExpiryDates: true,
                enableBarcodeScanning: true,
                autoReorderEnabled: true,
                reorderDays: 7,
                enableSeasonalAdjustments: false,
                stockValuationMethod: 'FIFO'
            },
            orders: {
                autoAllocateInventory: true,
                requireOrderApproval: false,
                maxOrderValue: 10000,
                enableOrderTracking: true,
                defaultShippingMethod: 'standard',
                enableOrderSplitting: true
            },
            notifications: {
                lowStockAlerts: true,
                orderStatusUpdates: true,
                systemMaintenanceAlerts: true,
                emailNotifications: true,
                smsNotifications: false,
                pushNotifications: true
            },
            security: {
                enableTwoFactor: false,
                sessionTimeout: 480,
                passwordExpiry: 90,
                maxLoginAttempts: 5,
                auditLogging: true,
                dataEncryption: true
            },
            integrations: {
                erpSystem: null,
                shippingCarriers: [],
                paymentGateways: [],
                ecommerceEnabled: false,
                apiAccess: false
            },
            backup: {
                autoBackupEnabled: true,
                backupFrequency: 'daily',
                retentionDays: 30,
                cloudBackupEnabled: false,
                lastBackupDate: '2024-01-15'
            }
        };

        this.switchTab('general');
    },

    switchTab(tabName) {
        // Update active nav item
        document.querySelectorAll('.settings-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update title and subtitle
        const titles = {
            general: { title: 'General Settings', subtitle: 'Configure basic system preferences' },
            warehouse: { title: 'Warehouse Settings', subtitle: 'Configure warehouse operations and policies' },
            inventory: { title: 'Inventory Settings', subtitle: 'Manage inventory tracking and valuation' },
            orders: { title: 'Order Settings', subtitle: 'Configure order processing and fulfillment' },
            notifications: { title: 'Notification Settings', subtitle: 'Manage alerts and communication preferences' },
            security: { title: 'Security Settings', subtitle: 'Configure authentication and security policies' },
            integrations: { title: 'Integration Settings', subtitle: 'Manage third-party system connections' },
            backup: { title: 'Backup & Restore', subtitle: 'Configure data backup and recovery options' }
        };

        const tabInfo = titles[tabName];
        document.getElementById('settingsTitle').textContent = tabInfo.title;
        document.getElementById('settingsSubtitle').textContent = tabInfo.subtitle;

        // Load tab content
        this.currentTab = tabName;
        this.renderTabContent(tabName);
    },

    renderTabContent(tabName) {
        const settingsBody = document.getElementById('settingsBody');
        
        switch(tabName) {
            case 'general':
                settingsBody.innerHTML = this.renderGeneralSettings();
                break;
            case 'warehouse':
                settingsBody.innerHTML = this.renderWarehouseSettings();
                break;
            case 'inventory':
                settingsBody.innerHTML = this.renderInventorySettings();
                break;
            case 'orders':
                settingsBody.innerHTML = this.renderOrderSettings();
                break;
            case 'notifications':
                settingsBody.innerHTML = this.renderNotificationSettings();
                break;
            case 'security':
                settingsBody.innerHTML = this.renderSecuritySettings();
                break;
            case 'integrations':
                settingsBody.innerHTML = this.renderIntegrationSettings();
                break;
            case 'backup':
                settingsBody.innerHTML = this.renderBackupSettings();
                break;
        }

        this.bindTabEvents(tabName);
    },

    renderGeneralSettings() {
        const settings = this.settings.general;
        return `
            <div class="settings-section">
                <h4>Company Information</h4>
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Company Name</label>
                            <input type="text" class="form-input" name="companyName" value="${settings.companyName}">
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Time Zone</label>
                            <select class="form-select" name="timeZone">
                                <option value="America/New_York" ${settings.timeZone === 'America/New_York' ? 'selected' : ''}>Eastern (ET)</option>
                                <option value="America/Chicago" ${settings.timeZone === 'America/Chicago' ? 'selected' : ''}>Central (CT)</option>
                                <option value="America/Denver" ${settings.timeZone === 'America/Denver' ? 'selected' : ''}>Mountain (MT)</option>
                                <option value="America/Los_Angeles" ${settings.timeZone === 'America/Los_Angeles' ? 'selected' : ''}>Pacific (PT)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Localization</h4>
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Date Format</label>
                            <select class="form-select" name="dateFormat">
                                <option value="MM/DD/YYYY" ${settings.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY" ${settings.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD" ${settings.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Currency</label>
                            <select class="form-select" name="currency">
                                <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                                <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                                <option value="GBP" ${settings.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
                                <option value="CAD" ${settings.currency === 'CAD' ? 'selected' : ''}>CAD (C$)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Language</label>
                            <select class="form-select" name="language">
                                <option value="en" ${settings.language === 'en' ? 'selected' : ''}>English</option>
                                <option value="es" ${settings.language === 'es' ? 'selected' : ''}>Spanish</option>
                                <option value="fr" ${settings.language === 'fr' ? 'selected' : ''}>French</option>
                                <option value="de" ${settings.language === 'de' ? 'selected' : ''}>German</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Theme</label>
                            <select class="form-select" name="theme">
                                <option value="light" ${settings.theme === 'light' ? 'selected' : ''}>Light</option>
                                <option value="dark" ${settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
                                <option value="auto" ${settings.theme === 'auto' ? 'selected' : ''}>Auto (System)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderWarehouseSettings() {
        const settings = this.settings.warehouse;
        return `
            <div class="settings-section">
                <h4>Warehouse Configuration</h4>
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Default Location</label>
                            <input type="text" class="form-input" name="defaultLocation" value="${settings.defaultLocation}">
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Low Stock Threshold</label>
                            <input type="number" class="form-input" name="lowStockThreshold" value="${settings.lowStockThreshold}">
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Location Management</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="autoAssignLocations" ${settings.autoAssignLocations ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Auto-assign locations to new products
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="requireLocationScan" ${settings.requireLocationScan ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Require location scan for picks
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Cycle Counting</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableCycleCounting" ${settings.enableCycleCounting ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable cycle counting
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Cycle Count Frequency (days)</label>
                    <input type="number" class="form-input" name="cycleCountFrequency" value="${settings.cycleCountFrequency}">
                </div>
            </div>
        `;
    },

    renderInventorySettings() {
        const settings = this.settings.inventory;
        return `
            <div class="settings-section">
                <h4>Inventory Tracking</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="trackExpiryDates" ${settings.trackExpiryDates ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Track product expiry dates
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableBarcodeScanning" ${settings.enableBarcodeScanning ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable barcode scanning
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Auto Reordering</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="autoReorderEnabled" ${settings.autoReorderEnabled ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable automatic reordering
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableSeasonalAdjustments" ${settings.enableSeasonalAdjustments ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Apply seasonal adjustments
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Reorder Lead Time (days)</label>
                    <input type="number" class="form-input" name="reorderDays" value="${settings.reorderDays}">
                </div>
            </div>

            <div class="settings-section">
                <h4>Valuation</h4>
                <div class="form-group">
                    <label class="form-label">Stock Valuation Method</label>
                    <select class="form-select" name="stockValuationMethod">
                        <option value="FIFO" ${settings.stockValuationMethod === 'FIFO' ? 'selected' : ''}>FIFO (First In, First Out)</option>
                        <option value="LIFO" ${settings.stockValuationMethod === 'LIFO' ? 'selected' : ''}>LIFO (Last In, First Out)</option>
                        <option value="WAC" ${settings.stockValuationMethod === 'WAC' ? 'selected' : ''}>Weighted Average Cost</option>
                    </select>
                </div>
            </div>
        `;
    },

    renderOrderSettings() {
        const settings = this.settings.orders;
        return `
            <div class="settings-section">
                <h4>Order Processing</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="autoAllocateInventory" ${settings.autoAllocateInventory ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Auto-allocate inventory to orders
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="requireOrderApproval" ${settings.requireOrderApproval ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Require order approval for large orders
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableOrderTracking" ${settings.enableOrderTracking ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable order tracking
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableOrderSplitting" ${settings.enableOrderSplitting ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Allow order splitting
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Order Limits</h4>
                <div class="form-group">
                    <label class="form-label">Maximum Order Value ($)</label>
                    <input type="number" class="form-input" name="maxOrderValue" value="${settings.maxOrderValue}">
                </div>
            </div>

            <div class="settings-section">
                <h4>Shipping</h4>
                <div class="form-group">
                    <label class="form-label">Default Shipping Method</label>
                    <select class="form-select" name="defaultShippingMethod">
                        <option value="standard" ${settings.defaultShippingMethod === 'standard' ? 'selected' : ''}>Standard (5-7 days)</option>
                        <option value="express" ${settings.defaultShippingMethod === 'express' ? 'selected' : ''}>Express (2-3 days)</option>
                        <option value="overnight" ${settings.defaultShippingMethod === 'overnight' ? 'selected' : ''}>Overnight</option>
                    </select>
                </div>
            </div>
        `;
    },

    renderNotificationSettings() {
        const settings = this.settings.notifications;
        return `
            <div class="settings-section">
                <h4>Alert Types</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="lowStockAlerts" ${settings.lowStockAlerts ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Low stock alerts
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="orderStatusUpdates" ${settings.orderStatusUpdates ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Order status updates
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="systemMaintenanceAlerts" ${settings.systemMaintenanceAlerts ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            System maintenance alerts
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Delivery Methods</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="emailNotifications" ${settings.emailNotifications ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Email notifications
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="smsNotifications" ${settings.smsNotifications ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            SMS notifications
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="pushNotifications" ${settings.pushNotifications ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Push notifications
                        </label>
                    </div>
                </div>
            </div>
        `;
    },

    renderSecuritySettings() {
        const settings = this.settings.security;
        return `
            <div class="settings-section">
                <h4>Authentication</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="enableTwoFactor" ${settings.enableTwoFactor ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable two-factor authentication
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="auditLogging" ${settings.auditLogging ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable audit logging
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="dataEncryption" ${settings.dataEncryption ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable data encryption
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Session Management</h4>
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Session Timeout (minutes)</label>
                            <input type="number" class="form-input" name="sessionTimeout" value="${settings.sessionTimeout}">
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Max Login Attempts</label>
                            <input type="number" class="form-input" name="maxLoginAttempts" value="${settings.maxLoginAttempts}">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Password Expiry (days)</label>
                    <input type="number" class="form-input" name="passwordExpiry" value="${settings.passwordExpiry}">
                </div>
            </div>
        `;
    },

    renderIntegrationSettings() {
        const settings = this.settings.integrations;
        return `
            <div class="settings-section">
                <h4>System Integrations</h4>
                <div class="integration-item">
                    <div class="integration-info">
                        <div class="integration-name">ERP System</div>
                        <div class="integration-status ${settings.erpSystem ? 'connected' : 'disconnected'}">
                            ${settings.erpSystem ? 'Connected' : 'Not Connected'}
                        </div>
                    </div>
                    <button class="btn btn-secondary">
                        ${settings.erpSystem ? 'Configure' : 'Connect'}
                    </button>
                </div>
            </div>

            <div class="settings-section">
                <h4>E-commerce</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="ecommerceEnabled" ${settings.ecommerceEnabled ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable e-commerce integration
                        </label>
                    </div>
                </div>
                <div class="integration-list">
                    <div class="integration-item">
                        <div class="integration-info">
                            <div class="integration-name">Shopify</div>
                            <div class="integration-status disconnected">Not Connected</div>
                        </div>
                        <button class="btn btn-secondary">Connect</button>
                    </div>
                    <div class="integration-item">
                        <div class="integration-info">
                            <div class="integration-name">WooCommerce</div>
                            <div class="integration-status disconnected">Not Connected</div>
                        </div>
                        <button class="btn btn-secondary">Connect</button>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>API Access</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="apiAccess" ${settings.apiAccess ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable API access
                        </label>
                    </div>
                </div>
                ${settings.apiAccess ? `
                    <div class="api-info">
                        <div class="form-group">
                            <label class="form-label">API Key</label>
                            <div class="api-key-container">
                                <input type="password" class="form-input" value="sk_live_abc123def456ghi789" readonly>
                                <button class="btn btn-secondary btn-sm">Regenerate</button>
                            </div>
                        </div>
                        <div class="api-docs">
                            <a href="#" class="btn btn-secondary btn-sm">
                                <i class="fas fa-book"></i>
                                View API Documentation
                            </a>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    renderBackupSettings() {
        const settings = this.settings.backup;
        return `
            <div class="settings-section">
                <h4>Automatic Backups</h4>
                <div class="settings-toggles">
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="autoBackupEnabled" ${settings.autoBackupEnabled ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable automatic backups
                        </label>
                    </div>
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="cloudBackupEnabled" ${settings.cloudBackupEnabled ? 'checked' : ''}>
                            <span class="toggle-switch"></span>
                            Enable cloud backup
                        </label>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Backup Frequency</label>
                            <select class="form-select" name="backupFrequency">
                                <option value="daily" ${settings.backupFrequency === 'daily' ? 'selected' : ''}>Daily</option>
                                <option value="weekly" ${settings.backupFrequency === 'weekly' ? 'selected' : ''}>Weekly</option>
                                <option value="monthly" ${settings.backupFrequency === 'monthly' ? 'selected' : ''}>Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label class="form-label">Retention Period (days)</label>
                            <input type="number" class="form-input" name="retentionDays" value="${settings.retentionDays}">
                        </div>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Backup Status</h4>
                <div class="backup-status">
                    <div class="backup-info">
                        <div class="backup-label">Last Backup:</div>
                        <div class="backup-value">${new Date(settings.lastBackupDate).toLocaleDateString()}</div>
                    </div>
                    <div class="backup-actions">
                        <button class="btn btn-primary" id="createBackupBtn">
                            <i class="fas fa-download"></i>
                            Create Backup Now
                        </button>
                        <button class="btn btn-secondary" id="restoreBackupBtn">
                            <i class="fas fa-upload"></i>
                            Restore from Backup
                        </button>
                    </div>
                </div>
            </div>

            <div class="settings-section">
                <h4>Data Export</h4>
                <div class="export-options">
                    <button class="btn btn-secondary" id="exportAllDataBtn">
                        <i class="fas fa-database"></i>
                        Export All Data
                    </button>
                    <button class="btn btn-secondary" id="exportInventoryBtn">
                        <i class="fas fa-boxes"></i>
                        Export Inventory Only
                    </button>
                    <button class="btn btn-secondary" id="exportOrdersBtn">
                        <i class="fas fa-shopping-cart"></i>
                        Export Orders Only
                    </button>
                </div>
            </div>
        `;
    },

    bindTabEvents(tabName) {
        // Bind specific events for each tab
        switch(tabName) {
            case 'backup':
                this.bindBackupEvents();
                break;
            case 'integrations':
                this.bindIntegrationEvents();
                break;
        }
    },

    bindBackupEvents() {
        document.getElementById('createBackupBtn')?.addEventListener('click', () => {
            this.createBackup();
        });

        document.getElementById('restoreBackupBtn')?.addEventListener('click', () => {
            this.restoreBackup();
        });

        document.getElementById('exportAllDataBtn')?.addEventListener('click', () => {
            this.exportData('all');
        });

        document.getElementById('exportInventoryBtn')?.addEventListener('click', () => {
            this.exportData('inventory');
        });

        document.getElementById('exportOrdersBtn')?.addEventListener('click', () => {
            this.exportData('orders');
        });
    },

    bindIntegrationEvents() {
        // Bind integration-specific events
        document.querySelectorAll('.integration-item button').forEach(btn => {
            btn.addEventListener('click', () => {
                window.app.showNotification('Integration management coming soon!', 'info');
            });
        });
    },

    saveSettings() {
        const formData = this.collectFormData();
        
        // Update settings object
        Object.keys(formData).forEach(key => {
            if (this.settings[this.currentTab]) {
                this.settings[this.currentTab][key] = formData[key];
            }
        });

        // Save to localStorage (in real app, would save to server)
        localStorage.setItem('wms_settings', JSON.stringify(this.settings));

        window.app.showNotification('Settings saved successfully!', 'success');
    },

    resetSettings() {
        if (confirm('Are you sure you want to reset settings to default values? This action cannot be undone.')) {
            // Reset current tab settings to defaults
            this.loadSettings();
            this.renderTabContent(this.currentTab);
            window.app.showNotification('Settings reset to defaults', 'info');
        }
    },

    collectFormData() {
        const formData = {};
        const settingsBody = document.getElementById('settingsBody');
        
        // Collect input values
        settingsBody.querySelectorAll('input, select').forEach(input => {
            const name = input.name;
            if (name) {
                if (input.type === 'checkbox') {
                    formData[name] = input.checked;
                } else if (input.type === 'number') {
                    formData[name] = parseInt(input.value) || 0;
                } else {
                    formData[name] = input.value;
                }
            }
        });

        return formData;
    },

    createBackup() {
        window.app.showNotification('Creating backup...', 'info');
        
        // Simulate backup creation
        setTimeout(() => {
            this.settings.backup.lastBackupDate = new Date().toISOString().split('T')[0];
            window.app.showNotification('Backup created successfully!', 'success');
            this.renderTabContent('backup');
        }, 2000);
    },

    restoreBackup() {
        if (confirm('Are you sure you want to restore from backup? This will overwrite current data.')) {
            window.app.showNotification('Backup restore functionality coming soon!', 'info');
        }
    },

    exportData(type) {
        window.app.showNotification(`Exporting ${type} data...`, 'info');
        
        // Simulate data export
        setTimeout(() => {
            window.app.showNotification(`${type} data exported successfully!`, 'success');
        }, 1500);
    }
};