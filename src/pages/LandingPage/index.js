import React, { useEffect, useState } from "react";
import "./styles.scss";
import "./mobile.scss";
import Navbar from "../../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { fetchData, searchData } from "../../helpers/service/data.service";
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
  const [openDetails, setOpenDetails] = useState([]),
  [search,setSearch] = useState()

  const data = useInfiniteQuery(
    ["getAllData",search],
    async ({ pageParam = 0 }) => {
      let response
      !search ? response = await fetchData(10, pageParam) : response = await searchData(search)
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#F6F6C9"
            fill-opacity="1"
            d="M0,0L34.3,10.7C68.6,21,137,43,206,42.7C274.3,43,343,21,411,32C480,43,549,85,617,106.7C685.7,128,754,128,823,112C891.4,96,960,64,1029,64C1097.1,64,1166,96,1234,112C1302.9,128,1371,128,1406,128L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <div className="container">
          <div className="search-bar">
            <div className="search">
              <input
                type="text"
                placeholder="Search here"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch className="search-icon" />
            </div>
          </div>
          <div className="cards-area">
            {!data.isLoading ?
              data.data?.pages?.map((page) => {
                return page.data.map((item, index) => {
                  return (
                    <>
                      <div className="cards" key={index}>
                           <div className="imgBox">
                           <img src={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`} alt={item.name} />
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
              }):(
                <div>loading...</div>
              )}
              {!search?(<>
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
              </>
              ): null}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
