// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  if (error.name === 'ZodError') {
    return error.errors[0].message;
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    const field = error.meta?.target ? error.meta.target[0] : 'Field';

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
};

export const formatDate = (date: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  return new Date(date).toLocaleString('en-US', dateOptions) as string;
};
