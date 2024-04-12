import { createSlice } from "@reduxjs/toolkit";

// export const AuthState = {
//     isLoading: boolean,
//     error: string | null,
//     isSignedIn: boolean,
//     user: User | null,
//     signupStep: "email" | "phone" | "confirmation" | null,
//     confirmationCode: string,
//   };

const initialState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  verification: {
    isVerifyingCode: false,
    verificationError: null,
    verificationType: "",
  },
  user: {
    id: null,
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone_number: "",
    username: "",
    role: "",
    image_path: "",
    password: "",
    join_date: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserField(state, action) {
      const { field, value } = action.payload;
      if (field === "image_path") {
        state.user.image_path = value;
        console.log(value);
      } else {
        state.user = {
          ...state.user,
          [field]: value,
        };
      }
    },
    setNewUser(state, action) {
      const {
        firstName,
        username,
        lastName,
        join_date,
        email,
        id,
        role,
        image_path,
      } = action.payload;
      state.user = {
        ...state.user,
        firstName,
        username,
        lastName,
        join_date,
        email,
        id,
        role,
        image_path,
      };
      console.log(state.user);
      state.isAuthenticated = true;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSignedIn(state, action) {
      state.isSignedIn = action.payload;
      state.user = action.payload ? action.payload : null;
    },
    setToken(state, action) {
      state.isSignedIn = Boolean(action.payload);
      state.token = action.payload;
    },

    // setVerificationType(state, action) {
    //   state.verificationType = action.payload;
    // },

    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(verifyRegistrationCode.pending, (state) => {
  //         state.isVerifyingCode = true;
  //         state.verificationError = null;
  //       })
  //       .addCase(verifyRegistrationCode.fulfilled, (state, action) => {
  //         state.isVerifyingCode = false;
  //         state.signupStep = "confirmed";
  //         // Handle successful verification (e.g., navigate to next step)
  //       })
  //       .addCase(verifyRegistrationCode.rejected, (state, action) => {
  //         state.isVerifyingCode = false;
  //         state.verificationError = action.error.message || "Verification failed";
  //       });
  //   },
});

export const {
  setSignedIn,
  setSignupStep,
  setConfirmationCode,
  setUserField,
  //   setVerificationType,
  setIsLoading,
  setToken,
  setNewUser,
} = authSlice.actions;

export default authSlice.reducer;

// const isStrongPassword = (pass) => {
//   var protect = 0;

//   if (pass.length < 8) {
//     return "Слабый";
//   }

//   //a,s,d,f
//   var small = "([a-z]+)";
//   if (pass.match(small)) {
//     protect++;
//   }

//   //A,B,C,D
//   var big = "([A-Z]+)";
//   if (pass.match(big)) {
//     protect++;
//   }
//   //1,2,3,4,5 ... 0
//   var numb = "([0-9]+)";
//   if (pass.match(numb)) {
//     protect++;
//   }
//   //!@#$
//   var vv = /\W/;
//   if (pass.match(vv)) {
//     protect++;
//   }

//   if (protect === 2) {
//     return "Средний";
//   }
//   if (protect === 3) {
//     return "Хороший";
//   }
//   if (protect === 4) {
//     return "Высокий";
//   }
// };

// const pass = isStrongPassword(initialState?.password);

// const handleVerifyCode = () => {
//   const email = initialState.user.email;
// };

// const handleSend = () => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const pass = isStrongPassword(initialState.password);
//   console.log(pass);
//   setLoading(true);
//   if (initialState?.email && emailRegex.test(initialState.email)) {
//     if (pass === "Средний" || pass === "Хороший" || pass === "Высокий") {
//       if (initialState.password === confirmPass.passConfirm) {
//         if (confirmPass.checkBox) {
//           setStep1(false);
//           setStep3(false);
//           CheckEmailAPI(initialState?.email).then((r) => {
//             if (r === 200) {
//               setLoading(false);
//               setStep2(true);
//               setStep3(false);
//               setStep1(false);
//             } else {
//               setStep2(false);
//               setStep3(false);
//               setStep1(true);
//               setLoading(false);
//               message.error("bu email registratsiyadan otgan");
//             }
//           });
//         } else {
//           message.error("policy");
//           setLoading(false);
//         }
//       } else {
//         message.error("confirm pass");
//         setLoading(false);
//       }
//     } else {
//       message.error("parol slabiy");
//       setLoading(false);
//     }
//   } else {
//     setLoading(false);
//     message.error("Please enter a valid email");
//   }
// };

// const handleSendStep2 = () => {
//   setLoading(true);
//   if (initialState?.email) {
//     if (checkCode?.code) {
//       CheckRegistrationCodeAPI(checkCode.code, initialState.email).then((r) => {
//         if (r?.status === 200) {
//           setToken(r.data?.access_token);
//           localStorage.setItem("token", r.data?.access_token);
//           setStep3(true);
//           setStep1(false);
//           setStep2(false);
//           setLoading(false);
//         } else {
//           message.error("xabar jonatishda xatolik");
//           setLoading(false);
//           setStep3(false);
//           setStep1(false);
//           setStep2(true);
//         }
//       });
//     } else {
//       setLoading(false);
//       message.error("email pochtangizga kelgan xabarni yozing");
//     }
//   }
// };

// const handleSendStep3 = async () => {
//   setLoading(true);
//   if (
//     initialState.username &&
//     initialState.firstName &&
//     initialState.lastName
//   ) {
//     const res = await axios.post(
//       "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api/register",
//       initialState,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       }
//     );

//     if (res?.status === 200) {
//       setLoading(false);
//       window.location.assign(LOGIN_ROUTE);
//     } else {
//       console.log(res);
//       setLoading(false);
//       setStep3(true);
//       setStep1(false);
//       setStep2(false);
//     }
//   } else {
//     setLoading(false);
//     message.error("Please fill in all fields");
//   }
// };

// const handleTypeUser = (val) => {
//   setInitialState({ ...initialState, role: val });
// };
