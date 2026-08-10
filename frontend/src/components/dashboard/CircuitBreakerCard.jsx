import {
    ShieldCheck,
    Activity,
    Timer,
} from 'lucide-react'

function CircuitBreakerCard() {

    const state = 'CLOSED'

    const isClosed = state === 'CLOSED'

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Recommendation Service
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white">
                        Circuit Breaker
                    </h2>
                </div>

                <ShieldCheck
                    size={22}
                    className={
                        isClosed
                            ? 'text-emerald-400'
                            : 'text-red-400'
                    }
                />

            </div>

            <div className="mt-8 flex flex-col items-center">

                <div
                    className={`flex h-28 w-28 items-center justify-center rounded-full ${
                        isClosed
                            ? 'bg-emerald-500/10 ring-1 ring-emerald-500/30'
                            : 'bg-red-500/10 ring-1 ring-red-500/30'
                    }`}
                >

                    <div className="text-center">

                        <div
                            className={`mx-auto h-3 w-3 rounded-full ${
                                isClosed
                                    ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]'
                                    : 'bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]'
                            }`}
                        />

                        <p
                            className={`mt-3 text-sm font-bold ${
                                isClosed
                                    ? 'text-emerald-400'
                                    : 'text-red-400'
                            }`}
                        >
                            {state}
                        </p>

                    </div>

                </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-zinc-900/70 p-4">

                    <div className="flex items-center gap-2 text-zinc-500">
                        <Activity size={14} />
                        <span className="text-xs">
              Failure Rate
            </span>
                    </div>

                    <p className="mt-2 text-xl font-bold text-white">
                        0.0%
                    </p>

                </div>

                <div className="rounded-xl bg-zinc-900/70 p-4">

                    <div className="flex items-center gap-2 text-zinc-500">
                        <Timer size={14} />
                        <span className="text-xs">
              Slow Calls
            </span>
                    </div>

                    <p className="mt-2 text-xl font-bold text-white">
                        0.0%
                    </p>

                </div>

            </div>

        </div>
    )
}

export default CircuitBreakerCard