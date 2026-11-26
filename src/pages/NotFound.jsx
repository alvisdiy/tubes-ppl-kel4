import { Compass } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function NotFound() {
  return (
    <MainLayout>
      <section
        aria-labelledby="not-found-heading"
        className="mx-auto flex max-w-xl flex-col items-center py-12 text-center lg:py-20"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gesso bg-limestone text-bronze">
          <Compass className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
          404 · Uncatalogued Route
        </p>

        <h1
          id="not-found-heading"
          className="mt-3 font-serif text-[2rem] font-semibold leading-[1.12] text-charcoal sm:text-[3rem]"
        >
          Gallery Room Not Found
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
          The hall or record you requested does not exist at this address.
          Return to the museum entrance to continue exploring the collection.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton to="/" variant="burgundy">
            Return to Museum Entrance
          </PrimaryButton>
          <SecondaryButton to="/#collections">
            Browse Departments
          </SecondaryButton>
        </div>
      </section>
    </MainLayout>
  );
}
