export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <div className="flex flex-col gap-1 py-1">
    <p className="text-[11px] text-[#71717A] font-medium">{label}</p>
    <p className="text-[13px] font-semibold text-[#1D1D1D]">{value || "—"}</p>
  </div>
);
