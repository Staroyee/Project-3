import { PropTypes } from "prop-types";

const DateParser = ({ dateString }) => {
  const parseAndFormatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  return (
    <div>
      {parseAndFormatDate(dateString)}
    </div>
  );
};

DateParser.propTypes = {
    dateString: PropTypes.string,
}

export default DateParser;
