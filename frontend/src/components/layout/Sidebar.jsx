import {
    LayoutDashboard,
    Package,
    Warehouse,
    Sparkles,
    Activity,
    FlaskConical,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

function Sidebar() {

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Products',
            path: '/products',
            icon: Package,
        },
        {
            name: 'Inventory',
            path: '/inventory',
            icon: Warehouse,
        },
        {
            name: 'Recommendations',
            path: '/recommendations',
            icon: Sparkles,
        },
        {
            name: 'Monitoring',
            path: '/monitoring',
            icon: Activity,
        },
        {
            name: 'Chaos Lab',
            path: '/chaos-lab',
            icon: FlaskConical,
        },
    ]

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">

            {/* Logo */}
            <div className="border-b border-zinc-800 px-6 py-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
                        <Activity
                            size={21}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">
                            Circuit Commerce
                        </h1>

                        <p className="text-[11px] text-zinc-500">
                            Resilient E-Commerce
                        </p>
                    </div>

                </div>

            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">

                <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                    Main Menu
                </p>

                {menuItems.map((item) => {

                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20'
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                }`
                            }
                        >

                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? 'text-cyan-400'
                                                : 'text-zinc-500 group-hover:text-zinc-300'
                                        }
                                    />

                                    <span>
                    {item.name}
                  </span>

                                    {isActive && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                    )}
                                </>
                            )}

                        </NavLink>
                    )

                })}

            </nav>

            {/* System status */}
            <div className="border-t border-zinc-800 p-4">

                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">

                    <div className="flex items-center gap-2">

                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                        <span className="text-xs font-medium text-emerald-400">
              System Operational
            </span>

                    </div>

                    <p className="mt-1 text-[10px] text-zinc-600">
                        All services monitored
                    </p>

                </div>

                {/* User */}
                <div className="mt-3 flex items-center gap-3 rounded-xl p-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-400 ring-1 ring-cyan-500/20">
                        A
                    </div>

                    <div>
                        <p className="text-sm font-medium text-white">
                            Admin
                        </p>

                        <p className="text-[10px] text-zinc-600">
                            Administrator
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    )
}

export default Sidebar