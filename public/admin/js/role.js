const buttonSubmit = document.querySelector('[button-submit]');
buttonSubmit.addEventListener('click', () => {
  const selectedPermissions = [];
  const datas = document.querySelectorAll("[data-name]");
  
  datas.forEach(data => {
    const name = data.getAttribute("data-name");

    const checkboxes = data.querySelectorAll("input[type='checkbox']");
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const idName = document.querySelector(`thead tr th:nth-child(${index + 2})`).getAttribute("_id");
        selectedPermissions.push({
          name: name,
          permission: idName
        });
        
      }
    });
  });
  const formRole = document.querySelector("[form-role]");
  const inputForm = document.querySelector("input[name='permissions']");
 
  if(formRole) {
    inputForm.value = JSON.stringify(selectedPermissions);
    formRole.submit();
  }

  // Bạn có thể gửi dữ liệu này đến server hoặc xử lý theo nhu cầu của bạn
});