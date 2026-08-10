import {
    CheckCircle2,
    Server,
} from 'lucide-react'

function ServiceCard({
                         name,
                         description,
                         status = 'UP',
                     }) {

    const isUp = status === 'UP'

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80">

            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900">
                        <Server
                            size={21}
                            className="text-zinc-300"
                        />
                    </div>

                    <div className="min-w-0">

                        <h3 className="text-base font-semibold text-white sm:text-lg">
                            {name}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-zinc-400 sm:text-base">
                            {description}
                        </p>

                    </div>

                </div>

                <span
                    className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                        isUp
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-red-500/10 text-red-400'
                    }`}
                >

                    <span
                        className={`h-2 w-2 rounded-full ${
                            isUp
                                ? 'bg-emerald-400'
                                : 'bg-red-400'
                        }`}
                    />

                    {status}

                </span>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 sm:text-base">

                <CheckCircle2
                    size={17}
                    className={
                        isUp
                            ? 'text-emerald-400'
                            : 'text-red-400'
                    }
                />

                {isUp
                    ? 'Service responding normally'
                    : 'Service unavailable'}

            </div>

        </div>
    )
}

export default ServiceCard