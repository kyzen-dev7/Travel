import Link from "next/link";

export default function SharedTripPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 text-center">
        <div className="text-5xl mb-4">🗺️</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Shared Trip</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Trip ID: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-sm">{params.id}</code></p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Someone shared a travel itinerary with you! Sign in to view and collaborate.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign In to View
          </Link>
          <Link
            href="/"
            className="py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Plan Your Own Trip
          </Link>
        </div>
      </div>
    </div>
  );
}
