import { useEffect, useState, memo } from "react";
import styles from "../styles/range-slider.module.css";

function RangeSliderC({ className, onChange, value, ...sliderProps }) {
  const [sliderVal, setSliderVal] = useState(0);

  const [mouseState, setMouseState] = useState(null);

  useEffect(() => {
    setSliderVal(value);
  }, [value]);

  const changeCallback = (e) => {
    setSliderVal(e.target.value);
  };

  useEffect(() => {
    if (mouseState === "up") {
      onChange(sliderVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseState]);

  return (
    <div className={styles.container}>
      <input
        style={{
          opacity: sliderVal / 100,
        }}
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={`${styles.slider} ${className}`}
        onChange={changeCallback}
        onMouseDown={() => setMouseState("down")}
        onMouseUp={() => setMouseState("up")}
      />
    </div>
  );
}

const RangeSlider = memo(RangeSliderC);
export default RangeSlider;
