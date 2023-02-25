import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import SimpleCard from "../components/SimpleCard";
import Header from "../components/Header";
import SpotLight from "../components/SpotLight";
import LinearProgress from "@material-ui/core/LinearProgress";

function Homepage() {
  const [latestApod, setLatestApod] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const DEMO_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";

  const fetchLatest = async () => {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}`
    );
    const data = await res.json();
    console.log(data);
    setLatestApod(data);
  };

  const fetchPrev = async (page) => {
    setLoading(true);
    console.log({ page });
    let today = new Date(currentDate);
    today.setDate(today.getDate() - 1);
    today = today.toISOString().substring(0, 10);
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
      setItems([...items, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!latestApod) fetchLatest();
    fetchPrev(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div>
      <Header />
      <Container maxWidth="100%" style={{ marginTop: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SpotLight data={latestApod} />
          </Grid>
          {items.map((item, index) => (
            <Grid
              item
              lg={2}
              md={4}
              sm={6}
              xs={12}
              style={{ alignItems: "center", width: "100%" }}
            >
              <SimpleCard key={index} data={item} />
            </Grid>
          ))}
        </Grid>
        <div>
          {loading && (
            <>
              <LinearProgress style={{ padding: "10px", margin: "20px, 0" }} />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
export default Homepage;
