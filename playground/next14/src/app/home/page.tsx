
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Home Page</h1>
      <p className="text-lg mb-4">Welcome to the home page!</p>
      <a
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Back to Main Page
      </a>
    </div>
  );
}