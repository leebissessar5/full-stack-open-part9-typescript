interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface HeaderProps {
  name: string;
}

interface PartProps {
  coursePart: CoursePart;
}

interface ContentProps {
  parts: CoursePart[];
}

const Header = (props: HeaderProps): JSX.Element => (
  <>
    <h1>{props.name}</h1>
  </>
);

const Part = (props: PartProps): JSX.Element => {
  const { coursePart } = props;
    const renderContent = () => {
      switch (coursePart.kind) {
        case "basic":
          return (
            <>
              <div>
                <i>{coursePart.description}</i>
              </div>
            </>
          );
        case "group":
          return (
            <>
              <div>{`project exercises: ${coursePart.groupProjectCount}`}</div>
            </>
          );
        case "background":
          return (
            <>
              <div>
                <i>{coursePart.description}</i>
                <div>{`submit to: ${coursePart.backgroundMaterial}`}</div>
              </div>
            </>
          );
        case "special":
          return (
            <>
              <div>
                <i>{coursePart.description}</i>
                <div>{`required skills: ${coursePart.requirements.join(
                  ", "
                )}`}</div>
              </div>
            </>
          );
        default:
          return null;
      }
    };
  return (
    <p>
      <div>
        <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
      </div>
      {renderContent()}
    </p>
  );
};

const Content = (props: ContentProps): JSX.Element => (
  <div>
    {props.parts.map((part, idx) => (
      <Part key={idx} coursePart={part} />
    ))}
  </div>
);

const Total = (props: ContentProps) => (
  <>
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </>
);

const App = () => {
  const courseName = "Half Stack application development";
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ['node.js', 'jest'],
    kind: "special"
  }
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
