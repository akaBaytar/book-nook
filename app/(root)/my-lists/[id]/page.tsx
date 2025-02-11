type PageProps = {
  params: Promise<{ id: string }>;
};

const ListDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <>{id}</>;
};

export default ListDetailsPage;
