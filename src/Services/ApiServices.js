import axios from "axios";
import React from "react";

export default class ApiServices{

  static BASE_URL = "http://localhost:8080"

  static getheaders(){
    const token = localStorage.getItem('token');
    return{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    };
  }

  static async registerUser(user,confirmpass){

    const response = await axios.post(`${this.BASE_URL}/auth/register/${confirmpass}`,user)
    return response.data

  }

  static async loginUser(user){

    const response = await axios.post(`${this.BASE_URL}/auth/login`,user)
    return response.data

  }

  static async getAllFoodItems(userId){

    const response = await axios.get(`${this.BASE_URL}/food/get-items/${userId}`)
    return response.data

  }

  static async addFoodItem(userId,formData){
    const response = await axios.post(`${this.BASE_URL}/food/add-items/${userId}`,formData)
    return response.data
  }

  static async getFoodSuggestion(userId){

    const response  = await axios.get(`${this.BASE_URL}/food/recipe-generation/${userId}`)
    return response.data

  }

  static async saveRecipe(recipe,userId){

    const response = await axios.post(`${this.BASE_URL}/recipe/save-recipe/${userId}`,recipe)
    return response.data

  }

  static async getAllRecipe(userId){

    const response = await axios.get(`${this.BASE_URL}/recipe/get-recipe/${userId}`)
    return response.data

  }

  static async addMeal(userId,recipeId,meal){
    const response = await axios.post(`${this.BASE_URL}/meal/add-meal/${userId}/${recipeId}`,meal)
    return response.data
  }

  static async getMeal(userId){
    const response = await axios.get(`${this.BASE_URL}/meal/get-meal/${userId}`)
    return response.data
  }

}