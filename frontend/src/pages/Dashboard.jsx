import {
    Package,
    Warehouse,
    Sparkles,
    Activity,
} from 'lucide-react'

import StatCard from '../components/dashboard/StatCard'
import ServiceCard from '../components/dashboard/ServiceCard'
import CircuitBreakerCard from '../components/dashboard/CircuitBreakerCard'

function Dashboard() {

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>

                <p className="text-sm text-cyan-400">
                    System Overview
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                    Good morning, Admin
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                    Monitor your e-commerce platform and resilience infrastructure.
                </p>

            </div>


            {/* Statistics */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Products"
                    value="3"
                    description="Active products"
                    trend="+3 products this month"
                    icon={<Package size={19} />}
                />

                <StatCard
                    title="Inventory"
                    value="98.4%"
                    description="Stock availability"
                    trend="Healthy inventory"
                    icon={<Warehouse size={19} />}
                />

                <StatCard
                    title="Recommendations"
                    value="1,284"
                    description="Requests processed"
                    trend="+12.5% this week"
                    icon={<Sparkles size={19} />}
                />

                <StatCard
                    title="System Uptime"
                    value="99.9%"
                    description="Last 30 days"
                    trend="All systems operational"
                    icon={<Activity size={19} />}
                />

            </div>


            {/* Services */}

            <section>

                <div className="mb-4">

                    <h2 className="text-lg font-semibold text-white">
                        Microservices
                    </h2>

                    <p className="mt-1 text-xs text-zinc-600">
                        Real-time health status of your backend services.
                    </p>

                </div>

                <div className="grid gap-4 lg:grid-cols-3">

                    <ServiceCard
                        name="Product Service"
                        description="Product management API"
                    />

                    <ServiceCard
                        name="Inventory Service"
                        description="Stock management API"
                    />

                    <ServiceCard
                        name="Recommendation Service"
                        description="Recommendation engine"
                    />

                </div>

            </section>


            {/* Resilience */}

            <section>

                <div className="mb-4">

                    <h2 className="text-lg font-semibold text-white">
                        Resilience Monitor
                    </h2>

                    <p className="mt-1 text-xs text-zinc-600">
                        Monitor circuit breaker and service resilience.
                    </p>

                </div>

                <div className="grid gap-4 lg:grid-cols-2">

                    <CircuitBreakerCard />

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            System Activity
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-white">
                            Request Performance
                        </h2>

                        <div className="mt-8 flex h-56 items-center justify-center rounded-xl border border-dashed border-zinc-800">

                            <div className="text-center">

                                <Activity
                                    size={28}
                                    className="mx-auto text-zinc-700"
                                />

                                <p className="mt-3 text-sm text-zinc-500">
                                    Performance chart
                                </p>

                                <p className="mt-1 text-xs text-zinc-700">
                                    Live metrics will be connected later.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    )
}

export default Dashboard