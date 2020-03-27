const defaultRecipe = [];

const recipes = (state = defaultRecipe, { type, data }) => {
  switch (type) {
    case 'UPDATE_RECIPE':
      return data;
    default:
      return state;
  }
};

export default recipes;
