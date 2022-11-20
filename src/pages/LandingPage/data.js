import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

export const Data = ({ item, index, openDetails, toggle }) => {
  const [getImage, setGetImage] = useState("");

  axios({
    method: "GET",
    url: `https://api.thecatapi.com/v1/images/${item.reference_image_id}`,
  })
    .then((res) => {
      setGetImage(res.data.url);
      console.log(res.data.url, "waleoakeoawke");
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <div className="cards" key={index}>
        <div className="imgBox">
          <img src={getImage} alt={item.name} title={item.name} />
        </div>

        <div className="details">
          <div className="info">
            <div className="inf-left">
              <h5>{item.name}</h5>
              <h4>Origin : {item.origin}</h4>
              <p>{item.description}</p>
              <p>{item.temperament}</p>
            </div>
            <div className="inf-right">
              <div className="life-span">
                <h3>LIFE SPAN</h3>
                <p>{item.life_span} YEARS</p>
              </div>
              <div className="weight">
                <h3>WEIGHT</h3>
                <p>{item.weight?.imperial} POUNDS</p>
              </div>
            </div>
          </div>
          <div className="button">
            <button onClick={() => toggle(item)}>
              Details{" "}
              {openDetails.find((id) => id === item.id) ? (
                <BiCaretUp className="icons" />
              ) : (
                <BiCaretDown className="icons" />
              )}
            </button>
          </div>
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
                <Level name={"Shedding Level"} item={item.shadding_level} />
                <Level name={"Social Needs"} item={item.social_needs} />
                <Level
                  name={"Stranger Friendly"}
                  item={item.stranger_friendly}
                />
                <Level name={"Vocalisation"} item={item.vocalisation} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="v-line"></div>
      </div>
    </>
  );
};

const Level = ({ item, name }) => {
    return (
      <p>
        {name}{" "}
        {Array(item)
          .fill()
          .map((_, index) => {
            return (
              <AiFillStar style={{ fontSize: "12px", color: "darkorange" }} />
            );
          })}
      </p>
    );
  };