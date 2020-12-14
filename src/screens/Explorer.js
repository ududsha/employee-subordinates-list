import { Button, Grid, Input, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  searchBar: {
    justifyContent: "space-between",
    display: "flex",
  },
  input: {
    width: "75%",
  },
}));

export default function Explorer() {
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");

  const onClickSearch = () => {
    console.log(name);
    history.push(`/overview/${name}`);
  };

  return (
    <div>
      <h2>Employee Explorer</h2>
      <Grid className={classes.root} container spacing={3}>
        <Grid md={3} className={classes.searchBar} item>
          <Input
            className={classes.input}
            placeholder="Enter employee name here!"
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Button variant="contained" onClick={onClickSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
