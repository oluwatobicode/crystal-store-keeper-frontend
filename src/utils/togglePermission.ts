export const togglePermission = (
  id: string,
  setSelectedPermissions: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  setSelectedPermissions((prev) =>
    prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
  );
};
