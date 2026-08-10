function StatCard({
                      title,
                      value,
                      description,
                      icon,
                      trend,
                  }) {

    return (
        <div className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/80">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 sm:text-base">
                        {title}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {value}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400 sm:text-base">
                        {description}
                    </p>

                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10">
                    {icon}
                </div>

            </div>

            {trend && (
                <div className="mt-5 text-sm font-medium text-emerald-400 sm:text-base">
                    {trend}
                </div>
            )}

        </div>
    )
}

export default StatCard