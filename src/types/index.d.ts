declare type CATEGORY = {
  category_id: string;
  category_name: string;
  icon: string;
  color?: string;
  show_response_time?: string
};

declare type CART = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
  price_without_vat: number;
  thumbnail?: string;
};

declare type USER = {
  id?: string;
  customer_id?: string;
  mrn?: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  image?: string | null;
  date_of_birth: string;
  gender: string;
  is_allergy: string;
  allergy_description?: string;
  special_notes: string;
  token?: string;
  customer_source_id?: string;
  relationship?: string;
};

declare type PROMO = {
  coupon_id: string;
  name: string;
  code: string;
  discount_type: string;
  discount_value: string;
};

declare type GLOBAL_STATE = {
  cart: CART[];
  country: string;
  user: USER | null;
  accountTab: string;
  promo: PROMO | null;
  wishlistCount: number;
  sidebarToggle: boolean;
  selectedCategory: CATEGORY | null;
  selectedBanner: {index: number, place: top} | null;
  isMenuVisible: boolean;
};

declare type DRIP_CARD = {
  service_id: string;
  wishlist_id: string;
  category_id: string;
  category_name: string;
  category_cover_image: string;
  name: string | null;
  thumbnail: string;
  duration: string;
  tagline: string;
  response_time: string;
  rating: string;
  total_reviews: string;
  cover_image: string | null;
  description: string;
  price_without_vat: string;
  vat_value: string;
  price_with_vat: string;
  color_code: string;
  discount_value: string | null;
  quantity: string;
  price?: string;
  service_name?: string;
};

declare type DRIP = {
  section: string;
  rows: string;
  category_id: string;
  category_name: string;
  page_type: string;
  section_data: DRIP_CARD[];
};

declare type DRIP_RESPONSE = {
  success: number;
  error: string;
  data: DRIP_CARD[];
};

declare type DRIP_CARD_RESPONSE = {
  success: number;
  error: string;
  data: DRIP_CARD;
};

declare type DATE = {
  id: number;
  date: number;
  day: string;
  month: string;
};

declare type DIALOG_PROPS = {
  id?: string;
  open: boolean;
  onClose: () => void;
  getData?: () => void;
};

declare type SELECT_MENU_ITEM_PROPS = {
  id: number;
  name: string;
};

declare type SELECT_MENU_PROPS = {
  cn?: string;
  value: string;
  options: SELECT_MENU_ITEM_PROPS[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

declare type CREDIT_CARD_PROPS = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

declare type MODAL_PROPS = {
  cn?: string;
  width?: string;
  toggle: boolean;
  children: React.ReactNode;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type COUNTRIES = {
  [key: string]: {
    country: string;
    region: string;
  };
};

declare type BOOKING = {
  booking_id: string;
  reference: string;
  schedule_date: string;
  schedule_slot: string;
  total: string;
  payment_method: string;
  booking_status: string;
  total_services: string;
  cancelled_reason: string | null;
  review: string;
};

declare type ADDRESS = {
  address_type: string;
  apartment: string;
  building?: string;
  street: string;
  map_link: string;
  extra_direction: string;
  emirate?: string;
  area: string;
  address_id?: string;
  emirate_id?: string;
  area_id?: string;
  building_no?: string;
  is_default?: string;
  lat?: string;
  lng?: string;
};

declare type BOOKING_DETAILS = {
  booking_id: string;
  reference: string;
  booking_source: string;
  schedule_date: string;
  schedule_slot: string;
  delivery_notes: string;
  payment_method: string;
  payment_status: string;
  sub_total: string;
  discount_value: string;
  vat_value: string;
  total: string;
  booking_status: string;
  customer: USER;
  address: ADDRESS;
  booking_times: {
    created_at: "Sep 15, 2023 22:09";
    assigned_at: "Sep 15, 2023 22:09";
    consulted_at: "Sep 22, 2023 23:09";
    completed_at: "Sep 23, 2023 17:09";
    cancelled_at: null;
  };
  services: DRIP_CARD[];
};

declare type FAMILY_LIST = {
  family_member_id: string;
  mrn: string;
  relationship: string;
  firstname: string;
  lastname: string;
  date_of_birth: string;
  gender: string;
  is_allergy?: string;
  phone?: string;
  allergy_description?: string;
};

declare type BANNER = {
  banner_id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  link_to: string;
  place?: string;
  mobile_banner?: string
};

declare type DRIP_DETAIL_RESPONSE = {
  service_id: string;
  size: string;
  category_id: string;
  wishlist_id: string | null;
  category_name: string;
  category_cover_image: string | null;
  service_name: string;
  thumbnail: string;
  duration: string;
  response_time: string;
  rating: string;
  total_reviews: string;
  cover_image: string;
  description: string;
  price: string;
  discount_type: string;
  discount_value: string;
  sections: {
    name: string;
    description: string;
  }[];
  reviews: {
    customer: string;
    image: string | null;
    review: string;
    description: string;
    created_at: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  similar_services: DRIP_CARD[];
  bundles: {bundle: string, price_without_vat: string, price_with_vat: string}[]
};

declare type REVIEW = {
  date: string | null;
  customer: string;
  image: string | null;
  review: string;
  description: string;
};

declare type SERVICE_LIST = {
  id: string;
  name: string;
  icon: string;
  cover_image: string | null;
  services: DRIP_CARD[];
};

declare type AREA = {
  area_id: string;
  area: string;
  lat: string;
  lng: string;
};

declare type WISHLIST = {
  wishlist_id: string;
  category_id: string;
  service_id: string;
  service_name: string;
  thumbnail: string;
  cover_image: string | null;
  response_time: string;
  duration: string;
  rating: string;
  total_reviews: string;
  description: string;
  price: string;
  price_without_vat: string;
};

declare type LOADING_CONTEXT = {
  isLoading: boolean;
};

declare type COORDINATES = { latitude: number; longitude: number };

declare type REASON = {
  id: string;
  reason: string;
  active: string;
  created_at: string;
};

declare type BOOKING_HISTORY = {
  booking_id: string;
  reference: string;
  schedule_date: string;
  schedule_slot: string;
  total: string;
  payment_method: string;
  booking_status: string;
  total_services: string;
  cancelled_reason: string | null;
  review: string;
};

declare type IconProps = {
  borderColor?: string;
  fillColor?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

declare type CITY_STATE = {
  bookingID: string | null;
}
