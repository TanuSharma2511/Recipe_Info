$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getRecipes(searchText);
      e.preventDefault();
    });
  });

  
  const getRecipes = async (searchText) =>{
    var APP_ID = localStorage.getItem("app_id");
  var APP_KEY = localStorage.getItem("app_key");
  
    const response = await fetch(`https://api.edamam.com/search?q=${searchText}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();

        console.log(data);
        let recipes = data.hits;
        let output = '';
        $.each(recipes, (index, recipe) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${recipe.recipe.image}">
               <h5>${recipe.recipe.label}</h5>
               <a onclick="recipeSelected('${recipe.recipe.uri}')" class="btn btn-primary" href="#">Recipe Details</a>
        
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
}

  function recipeSelected(id){
    sessionStorage.setItem('recipeId', id);
    window.location = 'recipe.html';
    return false;
  }
  
  const getRecipe = async () =>{
    var APP_ID = localStorage.getItem("app_id");
    var APP_KEY = localStorage.getItem("app_key");  

    let recipeId = sessionStorage.getItem('recipeId');
    console.log(recipeId);
    console.log(recipeId.slice(51));
    id=recipeId.slice(51);
  
    const response = await fetch(`https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
        console.log(data);
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="${data[0].image}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${data[0].label}</h2>
              <ul class="list-group">
              <li class="list-group-item"><strong>Calories:</strong> ${data[0].calories}</li>
              <li class="list-group-item"><strong>Cautions:</strong> ${data[0].cautions}</li>
              <li class="list-group-item"><strong>Diet Labels:</strong> ${data[0].dietLabels}</li>
              <li class="list-group-item"><strong>Health Labels:</strong> ${data[0].healthLabels}</li>
              <li class="list-group-item"><strong>Source:</strong> ${data[0].source}</li>
              <li class="list-group-item"><strong>Total Weight:</strong> ${data[0].totalWeight}</li>
             </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Ingredients Required</h3>
             ${data[0].ingredientLines}
              <hr>
              
              <a href="${data[0].url}" target="_blank" class="btn btn-primary">View More</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>            
              </div>
          </div>
        `;
  
        $('#movie').html(output);
    
  }
  
  