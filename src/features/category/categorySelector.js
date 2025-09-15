export const selectCategoryList = (state) => state.category.categoryList;

export const MakeCategoryLoadingSelector = key  =>(state) => state.category.loading[key];

export const selectPagination = state=> state.category.pagination;

export const selectCategory = state => state.category.category;

export const newCategory = (state) => state.category.newCategory;
