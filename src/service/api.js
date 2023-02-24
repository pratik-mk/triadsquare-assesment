import axios from "axios";

const DEMO_KEY = "gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7";
export const fetchLatestApod = async () => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}`
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export const fetchPrevApods = async (currentDate) => {
  const today = currentDate;
  // get the previous 7th date from today
  const prevDate = new Date(today);
  prevDate.setDate(prevDate.getDate() - 7);
  const prevDateStr = prevDate.toISOString().substring(0, 10);

  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}&start_date=${prevDateStr}&end_date=${today}&thumbs=true`
    );
    console.log(response.data.reverse());
    return { res: response.data.reverse(), prevDateStr };
  } catch (error) {
    console.error(error);
  }
};
