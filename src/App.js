import React, {useState, useEffect} from 'react';
import "./App.css";
import Recipe from './Recipe';
const App = () => {

  const appid = "9e168ae8";
  const appkey = "52d63f038b504f63850885f199abf356";

  const [recipes, setRecipes] = useState([]);
  const [search,setsearch] = useState('');
  const [query,setquery] = useState("chicken")

  useEffect(()=> {
    getRecipes();
  }, [query]);

  const getSearch = e => {
    setquery(search);
    e.preventDefault();
    setsearch('');
  }

   const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appid}&app_key=${appkey}`)
    const data = await  response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  }
  const updateSearch = e => {
    setsearch(e.target.value);
  }


  return (
 <div className="App">
  <form onSubmit={getSearch} className="search-from">
    <input className="search-bar" type="text" onChange={updateSearch}  value={search}/>
      <button className="search-button" type="submit">Search</button>
  </form>
  {recipes.map(recipe => (
    <Recipe 
     key = {recipe.recipe.label}
     title = {recipe.recipe.label}
     calories ={recipe.recipe.calories}
     image ={recipe.recipe.image}
     />
  ))}
</div>
  )
}

export default App;
