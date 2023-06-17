import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { TypeOfIngredient } from '../../models/TypeOfIngredient.model';

interface AppState {
  ingredients: Array<TypeOfIngredient>;
}

const initialState: AppState = {
  ingredients: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TypeOfIngredient>) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredientByUuid: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => {
        return item.uuid !== action.payload;
      });
    },
    updateIngredients: (state, action: PayloadAction<Array<TypeOfIngredient>>) => {
      // make IngredientsOfEveryone empty first
      state.ingredients = action.payload;
    },
  },
});

// Export a part of actions of slice
export const appActions = appSlice.actions;
export const { addIngredient, deleteIngredientByUuid, updateIngredients } = appSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectGetIngredients = (state: RootState) => state.app.ingredients;
// Export reducers part in slice
export default appSlice.reducer;
