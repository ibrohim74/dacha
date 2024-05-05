export const BASE_URL = "https://visitca.travel/api";
export const GOOGLE_STORAGE_URL = "https://storage.googleapis.com";

//Public routes
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUT = "/registration";
export const REGISTER_CONFIRM_ROUTE = "/registration-confirm";
export const REGISTRATION_SETUP = "/registration-setup";
export const VILLAS_ROUTE = "/villas";
export const PRODUCT_ROUTE = "/product-page/:id";
export const PRODUCT_HOSTEL_ROUTE = "/hostel/:id";
export const POLICY = "/policy";
export const PLACE = "/place";
export const FORGOT_PASSWORD = "/ForgotPassword";
export const HOTELS_CATALOGUE_ROUTE = "/hotels_catalogue";
export const COTTAGES_CATALOGUE_ROUTE = "/cottages_catalogue";
export const BOOKING_ROUTE = "/bookings";
export const FAQ_ROUTE = "/faq";
export const REQUESTS_ROUTE = "/requests";
export const ABOUT_CITY = "/about_city/:id";
export const NEW_REQUEST = "/new_request";

// Dashboard
export const CABINET = "/cabinet/";
export const PROFILE = "profile";
export const CHANGE_PASS_TOP = "change_pass";

// User Routes
export const REQUEST_USER = "announcement_user";
export const FAVORITES = "/favorites";

// Admin Routes
export const PLACE_ADMIN = "place_admin";

// Seller Routes
export const SELLER_DASHBOARD = "seller_dashboard";
export const ANNOUNCEMENT = "announcement";
export const CREATE_ANNOUNCEMENT = "create_announcement";
export const UPDATE_ANNOUNCEMENT = "update_announcement";
export const HOSTEL = "/hostel";
export const UPDATE_HOSTEL = "update_hostel";
export const CREATE_ROOM = "create_room";
export const SCHEDULE = "schedule";
export const ANNOUNCEMENT_ITEM_PAGE = "announcement_item_page/:id";
export const REQUEST_ANNOUNCEMENT = "announcement_request";
// Moderate Routes

//other
export const NOT_FOUND = "/not_found";
export const TECH_WORKS = "/tech_works";

export const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Russian", code: "ru" },
  { label: "Uzbek", code: "uz" },
];

export const ACCESS_TOKEN_KEY = "accessToken";
export const ACCESS_TOKEN_VERSION_KEY = "accessTokenVersion";
export const ACCESS_TOKEN_VERSION = "1";
