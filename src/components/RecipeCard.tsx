import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DetailsContext } from '../context/DetailsContextProvider';
import { FavoritesContext } from '../context/FavoritesContextProvider';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { Recipe } from '../models/Item';
import '../styles/RecipeCard.css';
export interface Props {
    recipe: Recipe;
    index: number;
}



function RecipeCard({recipe, index}: Props) {

   const {favorites, addFavorite, deleteFavorite} = useContext(FavoritesContext);
   const {details, showDetails} = useContext(DetailsContext);

   const [foundFav, setFoundFav] = useState<Boolean>(false);


    const newFavorite = recipe;

    function handleFindFav() {
        let findFav = favorites.find(fav => fav.recipe.label === recipe.recipe.label);
        console.log(findFav);

        if(findFav) {
            setFoundFav(true);
        }
    }

    useEffect(() => {
        handleFindFav();
    }, [])
    
        
    

    

    
    

   function handleAdd(newFavorite: Recipe): any {
       addFavorite(newFavorite);
       console.log("Works");
       console.log(newFavorite);
       handleFindFav();
       
       
   }

   function handleDelete(index: number): any {
       deleteFavorite(index);
       console.log("helloo");
       console.log(index);
       handleFindFav();
   }

   console.log(favorites);
   console.log(recipe);
   console.log(recipe.recipe.label);
  
   function handleDetails(newFavorite: Recipe) {
        showDetails(newFavorite);
        console.log('hi')
   }

    return(
        <div className="RecipeCard">
            <div className="card-container">
                <div className="image-container">
                    <img src={recipe.recipe.image} alt="Food"/>
                </div>
                <div className="label-container">
                    <p className="card-label">
                        {recipe.recipe.label}
                    </p>
                </div>
                <div className="link-container">
                    <a href={recipe.recipe.url} target="_blank">Original Recipe</a>  
                </div>
                <div>
                   {/* <button style={foundFav ? {display: 'none'} : {display: 'block'}} onClick={() => {handleAdd(newFavorite)}}>Add Favorite</button> */}
                   <PlaylistAddIcon style={foundFav ? {display: 'none'} : {display: 'block'}} onClick={() => {handleAdd(newFavorite)}}/>
                   {/* <button style={foundFav ? {display: 'block'} : {display: 'none'}} onClick={() => {handleDelete(index)}}>Delete Favorite</button> */}
                   <HighlightOffSharpIcon style={foundFav ? {display: 'block'} : {display: 'none'}} onClick={() => {handleDelete(index)}}/>
                </div>
                <div>
                    <NavLink to="/Description" onClick={() => {handleDetails(newFavorite)}}>View Description</NavLink>
                    {/* <NavLink to={{
                        pathname: "/Description",
                        state: {recipe: {recipe}}
                        }} > 
                            <button>Description</button>
                    </NavLink>   */}
                </div>
            </div>

        </div>
    )
}

export default RecipeCard;


