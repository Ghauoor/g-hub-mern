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
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async (userName = "Ghauoor") => {
    setLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${userName}`, {
        headers: {
          authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
      const userProfile = await userRes.json();
      setUserProfile(userProfile);
      const reposRes = await fetch(userProfile.repos_url);
      const repos = await reposRes.json();
      setRepos(repos);
      setLoading(false);

      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message || "Error fetching user profile and repos");
    } finally {
      setLoading(false);
    }
  }, []);
  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    try {
      const { userProfile, repos } = await getUserProfileAndRepos(username);
      setUserProfile(userProfile);
      setSortType("recent");
      setRepos(repos);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching user profile and repos");
    } finally {
      setLoading(false);
    }
  };
  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
    }
    setSortType(sortType);
    setRepos([...repos]);
  };
  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos && <SortRepos sortType={sortType} onSort={onSort} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {repos && !loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
