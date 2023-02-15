import { useState, useEffect } from "react";
/* import axios from "axios";
 */ import SingleComment from "./SingleComment";
export default function Comment() {
  const [articles, setArticles] = useState([]);

  const url = `http://hn.algolia.com/api/v1/search?tags=comment&hitsPerPage=50`;

  function fetchData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.hits);
        console.log(data.hits);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SingleComment articles={articles} />
    </div>
  );
}
