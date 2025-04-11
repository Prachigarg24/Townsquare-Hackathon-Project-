
import { Mail, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="civic-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TownSquare</h3>
            <p className="text-sm opacity-90">
              Making local democracy tangible and accessible for everyone.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/issues" className="opacity-90 hover:opacity-100 transition-opacity">Local Issues</Link></li>
              <li><Link to="/legislation" className="opacity-90 hover:opacity-100 transition-opacity">Legislation</Link></li>
              <li><Link to="/representatives" className="opacity-90 hover:opacity-100 transition-opacity">Representatives</Link></li>
              <li><Link to="/polls" className="opacity-90 hover:opacity-100 transition-opacity">Community Polls</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/impact" className="opacity-90 hover:opacity-100 transition-opacity">Impact Reports</Link></li>
              <li><Link to="/initiatives" className="opacity-90 hover:opacity-100 transition-opacity">Neighborhood Initiatives</Link></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Email" className="hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-accent transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-sm text-center opacity-80">
          <p>© {currentYear} TownSquare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
