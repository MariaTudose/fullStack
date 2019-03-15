import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Content = (props) => {
    const [part1, part2, part3] = props.parts
    console.log(part1)
    return (
        <div>
            <Part name={part1.name} exercises={part1.exercises}/>
            <Part name={part2.name} exercises={part2.exercises}/>
            <Part name={part3.name} exercises={part3.exercises}/>
        </div>
    )
}

const Total = (props) => {
    const [part1, part2, part3] = props.parts
    return <p>yhteensä {part1.exercises + part2.exercises + part3.exercises} tehtävää</p>
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }    

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))