import React, { useEffect, useState } from "react";
import "./styles.scss";
import "./mobile.scss";
import Navbar from "../../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { fetchData } from "../../helpers/service/data.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

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

const LandingPage = () => {
  const { ref, inView } = useInView();

  const [openDetails, setOpenDetails] = useState([]);

  const data = useInfiniteQuery(
    ["getAllData"],
    async ({ pageParam = 0 }) => {
      const response = await fetchData(5, pageParam);
      return response;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasMore) {
          return lastPage.page + 1;
        }
        return false;
      },
    }
  );
  useEffect(() => {
    if (inView) {
      data.fetchNextPage();
    }
  }, [inView, data]);

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
              <FiSearch className="search-icon" />
            </div>
          </div>
          <div className="cards-area">
            {!data.isLoading &&
              data.data?.pages?.map((page) => {
                return page.data.map((item, index) => {
                  return (
                    <>
                      <div className="cards" key={index}>
                        <div className="imgBox">
                          <img src={item.image?.url} alt={item.name} />
                        </div>

                        <div className="details">
                          <div className="info">
                            <div className="inf-left">
                              <h5>
                                {item.name} {`(${item.origin})`}
                              </h5>
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
                                <p>{item.weight.imperial} POUNDS</p>
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
                                <Level
                                  name={"Adaptability"}
                                  item={item.adaptability}
                                />
                                <Level
                                  name={"Affection Level"}
                                  item={item.affection_level}
                                />
                                <Level
                                  name={"Child Friendly"}
                                  item={item.child_friendly}
                                />
                                <Level
                                  name={"Dog Friendly"}
                                  item={item.dog_friendly}
                                />
                              </div>
                              <div className="center">
                                <Level
                                  name={"Energy Level"}
                                  item={item.energy_level}
                                />
                                <Level name={"Grooming"} item={item.grooming} />
                                <Level
                                  name={"Health Issues"}
                                  item={item.health_issues}
                                />
                                <Level
                                  name={"Intelligence"}
                                  item={item.intelligence}
                                />
                              </div>
                              <div className="right">
                                <Level
                                  name={"Shedding Level"}
                                  item={item.shadding_level}
                                />
                                <Level
                                  name={"Social Needs"}
                                  item={item.social_needs}
                                />
                                <Level
                                  name={"Stranger Friendly"}
                                  item={item.stranger_friendly}
                                />
                                <Level
                                  name={"Vocalisation"}
                                  item={item.vocalisation}
                                />
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
                });
              })}
            <div>
              <button
                ref={ref}
                onClick={() => data.fetchNextPage()}
                disabled={!data.hasNextPage || data.isFetchingNextPage}
              >
                {data.isFetchingNextPage
                  ? "Loading more..."
                  : data.hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {data.isFetching && !data.isFetchingNextPage
                ? "Background Updating..."
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
