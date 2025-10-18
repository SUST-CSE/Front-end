import { Link } from "react-router-dom";

import "./TextBox.css";

const TextBox = () => {
  return (
    <div className="text-box">
      <h1>Computer Science and Engineering, SUST.</h1>
      <Link to="/" className="hero-btn">
        Visit us To Know More
      </Link>
    </div>
  );
};

export default TextBox;
