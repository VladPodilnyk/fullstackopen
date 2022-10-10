const Header = (props) => {
  return (
    <>
    <h1>{props.courseName}</h1>
    </>
  );
}

const Part = (props) => {
  return (
    <>
    <p>{props.name}. Exercises {props.exerciseNumber}</p>
    </>
  );
}

const Content = () => {
  return (
    <>
    <Part name='Fundamentals of React' exerciseNumber='10' />
    <Part name='Using props to pass data' exerciseNumber='7' />
    <Part name='State of a component' exerciseNumber='14' />
    </>
  );
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercieses {props.total}</p>
    </>
  );
}


const App = (props) => {
  return (
    <div>
    <Header courseName='Half Stack application development' />
    <Content />
    <Total total='31'/>
    </div>
  );
}


export default App
