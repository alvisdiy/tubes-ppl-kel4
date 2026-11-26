import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import museumHeroImg from '../../assets/museum-hero.jpg';

export default function HeroSection() {
  const handleAnchorClick = (event, to) => {
    const id = to.replace(/^\/?#/, '');
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `/#${id}`);
    }
  };

  return (
    <section
      data-surface="dark"
      aria-labelledby="museum-hero-heading"
      className="relative flex min-h-[600px] flex-col justify-between overflow-hidden bg-[#181210] pt-[80px] text-ivory sm:min-h-[660px] lg:h-dvh lg:max-h-[960px]"
    >
      <img
        src={museumHeroImg}
        alt="Grand classical museum gallery hall with antique gold-framed paintings on deep burgundy walls and leather gallery benches"
        width={1376}
        height={768}
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Atmospheric vignette preserves warm crimson side walls while keeping >9:1 contrast behind navbar & center copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(16, 11, 9, 0.56) 0%, rgba(18, 12, 10, 0.16) 40%, rgba(18, 12, 10, 0.24) 74%, rgba(16, 11, 9, 0.68) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 42% 45% at 50% 44%, rgba(16, 11, 9, 0.52) 0%, rgba(16, 11, 9, 0.12) 68%, rgba(16, 11, 9, 0) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:py-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D8CFC2] sm:text-xs">
          The Art Institute of Chicago
        </p>

        <h1
          id="museum-hero-heading"
          className="mt-4 font-serif text-[2.75rem] font-normal leading-[1.03] tracking-[-0.01em] text-[#F5F0E7] sm:text-[4rem] lg:text-[5.25rem]"
        >
          Discover
          <br />
          Art Collection
        </h1>

        <p className="mt-5 max-w-[520px] text-sm leading-[1.65] text-[#E5DDD0] sm:text-[15.5px]">
          Explore masterpieces, meet the artists, and uncover stories behind
          centuries of painting, sculpture, and works on paper.
        </p>

        <div className="mt-8">
          <Link
            to="/artworks"
            className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-[10px] bg-[#EFE9DC] px-7 py-3 text-[14px] font-medium text-[#211D19] shadow-[0_8px_24px_rgba(12,9,8,0.28)] transition-all duration-200 hover:bg-white active:translate-y-px"
          >
            <span>Explore Artworks</span>
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Single quiet scroll cue across viewports while global navigation stays exclusively in the top Navbar / Menu. */}
      <div className="relative z-10 flex justify-center pb-7">
        <a
          href="#curated-highlights"
          onClick={(event) => handleAnchorClick(event, '#curated-highlights')}
          className="group inline-flex min-h-[45px] items-center gap-2.5 rounded-full border border-ivory/20 bg-[#1A1411]/65 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#E5DDD0] backdrop-blur-sm transition-colors duration-200 hover:border-ivory/45 hover:bg-[#1A1411]/85 hover:text-white"
        >
          <span>Curated Galleries Below</span>
          <ArrowDown
            className="h-3.5 w-3.5 text-[#C9B38C] transition-transform duration-200 group-hover:translate-y-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
