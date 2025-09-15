export const SelectItems = (state) => state.item.itemList;

export const SelectNewItem = (state) => state.item.newItem;
export const SelectPagination = (state) => state.item.pagination;

export const selectItemDetails = state=> state.item.itemDetails

export const MakeSelectItemLoading = key=> (state) => state.item.loading[key];

export const error = (state) => state.item.error;
