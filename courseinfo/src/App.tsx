interface HeaderProps {
  name: string
}

interface PartProps {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  parts: PartProps[]
}

const Header = (props: HeaderProps): JSX.Element => (
  <>
    <h1>{props.name}</h1>
  </>
);

const Part = (props: PartProps): JSX.Element => (
  <>
    <p>
      {props.name} {props.exerciseCount}
    </p>
  </>
);

const Content = (props: ContentProps): JSX.Element => (
  <div>
    {props.parts.map((part, idx) => (<Part key={idx} name={part.name} exerciseCount={part.exerciseCount} />))}
  </div>
);

const Total = (props : ContentProps) => (
  <>
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
