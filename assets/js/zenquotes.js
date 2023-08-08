//Fetch quote from zenquotes 


document.querySelector('#zenquotes').addEventListener('click', getapi);



async function getapi() {
  const apiUrl = "https://zenquotes.io/api/random/";
  const url ="https://api.codetabs.com/v1/proxy?quest="+apiUrl;
  
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);

}
