import { UserButton } from '@clerk/nextjs';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='rounded-md fixed top-4 start-4 end-4 md:hidden p-2 flex justify-between items-center bg-sidebar border z-50'>
      <SidebarTrigger />
      <p className='font-semibold text-xl'>LOGO IPSUM</p>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'size-8 rounded-md',
            userButtonPopoverCard: 'w-[17rem]',
            userButtonTrigger: 'rounded-md',
          },
        }}
      />
    </nav>
  );
};

export default Navbar;
