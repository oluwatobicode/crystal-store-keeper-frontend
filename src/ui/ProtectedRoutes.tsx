type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  return <div>{children}</div>;
};
export default ProtectedRoutes;
