export function Title({
  data,
  defaultUser,
  defaultDate,
  searchDate,
  backToDefault,
  error,
}) {
  return (
    <>
      {data != "" && backToDefault != true && !error ? (
        <div className="title">
          <div className="title-top">
            <img className="avatar" src={data.avatar_url} alt="user avatar" />

            <div className="title-profile">
              <div className="profile-name profile">{data.name}</div>
              <div className="profile-login">@{data.login}</div>
            </div>

            <div className="profile-joined">
              Joined {searchDate.split("T").slice(0, 1)}
            </div>
          </div>
          <div className="profile-bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio.
            Quisque volutpat mattis eros.
          </div>
        </div>
      ) : (
        <div className="title">
          <div className="title-top">
            <img
              className="avatar"
              src={defaultUser.avatar_url}
              alt="user avatar"
            />

            <div className="title-profile">
              <div className="profile-name">{defaultUser.name}</div>
              <div className="profile-login">@{defaultUser.login}</div>
              <div className="profile-joined">Joined {defaultDate}</div>
            </div>
          </div>
          <div className="profile-bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio.
            Quisque volutpat mattis eros.
          </div>
        </div>
      )}
    </>
  );
}
