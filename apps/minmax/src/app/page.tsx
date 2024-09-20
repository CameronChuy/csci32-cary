import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex min-h-screen min-w-screen bg-gradient-to-br from-fuchsia-500 to-blue-600">
            <main className="flex flex-col items-center w-full mx-auto p-4">
                <div className="flex flex-col items-center w-1/2 mt-20 p-2 backdrop-blur-md bg-white/30 border border-slate-400 rounded-md">
                    <h1 className="text-5xl font-serif text-center">
                        Hey Eric, I decided to make this page to quickly route between all of the assignments.
                    </h1>
                </div>
                <Link
                    href="/week1-page"
                    className="flex flex-col items-center w-1/2 mt-10 p-2 backdrop-blur-md bg-white/30 border border-slate-400 rounded-md"
                >
                    {' '}
                    Week 1 Page
                </Link>
                <Link
                    href="/button"
                    className="flex flex-col items-center w-1/2 mt-10 p-2 backdrop-blur-md bg-white/30 border border-slate-400 rounded-md"
                >
                    {' '}
                    Button
                </Link>
            </main>
        </div>
    )
}
