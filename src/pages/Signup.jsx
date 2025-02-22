import SignupCard from "../components/SignupCard";
import JobPostImg from "../assets/job-post.svg";
import JobSeekingImg from "../assets/job-search.svg";
import bg from "../assets/backgroud.avif";

const Signup = () => {
  return (
    <div
      className=" flex justify-center items-center min-h-[100vh] "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "center",
      }}
    >
      <section className="bg-white shadow-2xl p-10 rounded-md ">
        <div className=" md:flex gap-6  justify-center items-center text-primary">
          <div className="mb-4 md:mb-0">
            {/* Job Seeking Card */}
            <SignupCard
              imgSrc={JobSeekingImg}
              imgAlt="job-search-img"
              title="Looking for a job?"
              linkTo="/signup/user-register"
            />
          </div>

          <div>
            {/* Job Posting Card */}
            <SignupCard
              imgSrc={JobPostImg}
              imgAlt="job-post-img"
              title="Post a job?"
              linkTo="/signup/employee-register"
            />
          </div>

          <div>
            {/* Job Posting Card */}
            <SignupCard
              imgSrc={JobPostImg}
              imgAlt="job-post-img"
              title="Register as Mentor?"
              linkTo="/signup/mentor-register"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
