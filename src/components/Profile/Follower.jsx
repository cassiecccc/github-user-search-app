export function Follower({ data, defaultUser, backToDefault, error }) {
  return (
    <>
      {data != "" && backToDefault != true && !error ? (
        <div className="follower">
          <div className="follower-column">
            <div className="follower-title">Repos</div>
            <div className="follower-number">{data.public_repos}</div>
          </div>
          <div className="follower-column">
            <div className="follower-title">Followers</div>
            <div className="follower-number">{data.followers}</div>
          </div>
          <div className="follower-column">
            <div className="follower-title">Following</div>
            <div className="follower-number">{data.following}</div>
          </div>
        </div>
      ) : (
        <div className="follower">
          <div className="follower-column">
            <div className="follower-title">Repos</div>
            <div className="follower-number">{defaultUser.public_repos}</div>
          </div>
          <div className="follower-column">
            <div className="follower-title">Followers</div>
            <div className="follower-number">{defaultUser.followers}</div>
          </div>
          <div className="follower-column">
            <div className="follower-title">Following</div>
            <div className="follower-number">{defaultUser.following}</div>
          </div>
        </div>
      )}
    </>
  );
}
