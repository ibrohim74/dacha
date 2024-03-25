import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          form_location: "Location",
          form_checkin: "Check in",
          form_checkout: "Check out",
          form_guests: "Guests",
          form_location_placeholder: "Where?",
          form_checkin_placeholder: "When?",
          form_checkout_placeholder: "When?",
          form_guests_placeholder: "How many?",
          form_button: "Search",
          city_card_city_bukhara: "Bukhara",
          city_card_descr_bukhara:
            "Bukhara is an ancient Uzbek city, through which the Great Silk Road (a trade road connecting East and West) passed. In the Middle Ages, the city was a major center of Islamic theology and culture.",
          city_card_city_samarkand: "Samarkand",
          city_card_descr_samarkand:
            "Samarkand is a city in Uzbekistan known for its mosques and mausoleums. It's on the Silk Road, the ancient trade route linking China to the Mediterranean.",
          city_card_city_khiva: "Khiva",
          city_card_descr_khiva:
            "Khiva is a city that is more than 2500 years old. According to legend, Khiva was founded by one of the sons of the biblical Noah. ",
          map: "Map",
          housing: "Housing",
          food: "Food",
          entertainment: "Entertainment",
          soon: "Soon",
          cottages_title: "Cottages",
          hotels_title: "Hotels",
          view_more: "View more",
          view_all: "View all",
          login_btn: "Log in",
          sidebar_profile: "Profile",
          sidebar_payments: "Payment methods",
          sidebar_bookings: "My bookings",
          sidebar_fav: "Favourites",
          sidebar_logout: "Log out",
          filter_search_placeholder: "Search on the map",
          filter_price: "Price",
          filter_rating: "Star rating",
          filter_services: "Services",
          filter_distance: "Distance from the center",
          filter_services_parking: "Parking",
          filter_clear_btn: "Clear all",
          km: "km",
          geolocation_request: "Geolocation",
          geolocation_request_descr:
            "Turn on geolocation on your device and we will show you up-to-date information about your city",
          weather: "Weather",
          login_title: "Log in",
          password: "Password",
          login_username: "Username",
          login_btn: "Log in",
          signup: "Sign up",
          footer_motto:
            "Our motto to fulfill customer demand by making them satisfied with growing their business.",
          footer_about_us: "About Us",
          footer_adds: "Advertising",
          footer_map: "Site map",
          footer_cooperation: "Cooperation",
          footer_cooperation_hotels: "For hotels",
          footer_cooperation_cottages: "For houses/cottages",
          footer_copyright: "Copyright Visitca",
          footer_reserved: "All rights reserved.",
          footer_get_app: "Get our app",
          booking_title: "Bookings",
          booking_subtitle: "Your bookings and booking history",
          booking_first_tab: "Current",
          booking_second_tab: "History",
          booking_empty_placeholder: "You don't have any active bookings yet",
          booking_no_history_placeholder: "The booking history is empty",
          booking_pending: "Pending",
          booking_approved: "Approved",
          booking_rejected: "Rejected",
          booking_completed: "Completed",
          booking_early_departure: "Early check out",
          booking_rate: "Feedback",
          booking_per_day: "Per day",
          booking_amount_of_people: "persons",
          booking_currency: "som",
          booking_rating_stars_label: "Stars",
          booking_rating_text_label: "Text",
          booking_rating_textarea: "Your feedback",
          booking_early_departure: "Early departure",
          booking_early_departure_confirmation:
            "Do you really want to request early departure",
          booking_early_departure_warning:
            "According to the contract, you will pay a fine of",
          my_cards: "My cards",
          add_card: "Add card",
          enter_card_number: "Enter card number",
          enter_card_exp: "Enter card expiration date",
          save: "Save",
          send: "Send",
          cancel: "Cancel",
          confirm: "Confirm",
          confirm_card_text:
            "Enter the code sent to your number linked to the card",
          confirm_card_code: "Confirmation code",
          no_cards_found: "You don't have cards yet",
        },
      },
      uz: {
        translation: {
          form_location: "Joylashuv",
          form_checkin: "Ro'yxatdan o'tish",
          form_checkout: "Ro'yxatdan chiqish",
          form_guests: "Mehmonlar",
          form_location_placeholder: "Qayerda?",
          form_checkin_placeholder: "Qachon?",
          form_checkout_placeholder: "Qachon?",
          form_guests_placeholder: "Nechta?",
          form_button: "Qidirish",
          city_card_city_bukhara: "Buxoro",
          city_card_descr_bukhara:
            "Buxoro-Buyuk ipak yo'li (Sharq va G'arbni bog'laydigan savdo yo'li) o'tgan qadimiy o'zbek shahri. O'rta asrlarda shahar Islom ilohiyoti va madaniyatining yirik markazi bo'lgan.",
          city_card_city_samarkand: "Samarqand",
          city_card_descr_samarkand:
            "Samarqand-O'zbekistondagi masjid va maqbaralari bilan mashhur shahar. Bu Xitoyni o'rta er dengizi bilan bog'laydigan qadimiy savdo yo'li bo'lgan Ipak yo'lida.",
          city_card_city_khiva: "Xiva",
          city_card_descr_khiva:
            "Xiva-yoshi 2500 yildan oshgan shahar. Afsonaga ko'ra, Xivaga Bibliyadagi Nuhning o'g'illaridan biri asos solgan.",
          map: "Xarita",
          housing: "Uylar",
          food: "Ovqatlanish",
          entertainment: "Ko'ngil yo'zish",
          soon: "Tez kunda",
          cottages_title: "Dachalar",
          hotels_title: "Mexmonxonalar",
          view_more: "Yana",
          view_all: "Hammasini ko'rish",
          login_btn: "Kirish",
          sidebar_profile: "Profil",
          sidebar_payments: "To'lov usullari",
          sidebar_bookings: "Mening bronlarim",
          sidebar_fav: "Saqlanganlar",
          sidebar_logout: "Chiqib ketish",
          filter_search_placeholder: "Xaritada qidirish",
          filter_price: "Narx",
          filter_rating: "Yulduzli reyting",
          filter_services: "Qulayliklar",
          filter_distance: "Markazdan masofa",
          filter_services_parking: "Parkovka",
          filter_clear_btn: "Hammasini tozalash",
          km: "km",
          geolocation_request: "Geolokatsiya",
          geolocation_request_descr:
            "Qurilmangizda geolokatsiyani yoqing va biz sizning shahringiz haqidagi dolzarb ma'lumotlarni ko'rsatamiz",
          weather: "Ob-havo",
          login_title: "Kirish",
          password: "Parol",
          login_username: "Имя пользвателя",
          login_btn: "Kirish",
          signup: "Ro'yxatdan o'tish",
          forgot_password: "Parolni unutdingizmi?",
          footer_motto:
            "Bizning maqsadimiz mijozlar talabini o'z bizneslarini rivojlantirishdan mamnun qilish orqali qondirish.,",
          footer_about_us: "Biz haqimizda",
          footer_adds: "Reklama",
          footer_map: "Sayt xaritasi",
          footer_cooperation: "Hamkorlik",
          footer_cooperation_hotels: "Mehmonxonalar uchun",
          footer_cooperation_cottages: "Uylar/dachalar uchun",
          footer_copyright: "Mualliflik Huquqi Visitca",
          footer_reserved: "Barcha huquqlar himoyalangan.",
          footer_get_app: "Bizning ilovamiz",
          booking_title: "Bronlar",
          booking_subtitle:
            "Sizning bron qilingan joylaringiz va bron qilish tarixi",
          booking_first_tab: "Joriy",
          booking_second_tab: "Tarix",
          booking_empty_placeholder: "Sizda hali aktiv bronlar yo'q",
          booking_no_history_placeholder: "Bronlar tarixi bo'sh",
          booking_pending: "Ko'rib chiqilmoqda",
          booking_approved: "Tasdiqlangan",
          booking_rejected: "Rad etildi",
          booking_completed: "Tugallangan",
          booking_early_departure: "Erta ketish",
          booking_rate: "Fikringizni qoldiring",
          booking_per_day: "Bir kunga",
          booking_amount_of_people: "kishi",
          booking_currency: "som",
          booking_rating_stars_label: "Yulduzlar soni",
          booking_rating_text_label: "Text",
          booking_rating_textarea: "Sizning fikringiz",
          booking_early_departure: "Erta ketish",
          booking_early_departure_confirmation:
            "Siz haqiqatan ham muddatidan oldin chiqib ketishni xohlaysiz",
          booking_early_departure_warning:
            "Shartnomaga muvofiq siz jarima to'laysiz",
          my_cards: "Mening kartalarim",
          add_card: "Kartani qo'shish",
          enter_card_number: "Karta raqamini kiriting",
          enter_card_exp: "Kartaning amal qilish muddatini kiriting",
          save: "Saqlash",
          send: "Jo'natish",
          cancel: "Orqaga",
          confirm: "Tasdiqlash",
          confirm_card_text:
            "Kartaga bog'langan raqamingizga yuborilgan kodni kiriting",
          confirm_card_code: "Tasdiqlash kodi",
          no_cards_found: "Sizda hali kartalar qo'shilmagan",
        },
      },
      ru: {
        translation: {
          form_location: "Локация",
          form_checkin: "Заезд",
          form_checkout: "Выезд",
          form_guests: "Гости",
          form_location_placeholder: "Куда?",
          form_checkin_placeholder: "Когда?",
          form_checkout_placeholder: "Обратно?",
          form_guests_placeholder: "Сколько гостей?",
          form_button: "Поиск",
          city_card_city_bukhara: "Бухара",
          city_card_descr_bukhara:
            "Бухара - древний узбекский город, через который проходил Великий шелковый путь (торговая дорога, соединявшая Восток и Запад). В средние века город был крупным центром исламской теологии и культуры.",
          city_card_city_samarkand: "Самарканд",
          city_card_descr_samarkand:
            "Самарканд - город в Узбекистане, известный своими мечетями и мавзолеями. Он находится на Великом Шелковом пути, древнем торговом пути, связывающем Китай со Средиземноморьем.",
          city_card_city_khiva: "Хива",
          city_card_descr_khiva:
            "Хива - город, которому более 2500 лет. Согласно легенде, Хива была основана одним из сыновей библейского Ноя.",
          map: "Карта",
          housing: "Жилье",
          food: "Еда",
          entertainment: "Развлечения",
          soon: "Скоро",
          cottages_title: "Дачи",
          hotels_title: "Отели",
          view_more: "Смотреть еще",
          view_all: "Смотреть все",
          login_btn: "Войти",
          sidebar_profile: "Профиль",
          sidebar_payments: "Способ оплаты",
          sidebar_bookings: "Мои бронирования",
          sidebar_fav: "Избранное",
          sidebar_logout: "Выйти",
          filter_search_placeholder: "Искать на карте",
          filter_price: "Цена",
          filter_rating: "Звездный рейтинг",
          filter_services: "Удобства",
          filter_distance: "Расстояние до центра",
          filter_services_parking: "Парковка",
          filter_clear_btn: "Очистить все",
          km: "км",
          geolocation_request: "Геолокация",
          geolocation_request_descr:
            "Включите гелокацию на вашем устройстве и мы покажем актуальную информацию о вашем городе",
          weather: "Погода",
          login_title: "Войти в учетную запись",
          password: "Пароль",
          login_username: "Имя пользователя",
          login_btn: "Войти",
          signup: "Зарегистрироваться",
          forgot_password: "Забыли пароль?",
          footer_motto:
            "Наш девиз - удовлетворять запросы клиентов, делая их удовлетворенными развитием своего бизнеса",
          footer_about_us: "О нас",
          footer_adds: "Реклама",
          footer_map: "Карта сайта",
          footer_cooperation: "Сотрудничество",
          footer_cooperation_hotels: "Для гостиниц",
          footer_cooperation_cottages: "Для дач/домов",
          footer_copyright: "Авторское право Visitca",
          footer_reserved: "Все права защищены.",
          footer_get_app: "Наше приложение",
          booking_title: "Бронирования",
          booking_subtitle: "Ваши забронированные места и история бронирований",
          booking_first_tab: "Текущие",
          booking_second_tab: "История",
          booking_empty_placeholder: "У вас пока нет активных броней",
          booking_no_history_placeholder: "История бронирований пуста",
          booking_pending: "На рассмотрении",
          booking_approved: "Подтверждено",
          booking_rejected: "Отклонено",
          booking_completed: "Завершено",
          booking_early_departure: "Досрочный выезд",
          booking_rate: "Оставить отзыв",
          booking_per_day: "за день",
          booking_amount_of_people: "человек(а)",
          booking_currency: "сум",
          booking_rating_stars_label: "Количество звезд",
          booking_rating_text_label: "Текст",
          booking_rating_textarea: "Ваш отзыв",
          booking_early_departure: "Досрочный выезд",
          booking_early_departure_confirmation:
            "Вы действительно хотите  оформить досрочный выезд    ",
          booking_early_departure_warning:
            "Согласно договору вы оплатите штраф в размере",
          my_cards: "Мои карты",
          add_card: "Добавить карту",
          enter_card_number: "Введите номер карты",
          enter_card_exp: "Введите срок действия карты",
          save: "Сохранить",
          send: "Отправить",
          cancel: "Отмена",
          confirm: "Подтвердить",
          confirm_card_text:
            "Введите код, отправленный на ваш номер привязанный к карте",
          confirm_card_code: "Код подтверждения",
          no_cards_found: "У вас пока нет добавленных карт",
        },
      },
    },
  });

export default i18n;
