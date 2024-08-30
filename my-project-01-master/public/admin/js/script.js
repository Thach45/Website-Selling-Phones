const buttons = document.querySelectorAll("[button-active]");
if (buttons.length > 0) {
    const url = new URL(window.location.href);
    buttons.forEach((button) => {
        button.addEventListener("click", () => {

            const active = button.getAttribute("button-active");
            if (active) {
                url.searchParams.set("status", active)
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })

}


//tính năng tìm kiếm
const formSearch = document.querySelector(".form-seacrh")
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value
        console.log(keyword);
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        }
        else url.searchParams.delete("keyword")
        window.location.href = url.href;
    })
}



//Tính năng phân trang
//1.a phân trang 1, 2, 3
const pages = document.querySelectorAll("[page]")
let url = new URL(window.location.href);
pages.forEach((page) => {
    page.addEventListener("click", () => {
        const Page = page.getAttribute("page");
        if (Page) {
            url.searchParams.set("page", Page)
        }
        else url.searchParams.delete("page")
        window.location.href = url.href;

    })
})




//Tính năng thay đổi trạng thái
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChange = document.getElementById("change-form-status")
if(formChange)
{
    const path = formChange.getAttribute("path");
    buttonChangeStatus.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("status");
            const id = button.getAttribute("data-id");
            const newStatus = status == "active" ? "inactive": "active";
            const action = path +`/${newStatus}/${id}?_method=PATCH`
     
            formChange.action = action
            formChange.submit();      
        })
    })

}



//Tính năng checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputcheckAll = checkboxMulti.querySelector("[name='checkall']");
    const inputs =  checkboxMulti.querySelectorAll("[name='id']");
    
    inputcheckAll.addEventListener("click", () => {
        if(inputcheckAll.checked)
        {
            inputs.forEach((input)=>{
                input.checked = true;
            })
        }
        else{
            inputs.forEach((input)=>{
                input.checked = false;
            })
        }
    })
    inputs.forEach(input =>{
        input.addEventListener("click", ()=>{
            const count = checkboxMulti.querySelectorAll("[name='id']:checked").length;
            if(count == inputs.length)
            {
                inputcheckAll.checked = true;
            }
            else{
                inputcheckAll.checked = false;
            }
    
        })
    })
    const formChangeMulti = document.querySelector("[form-change-multi]")
    if(formChangeMulti)
    {
        formChangeMulti.addEventListener("submit", (e)=>{
            e.preventDefault();
            const inputsChecked = checkboxMulti.querySelectorAll("[name='id']:checked");
             const type = e.target.elements.type.value
           
            if (inputsChecked.length > 0) {
                let ids = [];
                const inputIDs = formChangeMulti.querySelector("[name='ids']");
                inputsChecked.forEach(input => {
                    const id = input.value;
                    const position = input.closest("tr").querySelector("[name='position']").value;
    
                    if (type == "position") {
                        ids.push(`${id}-${position}`)
                    }
                    else{
    
                        ids.push(id);
                    }
                })
                inputIDs.value = ids.join(", ");
                formChangeMulti.submit();
            }
        })
    }

}


//Tính năng xoá cứng
const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0)
{
    const formDelete = document.querySelector("#change-form-delete")
    buttonDelete.forEach(button =>{
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("data-id");
            const path = formDelete.getAttribute("path");
            const action = `${path}/${id}?_method=DELETE`;
            formDelete.action = action;
            formDelete.submit();
        })

    })


}

//Tính năng thông báo
const showAlert = document.querySelector("[show-alert]");
if(showAlert)
{
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time) 
}

//Tính năng preview 
const uploadImg = document.querySelector("[upload-img]")
if(uploadImg)
{
    const uploadImgInput = document.querySelector("[upload-img-input]");
    const uploadImgPreview = document.querySelector("[input-img-preview]");
    uploadImgInput.addEventListener("change", (e)=>{
        const file = e.target.files[0];
     
        if(file){
            uploadImgPreview.src = URL.createObjectURL(file)
        }
    })

}

//Lọc nhiều tính năng
const sortSelect = document.querySelector("[sort-select]");
if(sortSelect)
{
    const url = new URL(window.location.href);
    sortSelect.addEventListener("change",()=>{
        const opSelect =  sortSelect.value
        const str = opSelect.split("-")
        const sortName = str[0];
        const desc_or_asc = str[1];
        
        if (sortName) {
            url.searchParams.set("sortName", sortName);
            url.searchParams.set("desc_or_asc", desc_or_asc);

        }
        else {
            url.searchParams.delete("desc_or_asc");
            url.searchParams.delete("sortName");

        }
        window.location.href = url.href;
        
    })

    const clear = document.querySelector("[sort-clear]")
    if(clear)
    {   
        clear.addEventListener("click",() =>{
            url.searchParams.delete("desc_or_asc");
            url.searchParams.delete("sortName");
            window.location.href = url.href;
        })
    }
}