import { Link } from "react-router-dom";
import { Leaf, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/lalitkumar100", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lalitkumar-choudhary-90b012321/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lalitkumar709086@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="section-container py-12 sm:py-16">
        <div className="w-full">

          {/* 🌿 Brand */}
          <div className="flex flex-col items-center text-center mb-10">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">LeafLens</span>
            </Link>

            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              AI-powered plant health diagnosis. Upload a photo and get instant
              treatment recommendations.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 👨‍💻 Developer Credit */}
          <div className="flex flex-col items-center justify-center text-center mt-8">
            <img
              src="/developer.png"   // 👉 put your photo in public folder and name it developer.jpg
              alt="Developer Lalitkumar Choudhary"
              className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md mb-3"
            />
            <p className="text-sm text-muted-foreground">
              Developed with ❤️ by{" "}
              <span className="font-semibold text-foreground">
                Lalitkumar Choudhary
              </span>
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LeafLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
