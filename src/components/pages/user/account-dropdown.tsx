import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const AccountDropdown = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="flex items-center justify-center size-[45px]">
          <AvatarFallback className="flex items-center justify-center bg-secondary text-background font-bold rounded-full size-20 text-2xl cursor-pointer shadow-sm shadow-foreground/50 font-italianno">
           Data
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
      >
        <MenuItem label="Perfil" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MenuItem = ({ label }: { label: string }) => {
  return <DropdownMenuItem>{label}</DropdownMenuItem>;
};