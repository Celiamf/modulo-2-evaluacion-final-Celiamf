"use strict";const btn=document.querySelector(".js-searchBtn"),rsltContainer=document.querySelector(".js-searchContainer"),favContainer=document.querySelector(".js-favContainer"),input=document.querySelector(".js-input");let filledHtml,item,clickedCardID,results=[],favList=[],cardClass="card",favCardClass="favCard";function handleSearch(){filledHtml="",getData(),paintResults(),listenToCards()}function getData(){const e=input.value;fetch("//api.tvmaze.com/search/shows?q="+e).then((function(e){return e.json()})).then((function(e){results=e}))}function paintResults(){for(item=0;item<results.length;item++)paint(rsltContainer,cardClass,item);console.log(results,"<-- Array results")}function listenToCards(){const e=document.querySelectorAll(".js-card");for(const t of e)t.addEventListener("click",handleFav)}function handleFav(e){clickedCardID=parseInt(e.currentTarget.id),console.log("ID (index) de la tarjeta clickada --\x3e",clickedCardID);const t=favList.indexOf(clickedCardID);-1===t?(favList.push(clickedCardID),e.currentTarget.classList.add("highlightCard"),paintFav()):t>-1&&(favList.splice(t,1),e.currentTarget.classList.remove("highlightCard"),clearFav())}function paintFav(){filledHtml="",paint(favContainer,favCardClass,clickedCardID),setLocalStorage()}function clearFav(){favContainer.innerHTML=""}function paint(e,t,a){filledHtml+=`<li class="${t} js-card" id="${[a]}">`,console.log([a],"--\x3e [ID]"),filledHtml+=`<h3 class="${t}__title">${results[a].show.name}</h3>`,null===results[a].show.image?filledHtml+=`<img class="${t}__img" src="//via.placeholder.com/210x296/f0ffff/00008b/?text=No+image+available"/>`:filledHtml+=`<img class="${t}__img" src="${results[a].show.image.medium}"/>`,filledHtml+="</li>",e.innerHTML=filledHtml}function setLocalStorage(){localStorage.setItem("favList",JSON.stringify(favList))}btn.addEventListener("click",handleSearch);