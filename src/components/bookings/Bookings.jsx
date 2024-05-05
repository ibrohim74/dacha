import React, { useEffect } from "react";
import styles from "./Bookings.module.css";

import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import PageHeader from "../page-header/PageHeader";
import Breadcrumb_dashboard from "../breadcrumb_dashboard/breadcrumb_dashboard";
import { useGetDachaQuery } from "../../servises/cottagesAPI";
import { useGetCustomerBookingsQuery } from "../../servises/bookingsAPI";
import { useGetUserQuery } from "../../servises/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { BookingCard } from "./BookingCard";
import { useGetReviewByIdQuery } from "../../servises/reviewsAPI";
import Loader from "../loader/Loader";
import { setNewUser } from "../../store/auth/authSlice";

export default function Bookings() {
  const { t } = useTranslation();
  const { id } = useSelector((state) => state.auth.user);
  const { data: cottage, isLoading: isLoadingCottage } = useGetDachaQuery(1);

  console.log(id);

  const { data: userBookings, isLoading: isLoadingBookings } =
    useGetCustomerBookingsQuery({ customer_id: id, status: "awaiting" });

  const { data: userReview, isLoading: isLoadingReview } =
    useGetReviewByIdQuery(2);

  // console.log(cottage);

  // console.log(userReview);

  console.log(userBookings);

  // data flow => all bookings are fetched with acc ids in them =>
  // based on acc ids we get cottage info and pass to booking card

  return (
    <AppLayout>
      <div className={styles["booking-page"]}>
        <Breadcrumb_dashboard />
        <PageHeader
          pageTitle={t("booking_title")}
          pageSubtitle={t("booking_subtitle")}
        />

        {isLoadingBookings || isLoadingCottage || isLoadingReview ? (
          <Loader />
        ) : (
          <FullPageTabs
            tabs={[
              {
                label: t("booking_first_tab"),
                content: (
                  // userBookings.length > 0 ? (
                  <div className={styles["booking-tab"]}>
                    {/* {userBookings.map((booking) => (
                  <BookingCard booking={booking} key={booking.id} />
                ))} */}

                    <BookingCard
                      booking={{
                        title: cottage?.title,
                        address: cottage?.location_name,
                        status: "finished",
                        final_price: "500000",
                        adults: "5",
                        contacts: "998901411111",
                        accommodation_type: "dacha",
                        accommodation_id: "1",
                      }}
                    />

                    <BookingCard
                      booking={{
                        title: cottage?.title,
                        address: cottage?.location_name,
                        status: "finished",
                        final_price: "500000",
                        adults: "5",
                        contacts: "998901411111",
                        accommodation_type: "dacha",
                        accommodation_id: "1",
                        review: {
                          rating: userReview.rating,
                          body: userReview.body,
                        },
                      }}
                    />
                  </div>
                ),
                // ) : (
                //   <EmptyTab placeholderText={t("booking_empty_placeholder")} />
                // ),
                // <div className={styles["booking-tab"]}>
                //   <BookingCard
                //     booking={{
                //       title: "Hyde Park",
                //       status: "completed",
                //       address: "Ташкент, Яккасарайский район",
                //       final_price: "500000",
                //       adults: "5",
                //       phone_number: "998901411111",
                //       review: {
                //         text: "very good",
                //         rating: "2",
                //       },
                //     }}
                //   />
                // </div>
              },
              {
                label: t("booking_second_tab"),
                content: (
                  <EmptyTab
                    placeholderText={t("booking_no_history_placeholder")}
                  />
                ),
              },
            ]}
          />
        )}
      </div>
    </AppLayout>
  );
}
