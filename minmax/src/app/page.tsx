import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen dark:bg-gray-900">
      <div className="flex flex-row w-full min-h-full ">
        <div className="w-5/6 flex flex-col items-center">
          <h1 className="font-bold text-5xl font-serif bg-gradient-to-br from-blue-500 to-black dark:from-red-600 dark:to-white text-transparent bg-clip-text pt-4">
            MinMax
          </h1>
        </div>
        <div className="flex flex-col justify-self-start items-center h-full w-1/6 p-4">
          <span className="flex w-full items-center justify-center text-sm text-nowrap font-medium text-gray-900  dark:text-white me-3 bg-gray-400 rounded-full">
            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 flex-shrink-0"></span>
            <h5>Zillow Scrape</h5>
          </span>
        </div>
      </div>
    </main>
  )
}
