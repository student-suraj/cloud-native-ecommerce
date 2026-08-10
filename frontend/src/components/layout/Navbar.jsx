import {
    Search,
    Bell,
} from 'lucide-react'

function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

            <div>
                <p className="text-sm text-zinc-500">
                    System Overview
                </p>

                <h2 className="text-lg font-semibold text-white">
                    Resilience Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-4">

                <div className="hidden items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 md:flex">
                    <Search
                        size={17}
                        className="text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                    />
                </div>

                <button className="relative rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                    <Bell size={19} />

                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400" />
                </button>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-400">
                    A
                </div>

            </div>

        </header>
    )
}

export default Navbar