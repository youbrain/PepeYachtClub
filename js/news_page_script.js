function menu(){
    let menuToggle = document.getElementById("menu-toggle");
    let nav = document.getElementById("nav");
    
    function onclick(e){
        var enabled = e.target.checked;
        if(enabled == true){
            nav.classList.add("visible");
        }
        else{
            nav.classList.remove("visible");
        }
    }
     
    menuToggle.addEventListener("click", onclick);
}
function setLocation(){
    let weather = ["Clearly","Sunny","Rain"]
    let town = ["Humortown","Memeland","Ape York"]
    let now = new Date(); 
    let month = "January";
    if (now.getMonth()==0)month="January";
    else if(now.getMonth()==1)month="February";
    else if(now.getMonth()==2)month="March";
    else if(now.getMonth()==3)month="April";
    else if(now.getMonth()==4)month="May";
    else if(now.getMonth()==5)month="June";
    else if(now.getMonth()==6)month="Jule";
    else if(now.getMonth()==7)month="August";
    else if(now.getMonth()==8)month="September";
    else if(now.getMonth()==9)month="October";
    else if(now.getMonth()==10)month="November";
    else if(now.getMonth()==11)month="December";
    if(now.getMinutes()<10) minutes = "0" + now.getMinutes();
    else minutes = now.getMinutes()
    let time = "Today "+ month + " " + now.getDate() + "th " + now.getHours()+ ":"+minutes;
    document.getElementsByClassName("location__status")[0].textContent = weather[getRandomInt(3)];
    document.getElementsByClassName("location__status")[1].textContent = town[getRandomInt(3)];
    document.getElementsByClassName("location__status")[2].textContent = time;
    
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function search(){
    let searchInput = document.getElementById("search__input").value.toLowerCase() || "___";
    let searchElement = new Map();
    let searchResult = document.getElementsByClassName("search__result")[0];

    searchResult.innerHTML = "";
    fetch("../search.json")  .then((response) => {return response.json();})
    .then((data) => {
      searchElement = new Map(Object.entries(data))
      for(var [key, value] of searchElement){
        keysearch = key.replace( /^\s+/g, '').replace( /\s+/g, '');
        if(keysearch.indexOf(searchInput)=== -1){
          
        }
        else { 
            searchResult.innerHTML += "<div class='search__item'><a target='_blank' href='." + value + "'> "+ key.slice(0,30) + "... </a></div>";
          }
          
        }
        if(searchInput == "___"){
            if(document.documentElement.scrollWidth < 1439) searchResult.innerHTML += "<div class='search__header'>Trending</div>";
            key = Array.from(searchElement.keys());
              value = Array.from(searchElement.values());
            for(var i = 0; i<4; i++){
              searchResult.innerHTML += "<div class='search__item'><a target='_blank' href='." + value[i] + "'> "+ key[i].slice(0,30) + "... </a></div>";
            }
          
          }}
      );
   
    
  }
  function startSearch(){
    document.getElementById("search__input").addEventListener('keyup',search);
  document.getElementById("search__input").addEventListener('focus',search);
    document.getElementById("search__input").addEventListener('blur',function(e){
      setTimeout(function(){ document.getElementsByClassName("search__result")[0].innerHTML = "";
   },1000)
  })
  }
  function startMobileSearch(){
    let searchField ='<div class="search__block"><img class="search__btn" src="../src/img/search.svg" alt=""><input id="search__input" placeholder="Search" type="text"><span class="search__cancel">Cancel</span><div class="search__result"></div></div>';
    document.body.innerHTML += searchField;
    document.getElementById("search__input").addEventListener('keyup',search);
    document.getElementById("search__input").addEventListener('focus',search);
    document.getElementsByClassName("search__cancel")[0].addEventListener('click',function(){
      document.getElementsByClassName('search__block')[0].remove();
      document.getElementsByClassName('search__btn')[0].addEventListener('click',startMobileSearch)
    })
  }
  if(document.documentElement.scrollWidth < 1439){
    document.getElementsByClassName("search__block")[0].parentElement.remove()
    document.getElementsByClassName('search__btn')[0].addEventListener('click',startMobileSearch)
  }
  else startSearch();

menu();
setLocation();