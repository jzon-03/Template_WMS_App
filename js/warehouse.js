// Warehouse Layout Module
window.WarehouseModule = {
    currentView: 'layout',
    selectedZone: null,
    layoutData: null,

    load() {
        this.render();
        this.bindEvents();
        this.loadWarehouseData();
    },

    render() {
        const content = `
            <div class="warehouse-header">
                <div class="warehouse-controls">
                    <div class="control-group">
                        <button class="btn btn-primary" id="editLayoutBtn">
                            <i class="fas fa-edit"></i>
                            Edit Layout
                        </button>
                        <button class="btn btn-secondary" id="addZoneBtn">
                            <i class="fas fa-plus"></i>
                            Add Zone
                        </button>
                        <button class="btn btn-secondary" id="optimizeBtn">
                            <i class="fas fa-magic"></i>
                            Optimize Layout
                        </button>
                        <button class="btn btn-secondary" id="printLayoutBtn">
                            <i class="fas fa-print"></i>
                            Print Layout
                        </button>
                    </div>
                    
                    <div class="view-controls">
                        <div class="btn-group">
                            <button class="btn btn-secondary active" id="layoutViewBtn" data-view="layout">
                                <i class="fas fa-map"></i>
                                Layout
                            </button>
                            <button class="btn btn-secondary" id="heatmapViewBtn" data-view="heatmap">
                                <i class="fas fa-fire"></i>
                                Heatmap
                            </button>
                            <button class="btn btn-secondary" id="analyticsViewBtn" data-view="analytics">
                                <i class="fas fa-chart-line"></i>
                                Analytics
                            </button>
                        </div>
                    </div>
                </div>

                <div class="warehouse-filters">
                    <div class="filter-group">
                        <div class="form-group">
                            <select class="form-select" id="floorFilter">
                                <option value="all">All Floors</option>
                                <option value="ground">Ground Floor</option>
                                <option value="mezzanine">Mezzanine</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="zoneTypeFilter">
                                <option value="all">All Zone Types</option>
                                <option value="storage">Storage</option>
                                <option value="picking">Picking</option>
                                <option value="packing">Packing</option>
                                <option value="shipping">Shipping</option>
                                <option value="receiving">Receiving</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <select class="form-select" id="capacityFilter">
                                <option value="all">All Capacity</option>
                                <option value="high">80-100%</option>
                                <option value="medium">50-79%</option>
                                <option value="low">0-49%</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary" id="clearWarehouseFiltersBtn">
                            <i class="fas fa-times"></i>
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            <div class="warehouse-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Total Storage Space</div>
                            <div class="stat-icon" style="background-color: var(--primary-light); color: var(--primary-color);">
                                <i class="fas fa-warehouse"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="totalSpace">45,000 sqft</div>
                        <div class="stat-change neutral">
                            <i class="fas fa-minus"></i>
                            <span>No change</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Space Utilization</div>
                            <div class="stat-icon" style="background-color: #d1fae5; color: var(--success-color);">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="utilization">78%</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>5% vs last month</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Active Zones</div>
                            <div class="stat-icon" style="background-color: #fef3c7; color: var(--warning-color);">
                                <i class="fas fa-th"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="activeZones">24</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>2 new this week</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Efficiency Score</div>
                            <div class="stat-icon" style="background-color: #dbeafe; color: var(--info-color);">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                        </div>
                        <div class="stat-value" id="efficiencyScore">92%</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>3% improvement</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="warehouse-content">
                <div class="warehouse-layout-container">
                    <div class="layout-sidebar">
                        <div class="sidebar-section">
                            <h4>Zone Information</h4>
                            <div id="zoneInfo" class="zone-info-panel">
                                <p class="text-muted">Select a zone to view details</p>
                            </div>
                        </div>
                        
                        <div class="sidebar-section">
                            <h4>Legend</h4>
                            <div class="legend">
                                <div class="legend-item">
                                    <div class="legend-color storage"></div>
                                    <span>Storage Zones</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color picking"></div>
                                    <span>Picking Zones</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color packing"></div>
                                    <span>Packing Areas</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color shipping"></div>
                                    <span>Shipping Docks</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color receiving"></div>
                                    <span>Receiving Docks</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color office"></div>
                                    <span>Office Areas</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sidebar-section">
                            <h4>Capacity Overview</h4>
                            <div class="capacity-overview">
                                <div class="capacity-item">
                                    <div class="capacity-label">Zone A</div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 85%"></div>
                                    </div>
                                    <span class="capacity-value">85%</span>
                                </div>
                                <div class="capacity-item">
                                    <div class="capacity-label">Zone B</div>
                                    <div class="progress">
                                        <div class="progress-bar warning" style="width: 92%"></div>
                                    </div>
                                    <span class="capacity-value">92%</span>
                                </div>
                                <div class="capacity-item">
                                    <div class="capacity-label">Zone C</div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 67%"></div>
                                    </div>
                                    <span class="capacity-value">67%</span>
                                </div>
                                <div class="capacity-item">
                                    <div class="capacity-label">Zone D</div>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 73%"></div>
                                    </div>
                                    <span class="capacity-value">73%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="layout-main">
                        <div id="warehouseMap" class="warehouse-map">
                            <!-- Warehouse layout will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Zone Details Modal -->
            <div class="modal" id="zoneDetailsModal" style="max-width: 700px;">
                <div class="modal-header">
                    <h3 class="modal-title">Zone Details</h3>
                    <button class="modal-close" data-modal="zoneDetailsModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="zoneDetailsContent">
                        <!-- Zone details will be populated here -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="zoneDetailsModal">Close</button>
                    <button type="button" class="btn btn-primary" id="editZoneBtn">Edit Zone</button>
                </div>
            </div>

            <!-- Add Zone Modal -->
            <div class="modal" id="addZoneModal">
                <div class="modal-header">
                    <h3 class="modal-title">Add New Zone</h3>
                    <button class="modal-close" data-modal="addZoneModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addZoneForm">
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Zone Name</label>
                                    <input type="text" class="form-input" name="name" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Zone Type</label>
                                    <select class="form-select" name="type" required>
                                        <option value="">Select Type</option>
                                        <option value="storage">Storage</option>
                                        <option value="picking">Picking</option>
                                        <option value="packing">Packing</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="receiving">Receiving</option>
                                        <option value="office">Office</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Floor</label>
                                    <select class="form-select" name="floor" required>
                                        <option value="ground">Ground Floor</option>
                                        <option value="mezzanine">Mezzanine</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Area (sqft)</label>
                                    <input type="number" class="form-input" name="area" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Capacity</label>
                                    <input type="number" class="form-input" name="capacity" required>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Current Usage</label>
                                    <input type="number" class="form-input" name="currentUsage" value="0">
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
                                    <label class="form-label">Temperature Control</label>
                                    <select class="form-select" name="temperature">
                                        <option value="ambient">Ambient</option>
                                        <option value="refrigerated">Refrigerated</option>
                                        <option value="frozen">Frozen</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-col">
                                <div class="form-group">
                                    <label class="form-label">Security Level</label>
                                    <select class="form-select" name="security">
                                        <option value="standard">Standard</option>
                                        <option value="high">High Security</option>
                                        <option value="restricted">Restricted Access</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-modal="addZoneModal">Cancel</button>
                    <button type="submit" form="addZoneForm" class="btn btn-primary">Add Zone</button>
                </div>
            </div>
        `;

        document.getElementById('contentContainer').innerHTML = content;
    },

    bindEvents() {
        // View toggle buttons
        document.getElementById('layoutViewBtn').addEventListener('click', () => {
            this.setView('layout');
        });

        document.getElementById('heatmapViewBtn').addEventListener('click', () => {
            this.setView('heatmap');
        });

        document.getElementById('analyticsViewBtn').addEventListener('click', () => {
            this.setView('analytics');
        });

        // Control buttons
        document.getElementById('editLayoutBtn').addEventListener('click', () => {
            this.toggleEditMode();
        });

        document.getElementById('addZoneBtn').addEventListener('click', () => {
            this.showModal('addZoneModal');
        });

        document.getElementById('optimizeBtn').addEventListener('click', () => {
            this.optimizeLayout();
        });

        document.getElementById('printLayoutBtn').addEventListener('click', () => {
            this.printLayout();
        });

        // Filter controls
        ['floorFilter', 'zoneTypeFilter', 'capacityFilter'].forEach(filterId => {
            document.getElementById(filterId).addEventListener('change', () => {
                this.applyFilters();
            });
        });

        document.getElementById('clearWarehouseFiltersBtn').addEventListener('click', () => {
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

        // Add zone form
        document.getElementById('addZoneForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addZone(e.target);
        });
    },

    loadWarehouseData() {
        // Sample warehouse layout data
        this.layoutData = {
            zones: [
                {
                    id: 'A1', name: 'Storage Zone A1', type: 'storage', floor: 'ground',
                    x: 50, y: 50, width: 120, height: 80, area: 1200, capacity: 500, currentUsage: 425,
                    temperature: 'ambient', security: 'standard',
                    description: 'Main storage area for electronics and consumer goods'
                },
                {
                    id: 'A2', name: 'Storage Zone A2', type: 'storage', floor: 'ground',
                    x: 180, y: 50, width: 120, height: 80, area: 1200, capacity: 500, currentUsage: 460,
                    temperature: 'ambient', security: 'standard',
                    description: 'Secondary storage for overflow and seasonal items'
                },
                {
                    id: 'B1', name: 'Picking Zone B1', type: 'picking', floor: 'ground',
                    x: 50, y: 150, width: 100, height: 60, area: 800, capacity: 200, currentUsage: 134,
                    temperature: 'ambient', security: 'standard',
                    description: 'High-velocity picking area for fast-moving items'
                },
                {
                    id: 'B2', name: 'Picking Zone B2', type: 'picking', floor: 'ground',
                    x: 200, y: 150, width: 100, height: 60, area: 800, capacity: 200, currentUsage: 156,
                    temperature: 'ambient', security: 'standard',
                    description: 'Medium-velocity picking area'
                },
                {
                    id: 'C1', name: 'Packing Station 1', type: 'packing', floor: 'ground',
                    x: 50, y: 230, width: 80, height: 40, area: 400, capacity: 50, currentUsage: 45,
                    temperature: 'ambient', security: 'standard',
                    description: 'Main packing station for standard orders'
                },
                {
                    id: 'C2', name: 'Packing Station 2', type: 'packing', floor: 'ground',
                    x: 140, y: 230, width: 80, height: 40, area: 400, capacity: 50, currentUsage: 38,
                    temperature: 'ambient', security: 'standard',
                    description: 'Secondary packing station for bulk orders'
                },
                {
                    id: 'D1', name: 'Shipping Dock 1', type: 'shipping', floor: 'ground',
                    x: 50, y: 290, width: 60, height: 40, area: 300, capacity: 30, currentUsage: 22,
                    temperature: 'ambient', security: 'standard',
                    description: 'Loading dock for standard shipping'
                },
                {
                    id: 'D2', name: 'Shipping Dock 2', type: 'shipping', floor: 'ground',
                    x: 120, y: 290, width: 60, height: 40, area: 300, capacity: 30, currentUsage: 18,
                    temperature: 'ambient', security: 'standard',
                    description: 'Loading dock for express shipping'
                },
                {
                    id: 'E1', name: 'Receiving Dock', type: 'receiving', floor: 'ground',
                    x: 320, y: 50, width: 80, height: 60, area: 600, capacity: 100, currentUsage: 73,
                    temperature: 'ambient', security: 'standard',
                    description: 'Main receiving area for incoming shipments'
                },
                {
                    id: 'F1', name: 'Office Area', type: 'office', floor: 'mezzanine',
                    x: 320, y: 230, width: 80, height: 100, area: 1000, capacity: 25, currentUsage: 23,
                    temperature: 'ambient', security: 'high',
                    description: 'Administrative offices and meeting rooms'
                }
            ],
            paths: [
                { from: 'E1', to: 'A1', type: 'main' },
                { from: 'E1', to: 'A2', type: 'main' },
                { from: 'A1', to: 'B1', type: 'picking' },
                { from: 'A2', to: 'B2', type: 'picking' },
                { from: 'B1', to: 'C1', type: 'packing' },
                { from: 'B2', to: 'C2', type: 'packing' },
                { from: 'C1', to: 'D1', type: 'shipping' },
                { from: 'C2', to: 'D2', type: 'shipping' }
            ]
        };

        this.renderLayout();
    },

    renderLayout() {
        const map = document.getElementById('warehouseMap');
        
        if (this.currentView === 'layout') {
            this.renderWarehouseLayout(map);
        } else if (this.currentView === 'heatmap') {
            this.renderHeatmap(map);
        } else if (this.currentView === 'analytics') {
            this.renderAnalytics(map);
        }
    },

    renderWarehouseLayout(container) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "500");
        svg.setAttribute("viewBox", "0 0 500 400");
        svg.classList.add("warehouse-svg");

        // Add grid background
        this.addGrid(svg);

        // Add warehouse outline
        this.addWarehouseOutline(svg);

        // Add zones
        this.layoutData.zones.forEach(zone => {
            this.addZone(svg, zone);
        });

        // Add paths
        this.layoutData.paths.forEach(path => {
            this.addPath(svg, path);
        });

        container.innerHTML = '';
        container.appendChild(svg);

        // Bind zone click events
        this.bindZoneEvents();
    },

    renderHeatmap(container) {
        const content = `
            <div class="heatmap-container">
                <div class="heatmap-legend">
                    <h4>Utilization Heatmap</h4>
                    <div class="heat-scale">
                        <span>Low</span>
                        <div class="heat-gradient"></div>
                        <span>High</span>
                    </div>
                </div>
                <div class="heatmap-grid">
                    ${this.layoutData.zones.map(zone => {
                        const utilization = (zone.currentUsage / zone.capacity * 100);
                        const heatClass = utilization >= 80 ? 'high' : utilization >= 50 ? 'medium' : 'low';
                        return `
                            <div class="heat-cell ${heatClass}" data-zone="${zone.id}">
                                <div class="heat-label">${zone.name}</div>
                                <div class="heat-value">${utilization.toFixed(0)}%</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = content;
    },

    renderAnalytics(container) {
        const content = `
            <div class="analytics-container">
                <div class="analytics-grid">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Zone Efficiency</div>
                        </div>
                        <div class="card-body">
                            <canvas id="zoneEfficiencyChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Space Utilization Trend</div>
                        </div>
                        <div class="card-body">
                            <canvas id="utilizationTrendChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Zone Performance Metrics</div>
                        </div>
                        <div class="card-body">
                            <div class="metrics-list">
                                ${this.layoutData.zones.map(zone => {
                                    const utilization = (zone.currentUsage / zone.capacity * 100);
                                    return `
                                        <div class="metric-item">
                                            <div class="metric-info">
                                                <span class="metric-name">${zone.name}</span>
                                                <span class="metric-type">${zone.type}</span>
                                            </div>
                                            <div class="metric-progress">
                                                <div class="progress">
                                                    <div class="progress-bar ${utilization >= 85 ? 'warning' : ''}" 
                                                         style="width: ${utilization}%"></div>
                                                </div>
                                                <span class="metric-value">${utilization.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Recommendations</div>
                        </div>
                        <div class="card-body">
                            <div class="recommendations">
                                <div class="recommendation-item">
                                    <i class="fas fa-lightbulb text-warning"></i>
                                    <div class="recommendation-content">
                                        <div class="recommendation-title">Optimize Zone A2</div>
                                        <div class="recommendation-desc">Zone A2 is at 92% capacity. Consider redistributing inventory to Zone A1.</div>
                                    </div>
                                </div>
                                <div class="recommendation-item">
                                    <i class="fas fa-route text-info"></i>
                                    <div class="recommendation-content">
                                        <div class="recommendation-title">Improve Picking Route</div>
                                        <div class="recommendation-desc">Adding a path between Zone B1 and B2 could reduce picking time by 15%.</div>
                                    </div>
                                </div>
                                <div class="recommendation-item">
                                    <i class="fas fa-expand text-success"></i>
                                    <div class="recommendation-content">
                                        <div class="recommendation-title">Expand Packing Area</div>
                                        <div class="recommendation-desc">Consider adding another packing station to handle peak order volumes.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = content;
        this.initializeAnalyticsCharts();
    },

    addGrid(svg) {
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        pattern.setAttribute("id", "grid");
        pattern.setAttribute("width", "20");
        pattern.setAttribute("height", "20");
        pattern.setAttribute("patternUnits", "userSpaceOnUse");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M 20 0 L 0 0 0 20");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#e2e8f0");
        path.setAttribute("stroke-width", "1");
        
        pattern.appendChild(path);
        defs.appendChild(pattern);
        svg.appendChild(defs);
        
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", "url(#grid)");
        svg.appendChild(rect);
    },

    addWarehouseOutline(svg) {
        const outline = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        outline.setAttribute("x", "30");
        outline.setAttribute("y", "30");
        outline.setAttribute("width", "440");
        outline.setAttribute("height", "340");
        outline.setAttribute("fill", "none");
        outline.setAttribute("stroke", "#374151");
        outline.setAttribute("stroke-width", "2");
        svg.appendChild(outline);
    },

    addZone(svg, zone) {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.classList.add("zone-group");
        group.setAttribute("data-zone-id", zone.id);

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", zone.x);
        rect.setAttribute("y", zone.y);
        rect.setAttribute("width", zone.width);
        rect.setAttribute("height", zone.height);
        rect.setAttribute("fill", this.getZoneColor(zone.type, zone.currentUsage / zone.capacity));
        rect.setAttribute("stroke", "#374151");
        rect.setAttribute("stroke-width", "1");
        rect.classList.add("zone-rect");

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", zone.x + zone.width / 2);
        text.setAttribute("y", zone.y + zone.height / 2 - 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-family", "Inter, sans-serif");
        text.setAttribute("font-size", "12");
        text.setAttribute("font-weight", "600");
        text.setAttribute("fill", "#374151");
        text.textContent = zone.name;

        const utilization = Math.round((zone.currentUsage / zone.capacity) * 100);
        const utilizationText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        utilizationText.setAttribute("x", zone.x + zone.width / 2);
        utilizationText.setAttribute("y", zone.y + zone.height / 2 + 10);
        utilizationText.setAttribute("text-anchor", "middle");
        utilizationText.setAttribute("font-family", "Inter, sans-serif");
        utilizationText.setAttribute("font-size", "10");
        utilizationText.setAttribute("fill", "#6b7280");
        utilizationText.textContent = `${utilization}%`;

        group.appendChild(rect);
        group.appendChild(text);
        group.appendChild(utilizationText);
        svg.appendChild(group);
    },

    addPath(svg, path) {
        const fromZone = this.layoutData.zones.find(z => z.id === path.from);
        const toZone = this.layoutData.zones.find(z => z.id === path.to);
        
        if (!fromZone || !toZone) return;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromZone.x + fromZone.width / 2);
        line.setAttribute("y1", fromZone.y + fromZone.height / 2);
        line.setAttribute("x2", toZone.x + toZone.width / 2);
        line.setAttribute("y2", toZone.y + toZone.height / 2);
        line.setAttribute("stroke", "#9ca3af");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("stroke-dasharray", "5,5");
        line.classList.add("path-line");
        
        svg.appendChild(line);
    },

    getZoneColor(type, utilization) {
        const baseColors = {
            storage: '#dbeafe',
            picking: '#fef3c7',
            packing: '#d1fae5',
            shipping: '#f3e8ff',
            receiving: '#fce7f3',
            office: '#f1f5f9'
        };
        
        // Adjust color intensity based on utilization
        if (utilization >= 0.9) {
            return '#fee2e2'; // Red for high utilization
        } else if (utilization >= 0.8) {
            return '#fef3c7'; // Yellow for medium-high utilization
        }
        
        return baseColors[type] || '#f9fafb';
    },

    bindZoneEvents() {
        document.querySelectorAll('.zone-group').forEach(zoneGroup => {
            zoneGroup.addEventListener('click', (e) => {
                const zoneId = zoneGroup.getAttribute('data-zone-id');
                this.selectZone(zoneId);
            });

            zoneGroup.addEventListener('mouseenter', () => {
                zoneGroup.querySelector('.zone-rect').setAttribute('stroke-width', '3');
            });

            zoneGroup.addEventListener('mouseleave', () => {
                if (!zoneGroup.classList.contains('selected')) {
                    zoneGroup.querySelector('.zone-rect').setAttribute('stroke-width', '1');
                }
            });
        });
    },

    selectZone(zoneId) {
        // Remove previous selection
        document.querySelectorAll('.zone-group.selected').forEach(group => {
            group.classList.remove('selected');
            group.querySelector('.zone-rect').setAttribute('stroke-width', '1');
        });

        // Select new zone
        const zoneGroup = document.querySelector(`[data-zone-id="${zoneId}"]`);
        if (zoneGroup) {
            zoneGroup.classList.add('selected');
            zoneGroup.querySelector('.zone-rect').setAttribute('stroke-width', '3');
            zoneGroup.querySelector('.zone-rect').setAttribute('stroke', '#2563eb');
        }

        // Update zone info panel
        const zone = this.layoutData.zones.find(z => z.id === zoneId);
        if (zone) {
            this.updateZoneInfo(zone);
            this.selectedZone = zone;
        }
    },

    updateZoneInfo(zone) {
        const utilization = Math.round((zone.currentUsage / zone.capacity) * 100);
        const infoPanel = document.getElementById('zoneInfo');
        
        infoPanel.innerHTML = `
            <div class="zone-details">
                <h5>${zone.name}</h5>
                <div class="zone-meta">
                    <span class="badge badge-${zone.type === 'storage' ? 'primary' : zone.type === 'picking' ? 'warning' : 'success'}">
                        ${zone.type}
                    </span>
                    <span class="zone-floor">${zone.floor} floor</span>
                </div>
                
                <div class="zone-stats">
                    <div class="stat-item">
                        <span class="stat-label">Area:</span>
                        <span class="stat-value">${zone.area} sqft</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Capacity:</span>
                        <span class="stat-value">${zone.capacity} units</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Current:</span>
                        <span class="stat-value">${zone.currentUsage} units</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Utilization:</span>
                        <span class="stat-value ${utilization >= 85 ? 'text-warning' : ''}">${utilization}%</span>
                    </div>
                </div>
                
                <div class="progress">
                    <div class="progress-bar ${utilization >= 85 ? 'warning' : ''}" 
                         style="width: ${utilization}%"></div>
                </div>
                
                <p class="zone-description">${zone.description}</p>
                
                <div class="zone-actions">
                    <button class="btn btn-primary btn-sm" onclick="WarehouseModule.viewZoneDetails('${zone.id}')">
                        View Details
                    </button>
                </div>
            </div>
        `;
    },

    setView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('layoutViewBtn').classList.toggle('active', view === 'layout');
        document.getElementById('heatmapViewBtn').classList.toggle('active', view === 'heatmap');
        document.getElementById('analyticsViewBtn').classList.toggle('active', view === 'analytics');
        
        this.renderLayout();
    },

    viewZoneDetails(zoneId) {
        const zone = this.layoutData.zones.find(z => z.id === zoneId);
        if (!zone) return;

        const utilization = Math.round((zone.currentUsage / zone.capacity) * 100);
        
        const detailsHTML = `
            <div class="zone-full-details">
                <div class="zone-header">
                    <div class="zone-info">
                        <h4>${zone.name}</h4>
                        <div class="zone-meta">
                            <span class="badge badge-${zone.type === 'storage' ? 'primary' : zone.type === 'picking' ? 'warning' : 'success'}">
                                ${zone.type}
                            </span>
                            <span class="badge badge-gray">${zone.floor} floor</span>
                        </div>
                    </div>
                    <div class="zone-utilization">
                        <div class="utilization-circle ${utilization >= 85 ? 'warning' : utilization >= 70 ? 'medium' : 'good'}">
                            <span class="utilization-percent">${utilization}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="zone-metrics">
                    <div class="metrics-grid">
                        <div class="metric">
                            <div class="metric-label">Total Area</div>
                            <div class="metric-value">${zone.area.toLocaleString()} sqft</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">Capacity</div>
                            <div class="metric-value">${zone.capacity.toLocaleString()} units</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">Current Usage</div>
                            <div class="metric-value">${zone.currentUsage.toLocaleString()} units</div>
                        </div>
                        <div class="metric">
                            <div class="metric-label">Available Space</div>
                            <div class="metric-value">${(zone.capacity - zone.currentUsage).toLocaleString()} units</div>
                        </div>
                    </div>
                </div>
                
                <div class="zone-properties">
                    <h5>Zone Properties</h5>
                    <div class="properties-grid">
                        <div class="property">
                            <span class="property-label">Temperature Control:</span>
                            <span class="property-value">${zone.temperature}</span>
                        </div>
                        <div class="property">
                            <span class="property-label">Security Level:</span>
                            <span class="property-value">${zone.security}</span>
                        </div>
                        <div class="property">
                            <span class="property-label">Zone Type:</span>
                            <span class="property-value">${zone.type}</span>
                        </div>
                        <div class="property">
                            <span class="property-label">Floor Level:</span>
                            <span class="property-value">${zone.floor}</span>
                        </div>
                    </div>
                </div>
                
                <div class="zone-description">
                    <h5>Description</h5>
                    <p>${zone.description}</p>
                </div>
                
                <div class="zone-recommendations">
                    <h5>Recommendations</h5>
                    <div class="recommendations">
                        ${utilization >= 85 ? `
                            <div class="recommendation warning">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>High utilization detected. Consider redistributing inventory or expanding capacity.</span>
                            </div>
                        ` : ''}
                        ${utilization < 50 ? `
                            <div class="recommendation info">
                                <i class="fas fa-info-circle"></i>
                                <span>Low utilization. This zone could accommodate additional inventory.</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('zoneDetailsContent').innerHTML = detailsHTML;
        this.showModal('zoneDetailsModal');
    },

    initializeAnalyticsCharts() {
        // Zone Efficiency Chart
        const ctx1 = document.getElementById('zoneEfficiencyChart');
        if (ctx1) {
            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: this.layoutData.zones.map(z => z.name),
                    datasets: [{
                        label: 'Utilization %',
                        data: this.layoutData.zones.map(z => Math.round((z.currentUsage / z.capacity) * 100)),
                        backgroundColor: 'rgba(37, 99, 235, 0.6)',
                        borderColor: 'rgba(37, 99, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
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

        // Utilization Trend Chart
        const ctx2 = document.getElementById('utilizationTrendChart');
        if (ctx2) {
            new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Average Utilization %',
                        data: [65, 68, 72, 75, 78, 78],
                        borderColor: 'rgba(37, 99, 235, 1)',
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
                            max: 100
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
    },

    applyFilters() {
        // Implementation for filtering zones based on selected criteria
        console.log('Applying warehouse filters...');
        this.renderLayout();
    },

    clearFilters() {
        document.getElementById('floorFilter').value = 'all';
        document.getElementById('zoneTypeFilter').value = 'all';
        document.getElementById('capacityFilter').value = 'all';
        this.renderLayout();
    },

    toggleEditMode() {
        window.app.showNotification('Edit mode functionality coming soon!', 'info');
    },

    addZone(form) {
        const formData = new FormData(form);
        
        const newZone = {
            id: `Z${this.layoutData.zones.length + 1}`,
            name: formData.get('name'),
            type: formData.get('type'),
            floor: formData.get('floor'),
            area: parseInt(formData.get('area')),
            capacity: parseInt(formData.get('capacity')),
            currentUsage: parseInt(formData.get('currentUsage')),
            temperature: formData.get('temperature'),
            security: formData.get('security'),
            description: formData.get('description'),
            x: 50 + (this.layoutData.zones.length % 3) * 130,
            y: 50 + Math.floor(this.layoutData.zones.length / 3) * 90,
            width: 120,
            height: 80
        };

        this.layoutData.zones.push(newZone);
        this.renderLayout();
        this.hideModal('addZoneModal');
        form.reset();

        window.app.showNotification('Zone added successfully!', 'success');
    },

    optimizeLayout() {
        window.app.showNotification('Layout optimization initiated. This may take a few minutes...', 'info');
    },

    printLayout() {
        window.app.showNotification('Preparing layout for printing...', 'info');
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