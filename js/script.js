function setLocation() {
  let weather = ["Clearly", "Sunny", "Rain"]
  let town = ["Humortown", "Memeland", "Ape York"]
  let now = new Date();
  let month = "January";
  if (now.getMonth() == 0) month = "January";
  else if (now.getMonth() == 1) month = "February";
  else if (now.getMonth() == 2) month = "March";
  else if (now.getMonth() == 3) month = "April";
  else if (now.getMonth() == 4) month = "May";
  else if (now.getMonth() == 5) month = "June";
  else if (now.getMonth() == 6) month = "Jule";
  else if (now.getMonth() == 7) month = "August";
  else if (now.getMonth() == 8) month = "September";
  else if (now.getMonth() == 9) month = "October";
  else if (now.getMonth() == 10) month = "November";
  else if (now.getMonth() == 11) month = "December";
  if (now.getMinutes() < 10) minutes = "0" + now.getMinutes();
  else minutes = now.getMinutes()
  let time = "Today " + month + " " + now.getDate() + "th " + now.getHours() + ":" + minutes;
  document.getElementsByClassName("location__status")[0].textContent = weather[getRandomInt(3)];
  document.getElementsByClassName("location__status")[1].textContent = town[getRandomInt(3)];
  document.getElementsByClassName("location__status")[2].textContent = time;

}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}





function menu() {
  function onclick(e) {
    var enabled = e.target.checked;
    if (enabled == true) {
      document.getElementById("nav").classList.add("visible");
    }
    else {
      document.getElementById("nav").classList.remove("visible");
    }
  }
  document.getElementById("menu-toggle").addEventListener("click", onclick);
}
let temp = 0;
function swiper() {
  if (document.documentElement.scrollWidth > 1439) {

    var trending_swiper = new Swiper(".trending-articles__block", {
      scrollbar: {
        el: ".swiper-scrollbar",

      },
      direction: "vertical",
      slidesPerView: "3.5",
      freeMode: true,
      spaceBetween: 30,
      mousewheel: true,
    });

  }

  else {
    addClass();
    var trending_swiper = new Swiper(".trending-articles__block", {
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
      },
      spaceBetween: 30,
    });

    var medium_swiper = new Swiper(".medium-news__block", {
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
      },
      spaceBetween: 30,
    });
  }
  var small_swiper = new Swiper(".small-news__block", {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
    },
    spaceBetween: 25,
  });

  var large_swiper = new Swiper(".large-news__block", {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
    },
    spaceBetween: 30,
  });

  function addClass() {
    let medium_wrapper = document.getElementsByClassName("mobile-wrapper");
    console.log(medium_wrapper.classList);
    medium_wrapper[0].classList.add("swiper-wrapper");
  }

}
function vote() {
  let choose_img = "<img src='./src/img/Done.svg'>";
  left_candidat = document.getElementsByClassName('left__vote__btn')[0];
  right_candidat = document.getElementsByClassName('right__vote__btn')[0];

  let ip;

  fetch('https://ipapi.co/json/', { mode: 'cors' })
    .then(d => d.json())
    .then((d) => {
      ip = d.ip,
        url = "http://159.223.208.214:5000/getVote/" + ip;
      fetch(url).then((response) => { return response.text() })
        .then((ans) => {
          if (ans != "false") {
            console.log(ans)
            hide('vote__btns');
            show('score__btn', 'block');
            hide('vote__undertext');
            animateVote();
          }
          else {
            left_candidat.addEventListener('click', vote_score);
            right_candidat.addEventListener('click', vote_score);
          }
        })
        .catch(error => {
          // обработка ошибки
          console.log(error);
        });
      function vote_score(e) {
        if (this == left_candidat) {
          fetch('http://159.223.208.214:5000/vote/' + ip + '/0').then((a) => {
            hide('vote__btns');
            show('score__btn', 'block');
            hide('vote__undertext');
          })
        }
        else if (this == right_candidat) {
          fetch('http://159.223.208.214:5000/vote/' + ip + '/1').then((a) => {
            hide('vote__btns');
            show('score__btn', 'block');
            hide('vote__undertext');
          })
        }
        animateVote();

        temp = 2;
      }
    });
}
function animateVote() {
  fetch('http://159.223.208.214:5000/getStats').then((response) => { return response.text() }).then((abc) => {
    let start = Date.now();
    abc = abc.toString().slice(0, 2);
    document.getElementsByClassName('left__diagrama')[0].innerHTML = "<span>" + abc + "%</span>";
    document.getElementsByClassName('right__diagrama')[0].innerHTML = "<span>" + (100 - abc) + "%</span>";
    if (abc > 50) document.getElementsByClassName('left__score-candidat')[0].innerHTML += "<img src='./src/img/Done.svg'>";
    else document.getElementsByClassName('right__score-candidat')[0].innerHTML += "<img src='./src/img/Done.svg'>";
    let interval = 1000 / Number(abc);
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;
      if (timePassed >= 1000) {
        clearInterval(timer);
        return;
      }
      document.getElementsByClassName('left__diagrama')[0].style.width = timePassed / interval + '%';
    }, 20);
  })
}
function visible(object_class) {
  if(document.getElementsByClassName(object_class)[0]){
  return window.getComputedStyle(document.getElementsByClassName(object_class)[0], null).getPropertyValue('display');}
}
function hide(object_class) {
  if(document.getElementsByClassName(object_class)[0]){
  document.getElementsByClassName(object_class)[0].style.display = 'none';}
}
function show(object_class, style) {
  if(document.getElementsByClassName(object_class)[0]){
  document.getElementsByClassName(object_class)[0].style.display = style;}
}
function promotion() {

  let left_candidat_img = document.getElementsByClassName('left__candidat')[0];
  let right_candidat_img = document.getElementsByClassName('right__candidat')[0];

  left_candidat_img.addEventListener('click', show_promotion);
  right_candidat_img.addEventListener('click', show_promotion);
  hoverOn();
  function hoverOn() {
    left_candidat_img.addEventListener('mouseover', halfOpacityCandidat)
    left_candidat_img.addEventListener('mouseout', fullOpacityCandidat)
    right_candidat_img.addEventListener('mouseover', halfOpacityCandidat)
    right_candidat_img.addEventListener('mouseout', fullOpacityCandidat)
  }
  function hoverOf() {
    left_candidat_img.removeEventListener('mouseover', halfOpacityCandidat)
    left_candidat_img.removeEventListener('mouseout', fullOpacityCandidat)
    right_candidat_img.removeEventListener('mouseover', halfOpacityCandidat)
    right_candidat_img.removeEventListener('mouseout', fullOpacityCandidat)
  }
  function halfOpacityCandidat() {
    if (this == left_candidat_img) {
      right_candidat_img.style.opacity = "0.5";
    }
    else left_candidat_img.style.opacity = "0.5"
  }
  function fullOpacityCandidat() {
    if (this == left_candidat_img) {
      right_candidat_img.style.opacity = "1";
    }
    else left_candidat_img.style.opacity = "1"
  }
  function show_promotion(e) {
    if (visible("score__btn") == "none" && visible("vote__btns") == "none") temp = temp;
    else if (visible("vote__btns") == "none") temp = 2;
    else if (visible("score__btn") == "none") temp = 1;
    console.log(temp);
    //hide('score__btn');
    //hide('vote__btns');
    hide('vote__header');
    hide('vote__undertext');
    hide('vote__losung');
    hoverOf();
    if (this == left_candidat_img) {
      hide('right__candidat__promotion');
      show('left__candidat__promotion', 'block');
      right_candidat_img.style.opacity = "0.5";
      left_candidat_img.style.opacity = '1';
    }
    else if (this == right_candidat_img) {
      hide('left__candidat__promotion');
      show('right__candidat__promotion', 'block');
      left_candidat_img.style.opacity = '0.5';
      right_candidat_img.style.opacity = '1';
    }

    document.getElementsByClassName('arrow__back')[0].addEventListener('click', function (e) {
      hoverOn();
      console.log(e);
      hide('left__candidat__promotion');
      hide('right__candidat__promotion');
      right_candidat_img.style.opacity = '1';
      left_candidat_img.style.opacity = '1';
      if (temp == 1) {
        show('vote__btns', 'flex');
        show('vote__header', 'block');
        show('vote__undertext', 'block');
        show('vote__losung','block')
      }
      else if (temp == 2) {
        show('score__btn', 'block');
        show('vote__header', 'block')
        show('vote__losung','block')
      }
    });
    document.getElementsByClassName('arrow__back')[1].addEventListener('click', function (e) {
      hoverOn();
      console.log(e);
      hide('left__candidat__promotion');
      hide('right__candidat__promotion');
      right_candidat_img.style.opacity = '1';
      left_candidat_img.style.opacity = '1';
      if (temp == 1) {
        //show('vote__btns','flex');
        show('vote__header', 'block');
        show('vote__undertext', 'block');
      }
      else if (temp == 2) {
        //show('score__btn','block');
        show('vote__header', 'block')
      }
    });
  }
}
function search() {
  let searchInput = document.getElementById("search__input").value.toLowerCase() || "___";
  let searchElement = new Map();
  let searchResult = document.getElementsByClassName("search__result")[0];

  searchResult.innerHTML = "";
  fetch("./search.json").then((response) => { return response.json(); })
    .then((data) => {
      searchElement = new Map(Object.entries(data))
      for (var [key, value] of searchElement) {
        keysearch = key.replace(/^\s+/g, '').replace(/\s+/g, '');
        if (keysearch.indexOf(searchInput) === -1) {

        }
        else {
          searchResult.innerHTML += "<div class='search__item'><a target='_blank' href='" + value + "'> " + key.slice(0, 30) + "... </a></div>";
        }

      }
      if (searchInput == "___") {
        if (document.documentElement.scrollWidth < 1439) searchResult.innerHTML += "<div class='search__header'>Trending</div>";
        key = Array.from(searchElement.keys());
        value = Array.from(searchElement.values());
        for (var i = 0; i < 4; i++) {
          searchResult.innerHTML += "<div class='search__item'><a target='_blank' href='" + value[i] + "'> " + key[i].slice(0, 30) + "... </a></div>";
        }

      }
    }
    );
}
function startSearch() {
  document.getElementById("search__input").addEventListener('keyup', search);
  document.getElementById("search__input").addEventListener('focus', search);
  document.getElementById("search__input").addEventListener('blur', function (e) {
    setTimeout(function () {
      document.getElementsByClassName("search__result")[0].innerHTML = "";
    }, 1000)
  })
}
function startMobileSearch() {
  let searchField = '<div class="search__block"><img class="search__btn" src="./src/img/search.svg" alt=""><input id="search__input" placeholder="Search" type="text"><span class="search__cancel">Cancel</span><div class="search__result"></div></div>';
  document.getElementsByClassName('title')[0].innerHTML += searchField;
  document.getElementById("search__input").addEventListener('keyup', search);
  document.getElementById("search__input").addEventListener('focus', search);
  document.getElementsByClassName("search__cancel")[0].addEventListener('click', function () {
    document.getElementsByClassName('search__block')[0].remove();
    document.getElementsByClassName('search__btn')[0].addEventListener('click', startMobileSearch)
    menu()
  })
}
if (document.documentElement.scrollWidth < 1439) {
  document.getElementsByClassName("search__block")[0].parentElement.remove()
  document.getElementsByClassName('search__btn')[0].addEventListener('click', startMobileSearch)

}
else startSearch();

setLocation();
vote();
promotion();
menu();
swiper();