export const CardSkeleton = () => (
  <div className="flex w-full flex-col gap-[24px] rounded-xl border border-[#E2E4E9] bg-white px-8 py-[22px] animate-pulse">
    <div className="h-3 w-24 rounded bg-gray-200" />
    <div className="flex flex-col gap-[6px]">
      <div className="h-6 w-32 rounded bg-gray-200" />
      <div className="h-3 w-20 rounded bg-gray-200" />
    </div>
  </div>
);
