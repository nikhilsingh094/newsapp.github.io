const API_KEY = 'b247657bdf5a45228698a120ad3e010f';
const URL = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load',() => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query){
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}


function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('news-template-card');

    cardsContainer.innerHTML = "";

    articles.forEach(element => {
        if(!element.urlToImage) return;

        const cardClone = newsTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,element);

        cardsContainer.appendChild(cardClone);
    });
}


function  fillDataInCard(cardClone,element) {

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src = element.urlToImage;
    newsTitle.innerHTML = element.title;
    newsDesc.innerHTML = element.description;

    const date = new Date(element.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta",
    });

    newsSource.innerHTML = `${element.source.name} - ${date}`

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(element.url, "_blank");
    })
    
}



let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
}

const searchBtn = document.getElementById('search-button');
const searchTxt = document.getElementById('news-input');

searchBtn.addEventListener('click',()=>{
    const query = searchTxt.value;
    if(!query) return
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})