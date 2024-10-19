/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { NP_URL } from "../constants";

export const fetchNovaPoshtaItems = createAsyncThunk(
  "novaPoshtaItems/fetchNovaPoshtaItems",
  async (city) => {
    const options = {
      method: "POST",
      url: "https://api.novaposhta.ua/v2.0/json/",
      /*  headers: {
        cookie: 'PHPSESSID=plt6aunqpdjs0k5djkka3qt192; YIICSRFTOKEN=0dc8cf5a4e490ed23a1cf480e6f34b64a978bc02s%253A88%253A%2522Q2E4MDE4NlY0RllzZFlZR0VBb2F1Y1dNSkNFRm83bGeElC1LA9SS_7dD32enGJD5jQ35Z69B-S3oUZpdH_pnKA%253D%253D%2522%253B'
      },  */
      data: {
        
          "apiKey": "523e492b98793a5cb639344b6a556643",
          "modelName": "AddressGeneral",
          "calledMethod": "getWarehouses",
          "methodProperties": {
            "CityName": city,
          }
        
      },
    };
    const response = await axios.request(
      options
      /* headers: {
        cookie: 'PHPSESSID=plt6aunqpdjs0k5djkka3qt192; YIICSRFTOKEN=0dc8cf5a4e490ed23a1cf480e6f34b64a978bc02s%253A88%253A%2522Q2E4MDE4NlY0RllzZFlZR0VBb2F1Y1dNSkNFRm83bGeElC1LA9SS_7dD32enGJD5jQ35Z69B-S3oUZpdH_pnKA%253D%253D%2522%253B'
      },
      data:  {
        "apiKey": "523e492b98793a5cb639344b6a556643",
        "modelName": "CommonGeneral",
        "calledMethod": "getPackList",
        "methodProperties": {"Lengthstring" : "10","Widthstring" : "2","Heightstring" : "15","VolumetricWeightstring" : "8.54","TypeOfPackingstring" : ""   }
     } */
    );
    return response.data.data;
  }
);

const novaPoshtaItemsAdapter = createEntityAdapter();

const novaPoshtaApiSlice = createSlice({
  name: "novaPoshtaItems",
  initialState: novaPoshtaItemsAdapter.getInitialState(),

  extraReducers: (builder) => {
    builder

      .addCase(fetchNovaPoshtaItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchNovaPoshtaItems.fulfilled, (state, action) => {
        novaPoshtaItemsAdapter.addOne(state, action.payload);
        state.status = "loaded";
      })
      .addCase(fetchNovaPoshtaItems.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});

export const { addMessage } = novaPoshtaApiSlice.actions;
export const novaPostaItemsSelectors = novaPoshtaItemsAdapter.getSelectors(
  (state) => state.novaPoshtaItems
);
export default novaPoshtaApiSlice.reducer;
