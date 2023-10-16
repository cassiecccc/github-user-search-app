import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { Title } from "./components/Profile/Title";
import { Follower } from "./components/Profile/Follower";
import { Location } from "./components/Profile/Location";

export default function App() {
  const [data, setData] = useState(() => {
    const localValue = JSON.parse(sessionStorage.getItem("data"));
    if (localValue) {
      return localValue;
    } else {
      return "";
    }
  });

  const [searchDate, setSearchDate] = useState(() => {
    const localValue = sessionStorage.getItem("date");
    if (localValue) {
      return localValue;
    } else {
      return "";
    }
  });
  const [defaultUser, setDefaultUser] = useState("");
  const [defaultDate, setDefaultDate] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [backToDefault, setBackToDefault] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  async function loadDefault() {
    setError(undefined);
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/octocat`);
      const dataSet = await res.data;
      const date = await dataSet.created_at.split("T").slice(0, 1);
      const event = await new Date(date);
      const profile = { month: "short", year: "numeric", day: "numeric" };
      if (data) {
        setDefaultUser(data);
      } else {
        setDefaultUser(dataSet);
      }

      setDefaultDate(event.toLocaleDateString("en-UK", profile));
    } catch (err) {
      console.warn(err);
      setError(err.response.status);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDefault();
    const mq = window.matchMedia("(prefers-color-scheme: dark");
    if (mq.matches) {
      setIsDarkMode(true);
      document.body.style.backgroundColor = "#141D2F";
    }
  }, []);

  return (
    <>
      <div className={!isDarkMode ? "light-theme" : "dark-theme"}>
        <Header
          className="header"
          setBackToDefault={setBackToDefault}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <div className="search-bar">
          <SearchBar
            setData={setData}
            setSearchDate={setSearchDate}
            error={error}
            setError={setError}
            setLoading={setLoading}
            username={username}
            setUsername={setUsername}
            backToDefault={backToDefault}
            setBackToDefault={setBackToDefault}
          />
        </div>
        <div className="main">
          {loading && username !== "" ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="main-top">
                <Title
                  data={data}
                  defaultUser={defaultUser}
                  defaultDate={defaultDate}
                  searchDate={searchDate}
                  backToDefault={backToDefault}
                  error={error}
                />
              </div>
              <div className="main-bottom">
                <Follower
                  data={data}
                  defaultUser={defaultUser}
                  backToDefault={backToDefault}
                  error={error}
                />
                <Location
                  data={data}
                  defaultUser={defaultUser}
                  backToDefault={backToDefault}
                  error={error}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
