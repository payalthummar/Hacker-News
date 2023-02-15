import "./Post.css";
import moment from "moment";

export default function Post({ posts, setUrl }) {
  const authUrl = `http://hn.algolia.com/api/v1/search?tags=story,author_${posts.author}`;
  const timeago = moment(posts.created_at).fromNow();

  return (
    <div className="listDiv">
      <li className="listItem">
        <h4 className="hNews" onClick={() => window.open(posts.url, "_blank")}>
          {posts.title}
        </h4>
        {/* {console.log(posts.url)} */}
        <p> {posts.url}</p>
        <div className="listPara">
          <p>{posts.points} points | article by: </p> <div>&nbsp;</div>
          <p onClick={() => setUrl(authUrl)} className="clickComment">
            {posts.author}
          </p>
          <div>&nbsp;</div>
          <p> | created at: {timeago} | </p>
          <div>&nbsp;</div>
          <p>{posts.num_comments} comments</p>
        </div>
      </li>
    </div>
  );
}
