import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeOfIngredient } from '../../models/TypeOfIngredient.model';
import type { RootState } from '../store/store';

interface AppState {
  ingredients: Array<TypeOfIngredient>;
}

const initialState: AppState = {
  ingredients: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TypeOfIngredient>) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredientByUuid: (state, action: PayloadAction<string>) => {
      state.ingredients.filter((item) => item.uuid !== action.payload);
    },
    updateIngredients: (state, action: PayloadAction<Array<TypeOfIngredient>>) => {
      // make IngredientsOfEveryone empty first
      state.ingredients = action.payload;
    },
  },
});

export const { addIngredient, deleteIngredientByUuid, updateIngredients } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGetIngredients = (state: RootState) => state.app.ingredients;

export default appSlice.reducer;
