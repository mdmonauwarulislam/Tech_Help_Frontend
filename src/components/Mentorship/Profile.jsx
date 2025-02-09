
import ProfileCard from "./ProfileCard";
import Services from "./Services";

const Profile = () => {
  return (
    <div className="min-h-screen flex max-w-7xl mx-auto my-10">
        <div className="w-2/5">

        <ProfileCard />
        </div>
        <div className="w-full">

        <Services />
        </div>
    </div>
  );
};

export default Profile;
