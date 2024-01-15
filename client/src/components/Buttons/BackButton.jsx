import { PropTypes } from "prop-types";
import "./BackButton.css";

const BackButton = ({ onClick }) => {
  return (
    <>
      <svg
        onClick={onClick}
        className="BB-Svg"
        width="70"
        height="60"
        viewBox="0 0 70 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="triangles">
          <g id="darkGroup">
            <path
              id="dark1"
              d="M4.71757 24.1483C2.73102 22.9707 2.7643 20.0841 4.77747 18.9525L28.1807 5.79804C30.1938 4.66646 32.677 6.13856 32.6504 8.44781L32.341 35.2928C32.3143 37.6021 29.7979 39.0165 27.8113 37.8388L4.71757 24.1483Z"
              fillOpacity="0.75"
            />
          </g>
          <g id="lightGroup">
            <path
              id="light1"
              d="M4.71757 24.1483C2.73102 22.9707 2.7643 20.0841 4.77747 18.9525L28.1807 5.79802C30.1938 4.66645 32.677 6.13855 32.6504 8.4478L32.341 35.2928C32.3143 37.6021 29.7979 39.0165 27.8113 37.8388L4.71757 24.1483Z"
              fillOpacity="0.75"
            />
            <path
              id="light2"
              d="M16.7176 24.1483C14.731 22.9707 14.7643 20.0841 16.7775 18.9525L40.1807 5.79802C42.1938 4.66645 44.677 6.13855 44.6504 8.4478L44.341 35.2928C44.3143 37.6021 41.7979 39.0165 39.8113 37.8388L16.7176 24.1483Z"
              fillOpacity="0.75"
            />
          </g>
        </g>
      </svg>
    </>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func,
};

export default BackButton;
