import {
  Book,
  Menu,
  Zap,
  Headphones,
  PenLine,
  Mic,
  ClipboardCheck,
  School,
  Layers,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useProfile } from "@/shared/hooks/useProfile";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup?: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.jpg",
    alt: "logo",
    title: "Idest",
  },
  menu = [
    { title: "Giới Thiệu", url: "#" },
    {
      title: "Khóa Học",
      url: "#",
      items: [
        {
          title: "Đăng Ký Khóa Học",
          description: "Chọn và đăng ký các khóa phù hợp với bạn",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Các Khóa Học Của Tôi",
          description: "Xem các khóa bạn đã đăng ký và đang học",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/courses",
        },
      ],
    },
    {
      title: "Đề Thi",
      url: "#",
      items: [
        {
          title: "Listening",
          description: "Ôn luyện kỹ năng nghe",
          icon: <Headphones className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Reading",
          description: "Rèn luyện kỹ năng đọc hiểu",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Writing",
          description: "Luyện kỹ năng viết hiệu quả",
          icon: <PenLine className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Speaking",
          description: "Luyện kỹ năng nói thành thạo",
          icon: <Mic className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Tất Cả Đề Thi",
          description: "Xem toàn bộ đề thi có sẵn",
          icon: <Layers className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Đăng Ký Thi",
      url: "#",
      items: [
        {
          title: "Thi Thử tại Idest",
          description: "Đăng ký tham gia thi thử IELTS",
          icon: <ClipboardCheck className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Thi Thật tại BC",
          description: "Đăng ký thi thật tại British Council",
          icon: <School className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
  ],
  auth = {
    login: { title: "Đăng Nhập", url: "auth/login" },
  }
}: NavbarProps) => {
  const { user, isAuthenticated, isLoading, logout } = useProfile();

  return (
    <section className="sticky top-0 z-50 py-4 w-full shadow-sm bg-background">
      <div className="px-4 w-full lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden justify-between items-center w-full lg:flex">
          {/* Left: Logo */}
          <div className="flex gap-2 items-center">
            <a href={logo.url} className="flex gap-2 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={40}
                height={40}
                className="w-auto h-10"
              />
              <span className="text-lg font-semibold tracking-tight">
                {logo.title}
              </span>
            </a>
          </div>

          {/* Center: Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2">
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: Auth Section */}
          <div className="flex gap-2 items-center">
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src={user.avatar_url || "/fallback.jpg"} 
                        alt={user.full_name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.full_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex gap-2 justify-start items-center p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.full_name && (
                        <p className="font-medium">{user.full_name}</p>
                      )}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 w-4 h-4" />
                    <span>Hồ sơ</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    variant="destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex justify-between items-center lg:hidden">
          <a href={logo.url} className="flex gap-2 items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={40}
              height={40}
              className="w-auto h-10"
            />
          </a>
          <div className="flex gap-2 items-center">
            {isAuthenticated && user && (
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={user.avatar_url || "/fallback.jpg"} 
                  alt={user.full_name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.full_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex gap-2 items-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={32}
                      height={32}
                      className="w-auto h-8"
                    />
                    <span className="font-bold">{logo.title}</span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex-col gap-4 facial"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="flex flex-col gap-3">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex gap-3 items-center p-3 rounded-lg bg-muted">
                        <Avatar className="w-10 h-10">
                          <AvatarImage 
                            src={user.avatar_url || "/fallback.jpg"} 
                            alt={user.full_name}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.full_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.full_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="justify-start">
                        <User className="mr-2 w-4 h-4" />
                        Hồ sơ
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="justify-start"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 w-4 h-4" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="relative">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="flex flex-col gap-2 min-w-[320px] p-2">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex justify-center items-center px-4 py-2 w-max h-10 text-sm font-medium rounded-md transition-colors group bg-background hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold text-md hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold text-md">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      href={item.url}
      className="flex gap-3 items-start p-3 rounded-md transition-colors hover:bg-muted"
    >
      <div className="text-foreground">{item.icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{item.title}</span>
        {item.description && (
          <span className="text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
      </div>
    </a>
  );
};

export { Navbar };