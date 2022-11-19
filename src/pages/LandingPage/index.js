import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const API_URL = process.env.REACT_APP_API_URL;

const Level = ({ item, name }) => {
  return (
    <p>
      {name}{" "}
      {Array(item)
        .fill()
        .map((_, index) => {
          return (
            <AiFillStar style={{ fontSize: "18px", color: "darkorange" }} />
          );
        })}
    </p>
  );
};

const LandingPage = () => {
  const [data, setData] = useState([]);

  const [openDetails, setOpenDetails] = useState([]);

  const [query, setQuery] = useState({
    limit: 10,
  });
  const getAllData = async () => {
    await axios({
      method: "GET",
      url: `${API_URL}?limit=${query.limit}`,
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const toggle = (item) => {
    if (openDetails.find((id) => id === item.id)) {
      setOpenDetails(openDetails.filter((value) => value !== item.id));
    } else {
      setOpenDetails((prevState) => [...prevState, item.id]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="landingpage">
        <div className="container">
          <div className="search-bar">
            <div className="search">
              <input type="text" placeholder="Search here" />
              <FiSearch />
            </div>
          </div>
          <div className="cards-area">
            {data.map((item, index) => {
              return (
                <div className="cards" key={index}>
                  <div className="imgBox">
                    <img src={item?.image?.url} alt={item.name} />
                  </div>
                  <div className="details">
                    <h5>
                      {item.name} {`(${item.origin})`}
                    </h5>
                    <p>{item.description}</p>
                    <p>{item.temperament}</p>
                    <button onClick={() => toggle(item)}>Details</button>
                    <div
                      className={
                        openDetails.find((id) => id === item.id)
                          ? "details-area active"
                          : "details-area"
                      }
                    >
                      <div className="details">
                        <div className="left">
                          <Level name={"Adaptability"} item={item.adaptability} />
                          <Level name={"Affection Level"} item={item.affection_level} />
                          <Level name={"Child Friendly"} item={item.child_friendly} />
                          <Level name={"Dog Friendly"} item={item.dog_friendly} />
                        </div>
                        <div className="center">
                          <Level name={"Energy Level"} item={item.energy_level} />
                          <Level name={"Grooming"} item={item.grooming} />
                          <Level name={"Health Issues"} item={item.health_issues} />
                          <Level name={"Intelligence"} item={item.intelligence} />
                        </div>
                        <div className="right">
                          <Level name={"Shedding Level"} item={item.shadding_level}  />
                          <Level name={"Social Needs"} item={item.social_needs} />
                          <Level name={"Stranger Friendly"} item={item.stranger_friendly}/>
                          <Level name={"Vocalisation"} item={item.vocalisation}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
