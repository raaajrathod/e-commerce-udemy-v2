import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION
});

export const fetchCollectionsSuccess = collectionsMap => {
  return {
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
  };
};

export const fetchCollectionError = error => ({
  type: ShopActionTypes.FETCH_COLLECTION_ERROR,
  payload: error
});

export const fetchCollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionError(error.mesaage)));
  };
};
