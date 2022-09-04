const loadNewsCtg = async() =>{
    const url=`https://openapi.programming-hero.com/api/news/categories`
    const res= await fetch(url);
    const data= await res.json();
    displayNewsCtg(data.data.news_category);
}

const displayNewsCtg = data =>{
    console.log(data);

    const categoryContainer= document.getElementById('category-container')
    data.forEach(category => {
        console.log(category);
        const ctgli= document.createElement('li');
        ctgli.classList.add('nav-item');
        ctgli.innerHTML = ` <a onclick="loadNews(${category.category_id})" class="nav-link fw-semibold btn btn-outline-primary btn-floating" href="#">${category.category_name}</a>`;
        categoryContainer.appendChild(ctgli);
    })
}


const loadNews = async category_id =>{
  toggleLoader(true);
  const url=`https://openapi.programming-hero.com/api/news/category/0${category_id}`    //extra 0 for passing '0 category_id' in loadNews
  const res= await fetch(url);
  const data= await res.json();
  displayNews(data.data);
}
const displayNews = data =>{
  console.log(data);
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML= '';
  const totalNewsContainer = document.getElementById('total-news-container');


  data.forEach(news =>{
    console.log(news);
    // console.log(news.author.img);
    const newsDiv = document.createElement('div');

    newsDiv.innerHTML = `
    <div class="card m-3" style="max-width: 100%;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src=${news.image_url} class="img-fluid h-100 rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text fs-6">${news.details.slice(0,220)}...</p>
                  <div class="card-footer d-flex justify-content-between">
                    <div class="d-flex m-auto">
                    <img src="${news.author.img}" class="img-thumbnail rounded" alt="" width="50" height="50">
                    <div>
                    <h5 class="fs-6 m-1 fw-bold text-primary">${news.author.name}</h5>
                    <h6 class="m-1">${news.author.published_date}</h6>
                    </div>
                    </div>
                    <div class="m-auto d-flex">
                    <img class="me-1" src="images/eyes.png" alt="" width="25" height="25">
                    <h6 class="my-auto text-primary">${news.total_view}</h6>
                    </div>
                    <div class="m-auto">
                    <button onclick="loadNewsDetails('${news._id}')" class="btn btn-outline-primary btn-floating" role="button" data-bs-toggle="modal" data-bs-target="#detailsModal">See More</button>                    
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
    `
    
    newsContainer.appendChild(newsDiv);
  });
  totalNewsContainer.innerHTML = `
  <div class="card">
  <div class="card-body text-center fw-bold">
     Total <span class="text-primary">${data.length}</span> news found.
  </div>
</div>
  `
  toggleLoader(false);
}

const loadNewsDetails = async news_id =>{
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
  const res= await fetch(url);
  const data= await res.json();
  displayNewsDetails(data.data[0]);
}

const displayNewsDetails = news =>{
  console.log(news);
  const detailsModalContainer= document.getElementById('detailsModalLabel');
  detailsModalContainer.innerText= news.title;
  const detailsModalFull= document.getElementById('detailsModalFull')
  detailsModalFull.innerHTML=
  `   
      <img src="${news.image_url}" class="img-fluid" alt="...">
      <p class="fw-semibold fs-6">Reported by: ${news.author.name ? news.author.name : 'No Data Available'}</p>
      <p class="fw-bold">Full Story: <span class="fw-semibold">${news.details ? news.details : 'No Data Available'}</span></p>
      <p>Published: ${news.author.published_date ? news.author.published_date: 'No Data Available'}</p>
      <p>Viewers: ${news.total_view ? news.total_view : 'No Data Available'}</p>
      <p>Rating: ${news.rating.number? news.rating.number : 'No Data Available'}</p>
              
  `
}

const toggleLoader= isLoading => {      
  // ^isLoading= parameter taking true/false
  const loader= document.getElementById('loader');
  if(isLoading){
      loader.classList.remove('d-none')
  }
  else{
      loader.classList.add('d-none')
  }
}


loadNewsCtg();
loadNews('8');      //8 for ALl News showing at start. = 08