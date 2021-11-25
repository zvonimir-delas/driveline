import React, { useState, useEffect } from "react";
import "../../../../styles/screens/marketplace/_marketplace.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

import { getAllDrivingSchools } from "../../../../services/drivingSchools";
import MarketplaceLayout from "../../../layouts/MarketplaceLayout";
import Landing from "./Landing";
import DrivingSchool from "./DrivingSchool";
import SectionSeperator from "../../../helpers/SectionSeperator";
import Filters from "./Filters";

const Marketplace = () => {
  const [filtersToggle, setFiltersToggle] = useState(false);
  const [drivingSchools, setDrivingSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    city: "",
    category: "",
    minPrice: 0,
    maxPrice: 0
  });

  useEffect(() => {
    handleFiltersClick();
    async function fetchData() {
      const result = await getAllDrivingSchools(0, 8, search, filter);
      setDrivingSchools(result);
    }
    fetchData();
  }, []);

  const pageNumber = () => {
    return parseInt(drivingSchools.length / 8);
  };

  const handleFiltersClick = () => {
    setFiltersToggle(true);
    if (filtersToggle) {
      setFilter({
        city: "",
        category: "",
        minPrice: 0,
        maxPrice: 0
      });
      getAllDrivingSchools(0, 8, search, {}).then(data =>
        setDrivingSchools(data)
      );
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      getAllDrivingSchools(pageNumber(), 8, search, filter).then(data =>
        setDrivingSchools(drivingSchools.concat(data))
      );
    }, 500);
  };

  const handleChangeSearch = e => {
    const { value } = e.target;
    setSearch(value);
  }

  const handleSearchClick = e => {
    const value = search;

    if (filtersToggle) {
      debouncedSearch(value);
      return;
    }

    if (value.length === 0) {
      getAllDrivingSchools(0, 8, "", filter).then(data =>
        setDrivingSchools(data)
      );
      return;
    }

    if (value.length >= 1) {
      debouncedSearch(value);
      return;
    }
  };

  const debouncedSearch = debounce(value => {
    getAllDrivingSchools(pageNumber(), 8, value, filter).then(data =>
      setDrivingSchools(data)
    );
  }, 10);

  const filterDrivingSchools = values => {
    setFilter(values);
    getAllDrivingSchools(0, 8, search, values).then(data =>
      setDrivingSchools(data)
    );
  };

  if (drivingSchools === undefined) return <h1>Error</h1>;

  return (
    <>
      <MarketplaceLayout />
      <main className="marketplace">
        <Landing
          filtersToggle={filtersToggle}
          filtersClickHandler={handleFiltersClick}
          handleChangeSearch={handleChangeSearch}
          handleSearchClick={handleSearchClick}
        />
        <section className="marketplace__driving-schools">
          {filtersToggle && (
            <Filters filterDrivingSchools={filterDrivingSchools} />
          )}
          <div className="driving-schools__title">
          </div>
          {drivingSchools.length === 0 ? (
            <p>Your search wasn't found</p>
          ) : (
            <InfiniteScroll
              className="driving-schools__list"
              dataLength={drivingSchools.length}
              next={fetchMoreData}
            >
              {drivingSchools.map((drivingSchool, index) => (
                <DrivingSchool key={index} drivingSchool={drivingSchool} />
              ))}
            </InfiniteScroll>
          )}
        </section>
      </main>
    </>
  );
};

export default Marketplace;
