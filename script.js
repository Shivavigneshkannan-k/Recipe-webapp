const URL_NAME='https:www.themealdb.com/api/json/v1/1/search.php?s=steak';
const URL_FIRST_LETTER="https:www.themealdb.com/api/json/v1/1/search.php?f=a";
const URL_ID="https:www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
const URL_RANDOM="https:www.themealdb.com/api/json/v1/1/random.php";
const URL_CATEGORY="https:www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

const mealOfTheDayImg= document.querySelector('.meal-of-the-day img');
const mealOfTheDayDescription= document.querySelector('.meal-of-the-day p');
const mealOfTheDayDiv= document.querySelector('.hero');
const like=document.querySelectorAll('like');

const cookNowBtn=document.querySelector('.cook-now');
const Recipe_foodName=document.querySelector('.food-Name');
const Recipe_img=document.querySelector('.recipe-img');
const Recipe_table=document.querySelector('.ingredients');
const Recipe_instructions=document.querySelector('.instructions');

const tableData=document.querySelectorAll('td')

const homePage=document.querySelector('.container');
const menu=document.querySelector('.recipe');




const showMenu=(foodData)=>{
    Recipe_img.src=foodData["strMealThumb"];
    for(let i=0;i<20;i++){
        const newData1=document.createElement('td');
        const newData2=document.createElement('td');
        if(foodData[`strMeasure${i+1}`].trim().length!=0 && foodData[`strMeasure${i+1}`].trim().length!=0 ){
            const newRow=document.createElement('tr');
            Recipe_table.appendChild(newRow);
            newData1.innerHTML=foodData[`strIngredient${i+1}`];
            newData2.innerHTML=foodData[`strMeasure${i+1}`];
            newRow.append(newData1);
            newRow.append(newData2);
        }
        else if(foodData[`strMeasure${i+1}`].trim().length!=0 ){
            const newRow=document.createElement('tr');
            Recipe_table.appendChild(newRow);
            newData1.innerHTML="As much as you Need";
            newData2.innerHTML=foodData[`strMeasure${i+1}`];
            newRow.append(newData1);
            newRow.append(newData2);
        } 
    }
    let instructions=foodData["strInstructions"].split(".");
    let steps=1;
    for(let procedure of instructions){
        if(procedure.trim().length!=0){
        const step=document.createElement('p');
        Recipe_instructions.append(step);
        step.innerHTML=`<strong>${steps}.</strong> ${procedure.trim()}`;
        steps++;
    }
    }
}
const mealOfTheDay=async(callback)=>{
    const food = await fetch(URL_RANDOM);
    const data = await food.json();
    const foodData=data["meals"][0];
    const foodImg=foodData["strMealThumb"];
    mealOfTheDayImg.src=foodImg;
    mealOfTheDayDescription.innerText=foodData["strMeal"];
    // for(let name in foodData){
    //     console.log(name," :",foodData[name])
    // }
    callback(foodData);
}



const favoriteMeal=(element)=>{
    
    if(element.classList.contains("not-liked")){
        element.innerHTML=`<i class="fa-solid fa-heart" style="color: #ff80c0;"></i>`;
        element.style.backgroundColor="white";
        element.classList.replace("not-liked","liked");
    }else{
        element.innerHTML=`<i class="fa-solid fa-heart" style="color: #ffffff;"></i>`;
        element.style.backgroundColor="rgba(128, 128, 128,0.5)";
        element.classList.replace("liked","not-liked");
    }
    
}
const revealMenu=()=>{
    menu.classList.replace("hidden",'unhidden');
    homePage.classList.replace("unhidden","hidden");
}
const closeMenu=()=>{
    menu.classList.replace("unhidden",'hidden');
    homePage.classList.replace("hidden","unhidden");
}

mealOfTheDay(showMenu);
favoriteMeal();
