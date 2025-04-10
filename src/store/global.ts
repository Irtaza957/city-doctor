import { createSlice } from "@reduxjs/toolkit";

const initialState: GLOBAL_STATE = {
  cart: [],
  user: null,
  promo: null,
  country: "AE",
  wishlistCount: 0,
  sidebarToggle: false,
  accountTab: "profile",
  selectedCategory: null,
  selectedBanner: null,
  isMenuVisible: true,
  bookingID: null,
  referenceNum: null
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItemIndex = state.cart.findIndex(
        (item: CART) => item.id === parseInt(action.payload.id)
      );

      if (existingItemIndex !== -1) {
        state.cart = state.cart.map((item: CART, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === parseInt(action.payload)
      );

      if (index !== -1) {
        const item = state.cart[index];
        if (item.quantity > 1) {
          state.cart[index] = { ...item, quantity: item.quantity - 1 };
        } else {
          state.cart = state.cart.filter(
            (item) => item.id !== parseInt(action.payload)
          );
        }
      }
    },
    toggleSidebar: (state) => {
      state.sidebarToggle = !state.sidebarToggle;
    },
    setPromo: (state, action) => {
      state.promo = action.payload;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    logout: (state) => {
      state.user = null;
      state.wishlistCount = 0;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setAccountTab: (state, action) => {
      state.accountTab = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
    },
    setWishListCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
    setIsMenuVisible: (state, action) => {
      state.isMenuVisible = action.payload;
    },
    setBookingID: (state, action) => {
      state.bookingID = action.payload;
    },
    setReferenceNum: (state, action) => {
      state.referenceNum = action.payload;
    },
  },
});

export const {
  logout,
  setUser,
  setCart,
  setPromo,
  emptyCart,
  addToCart,
  setCountry,
  setAccountTab,
  toggleSidebar,
  removeFromCart,
  setWishListCount,
  setSelectedCategory,
  setIsMenuVisible,
  setSelectedBanner,
  setBookingID,
  setReferenceNum
} = globalSlice.actions;
export default globalSlice.reducer;