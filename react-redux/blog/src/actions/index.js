import jsonPlaceHolder from '../apis/jsonPlaceholder'

export const fetchPosts = () => {
  const promise = jsonPlaceHolder.get('/posts')
  return {
    type: 'FETCH_POSTS',
    payload: promise,
  }
}
