// jshint esversion:8

/* Global Variables */
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", buttonAction);

function buttonAction(event) {
  //   console.log(event);
  // User inputs
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  // API variables
  const APIKey = "88389d0d537c611566de0fee295f2a98";
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${APIKey}`;

  /*** dynamic UI update ***/

  getData(url).then((weatherData) => {
    // console.log(weatherData);
    let data = {
      date: newDate,
      temp: weatherData.main.temp,
      content: feelings,
    };
    // console.log(data);
    postData("/newLocation", data);
    updateUI();
  });
}

/*** helper functions ***/

// get Data from API
const getData = async (url) => {
  const res = await fetch(url);

  try {
    const weatherData = await res.json();
    return weatherData;
  } catch (error) {
    console.log(`error : ${error}`);
  }
};

// post data to server
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  }).catch((error) => {
    console.log(`error : ${error}`);
  });
};

// update UI using server data

const updateUI = async () => {
  // getting updated data
  const res = await fetch("/locationData");

  try {
    const updateData = await res.json();
    console.log(updateData);

    // update UI elements
    date.textContent = `The date is : ${updateData.date}`;
    temp.textContent = `Temperature is : ${updateData.temp}`;
    content.textContent = `Your feeling : ${updateData.content}`;
  } catch (error) {
    console.log(`error : ${error}`);
  }
};
