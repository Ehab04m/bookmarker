var bookName = document.querySelector("#bookmarkName");
var bookUrl = document.querySelector("#bookmarkURL");
var submit = document.querySelector("#submitBtn")
var boxInfo = document.querySelector(".box-info")
var nameAlert = document.querySelector("#nameAlert")
var closeBtn = document.querySelector("#closeBtn")
var tableBody = document.querySelector("#tableContent")
var update = document.querySelector("#updateBtn")
var bookSearch = document.querySelector("#bookSearch")
var visitBtn ;
var deleteBtn;
var updateBtn;
var index;


if(localStorage.getItem("bookMarkList")){
    bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"))
    displalyBookMark(bookMarkList)
}else{
    var bookMarkList = []
}


// add bookmark function
submit.addEventListener("click",function(){
    addBk()
})

function addBk(){
    if( ruleValidation()&&!dublicateNameValidation()){
        var bookmark ={
            name:bookName.value,
            url:bookUrl.value
        }
        bookMarkList.push(bookmark);

    }else { console.log("Bookmark not added due to duplicate name"); }
    displalyBookMark(bookMarkList);
    ClearInputs()
    saveInLocalStorage() 
}
// name validation 
bookName.addEventListener("input",function(){
    nameValidation()
})
function nameValidation(){
    var regex =/^[A-Za-z0-9 ]{4,}$/
    if(regex.test(bookName.value)){
        bookName.classList.add("is-valid")
        bookName.classList.remove("is-invalid")
    }else{
        bookName.classList.add("is-invalid")
        bookName.classList.remove("is-valid")
        return false

    }
    
    
}
// --------------------------

// url validation
bookUrl.addEventListener("input",function(){
    urlValidation()

})
function urlValidation(){
    var regex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    if(regex.test(bookUrl.value)){
        
        bookUrl.classList.add("is-valid")
        bookUrl.classList.remove("is-invalid")
        

    }else{
        bookUrl.classList.add("is-invalid")
        bookUrl.classList.remove("is-valid")
        return false

    }
}
// --------------------------------

// rule validation
function ruleValidation(){
    if(bookName.value==""||nameValidation()==false||bookUrl.value==""||urlValidation()==false){
        boxInfo.classList.replace("d-none","d-block")
        document.body.style.overflow = "hidden"
    }else{
        boxInfo.classList.replace("d-block","d-none")
        document.body.style.overflow = "auto"
        return true

    }
}
// ------------------

// dublicate name validation
function dublicateNameValidation(){
    for(var i = 0;i < bookMarkList.length; i++){
        if(bookName.value === bookMarkList[i].name){
            nameAlert.classList.replace("d-none","d-block")
            console.log("dublicate found");
            return true

            
        }else{
            nameAlert.classList.replace("d-block","d-none")
            console.log("No duplicate");
            return false
          
           
            

        }
    }
}
// --------------------------

    
// colse box-info function
closeBtn.addEventListener("click",function(){
    colseBoxInfo()

})
document.addEventListener("click",function(e){
    if(e.target.id == "box-info"){
        colseBoxInfo()

    }
    
    
})
function colseBoxInfo(){
    boxInfo.classList.replace("d-block","d-none")
    document.body.style.overflow = "auto"

}
// ----------------------------


// displaly function
function displalyBookMark(blist,term){
    cartoona = "";
    for(var i = 0; i<blist.length; i++){
        cartoona += `<tr>
                <td class = " fw-bolder text-dark">${i}</td>
                <td>${term? blist[i].name.toLowerCase().replace(term,`<span class = "fw-bolder text-danger">${term}</span>`):blist[i].name}</p></td>              
                <td>
                  <button class="btn btn-visit" data-index="0" data-link= "${blist[i].url}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${i}" 
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
                <td>
                  <button class="btn btn-update pe-2" data-index="${i}">
                    
                    Update
                  </button>
                </td>
            </tr>`
            console.log(blist[i].url);
          
    }
    
    
    
    
    
    
    tableBody.innerHTML = cartoona;
    visitBtn = document.querySelectorAll(".btn-visit")
    deleteBtn = document.querySelectorAll(".btn-delete")
    updateBtn = document.querySelectorAll(".btn-update")
    visitLink(visitBtn)
    deleteBookMark(deleteBtn)
    setFormToUpdate(updateBtn)
    
    

}
function visitLink(){
    var visitBtnn = visitBtn
    for(var i = 0; i< bookMarkList.length; i++){
       visitBtnn[i].addEventListener("click",function(e){
        var url = e.target.getAttribute("data-link")
        console.log(url);
        window.open(url,'_blank').focus(); 
        })
    }  
}
// ---------------------------

// delete bookmark
function deleteBookMark(dbtns){
    for(var i = 0; i<bookMarkList.length; i++){
        dbtns[i].addEventListener("click",function(e){
            bookMarkList.splice(e.target.getAttribute("data-index"),1)
            e.target.closest('tr').remove();
            saveInLocalStorage()
        })


    }
   
    
}
// ---------------------------


// set form to update function
function setFormToUpdate(ubtns){
    for(var i = 0; i<bookMarkList.length; i++){
        ubtns[i].addEventListener("click",function(e){
            index = e.target.getAttribute("data-index")
            bookName.value = bookMarkList[index].name
            bookUrl.value = bookMarkList[index].url
            console.log(bookMarkList[index].url);
            
            update.classList.replace("d-none","d-block")
            submit.classList.replace("d-block","d-none")
             

        })
    }saveInLocalStorage()
}
// ------------------------------


// update 
update.addEventListener("click",function(){
    bookMarkList[index].name = bookName.value
    bookMarkList[index].url = bookUrl.value
    displalyBookMark(bookMarkList)
    saveInLocalStorage()
    update.classList.replace("d-block","d-none")
    submit.classList.replace("d-none","d-block")
    ClearInputs()
    
})
// -------------------------

bookSearch.addEventListener("input",function(){
    var sortedList = []
    var term = bookSearch.value
    for(var i = 0; i<bookMarkList.length; i++){
        if(bookMarkList[i].name.toLowerCase().includes(term.toLowerCase())){
            sortedList.push(bookMarkList[i])

        }
        
   
    }
    displalyBookMark(sortedList,term)
    saveInLocalStorage()



})

// clear input function
function ClearInputs(){
    bookName.value = null
    bookUrl.value =null
}
// ---------------------------

// local storage
function saveInLocalStorage(){
    localStorage.setItem("bookMarkList",JSON.stringify(bookMarkList))
}
// ---------------------
