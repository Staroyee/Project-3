import Jumbotron from "../../components/Jumbotron/Jumbotron.jsx";

// Error page
const Error = () => {
  return (
    <div>
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </Jumbotron>
    </div>
  );
};

// Export page
export default Error;
