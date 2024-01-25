const URL_NAME='https:www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_FIRST_LETTER="https:www.themealdb.com/api/json/v1/1/search.php?f=a";
const URL_ID="https:www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
const URL_RANDOM="https:www.themealdb.com/api/json/v1/1/random.php";
const URL_CATEGORY="https:www.themealdb.com/api/json/v1/1/filter.php?c=";
const CATEGORY="https:www.themealdb.com/api/json/v1/1/categories.php";



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

const input=document.querySelector('input');
const search=document.querySelector('.input-button button');
const searchDiv=document.querySelector('.search');
const categoryDiv=document.querySelector('#category-meal');

const breakFast=document.querySelectorAll('.types')[0];
const vegan=document.querySelectorAll('.types')[1];
const dessert=document.querySelectorAll('.types')[2];
const seafood=document.querySelectorAll('.types')[3];


const showMenu=(foodData)=>{
    const itemsNeeded={};
    Recipe_foodName.innerText=foodData["strMeal"];
    Recipe_img.src=foodData["strMealThumb"];
    let newStr;

    for(let name in foodData){
        if(name.includes("strIngredient")){
            itemsNeeded[foodData[name]]=undefined;
        }
        else if(name.includes("strMeasure")){
            newStr=name.substring(10);
            itemsNeeded[foodData[`strIngredient${newStr}`]]=foodData[name];
        }
    }
    for(let name in itemsNeeded){
        const newData1=document.createElement('td');
        const newData2=document.createElement('td');
        if( itemsNeeded[name]==null || name==null){
            continue;
        }
        if(name.trim().length!=0 && itemsNeeded[name].trim().length!=0){
            const newRow=document.createElement('tr');
            Recipe_table.appendChild(newRow);
            newData1.innerHTML=name;
            newData2.innerHTML=itemsNeeded[name];
            newRow.append(newData1);
            newRow.append(newData2);
        }
        else if(itemsNeeded[name].trim().length!=0 ){
            const newRow=document.createElement('tr');
            Recipe_table.appendChild(newRow);
            newData1.innerHTML="As much as you Need";
            newData2.innerHTML=itemsNeeded[name];
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
    mealOfTheDay(showMenu);
    menu.classList.replace("unhidden",'hidden');
    homePage.classList.replace("hidden","unhidden");
}

const searchFood = async ()=>{
    let name=input.value;
    if(name.trim().length==0){
        searchDiv.innerHTML="";
        return;
    }
    let data=await fetch(URL_NAME+name);
    let foodData=await data.json();
    if(foodData["meals"]==null){
        searchDiv.innerHTML="<p>No result found!</p>";
        return 0;
    }
    searchDiv.innerHTML=`<p class="result">No of result: ${foodData["meals"].length}</p>`
    
    for(let name in foodData){
        for(let food of foodData[name]){
            // console.log(food)

            const foodDiv=document.createElement('div');
            foodDiv.classList.add('searched_food');

            const foodImg = document.createElement('img');
            const foodName = document.createElement('p');

            foodImg.src=food["strMealThumb"];
            foodName.innerText = food["strMeal"];
            foodImg.alt=`${food["strMeal"]}`;
            foodDiv.append(foodImg);
            foodDiv.append(foodName);
            searchDiv.append(foodDiv);
            foodDiv.onclick=()=>{
                showMenu(food);
                revealMenu();
                
            }


        }

    }    
}
const searchByCategory= async (id)=>{
    categoryDiv.innerHTML="";
    const data = await fetch(URL_CATEGORY+id);
    const foodData= await data.json();
    // console.log(foodData["meals"])

    for(let food of foodData["meals"]){
        const foodDiv=document.createElement('div')
        const foodImg=document.createElement('img');
        const foodNameDiv=document.createElement('div');
        const foodName=document.createElement('p');
        
        foodDiv.append(foodImg);
        foodDiv.append(foodNameDiv);
        foodNameDiv.append(foodName);
        categoryDiv.append(foodDiv);
        foodName.innerText=food["strMeal"];
        foodImg.src=food["strMealThumb"];
        
        foodDiv.classList.add('category-meal');


        // const likeBtn=document.createElement('button');
        // foodDiv.append(likeBtn);
        // likeBtn.classList.add("like","not-liked");
        // foodName.classList.add("name");
        // likeBtn.innerHTML=`<i class="fa-solid fa-heart" style="color: #ffffff;"></i>`
        // likeBtn.onclick=favoriteMeal(likeBtn);
    }
}
const showAllCategory=async()=>{
    const categoryData= await fetch(CATEGORY);
    const data= await categoryData.json();
    // console.log(data["categories"])
    for(let food of data["categories"]){
        console.log(food)
    }
}
const changeBtnStyle=(item)=>{
    for(let element of document.querySelectorAll('.selected')){
        if(item==element){
            continue;
        }
        element.classList.replace("selected","not-selected")
    }
    item.classList.add('selected');
}

breakFast.addEventListener('click',(e)=>{
    searchByCategory(breakFast.id);
    changeBtnStyle(breakFast);
})
dessert.addEventListener('click',(e)=>{
    searchByCategory(dessert.id);
    changeBtnStyle(dessert);
})
vegan.addEventListener('click',(e)=>{
    searchByCategory(vegan.id);
    changeBtnStyle(vegan);
})
seafood.addEventListener('click',(e)=>{
    searchByCategory(seafood.id);
    changeBtnStyle(seafood);
})


cookNowBtn.addEventListener('click',()=>{revealMenu()})
input.addEventListener('blur',()=>{ searchDiv.innerHTML="";})
search.addEventListener('click',searchFood);
input.addEventListener('keypress',(e)=>{
    if(e.key=="Enter"){
        searchFood()
    }
})

const searchError=async (food)=>{
    const data=await fetch(URL_NAME+food);
    const foodData=await data.json();
    console.log(foodData["meals"]);
}
// searchError("Spaghetti Bolognese");

mealOfTheDay(showMenu);
favoriteMeal();
