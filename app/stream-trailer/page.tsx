import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function StreamTrailerPage() {
    return (
        <main className="relative min-h-screen bg-[#0a1628] flex flex-col">
            <Navigation />

            <div className="flex-1 pt-24 pb-10 px-4 md:px-8 flex flex-col">
                <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Stream Trailer Simulation</h1>
                        <p className="text-slate-400">Interactive 3D simulation of stream hydrology</p>
                    </div>

                    <div className="flex-1 w-full bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden shadow-2xl relative min-h-[600px]">
                        <iframe
                            src="https://streamtrailer.vercel.app/"
                            className="absolute inset-0 w-full h-full border-0"
                            title="Stream Trailer Application"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
