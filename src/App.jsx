import { BrowserRouter, Route, Routes } from 'react-router-dom';

function RootFoundation() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
        Art Collection Explorer
      </p>
      <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight text-charcoal">
        ARTORA
      </h1>
      <p className="mt-4 max-w-md text-sm text-stone">
        Main branch foundation is ready. Develop pages and UI features in dedicated feature branches following DESIGN.md.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootFoundation />} />
      </Routes>
    </BrowserRouter>
  );
}
