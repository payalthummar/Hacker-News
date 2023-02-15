import "./News.css";
import Post from "./Posts/Post";
export default function News({ posts, setUrl, currentPage, postsPerPage }) {
  //console.log("total post", posts);
  return (
    <div className="News">
      <ol className="News-ol" start={(currentPage - 1) * postsPerPage + 1}>
        {posts.length === 0 ? (
          <div className="noData">No data Found</div>
        ) : (
          posts.map((element) => <Post posts={element} setUrl={setUrl} />)
        )}
      </ol>
    </div>
  );
}
