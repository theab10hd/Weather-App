import React, { useState } from "react";
import "../styles/Home.css";
import WeatherBox from "../components/WeatherBox";

function Home() {
  const [atmosphere, setAtmosphere] = useState("");
  const [day, setDay] = useState(0);

  const getBackground = (atmo) => {
    if (day === 0) {
      return "/videos/Night.mp4";
    }

    if (atmo.toLocaleLowerCase().includes("rain")) {
      return "/videos/Rainy.mp4";
    } else if (atmo.toLocaleLowerCase().includes("sunny")) {
      return "/videos/Sunny.mp4";
    } else if (atmo.toLocaleLowerCase().includes("mist")) {
      return "/videos/Mist.mp4";
    } else if (atmo.toLocaleLowerCase().includes("clear")) {
      return "/videos/Clear.mp4";
    } else if (atmo.toLocaleLowerCase().includes("thunderstome")) {
      return "/videos/Thunder.mp4";
    } else if (atmo.toLocaleLowerCase().includes("cloud")) {
      return "/videos/Clouds.mp4";
    } else if (atmo.toLocaleLowerCase().includes("freezing")) {
      return "/videos/Snow.mp4";
    } else {
      return "/videos/Null.mp4";
    }
  };

  return (
    <div className="h-screen w-full home-box relative flex justify-center items-center">
      <video
        src={getBackground(atmosphere)}
        className="w-screen h-screen object-cover absolute top-0 left-0 opacity-50"
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <WeatherBox setAtmosphere={setAtmosphere} setDay={setDay} />
    </div>
  );
}

export default Home;
