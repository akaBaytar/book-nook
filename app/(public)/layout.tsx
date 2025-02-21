const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen'>
      {children}
    </main>
  );
};

export default PublicLayout;
