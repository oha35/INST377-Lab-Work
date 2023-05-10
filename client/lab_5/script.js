function injectHTML(list) {
  console.log("fired injectHTML");
  console.log(list);
  const target = document.querySelector("#results_box");
  target.innerHTML = "";
  list.forEach((item) => {
  //  const str = `<li><b>Brand: </b> ${item.brand_name} <b>Food Name: </b> ${item.food_name} <b>Calories: </b> ${item.nf_calories == 0 ? "N/A" : item.nf_calories}</li>`;
  const str = `<div><button type="button" onclick="newFunc('${item.nix_item_id}')">${item.food_name}</button></div>`
    target.innerHTML += str;
  });
}

async function newFunc(temp){
  const url = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=";
  const buttonResults = document.querySelector("#button_results_box");
  buttonResults.innerHTML = "";
  const result = await fetch(url + temp, {
    headers: {
      'x-app-id': 'a70a1a77',
      'x-app-key': '85cb5f8ba0262142e4397b3393c105c4'
    }
  });
  const data = await result.json()
  const foodItem = data.foods[0];
  console.log(foodItem);
  const foodItemInject = `<p>${foodItem.food_name}</p><img src="${foodItem.photo.thumb}" height="10%" width="10%"></img>`
  buttonResults.innerHTML += foodItemInject;
  console.log("2");
}

async function mainEvent() {
  const mainForm = document.querySelector(".main_form")
  const addToChart = document.querySelector("#add_to_chart");
  const clearChart = document.querySelector("#clear_chart");
  const addItem = document.querySelector("#add_Item")
  const input = document.querySelector("#input_Text");
  const input_arr = [];
  var final_input;
  const url = "https://trackapi.nutritionix.com/v2/search/instant?query=";

  const storedData = localStorage.getItem('storedData');


  input.addEventListener('input', (event) => {
    input_arr.push(document.getElementById("input_Text").value);
    final_input = input_arr.slice(-1);
    console.log(final_input);
  })

  addItem.addEventListener('click', async (SubmitEvent) => {
    console.log("Loading Data");

    const result = await fetch(url + final_input, {
      headers: {
        'x-app-id': 'a70a1a77',
        'x-app-key': '85cb5f8ba0262142e4397b3393c105c4'
      }
    });

    const data = await result.json()
      injectHTML(data.branded);
      localStorage.setItem('storedData', JSON.stringify(data));
      parsedData = data;
      console.log(parsedData);
    })
    


    addToChart.addEventListener('click', async (SubmitEvent) => {
      console.log('added to chart');
    })

    clearChart.addEventListener('click', async (SubmitEvent) =>{
      console.log('cleared chart');

    })
  }

  document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests