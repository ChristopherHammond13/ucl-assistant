import { WORKSPACES_URL } from "../constants/API";
import {
  WORKSPACES_FETCH_SEATINFO_FAILURE,
  WORKSPACES_IS_FETCHING_SEATINFO,
  WORKSPACES_FETCH_SEATINFO_SUCCESS,
  WORKSPACES_FETCH_SEATSUMMARIES_SUCCESS,
  WORKSPACES_FETCH_SEATSUMMARIES_FAILURE,
} from "../constants/studyspacesConstants";

export const setIsFetchingSeatInfo = id => ({
  id,
  type: WORKSPACES_IS_FETCHING_SEATINFO,
});

export const fetchSeatInfoSuccess = (id, data) => ({
  id,
  data,
  type: WORKSPACES_FETCH_SEATINFO_SUCCESS,
});

export const fetchSeatInfoFailure = (id, error) => ({
  id,
  error,
  type: WORKSPACES_FETCH_SEATINFO_FAILURE,
});

export const fetchSeatSummariesInfoSuccess = data => ({
  data,
  type: WORKSPACES_FETCH_SEATSUMMARIES_SUCCESS,
});

export const fetchSeatSummariesInfoFailure = error => ({
  error,
  type: WORKSPACES_FETCH_SEATSUMMARIES_FAILURE,
});

export const fetchSeatInfo = (token, id) => async dispatch => {
  await dispatch(setIsFetchingSeatInfo(id));
  try {
    const res = await fetch(`${WORKSPACES_URL}/${id}/seatinfo`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(
      fetchSeatInfoSuccess(id, {
        occupied: json.content.occupied,
        capacity: json.content.total,
      }),
    );
  } catch (error) {
    return dispatch(
      fetchSeatInfoFailure(
        id,
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const fetchSeatSummaries = token => async dispatch => {
  try {
    const res = await fetch(`${WORKSPACES_URL}/seatsummaries`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(fetchSeatSummariesInfoSuccess(data));
  } catch (error) {
    return dispatch(
      fetchSeatSummariesInfoFailure(
        error,
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};
