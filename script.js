// const URL='https://www.themealdb.com/api/json/v1/1/search.php?f=a';
// const URL='www.themealdb.com/api/json/v1/1/random.php';
const URL='https:www.themealdb.com/api/json/v1/1/search.php?s=steak';
const meals=async()=>{
    const food=await fetch(URL);
    const data= await food.json();
    console.log(data);
}
meals();