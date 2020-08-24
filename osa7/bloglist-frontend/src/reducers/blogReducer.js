import blogService from '../services/blogs'

const initialState = {
  all: [],
  details: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_BLOGS':
      return {...state, all: action.blogs}
    case 'CREATE_BLOG':
      return {...state, all: state.all.concat(action.newBlog)}
    case 'LIKE_BLOG':
      const i = state.all.findIndex(blog => blog.id === action.blog.id)
      const newBlogs = [...state.all]
      newBlogs[i] = action.blog
      return {...state, all: newBlogs, details: action.blog}
    case 'GET_BLOG':
      return {...state, details: action.blog }
    default:
      return state
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      blogs
    })
  }
}

export const getBlog = id => {
  return async dispatch => {
    const blog = await blogService.getBlog(id)
    dispatch({
      type: 'GET_BLOG',
      blog
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const likeBlog = (id, likes) => {
  return async dispatch => {
    const blog = await blogService.like(id, likes)
    dispatch({
      type: 'LIKE_BLOG',
      blog
    })
  }
}

export const setBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'SET_BLOGS',
      blogs
    })
  }
}

export default reducer