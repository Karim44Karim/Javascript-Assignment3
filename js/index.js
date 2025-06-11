var nameInput = document.getElementById('nameInput');
var urlInput = document.getElementById('urlInput');
var tableBody = document.getElementById('tableBody');
var submitButton = document.getElementById('submitButton');
var modItemIndex;

var PRODUCT_KEY = "bookmarksList"

var list = JSON.parse(localStorage.getItem(PRODUCT_KEY)) || [];

if(localStorage.getItem(PRODUCT_KEY) != []){
    disp();
}

function addNew(){
    if(isValidUrl(urlInput.value) && isValidName(nameInput.value)){
        var formattedUrl = formatUrl(urlInput);

        var item = {
        name: nameInput.value,
        url: formattedUrl,
        }
        list.push(item);
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(list));
        disp();
    } else{
        customAlert('Site Name or Url is not valid, Please follow the rules below :', `                    <p>
                        <i class="fa-regular fa-circle-right"></i>
                        Site name must contain at least 3 characters
                    </p>
                    <p>
                        <i class="fa-regular fa-circle-right"></i>
                        Site URL must be a valid one
                    </p>`, false, false, 'warning')
    }
}
function disp(){
    tableBody.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        tableBody.innerHTML += `
                        <tr>
                    <td>${i+1}</td>
                    <td>${list[i].name}</td>
                    <td><a href="${list[i].url}" target="_blank"><button class="btn visit-btn"><i class="fa-solid fa-eye"></i><span>Visit</span></button></a></td>
                    <td><button onClick="del(${i})" id="${'del'+i}"  class="btn delete-btn"><i class="fa fa-trash"></i><span>Delete</span></button></td>
                    <td><button onClick="mod(${i})" class="btn modify-btn"><i class="fa fa-pen-to-square"></i><span>Modify</span></button></td>
                </tr>`
    }
}
function del(i){
    list.splice(i,1);
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(list));
    disp();
}
function mod(i){
    window.scrollTo(0, 0);

    nameInput.value = list[i].name;
    urlInput.value = list[i].url;
    submitButton.textContent = 'Update';
    submitButton.onclick = update;

    modItemIndex = i;

    var delBtn = document.getElementById("del"+i);
    delBtn.disabled =true;
}

function update(){
    if(isValidUrl(urlInput.value) && isValidName(nameInput.value)){
        var formattedUrl = formatUrl(urlInput);
        var item = {
        name: nameInput.value,
        url: formattedUrl,
        }

        list.splice(modItemIndex,1,item);
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(list));
        disp();
        submitButton.textContent = 'Submit';
        submitButton.onclick = addNew;

        var delBtn = document.getElementById("del"+modItemIndex);
        delBtn.disabled =false; 

    } else{
        customAlert('Site Name or Url is not valid, Please follow the rules below :', `                    <p>
                        <i class="fa-regular fa-circle-right"></i>
                        Site name must contain at least 3 characters
                    </p>
                    <p>
                        <i class="fa-regular fa-circle-right"></i>
                        Site URL must be a valid one
                    </p>`, false, false, 'warning')
    }
    
}
function isValidUrl(str) {
    const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
    );
    return pattern.test(str);
}
function formatUrl(urlInput){
    var formattedUrl = urlInput.value;
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = 'http://' + formattedUrl; 
        }
    return formattedUrl
}

function isValidName(str){
    const pattern = new RegExp('^.{3,}$');
    return pattern.test(str);
}

function checkNameInput() {
    var icon = document.getElementById("feedback-icon");

    if(isValidName(nameInput.value)){
        nameInput.classList.add("valid");
        nameInput.classList.remove("inValid");
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");

    } else{
        nameInput.classList.remove("valid");
        nameInput.classList.add("inValid");
        icon.classList.add("fa-xmark");
        icon.classList.remove("fa-check");
    }
}
function checkURLInput() {
    var icon = document.getElementById("feedback-icon-1");
    if(isValidUrl(urlInput.value)){
        urlInput.classList.add("valid");
        urlInput.classList.remove("inValid");
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
    } else{
        urlInput.classList.add("inValid");
        urlInput.classList.remove("valid");
        icon.classList.add("fa-xmark");
        icon.classList.remove("fa-check");
    }
}