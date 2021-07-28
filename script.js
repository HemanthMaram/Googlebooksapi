const url = "https://www.googleapis.com/books/v1/volumes?q=";

var maindiv = createElement("div", "main container-fluid");
var hpart = createElement("div", "heading");

var titlt = createElement("img", "title");

//titlt.innerHTML = "Books Finder";
titlt.setAttribute("src", "./google-books.png");
var bpart = createElement("div", "plist");
bpart.setAttribute("id", "tbody");
var hdiv = createElement("div", "input");
var tbox = createElement("input", "searchele ");
tbox.setAttribute("type", "text");
tbox.setAttribute("placeholder", "Enter Title or Author name ");
tbox.setAttribute("id", "searchdata");

//<span aria-hidden="true"></span>
//tbox.setAttribute('required');
var btn = createElement("button", "btn btn-primary ");
btn.setAttribute("onclick", "searchit()");
btn.setAttribute("id", "go");
btn.setAttribute("data-toggle", "button");
btn.innerHTML = "Find the book";
var div = createElement("div", "display mt-5");
div.setAttribute("id", "main");
hpart.append(titlt);
hdiv.append(tbox, btn);
bpart.append(hdiv, div);

async function searchit() {
  try {
    var search = document.getElementById("searchdata").value;
    console.log(search);
    console.log(url + search);
    let resp = await fetch(url + search);
    let data = await resp.json();
    document.getElementById("main").innerHTML = "";
    display(data);
  } catch (err) {
    console.log(err);
  }
}
var img;
function display(data) {
  var main = document.getElementById("main");
  var con = document.createElement("div");
  con.setAttribute("class", "container");
  var ele = document.createElement("div");
  ele.setAttribute("class", "row ");
  var a = [];
  for (i = 0; i < data.items.length; i++) {
    var title = data.items[i].volumeInfo.title;

    try {
      var img = data.items[i].volumeInfo.imageLinks.smallThumbnail;

      var img1 = data.items[i].volumeInfo.authors;
      if (img1.length === 0) {
        a.push("not available");
      } else {
        for (j = 0; j < img1.length; j++) {
          console.log(img1[j]);
          a.push(img1[j]);
        }
      }

      var desc = data.items[i].volumeInfo.description;
    } catch (err) {
      console.log(err);
      img = "./book.jpg";

      desc = ".....................Description ...........";
    }

    console.log(img);

    var link = data.items[i].volumeInfo.previewLink;
    var amount;
    var saleinfo = data.items[i].saleInfo.saleability;
    if (saleinfo === "FOR_SALE") {
      amount = `<li class="list-group-item">Saleability : ${saleinfo} </li>
       <li class="list-group-item">Price : ${data.items[i].saleInfo.listPrice.amount} ${data.items[i].saleInfo.listPrice.currencyCode} </li>
       `;
    } else {
      amount = `<li class="list-group-item">Saleability : ${saleinfo} </li>
       <li class="list-group-item">Price : ____ </li>
       `;
    }

    ele.innerHTML += `
    <div class="  col-lg-4 mb-2 pl-2 ">
      <div class="card">
  <img src="${img}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <h5 class="card-title text-center" id = "bname"><b>${title}</b></h5>

    <p class="list-group " ><b>Description </b>
  <textarea name="description"  id="desc" cols="40" rows="8">${desc}</textarea>
  </p>
    <div class="cards info">
  <ul class="list-group ">
  
    <li class="list-group-item">Authors : ${a}</li>
    ${amount}
    
  </ul>
  </div>
  <div class="card-footer">
  <a href=${link} class="card-link" target = "_blank">Preview Link</a>
    </div>
    
 
    
  </div>
</div>
</div>
      `;
    a = [];
  }
  con.append(ele);
  main.append(con);
}

function createElement(elem, name) {
  var ele = document.createElement(elem);
  ele.setAttribute("class", name);
  return ele;
}

maindiv.append(hpart, bpart);
document.body.append(maindiv);
