<template>
    <div class="add-recipe container">
        <h2>Add A Recipe</h2>
            <form @submit.prevent="addRecipe">
                <div class="field recipe-name">
                    <label for="recipe-name">Recipe Name</label>
                    <input placeholder="Recipe name" id="recipe-name" type="text" v-model="title">
                </div>
                
                <div class="field add-ingredient">
                    <label for="add-ingredient">Add an ingredient</label>
                    <input placeholder="Add an ingredient" id="add-ingredient" type="text" v-model="ingredientInput" @keydown.tab.prevent="addIngredient">
                </div>
                <div class="field display-ingredient" v-for="(ing,index) in ingredients" :key="index">
                    <label for="display-ingredient">Ingredient</label>
                    <input id="display-ingredient" v-model="ingredients[index]">
                    <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                </div>
                <p class="red-text text-lighten-2">{{feedback}}</p>
                <div class="field add-recipe-button">
                    <button class="btn pink">Add recipe</button>
                </div>
 
            </form>
    </div>
</template>

<script>
import db from "@/firebase/init"
import slugify from "slugify"
export default {
    name: "AddRecipe",
    data() {
        return {
            title: null,
            ingredientInput: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addRecipe(){
            if(this.title){
                this.feedback = null
                this.slug = slugify(this.title,{
                    replacement: "-",
                    remove: /[$*_+`.()'"~!\-:@]/g,
                    lower: true
                });

                db.collection("recipes").add({
                    name:this.title,
                    ingredients:this.ingredients,
                    slug:this.slug

                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            }else{
                this.feedback = "Please enter a title"
            }
            
        },
        addIngredient(){
            if(this.ingredientInput){
                this.ingredients.push(this.ingredientInput);
                this.ingredientInput = null
                this.feedback = null
            }else{
                this.feedback = "Please give a valid ingredient"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing;
            })
        }
    }
}
</script>

<style>
    form .recipe-name {
        width: 20%;
        margin-top: 40px;
    }
    form .add-ingredient {
        margin-top: 40px;
        width: 30%;
    }
    form .display-ingredient {
        width: 30%;
        margin-top: 40px;
        position: relative;
    }

    .field .delete{
        position: absolute;
        right: 0;
        bottom: 10px;
        color: #aaa;
        cursor: pointer;
    }
</style>