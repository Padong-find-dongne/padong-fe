import React from "react";
import { useSearchStore } from "../store/SearchStore";

const Mobility = () => {
  const {
    recommendations,
    setSelectedRecommendation,
    singleDestination,
    multiDestinations,
    inputType,
  } = useSearchStore();
  const departureCode = singleDestination.dongCode;
  const arrivalCode = selectedRecommendation?.departureDong.adminDongCode || "";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      appKey: "e8wHh2tya84M88aReEpXCa5XTQf3xgo01aZG39k5",
    },
    body: JSON.stringify({
      startX: "126.926493082645",
      startY: "37.6134436427887",
      endX: "127.126936754911",
      endY: "37.5004198786564",
      format: "json",
      count: 1,
    }),
  };

  fetch("https://apis.openapi.sk.com/transit/routes/sub", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return <div></div>;
};

export default Mobility;
