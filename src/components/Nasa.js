import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Header from "./Header";
import SpotLight from "./SpotLight";
import axios from "axios";
import SimpleCard from "./SimpleCard";

function Nasa() {
  const [latestApod, setLatestApod] = useState(null);
  const [prevApods, setPrevApods] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const DEMO_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";

  // infinte scroll
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [prevApods]);
  //

  const fetchLatestApod = async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}`
    );
    const data = await res.json();
    console.log(data);
    setLatestApod(data);
  };

  const fetchPrevApods = async (page) => {
    const today = currentDate;
    // get the previous 7th date from today
    const prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - 7);
    const prevDateStr = prevDate.toISOString().substring(0, 10);
    setCurrentDate(prevDateStr);
    if (page === 100) {
      setHasMore(false);
    }

    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}&start_date=${prevDateStr}&end_date=${today}&thumbs=true`
      );
      console.log(response.data.reverse());
      setPrevApods([...prevApods, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatestApod();
    fetchPrevApods(page);
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SpotLight data={latestApod} />
          </Grid>
          {prevApods.map((apod) => (
            <Grid item xs={12} sm={6} md={4} key={apod.date}>
              <SimpleCard data={apod} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Nasa;
