"use strict";

const getQuoteBtn = document.querySelector(".get-quote");
const viewMoreQuoteBtn = document.querySelector(".more-quote");

const mainSection = document.querySelector(".main");
const subSection = document.querySelector(".more-quotes");
const statusMsg = document.querySelector(".status");

let url = `https://quote-garden.herokuapp.com/api/v3/quotes?`;

//fetch data
const fetchData = function (url) {
  displayStatusMsg("loading...");
  return fetch(url).then((res) => {
    statusMsg.innerHTML = "";
    if (!res.ok) throw new Error("something went wrong");
    return res.json();
  });
};

// dispay status msg
function displayStatusMsg(text) {
  const html = `
    <p class="statusMsg">${text}</p>
  `;

  statusMsg.innerHTML = html;
}

//display main quote
const displayMainQuote = function (text, author) {
  statusMsg.innerHTML = "";
  const html = `
    <div class="quote">
    <p class="main-quote">
     " ${text}"
    </p>
    <p class="author">${author}</p>
    </div>
    <button class="more-quote">View more Quotes of ${author}</button>
    `;

  mainSection.innerHTML = html;
  const viewMoreQuoteBtn = document.querySelector(".more-quote");

  viewMoreQuoteBtn.addEventListener("click", function () {
    displayMorequotes(author);
  });
};

//display sub quotes

const displaySubQUotes = function (author, text) {
  statusMsg.innerHTML = "";
  const html = `
    <div class="sub-quotes">
    <p class="sub-quote">
    " ${text}"
    </p>
    <p class="author">${author}</p>
    </div>
    `;

  subSection.insertAdjacentHTML("beforeend", html);
};

//get quotes
getQuoteBtn.addEventListener("click", function () {
  subSection.innerHTML = "";
  mainSection.innerHTML = "";
  const number = Math.trunc(Math.random() * 200);

  let updatedUrl = `${url}limit=200`;
  fetchData(updatedUrl)
    .then((data) => {
      const { quoteAuthor, quoteText } = data.data[number];
      displayMainQuote(quoteText, quoteAuthor);
    })
    .catch((error) => displayStatusMsg(error.message));
});

// display more quotes
const displayMorequotes = function (author) {
  let urlMoreQuotes = `${url}author=${author}&limit=20`;
  fetchData(urlMoreQuotes)
    .then((data) => {
      data.data?.map((each) => {
        displaySubQUotes(each.quoteAuthor, each.quoteText);
      });
    })
    .catch((error) => displayStatusMsg(error.message));
};
