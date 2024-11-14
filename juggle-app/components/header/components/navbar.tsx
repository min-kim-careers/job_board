import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/shadcn/components/ui/navigation-menu';
import Link from 'next/link';

const Navbar = () => {
    const linkStyle = `${navigationMenuTriggerStyle()}`;

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link
                        href='/auth'
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink className={linkStyle}>
                            Sign In / Register
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
