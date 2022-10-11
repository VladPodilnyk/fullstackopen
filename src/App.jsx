const Header = (props) => {
  return (
    <>
    <h1>{props.courseName}</h1>
    </>
  );
}

const Part = (props) => {
  return <p>{props.name}. Exercises {props.exerciseNumber}</p>;
}

const Content = (props) => {
  const result = props.parts.map((value) => <Part name={value.name} exerciseNumber={value.exercises} />);
  return result;
}

const Total = (props) => {
  return <p>Number of exercieses {props.total}</p>;
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header courseName={course.name} />
    <Content parts={course.parts}/>
    <Total total={course.parts.reduce((total, value) => { return total + value.exercises; }, 0)}/>
    </div>
  );
}


export default App
