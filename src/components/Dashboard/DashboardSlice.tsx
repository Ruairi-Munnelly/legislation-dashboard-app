import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface LegislationState {
  [key: string]: any;
}

//mock data for testing so that on render there is a existing favourite

export const favouriteMock = {
  bill: {
    billNo: "22",
    billType: "Public",
    status: "Current",
    sponsors: [
      {
        sponsor: {
          as: {
            showAs: "Minister for Social Protection",
            uri: null,
          },
          by: {
            showAs: null,
            uri: null,
          },
          isPrimary: true,
        },
      },
    ],
    longTitleEn:
      "<p>Bill entitled&nbsp;an Act to provide for the establishment of a body to be known as <em>An tÚdarás Náisiúnta um Uathrollú Coigiltis Scoir</em>; to provide for that body to establish, maintain and administer an automatic enrolment retirement savings system for employees in employment not covered by qualifying schemes; to provide for automatic enrolment and re-enrolment of participants in that system and for opting into and out of the system; to provide for payment of contributions by participants, their employers and the State, the investment of contributions and the payment of retirement savings out of participants’ accounts; to provide for the consequential amendments of certain enactments; and to provide for related matters.</p> ",
    longTitleGa:
      "<p>Bille dá ngairtear&nbsp;Acht do dhéanamh socrú chun comhlacht a bhunú ar a dtabharfar an tÚdarás Náisiúnta um Uathrollú Coigiltis Scoir; do dhéanamh socrú maidir leis an gcomhlacht sin do bhunú, do chothabháil agus do riaradh córas uathrollaithe coigiltis scoir d’fhostaithe i bhfostaíocht nach bhfuil faoi chumhdach scéimeanna cáilitheacha; do dhéanamh socrú maidir le huathrollú agus ath-uathrollú rannpháirtithe sa chóras sin agus maidir le roghnú a bheith rannpháirteach agus roghnú gan bheith rannpháirteach sa chóras; do dhéanamh socrú maidir le rannpháirtithe, maidir lena bhfostóirí agus maidir leis an Stát d’íoc ranníocaíochtaí, maidir le ranníocaíochtaí a infheistiú agus maidir le coigilteas scoir a íoc as cuntais rannpháirtithe; do dhéanamh socrú maidir le leasuithe iarmhartacha a dhéanamh ar achtacháin áirithe; agus do dhéanamh socrú i dtaobh nithe gaolmhara.</p> ",
  },
};

const initialState: LegislationState = {
  data: [],
  favourites: [favouriteMock],
  modal: {
    display: false,
    activeBill: {},
  },
  status: "idle",
  error: null,
};

// General API endpoint will only return 50 bill items from the call
// for the sake of demonstration this has been chosen

// for a reducer that will call to the server and add specified amount
// to the state from the pagination passed as a payload value, then
// using search query params {skip} and {limit} we can only return the next
// page to the state.
//
// eg: https://api.oireachtas.ie/v1/legislation?skip={pageNo*perPageVal}?limit={total}

const API_ENDPOINT = "https://api.oireachtas.ie/v1/legislation";

export const fetchLegislation = createAsyncThunk(
  "legislation/get",
  async () => {
    const response = await fetch(API_ENDPOINT);
    const jsonData = await response.json();
    return jsonData;
  }
);

const legislationSlice = createSlice({
  name: "legislation",
  initialState,
  reducers: {
    displayModal(state, action) {
      state.modal.display = action.payload;
    },
    updateModal(state, action) {
      state.modal.activeBill = action.payload;
    },
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((favourite: object) => {
        const { bill } = favourite as LegislationState;
        return bill.billNo !== action.payload;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchLegislation.fulfilled,
        (state, action: PayloadAction<object[]>) => {
          const { results } = action.payload as LegislationState;
          state.status = "fulfilled";
          state.data = results;
        }
      )
      .addCase(fetchLegislation.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default legislationSlice.reducer;

export const { addFavourite, removeFavourite, displayModal, updateModal } =
  legislationSlice.actions;

export const getDisplayModal = (state: RootState) =>
  state.legislation.modal.display;
export const getActiveBill = (state: RootState) =>
  state.legislation.modal.activeBill;

export const legislationData = (state: RootState) => state.legislation.data;
export const getStatus = (state: RootState) => state.legislation.status;
export const getFavourites = (state: RootState) => state.legislation.favourites;
