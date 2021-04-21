import React from "react";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

interface propTypes {
  reload: (isReload: boolean) => void;
}

const useStyles = makeStyles({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",
    marginTop: "30vh",
  },
  error: {
    height: "50%",
    width: "35%",
    marginLeft: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
  },
  button: {
    height: "50%",
    width: "35%",
    marginLeft: "50%",
    transform: "translate(-50%, -50%)",
  },
});

const Error: React.FC<propTypes> = ({ reload }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Alert
        className={classes.error}
        variant="filled"
        severity="error"
        color="error"
      >
        Things got complicated :( Try reloading data
      </Alert>
      <Button className={classes.button} onClick={() => reload(true)}>
        Reload
      </Button>
    </div>
  );
};

export default Error;
