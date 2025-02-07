import { UserButton } from '@clerk/nextjs';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='w-[calc(100vw-1rem)] rounded-md fixed left-2 top-2 md:hidden p-2 flex justify-between items-center bg-sidebar border'>
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
