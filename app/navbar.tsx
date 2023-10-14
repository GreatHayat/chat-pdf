import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      <div className="flex w-full items-center justify-between px-4 lg:px-24 py-4 border-b">
        <Link href="/">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
            Chat PDF
          </h1>
        </Link>

        {!user && (
          <Link href="/login">
            <Button variant="outline">Login/Register</Button>
          </Link>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <AvatarIcon width={24} height={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-ellipsis overflow-hidden text-center text-primary">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <form action="/auth/logout" method="POST">
                <Button variant="ghost" className="w-full text-left">
                  Logout
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default Navbar;
