<template>
<div v-if="recipes" class="edit-recipe purple-text container">
    <h2 >Edit Recipe of {{ recipes.name }}</h2>
    <form @submit.prevent="editRecipe">
                <div class="field recipe-name">
                    <label for="recipe-name">Recipe Name</label>
                    <input placeholder="Recipe name" id="recipe-name" type="text" v-model="recipes.name">
                </div>
                
                <div class="field edit-ingredient">
                    <label for="edit-ingredient">Add an ingredient</label>
                    <input placeholder="Add an ingredient" id="edit-ingredient" type="text" v-model="ingredientInput" @keydown.tab.prevent="addIngredient">
                </div>
                <div class="field display-ingredient" v-for="(ing,index) in recipes.ingredients" :key="index">
                    <label for="display-ingredient">Ingredient</label>
                    <input id="display-ingredient" v-model="recipes.ingredients[index]">
                    <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                </div>
                <p class="red-text text-lighten-2">{{feedback}}</p>
                <div class="field add-recipe-button">
                    <button class="btn pink">Edit recipe</button>
                </div>
 
    </form>
</div>
</template>

<script>
import db from '@/firebase/init'
import slugify from "slugify"
export default {
    name:"EditRecipe",
    data () {
        return{
            recipes: null,
            ingredientInput: null,
            feedback: null
        }
       
    },
    methods: {
        editRecipe(){
            if(this.recipes.name){
                this.feedback = null
                this.recipes.slug = slugify(this.recipes.name,{
                    replacement: "-",
                    remove: /[$*_+`.()'"~!\-:@]/g,
                    lower: true
                });

                db.collection("recipes").doc(this.recipes.id).update({
                    name:this.recipes.name,
                    ingredients:this.recipes.ingredients,
                    slug:this.recipes.slug

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
                this.recipes.ingredients.push(this.ingredientInput);
                this.ingredientInput = null
                this.feedback = null
            }else{
                this.feedback = "Please give a valid ingredient"
            }
        },
        deleteIng(ing){
            this.recipes.ingredients = this.recipes.ingredients.filter(ingredient => {
                return ingredient != ing;
            })
        }
    },
    created(){
        let ref = db.collection("recipes").where("slug", "==", this.$route.params.recipe_slug)
        ref.get().then(snapshot=>{
            snapshot.forEach(doc => {
                this.recipes = doc.data()
                this.recipes.id = doc.id
            })
        })
    }
}
</script>

<style>
form .recipe-name {
        width: 20%;
        margin-top: 40px;
    }
    form .edit-ingredient {
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