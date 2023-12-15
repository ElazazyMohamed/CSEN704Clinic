// MIN = Minimum expected value
// MAX = Maximum expected value
// Function to normalise the values (MIN / MAX could be integrated)
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const normalise = (value) => ((value - 0) * 100) / (100 - 0);

// Example component that utilizes the `normalise` function at the point of render.
function Progress(props) {
  return (
    <React.Fragment>
      {props.value == 99 ? (
        <LinearProgress sx={{ marginTop: 2 }} variant="indeterminate" />
      ) : (
        <LinearProgress
          sx={{ marginTop: 2 }}
          variant="determinate"
          value={normalise(props.value)}
        />
      )}
    </React.Fragment>
  );
}
export default Progress;
