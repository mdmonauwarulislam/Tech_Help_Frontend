import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">TechHelp</h2>
          <p className="">
            Helping tech enthusiasts find the right guidance, jobs, and resources to grow in their careers.
          </p>
          <p className=" mt-4">Hyderabad, India</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#about" className="hover:text-secondary">About Us</a></li>
            <li><a href="#services" className="hover:text-secondary">Services</a></li>
            <li><a href="#roadmap" className="hover:text-secondary">Roadmaps</a></li>
            <li><a href="#mentorship" className="hover:text-secondary">Mentorship</a></li>
            <li><a href="#contact" className="hover:text-secondary">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <p className="text-gray-300">Stay connected with us on social media:</p>
          <div className="flex space-x-4 mt-4 text-2xl">
          <Link to={"https://facebook.com"}>
            <FaFacebookF className="w-full h-full object-fit px-2 py-2" />
          </Link>
          <Link to={"https://facebook.com"}>
            <FaXTwitter className="w-full h-full object-fit px-2 py-2" />
          </Link>
          <Link to={"https://linkedin.com"}>
            <FaLinkedinIn className="w-full h-full object-fit px-2 py-2" />
          </Link>
          <Link to={"https://www.youtube.com/"}>
            <FaYoutube className="w-full h-full px-2 py-2" />
          </Link>
          <Link to={"https://www.githib.com/"}>
            <FaGithub className="w-full h-full px-2 py-2" />
          </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and resources in tech:</p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-4 bg-gray-700 text-gray-300 rounded-l-md outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-white py-2 px-4 rounded-r-md hover:bg-primary-dark transition duration-300"
            >
              <FaEnvelope  size={25}/>
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} TechHelp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
