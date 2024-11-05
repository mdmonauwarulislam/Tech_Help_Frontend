import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-white mb-4">TechHelp</h2>
          <p className="leading-relaxed">
            Helping tech enthusiasts find the right guidance, jobs, and resources to grow in their careers.
          </p>
          <p className="mt-4 font-light">Hyderabad, India</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-secondary transition duration-300">About Us</a></li>
            <li><a href="#services" className="hover:text-secondary transition duration-300">Services</a></li>
            <li><a href="#roadmap" className="hover:text-secondary transition duration-300">Roadmaps</a></li>
            <li><a href="#mentorship" className="hover:text-secondary transition duration-300">Mentorship</a></li>
            <li><a href="#contact" className="hover:text-secondary transition duration-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <p>Connect with us on social media:</p>
          <div className="flex space-x-4 mt-4 text-2xl text-gray-400">
            <Link to={"https://facebook.com"} className="hover:text-secondary transition duration-300">
              <FaFacebookF />
            </Link>
            <Link to={"https://twitter.com"} className="hover:text-secondary transition duration-300">
              <FaXTwitter />
            </Link>
            <Link to={"https://linkedin.com"} className="hover:text-secondary transition duration-300">
              <FaLinkedinIn />
            </Link>
            <Link to={"https://www.youtube.com/"} className="hover:text-secondary transition duration-300">
              <FaYoutube />
            </Link>
            <Link to={"https://www.github.com/"} className="hover:text-secondary transition duration-300">
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="leading-relaxed mb-4">Subscribe for the latest updates and resources in tech:</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-4 bg-gray-800 text-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-white py-2 px-4 rounded-r-md hover:bg-primary-dark transition duration-300"
            >
              <FaEnvelope size={20} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} TechHelp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
