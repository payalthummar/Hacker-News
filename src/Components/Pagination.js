import { useState, useEffect } from "react";
import "./Pagination.css";
export default function Pagination({
  totalPosts,
  postsPerPage,
  paginate,
  setPostsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumber = [];
  const [input, setInput] = useState(postsPerPage);
  const regex = new RegExp(/[0-9]/g);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    console.log("totalPosts ", totalPosts, " postsperPage ", postsPerPage);
    pageNumber.push(i);
  }

  const changeHandler = (e) => {
    if (regex.test(e.target.value)) {
      setInput(e.target.value);
    } else {
      setInput("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPostsPerPage(input);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [postsPerPage]);

  return (
    <div className="pagination">
      <p className="hitscount">{totalPosts} hits </p>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={input}
          id="number"
          step="1"
          min="3"
          max="50"
          onChange={changeHandler}
          className="ppp"
        />
        <button className="pppp" onClick={submitHandler}>
          posts per page
        </button>
      </form>
      <a
        href="#"
        className="left"
        onClick={() =>
          currentPage > 1 ? paginate(currentPage - 1) : paginate(currentPage)
        }
      >
        &laquo;
      </a>
      {pageNumber.map((number) => (
        <div key={number}>
          <ul key={number} className="News-ol">
            <li key={number} className="page">
              <a href="!#" onClick={() => paginate(number)} key={number}>
                {number}
              </a>
            </li>
          </ul>
        </div>
      ))}
      <a
        href="#"
        className="left"
        onClick={() =>
          currentPage < Math.ceil(totalPosts / postsPerPage)
            ? paginate(currentPage + 1)
            : paginate(currentPage)
        }
      >
        &raquo;
      </a>
    </div>
  );
}
