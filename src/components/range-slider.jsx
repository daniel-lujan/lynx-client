import { useEffect, useState, memo } from "react";

function RangeSliderC({ className, onChange, value, ...sliderProps }) {
  const [sliderVal, setSliderVal] = useState(0);

  const [mouseState, setMouseState] = useState(null);

  useEffect(() => {
    setSliderVal(value * 10);
  }, [value]);

  const changeCallback = (e) => {
    setSliderVal(e.target.value);
  };

  useEffect(() => {
    if (mouseState === "up") {
      onChange(parseInt(sliderVal / 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseState]);

  return (
    <div>
      <input
        style={{
          opacity: Math.max(0.3, sliderVal / 100),
        }}
        type="range"
        value={sliderVal}
        {...sliderProps}
        className={className}
        onChange={changeCallback}
        onMouseDown={() => setMouseState("down")}
        onMouseUp={() => setMouseState("up")}
      />
    </div>
  );
}

const RangeSlider = memo(RangeSliderC);
export default RangeSlider;
