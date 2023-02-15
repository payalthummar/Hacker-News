import "./Navbar.css";
import icon from "../H.TEAL.png";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Navbar({ setUrl, setComments }) {
  const [input, setInput] = useState("");
  const [see, setsee] = useState(false);
  const day = 86400;
  const month = 2628000;
  const year = 31536000;
  /* let date = parseInt(DateTime.now().toSeconds()) - day;
  let date2 = date - day * 2; */
  const [date1, setDate1] = useState(
    parseInt(DateTime.now().toSeconds()) - day
  );
  const [date2, setDate2] = useState(
    parseInt(DateTime.now().toSeconds()) - 2 * day
  );

  const mainUrl = "http://hn.algolia.com/api/v1";

  const startUrl = `${mainUrl}/search?tags=front_page&hitsPerPage=50`;

  const searchUrl = `${mainUrl}/search?query=${input}&tags=story&hitsPerPage=50`;
  const newUrl = `${mainUrl}/search_by_date?tags=story&hitsPerPage=50`;

  const commentUrl =
    "http://hn.algolia.com/api/v1/search?tags=comment&hitsPerPage=50";
  const askUrl =
    "http://hn.algolia.com/api/v1/search?tags=ask_hn&hitsPerPage=50";
  const showUrl =
    "http://hn.algolia.com/api/v1/search?tags=show_hn&hitsPerPage=50";

  useEffect(() => {
    setUrl(searchUrl);
  }, [input]);

  useEffect(() => {
    setUrl(
      `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i%3e${date2},created_at_i%3c${date1}&hitsPerPage=50`
    );
  }, [date1]);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const setDay = (direction) => {
    if (direction) {
      setDate1((prev) => prev + day);
      setDate2((prev) => prev + day);
    } else {
      setDate1((prev) => prev - day);
      setDate2((prev) => prev - day);
    }
  };

  const setMonth = (direction) => {
    if (direction) {
      setDate1((prev) => prev + month);
      setDate2((prev) => prev + month);
    } else {
      setDate1((prev) => prev - month);
      setDate2((prev) => prev - month);
    }
  };

  const setYear = (direction) => {
    if (direction) {
      setDate1((prev) => prev + year);
      setDate2((prev) => prev + year);
    } else {
      setDate1((prev) => prev - year);
      setDate2((prev) => prev - year);
    }
  };

  const pastUrlFinder = () => {
    setsee((e) => !e);
    if (!see) {
      setUrl(
        `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i%3e${date2},created_at_i%3c${date1}&hitsPerPage=50`
      );
    }
    setComments(false);
  };

  const urlFunction = (urlInput, comm) => {
    setsee(false);
    if (!comm) {
      setUrl(urlInput);
      setComments(false);
    } else {
      setComments(true);
    }
  };

  return (
    <div className="navbar-outer">
      <div className="navbar">
        <img
          src={icon}
          alt="H Icon"
          className="icon"
          onClick={() => setUrl(startUrl)}
        />
        <h4 className="HN" onClick={() => urlFunction(startUrl)}>
          Hacker News
        </h4>
        <input
          className="search-input"
          type="text"
          size="18"
          placeholder="Search"
          onChange={changeHandler}
          value={input}
        />
        <ul className="navbar-list">
          <li onClick={() => urlFunction(newUrl)} className="clickLI">
            new
          </li>
          <p className="navP">|</p>
          <li onClick={() => pastUrlFinder()} className="clickLI">
            past
          </li>
          <p className="navP">|</p>
          <li onClick={() => urlFunction(commentUrl, true)} className="clickLI">
            comments
          </li>
          <p className="navP">|</p>
          <li onClick={() => urlFunction(askUrl)} className="clickLI">
            ask
          </li>
          <p className="navP">|</p>
          <li onClick={() => urlFunction(showUrl)} className="clickLI">
            show
          </li>
          <p className="navP">|</p>
          <li>jobs</li>
        </ul>
      </div>
      <div className={`${see ? "visible" : "invisible"} button-div`}>
        <button
          className="button-past"
          onClick={() => {
            setDay(false);
          }}
        >
          -d
        </button>
        <button
          className="button-past"
          onClick={() => {
            setMonth(false);
          }}
        >
          -m
        </button>
        <button
          className="button-past"
          onClick={() => {
            setYear(false);
          }}
        >
          -y
        </button>
        <button
          className="button-past"
          onClick={() => {
            setDay(true);
          }}
        >
          +d
        </button>
        <button
          className="button-past"
          onClick={() => {
            setMonth(true);
          }}
        >
          +m
        </button>
        <button
          className="button-past"
          onClick={() => {
            setYear(true);
          }}
        >
          +y
        </button>
      </div>
    </div>
  );
}
