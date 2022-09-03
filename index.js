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
        ctgli.innerHTML = ` <a class="nav-link fw-semibold" href="#">${category.category_name}</a>`;
        categoryContainer.appendChild(ctgli);
    })
}

const loadNews = async(category_id) =>{
  const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`
  const res= await fetch(url);
  const data= await res.json();
  displayNews(data.data);
}
const displayNews = data =>{
  console.log(data);

  const newsContainer = document.getElementById('news-container');

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
                    <div class="d-flex">
                    <img src="${news.author.img}" class="rounded" alt="" width="50" height="50">
                    <div>
                    <h5 class="fs-6 m-1 fw-bold text-primary">${news.author.name}</h5>
                    <h6 class="m-1">${news.author.published_date}</h6>
                    </div>
                    </div>
                    <div>
                    <img src="images/user.png" alt="" width="40" height="40">
                    </div>
                    <div>
                    <img src="images/user.png" alt="" width="40" height="40">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
    newsContainer.appendChild(newsDiv);
  })
}

loadNewsCtg();
loadNews('08');