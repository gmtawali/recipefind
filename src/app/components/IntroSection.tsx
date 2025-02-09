export default function IntroSection() {
    return (
      <section className="bg-green-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Welcome to Recipe Finder!</h2>
        <p className="mb-2">
          Discover new recipes and manage your favorites with ease. Here's how Recipe Finder can help you:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Find recipes based on ingredients you have</li>
          <li>Explore dishes from various cuisines</li>
          <li>Save your favorite recipes for quick access</li>
          <li>Get detailed instructions and nutritional information</li>
        </ul>
        <p className="text-sm text-gray-600">
          Note: Saving recipes requires an account. Your saved recipes are stored securely in the cloud.
        </p>
      </section>
    )
  }
  
  