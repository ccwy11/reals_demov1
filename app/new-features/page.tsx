import Head from 'next/head';

export default function NewFeaturesComingSoon() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>New Features Coming Soon</title>
        <meta name="description" content="Stay tuned for exciting new features!" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-200 p-6">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            New Features Coming Soon!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We’re working hard to bring you exciting updates and improvements.
            Stay tuned for more details—something amazing is on the way!
          </p>
          <div className="flex justify-center">
            <div className="animate-pulse bg-pink-300 rounded-full h-12 w-12 flex items-center justify-center">
              <span className="text-pink-600 font-bold">✨</span>
            </div>
          </div>
        </div>
      </main>
  </div>
  );
}
