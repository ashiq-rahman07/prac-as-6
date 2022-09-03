//  <button onclick="hrefFun()">>Let’s Go!</button>
{/* <script>
    function hrefFun() {
        window.location.href = "https://www.linuxhint.com/";
    } */}

//Catagories load

const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);

}

const displayCategories = (categories) => {
    // console.log(categories)
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        // console.log(category);
        const catagoriLink = document.createElement('a');
        catagoriLink.setAttribute('onclick', `loadCategoriItem('${category.category_id}')`)
        catagoriLink.classList.add('btn', 'btn-ghost', 'normal-case', 'mr-6', 'text-xl');
        catagoriLink.innerText = category.category_name;
        categoriesContainer.appendChild(catagoriLink);
    });

}

const loadCategoriItem = async (categoryId) => {
    //loader start
    toggleSpinner(true);
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryItems(data.data);


}

const displayCategoryItems = (newsItems) => {

    console.log(newsItems);
    const totalItems = document.getElementById('total-items');
    if (newsItems.length === 0) {
        totalItems.innerText = `${newsItems.length} item found this categories`;
    } else {
        totalItems.innerText = `${newsItems.length} items found this categories`;
    }

    const newsContainer = document.getElementById('news-container');

    newsContainer.textContent = '';

    newsItems.forEach(newsItem => {

        // console.log(newsItem)
        // points.sort(function (a, b) { return b - a });
        // newsItem.sort((a, b) => (a.total_view > b.total_view) ? 1 : -1);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
        cardDiv.innerHTML = `
    
       <div class="flex flex-col md:flex-row md:w-full">

       <img class="" src="${newsItem.thumbnail_url}" alt="news">
                <div class="card-body">
                    <h2 class="card-title">${newsItem.title}</h2>
                    <p class="pt-7">${newsItem.details.slice(0, 250)}.....</p>
                    
                    <div class="flex gap-3 pt-8">
                        <img  class="w-10 rounded-full" src="${newsItem.author.img ? newsItem.author.img : 'Author Image Missing'}">
                        <div>
                            <p class="text-sm font-medium">${newsItem.author.name ? newsItem.author.name : 'Author Name Missing'}</p>
                            
                            <p class="text-sm font-normal">${newsItem.author.published_date ? newsItem.author.published_date : 'Published Date  Missing'}</p>
                        </div>
                         <div class="justify-end pl-20 pt-3">
                            <span>${newsItem.total_view ? newsItem.total_view : 'Total View Missing'}</span>
                         </div>
                    </div>
                     
                    <div class="card-actions justify-end">
                        <a onclick="loadNewsDetails('${newsItem._id}')"  href="#my-modal-2" id="btn-details" class="btn btn-primary">Listen</a>
                    </div>
                </div>


       </div>
                
         
    `;
        newsContainer.appendChild(cardDiv);
    })
    // loader stop 
    toggleSpinner(false);
}


//news details load
const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

//display News details
const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails);
    const modalConatainer = document.getElementById('my-modal-2');
    modalConatainer.innerHTML = `
       <div class="modal-box card  w-96 bg-base-100 shadow-xl">
                    <figure><img class="w-30 rounded" src="${newsDetails.image_url}" alt="Shoes" /></figure>
                    <p class="pt-7">${newsDetails.details.slice(0, 120)}.....</p>
                    <div class="flex gap-4 pt-5">
                         <img class="w-10  rounded-full" src="${newsDetails.author.img}" alt="Shoes" />
                        <h3 class="font-bold text-lg text-center">${newsDetails.author.name ? newsDetails.author.name : 'Author Name is Missing'}</h3>
                    </div>
                    <div class="modal-action">
                        <a href="#" class=" badge badge-outline">Close!</a>
                    </div>
                </div>
    `;
}
//toggle sppiner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden');
    }
}

loadCategories();
loadCategoriItem('08');