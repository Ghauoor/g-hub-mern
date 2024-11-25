import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("fork");

  const getUserProfileAndRepos = useCallback(async () => {
    setLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/Ghauoor`);
      const userProfile = await userRes.json();
      setUserProfile(userProfile);
      const reposRes = await fetch(userProfile.repos_url);
      const repos = await reposRes.json();
      setRepos(repos);
      setLoading(false);

      console.log(
        "User profile and repos fetched successfully",
        userProfile,
        repos
      );
    } catch (error) {
      toast.error(error.message || "Error fetching user profile and repos");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {repos && !loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
