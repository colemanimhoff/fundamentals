import jsonPlaceHolder from '../apis/jsonPlaceholder'
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())
  const posts = getState().posts

  // one solution

  // const uniqueUserIds = _.uniq(_.map(posts, 'userId'))
  // uniqueUserIds.forEach((id) => dispatch(fetchUser(id)))

  // using chain func

  _.chain(posts)
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value()
}

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceHolder.get('/posts')

  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data,
  })
}

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`)

  dispatch({
    type: 'FETCH_USER',
    payload: response.data,
  })
}

// A not so great soluion:

// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch)
// }

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`)

//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data,
//   })
// })
