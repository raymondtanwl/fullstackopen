const Header = (props) => {
  // console.log("Header", props);
  return <h2>{props.name}</h2>;
};

const Part = (props) => {
  // console.log("Part", props.part.name, props.part.exercises);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  // console.log("Content", props);
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </div>
  );
};

const Total = (props) => {
  // console.log("Total", props);
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = (props) => {
  const { name, parts } = props.course;
  // console.log("Course", name, parts);
  return (
    <div>
      <Header name={name}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  );
};

const Courses = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map((course) => (
        <Course key={course.id} course={course}></Course>
      ))}
    </div>
  );
};

export default Courses;
