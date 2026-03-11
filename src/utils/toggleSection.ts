export const toggleSection = (
  sectionItems: { id: string }[],
  selectedPermissions: string[],
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const allIds = sectionItems.map((item) => item.id);
  const allSelected = allIds.every((id) => selectedPermissions.includes(id));

  if (allSelected) {
    // Deselect all
    setSelectedPermissions((prev) => prev.filter((id) => !allIds.includes(id)));
  } else {
    // Select all (merge unique)
    setSelectedPermissions((prev) => Array.from(new Set([...prev, ...allIds])));
  }
};
