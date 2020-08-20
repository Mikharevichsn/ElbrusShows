import {
  GET_FILMLIST,
  START_FETCH,
  RECEIVE_DATA_FROM_FETCH,
  SET_USER,
  GET_VIDEO,
  START_VIDEO,
  SET_COMMENTS,
  SAVE_COMMENTS,
  GET_NEWS
} from './actionTypes';


const checkRating = (actor, scenario, general) =>
  Number(actor) + Number(scenario) + Number(general);
const setColor = (num) =>
  num >= 12 ? 'success' : num >= 9 ? 'warning' : 'danger';

export const getContent = () => {
  return async (dispatch) => {
    await fetch('https://elbrus-shows.firebaseio.com/films.json', {
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((content) => {
        dispatch({
          type: GET_FILMLIST,
          payload: content,
        });
      });
  };
};


export const saveComment = (obj) => {
  return async (dispatch) => {
    await fetch('https://elbrus-shows.firebaseio.com/comments.json', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json' },
    });

    setColor(
      checkRating(obj.rating.actor, obj.rating.scenario, obj.rating.general)
    );

    return dispatch({
      type: SAVE_COMMENTS,
      payload: [obj],
    });
  };
};

export const setComments = (idFilm) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://elbrus-shows.firebaseio.com/comments.json',
      {
        headers: { 'Content-type': 'application/json' },
      }
    );
    const arr = [];
    const res = await response.json();
    for (const key in res) {
      if (res.hasOwnProperty(key)) {
        const element = res[key];
        if (element.filmId === idFilm) {
          arr.push(element);
        }
      }
    }
    arr.map(
      (el) =>
        (el.result = setColor(
          checkRating(el.rating.actors, el.rating.scenario, el.rating.general)
        ))
    );

    return dispatch({
      type: SET_COMMENTS,
      payload: arr,
    });
  };
};





export const getNews = () => {
  return async (dispatch) => {
    const response = await fetch('http://newsapi.org/v2/top-headlines?country=ru&category=entertainment&apiKey=686123decd0949248e97c5cdc966645b')
    const result = await response.clone().json()
    console.log(result.articles)
  return dispatch({
    type: GET_NEWS,
    payload: result
  })
} 

}

export const startFetch = (id) => {
  return { type: START_FETCH, id };
};

export const receiveDataFromFetch = (payload) => {
  return {
    type: RECEIVE_DATA_FROM_FETCH,
    payload,
  };
};

export const startVideoFetch = (id) => {
  return { type: START_VIDEO, id };
};

export const getVideo = (payload) => {
  return {
    type: GET_VIDEO,
    payload,
  };
};

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};
