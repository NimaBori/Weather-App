const form = document.querySelector(".top-banner form");
const list = document.querySelector(".ajax-section .cities");
const errorMsg = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = form.firstElementChild.value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&APPID=ef03440279f555534aabdc1893766df6&unites=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw Error("Invalid city name");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp) / 10}<sup>°C</sup></div>
      <div class="city-details"> feels like: ${
        Math.round(main.feels_like) / 10
      }<sup>°C</sup</div>      
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch((err) => {
      errorMsg.textContent = err.message;
    });
  form.reset();
  form.firstElementChild.focus();
  errorMsg.textContent = "";
});
