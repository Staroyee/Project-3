import { PropTypes } from "prop-types";

// Define component to be able to format the date and time.
const DateParser = ({ dateString }) => {
  const parseAndFormatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  // Return component data
  return (
    <>
      <div data-testid="dateParser">{parseAndFormatDate(dateString)}</div>
    </>
  );
};

// Define props
DateParser.propTypes = {
  dateString: PropTypes.string,
};

// Export component
export default DateParser;
