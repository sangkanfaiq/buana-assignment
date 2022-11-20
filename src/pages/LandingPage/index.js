import React, { useEffect, useState } from "react";
import "./styles.scss";
import "./mobile.scss";
import Navbar from "../../components/Navbar";
import { FiSearch } from "react-icons/fi";
import { fetchData, searchData } from "../../helpers/service/data.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {Data} from './data'


const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center" style={{marginBottom: '1em'}}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};


const LandingPage = () => {
  const { ref, inView } = useInView();
  const [openDetails, setOpenDetails] = useState([]),
    [search, setSearch] = useState();


  const data = useInfiniteQuery(
    ["getAllData", search],
    async ({ pageParam = 0 }) => {
      let response;
      !search
        ? (response = await fetchData(10, pageParam))
        : (response = await searchData(search));
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
            {!data.isLoading ? (
              data.data?.pages?.map((page) => {
                return page.data.map((item, index) => {
                  return (
                    <Data item={item} index={index} openDetails={openDetails} toggle={toggle}/>
                  )
                });
              })
            ) : (
              <Loading />
            )}
            {!search ? (
              <>
                <div className="d-flex justify-content-center">
                  <button
                    ref={ref}
                    onClick={() => data.fetchNextPage()}
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                    disabled={!data.hasNextPage || data.isFetchingNextPage}
                  >
                    {data.isFetchingNextPage ? (
                      <Loading />
                    ) : data.hasNextPage ? (
                      <Loading />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                <div>
                  {data.isFetching && !data.isFetchingNextPage ? (
                    <div className="d-flex justify-content-center" style={{height: '200px'}}>
                      <p style={{ color: "#fff", fontSize: '14px' }}>Updating...</p>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
