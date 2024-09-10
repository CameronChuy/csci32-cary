export default function Home() {
    return (
        <body className="flex min-h-screen min-w-screen">
            <img
                className="h-screen w-screen absolute top-0 right-0 -z-50"
                src="https://media.istockphoto.com/id/1564441923/photo/stack-of-stones-in-calm-ocean.jpg?s=612x612&w=0&k=20&c=KoGh7oy5ZaBsfdNEe9phv20VWH800WFEkMcZIwMG3BY="
                alt="Zen backdrop"
            ></img>
            <nav className="flex w-full justify-between items-center p-2">
                <div className="static">
                    <a
                        href="/week1-page"
                        className="font-bold text-5xl font-serif bg-gradient-to-br from-blue-500 to-black dark:from-red-600 dark:to-yellow text-transparent bg-clip-text p-4"
                    >
                        Maxine
                    </a>
                </div>
                <div className="flex no-wrap w-fit p-2">
                    <button
                        type="button"
                        className="text-blue backdrop-blur-sm bg-white/50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        About Me
                    </button>
                    <button
                        type="button"
                        className="text-blue backdrop-blur-sm bg-white/50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Analytics
                    </button>
                    <button
                        type="button"
                        className="text-blue backdrop-blur-sm bg-white/50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Configure
                    </button>
                </div>
            </nav>

            <main className="flex flex-col items-center w-full mx-auto p-4">
                <div className="flex flex-col items-center w-1/2 backdrop-blur-md bg-white/30 border border-slate-400 rounded-md">
                    <h1 className="text-5xl font-serif">Hello, I am Maxine</h1>
                    <h3 className="text-xl font-serif">
                        I am your <i>virtual</i> virtual assistant
                    </h3>
                    <h2 className="text-lg font-serif text-black">Where should we start:</h2>
                </div>
                <div className="w-full flex justify-between p-6">
                    <a
                        href="/week1-page"
                        className="w-56 h-72 flex flex-col justify-center items-center backdrop-blur-md bg-white/30 border border-slate-400 rounded-md"
                    >
                        <svg
                            className="w-36 h-36 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                            />
                        </svg>
                        <b className="text-lg">Home Hunt</b>
                        <p className="text-center">Allow me to search for your next place to stay!</p>
                    </a>
                    <a
                        href="/week1-page"
                        className="w-56 h-72 flex flex-col justify-center items-center backdrop-blur-md bg-white/30 border border-slate-400 rounded-md"
                    >
                        <svg
                            className="w-36 h-36 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"
                            />
                        </svg>

                        <b className="text-lg">Job Hunt</b>
                        <p className="text-center">Let&apos;s find you your next big break!</p>
                    </a>
                    <a
                        href="/week1-page"
                        className="w-56 h-72 flex flex-col justify-center items-center backdrop-blur-md bg-white/30 border border-slate-400 rounded-md"
                    >
                        <svg
                            className="w-36 h-36 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"
                            />
                        </svg>

                        <b className="text-lg">Recipes</b>
                        <p className="text-center">We&apos;ll find out this week&apos;s menu!</p>
                    </a>
                </div>
            </main>
        </body>
    )
}
