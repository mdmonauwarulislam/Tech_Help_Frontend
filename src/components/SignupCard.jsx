import { Link } from "react-router-dom";

// Reusable Card Component
const SignupCard = ({ imgSrc, imgAlt, title, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div className="rounded-md border-2 border-primary p-5 hover:shadow-lg transition-shadow">
        <img src={imgSrc} alt={imgAlt} className="h-32 w-48" />
        <h1 className="text-xl font-semibold text-center mt-2">{title}</h1>
      </div>
    </Link>
  );
};

export default SignupCard;
