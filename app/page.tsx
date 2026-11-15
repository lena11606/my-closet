export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <main className="flex flex-col items-center gap-4 text-center px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          My Closet
        </h1>
        <p className="max-w-md text-lg text-zinc-600">
          This is Stage 1: a live, deployed app. Inventory, outfits, and inspo
          boards get built on top of this in the next sessions.
        </p>
      </main>
    </div>
  );
}
