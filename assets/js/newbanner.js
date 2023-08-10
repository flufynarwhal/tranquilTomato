//Fetch new image for banner from unsplash


document.querySelector('#newbanner').addEventListener('click', getapi);



async function getapi() {
  
  const accessKey = '28N_0VxecOyXyStioo_gwULRjjNHDal3MTM63aLFWKw'

  const topic ="zen";
  
  const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${topic}`;
  //const url ="https://api.codetabs.com/v1/proxy?quest="+apiUrl;
  
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);

//new background photo in css #banner
  const newBannerImg = document.querySelector('#banner');

  newBannerImg.style.backgroundImage = `url(${data.urls.regular})`;

  
}
