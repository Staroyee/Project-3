// Define component to be used in Error page
function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 560,
        clear: "both",
        paddingTop: 120,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

// Export component
export default Jumbotron;
