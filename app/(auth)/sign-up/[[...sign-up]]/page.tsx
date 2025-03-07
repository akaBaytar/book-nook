import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='my-5'>
      <SignUp
        forceRedirectUrl='/dashboard'
        fallbackRedirectUrl='/'
        appearance={{
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
            logoImageUrl: '/logo.png',
          },
        }}
      />
      <div className='absolute bottom-0 end-0 size-64 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-3xl -z-10' />
      <div className='absolute top-0 start-0 size-64 bg-gradient-to-br from-blue-300/30 to-teal-300/30 rounded-full blur-3xl -z-10' />
    </div>
  );
};

export default SignUpPage;
