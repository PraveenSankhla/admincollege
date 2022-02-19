import React, { useEffect, useState } from "react";
import "./dropdown.css";
import { issueDropdown } from "./Navitems";
import { Link, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";

const Volumedrop = ({ year }, props) => {
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  console.log("location", location, "props", props);
  const getData = (id) => {
    const q = query(collection(db, "folders"));
    onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          setData(doc.data().urls);
        }
      });
    });
  };

  console.log("array", data.length);
  return (
    <>
      <ul
        className={dropdown ? "aboutus-submenu clicked" : "aboutus-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {year.map((item, index) => {
          console.log("year yaer", item);
          return (
            <div
              style={{
                backgroundColor: "black",
                height: "100%",
                width: "100%",
                display: "flex",
                position: "relative",
                padding: "2px 6px",
                cursor:"pointer",
                fontSize:"14px"
              }}
              onMouseEnter={() => {
                getData(item);
              }}
              onMouseLeave={() => setData([])}
            >
              <h1 style={{ color: "white",  }}>{item}</h1>
              {/* <i className="icon">
                <FaAngleDown />
              </i> */}

              <div
                style={{
                  position: "absolute",
                  left: "100%",
                  width: "fit-content",
                  height: "fit-content",
                  display: "flex",
                  paddingRight: 20,
                  flexDirection: "column",
                  backgroundColor: "black",
                }}
              >
                {data.length > 0 &&
                  data.map((ite, i) => {
                    console.log("ite", ite.ur);
                    return (
                      <Link to={`/view/file/${year}/${i}`}>
                        Issue Number {i + 1}
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Volumedrop;
