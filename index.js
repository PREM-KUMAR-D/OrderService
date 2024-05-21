function handleFormSubmit(event) {
    event.preventDefault();
    const orderDetails = {
      price: event.target.price.value,
      dish: event.target.dish.value,
      table: event.target.select.value
    };

    
    axios
      .post(
        "https://crudcrud.com/api/bae2fea3ed5b487a9e14fd0c759cec10/table",
        orderDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("price").value = "";
    document.getElementById("dish").value = "";
    // document.getElementById("table").value = "Table 1";
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.price} - ${userDetails.dish} - ${userDetails.table} `
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const ulSelected = userDetails.table;
    // console.log(ulSelected);
  
    const userList = document.getElementById(ulSelected);
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      axios.delete(`https://crudcrud.com/api/bae2fea3ed5b487a9e14fd0c759cec10/table${userDetails["_id"]}`)
    });
    //   localStorage.removeItem(userDetails.email);
    // });
  

  }
  
  window.addEventListener("DOMContentLoaded" ,()=>{
      axios
      .get("https://crudcrud.com/api/bae2fea3ed5b487a9e14fd0c759cec10/table")
      .then((response) => {
          for(let i =0; response.data.length; i++){
            displayUserOnScreen(response.data[i]);
          }
        })
      .catch((error) => console.log(error));
  
  })
  
