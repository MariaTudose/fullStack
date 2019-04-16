import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = ({ name, exercises }) => {
    return <p>{name} {exercises}</p>
}

const Content = (props) => {
    const parts = () => props.parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    )
    return (
        <div>
            {parts()}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, p) => sum + p.exercises, 0)
    return <p>yhteensä {total} tehtävää</p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course