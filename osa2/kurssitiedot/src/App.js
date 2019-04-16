import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {
    const course = () =>
      courses.map(course => <Course key={course.id} course={course}/>)
  
    return (
      <div>
        {course()}
      </div>
    )
  }
  
export default App