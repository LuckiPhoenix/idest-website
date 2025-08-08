import { Facebook, Github, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const menuSections = [
    {
      title: "Khóa Học",
      items: [
        { title: "Đăng Ký Khóa Học", url: "#" },
        { title: "Các Khóa Học Của Tôi", url: "#" },
      ],
    },
    {
      title: "Đề Thi",
      items: [
        { title: "Listening", url: "#" },
        { title: "Reading", url: "#" },
        { title: "Writing", url: "#" },
        { title: "Speaking", url: "#" },
        { title: "Tất Cả Đề Thi", url: "#" },
      ],
    },
    {
      title: "Đăng Ký Thi",
      items: [
        { title: "Thi Thử tại Idest", url: "#" },
        { title: "Thi Thật tại BC", url: "#" },
      ],
    },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/chihen.huynh/",
      icon: Facebook,
    },
    {
      name: "GitHub",
      url: "https://github.com/LuckiPhoenix",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/chihenhuynh/",
      icon: Linkedin,
    },
  ]

  return (
    <footer className="text-white bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex gap-3 items-center">
              <Image src="/logo.png" alt="Idest Logo" width={48} height={48} className="w-auto h-12" />
              <span className="text-2xl font-bold">Idest</span>
            </div>
            <p className="max-w-md text-gray-300">
              Nền tảng học IELTS online hàng đầu với các khóa học chất lượng cao và đề thi thực hành đa dạng.
            </p>

            {/* Address */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Liên Hệ</h4>
              <p className="text-gray-300">
                <a href="mailto:Huynhchihen2005@gmail.com">Huynhchihen2005@gmail.com</a>
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center w-10 h-10 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a href={item.url} className="text-sm text-gray-300 transition-colors hover:text-white">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
