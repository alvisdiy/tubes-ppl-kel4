import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout({
  children,
  heroOverlay = false,
  fullBleed = false,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar variant={heroOverlay ? 'overlay' : 'default'} />

      <main
        id="main-content"
        tabIndex={-1}
        className={
          fullBleed
            ? 'flex-1 outline-none'
            : 'mx-auto w-full max-w-7xl flex-1 px-4 py-12 outline-none sm:px-6 lg:px-8 lg:py-16'
        }
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
