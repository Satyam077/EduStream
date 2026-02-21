import { transportRoutes } from '../data/dummyData';

export default function Transport() {
    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h4>Transport Management</h4>
                    <div className="breadcrumb mb-0">
                        <a href="/">Dashboard</a> <span className="mx-2">/</span> <span>Transport</span>
                    </div>
                </div>
                <button className="btn-sms-primary"><i className="bi bi-plus-lg"></i> Add Route</button>
            </div>

            <div className="row g-3 mb-4">
                {[
                    { label: 'Total Routes', value: transportRoutes.length, icon: 'bi-signpost-split-fill', color: 'blue' },
                    { label: 'Total Vehicles', value: transportRoutes.length, icon: 'bi-bus-front-fill', color: 'purple' },
                    { label: 'Students Using', value: transportRoutes.reduce((s, r) => s + r.students, 0), icon: 'bi-people-fill', color: 'green' },
                    { label: 'Total Capacity', value: transportRoutes.reduce((s, r) => s + r.capacity, 0), icon: 'bi-speedometer', color: 'orange' },
                ].map((stat, idx) => (
                    <div key={idx} className="col-lg-3 col-md-6">
                        <div className={`stat-card ${stat.color}`}>
                            <div className={`stat-icon ${stat.color}`}><i className={`bi ${stat.icon}`}></i></div>
                            <div className="stat-info"><h3>{stat.value}</h3><p>{stat.label}</p></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-3">
                {transportRoutes.map(route => (
                    <div key={route.id} className="col-lg-4 col-md-6">
                        <div className="sms-card h-100">
                            <div className="card-header">
                                <h6 className="mb-0">
                                    <i className="bi bi-bus-front me-2 text-primary"></i>{route.name}
                                </h6>
                                <span className="sms-badge info">{route.routeNo}</span>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Driver</span>
                                    <span className="fw-semibold small">{route.driver}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Phone</span>
                                    <span className="fw-semibold small">{route.driverPhone}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Vehicle</span>
                                    <span className="fw-semibold small">{route.vehicle}</span>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted small">Capacity</span>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="sms-progress" style={{ width: 60 }}>
                                            <div className="progress-bar bg-primary" style={{ width: `${(route.students / route.capacity) * 100}%` }}></div>
                                        </div>
                                        <small className="fw-bold">{route.students}/{route.capacity}</small>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <small className="text-muted fw-semibold d-block mb-2">Stops:</small>
                                    <div className="d-flex flex-wrap gap-1">
                                        {route.stops.map((stop, idx) => (
                                            <span key={idx} className="sms-badge info" style={{ fontSize: 10 }}>
                                                <i className="bi bi-geo-alt me-1"></i>{stop}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
