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
} from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
          url: "#",
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
    login: { title: "Đăng Nhập", url: "/login" },
  },
}: NavbarProps) => {
  return (
    <section className="py-4 bg-background w-full">
      <div className="w-full px-4 lg:px-8">
        {/* Desktop Menu */}
        <nav className="relative hidden items-center lg:flex w-full">
  {/* Logo (Left) */}
  <div className="absolute left-0 flex items-center gap-2">
    <a href={logo.url} className="flex items-center gap-2">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      <span className="text-lg font-semibold tracking-tight">{logo.title}</span>
    </a>
  </div>

  {/* Navigation Menu (Center) */}
  <div className="absolute left-1/2 -translate-x-1/2">
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {menu.map((item) => renderMenuItem(item))}
      </NavigationMenuList>
    </NavigationMenu>
  </div>

  {/* Auth Buttons (Right) */}
  <div className="ml-auto flex gap-2">
    <Button asChild size="sm">
      <a href={auth.login.url}>{auth.login.title}</a>
    </Button>
  </div>
</nav>

        {/* Mobile Menu */}
        <div className="flex justify-between items-center lg:hidden">
          <a href={logo.url} className="flex items-center gap-2">
          <Image
  src={logo.src}
  alt={logo.alt}
  width={40}
  height={40}
  className="h-10 w-auto"
/>
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                  <Image
  src={logo.src}
  alt={logo.alt}
  width={32}
  height={32}
  className="h-8 w-auto"
/>
                    <span className="font-bold">{logo.title}</span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion type="single" collapsible className="flex flex-col gap-4">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline">
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
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
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
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
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
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
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      href={item.url}
      className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
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