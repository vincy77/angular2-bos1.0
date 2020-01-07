class Recipe {
  recipeId: string;
  title: string;
  description: string;
  author: string;
  difficultyLevel: string;
  cookTime: string;
  ingredientList: Array<any>;
  cookStep: Array<any>;
}
class Ingredient {
  name: string;
}

export default {
  Recipe,
  Ingredient
}
