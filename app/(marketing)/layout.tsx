const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='min-h-screen bg-gradient-to-b from-slate-50 to-slate-100'>
      {children}
    </main>
  );
};

export default MarketingLayout;
