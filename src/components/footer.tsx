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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="Idest Logo" width={48} height={48} className="h-12 w-auto" />
              <span className="text-2xl font-bold">Idest</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Nền tảng học IELTS online hàng đầu với các khóa học chất lượng cao và đề thi thực hành đa dạng.
            </p>

            {/* Address */}
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Địa chỉ</h4>
              <p className="text-gray-300">
                Khu phố 34, phường Linh Xuân
                <br />
                HCMC, VN
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
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
              <h3 className="font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a href={item.url} className="text-gray-300 hover:text-white transition-colors text-sm">
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
