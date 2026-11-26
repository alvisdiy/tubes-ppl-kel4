
export default function ArtworkSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="border border-mat-border bg-[#EDE6DA] p-3 sm:p-4">
        <div className="aspect-[4/5] bg-[#DCD2C4]" />
      </div>

      <div className="pt-4">
        <div className="h-6 w-4/5 bg-[#E2DACD]" />
        <div className="mt-2 h-4 w-3/5 bg-[#E2DACD]" />
        <div className="mt-2 h-3 w-2/5 bg-[#E2DACD]" />
      </div>
    </div>
  );
}
