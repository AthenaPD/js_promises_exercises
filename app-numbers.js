// Figure out how to get data on multiple numbers in a single request. 
// Make that request and when you get the data back, put all of the number facts on the page.
let url = "http://numbersapi.com/2,7,13,14";
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
axios.get(url)
  .then(res => {
    const numFacts = res.data;
    for (let key of Object.keys(numFacts)) {
      const factP = document.createElement('p');
      factP.innerText = `${key} -> ${numFacts[key]}`;
      div1.appendChild(factP);
    }
  })

  // Use the API to get 4 facts on your favorite number. 
  // Once you have them all, put them on the page. 
  // It’s okay if some of the facts are repeats.
  const myFavNum = 14
  let urlMath = `http://numbersapi.com/${myFavNum}/math`;
  let urlTrivia = `http://numbersapi.com/${myFavNum}`;
  axios.get(urlMath)
    .then(res => {
      const newParagraph = document.createElement('p');
      newParagraph.innerText = `Fact #1 -> ${res.data}`;
      div2.appendChild(newParagraph);
      return axios.get(urlMath);
    })
    .then(res => {
      const newParagraph = document.createElement('p');
      newParagraph.innerText = `Fact #2 -> ${res.data}`;
      div2.appendChild(newParagraph);
      return axios.get(urlTrivia);
    })
    .then(res => {
      const newParagraph = document.createElement('p');
      newParagraph.innerText = `Fact #3 -> ${res.data}`;
      div2.appendChild(newParagraph);
      return axios.get(urlTrivia);
    })
    .then(res => {
      const newParagraph = document.createElement('p');
      newParagraph.innerText = `Fact #4 -> ${res.data}`;
      div2.appendChild(newParagraph);      
    })
