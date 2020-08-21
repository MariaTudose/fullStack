import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_BLOGS':
      return action.blogs
    case 'CREATE_BLOG':
      return state.concat(action.newBlog)
    case 'LIKE_BLOG':
      const i = state.findIndex(blog => blog.id === action.blog.id)
      const newBlogs = [...state]
      newBlogs[i] = action.blog
      return newBlogs
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