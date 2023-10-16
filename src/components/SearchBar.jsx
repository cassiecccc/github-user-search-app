import axios from "axios";
import { useRef, useState } from "react";

export function SearchBar({
  setData,
  setSearchDate,
  error,
  setError,
  setLoading,
  username,
  setUsername,
  backToDefault,
  setBackToDefault,
}) {
  const inputRef = useRef();

  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setBackToDefault(false);
    setIsFocus(false);
    setUsername("");
    if (error) {
      setData("");
    }

    if (username !== "") {
      try {
        const res = await axios.get(`https://api.github.com/users/${username}`);
        const data = await res.data;
        sessionStorage.setItem("data", JSON.stringify(data));
        const date = await data.created_at.split("T").slice(0, 1);
        const event = await new Date(date);
        const profile = { month: "short", year: "numeric", day: "numeric" };
        setSearchDate(event.toLocaleDateString("en-UK", profile));
        sessionStorage.setItem(
          "date",
          event.toLocaleDateString("en-UK", profile)
        );
        setData(data);
      } catch (err) {
        setError(err.response.status);
        console.log(err);
        if (err.response.status == "404") {
          console.log("404");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setData("");
    }
  };

  function handleChange(e) {
    setUsername(e.target.value);
    setIsFocus(false);
    setError(undefined);
  }

  function handleFocus() {
    setIsFocus(true);
    setError(undefined);
    if (error) {
      setData("");
    } else {
      return;
    }
    setUsername("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar search-bar">
        <div className="search-wrapper">
          <div className="search-bar-left">
            <img
              className="search-icon"
              src="../src/assets/icons/icon-search.svg"
              alt="search icon"
            />
            <input
              id="search"
              type="text"
              ref={inputRef}
              value={username}
              placeholder={
                error == "404" && !backToDefault
                  ? ""
                  : "Search Github username..."
              }
              onFocus={handleFocus}
              onChange={handleChange}
            />

            <div
              className={
                error == "404" && !backToDefault
                  ? "no-results"
                  : isFocus && error == ""
                  ? "no results clear-no-results"
                  : "no results clear-no-results"
              }
            >
              No Results
            </div>
          </div>

          <button className="button-search">Search</button>
        </div>
      </form>
    </>
  );
}
