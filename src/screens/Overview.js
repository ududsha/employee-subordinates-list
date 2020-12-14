import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, List, ListItem, makeStyles } from "@material-ui/core";
import SubordinateList from "../components/SubordinateList";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
  subHeading: {},
  list: {
    alignContent: "center",
  },
}));

export default function Overview() {
  const classes = useStyles();
  const REACT_APP_SUBORDINATE_URL =
    "http://api.additivasia.io/api/v1/assignment/employees/"; //process.env.REACT_APP_SUBORDINATE_URL;
  const [subordinates, setSubordinates] = useState([]);
  let { name } = useParams();
  let allSubordinatesList = new Set();
  let newDirectSubs = [];

  useEffect(() => {
    fetchAllSubordinates();
  }, []);

  const fetchAllSubordinates = async () => {
    newDirectSubs = await fetchDirectSubordinates(name);
    await fetchDeep(newDirectSubs);
    console.log("allSubordinatesList: ", allSubordinatesList);
    setSubordinates(allSubordinatesList);
  };

  const fetchDeep = async (directSubList) => {
    while (newDirectSubs.length > 0) {
      for (const subName of newDirectSubs) {
        allSubordinatesList.add(subName);
        newDirectSubs = await fetchDirectSubordinates(subName);
        await fetchDeep(newDirectSubs);
      }
    }

    console.log("subordinates: @@ ", subordinates);
  };

  const fetchDirectSubordinates = async (yourName) => {
    console.log("url", REACT_APP_SUBORDINATE_URL);
    let data = [];
    const res = await fetch(`${REACT_APP_SUBORDINATE_URL}/${yourName}`);
    const result = await res.json();
    if (result) {
      if (result[1] !== undefined) {
        data = result[1]["direct-subordinates"];
      }
    }
    return data;
  };

  return (
    <div>
      <h2>Employee Overview</h2>
      <Grid className={classes.root} container spacing={3}>
        <Grid md={12} className={classes.subHeading} item>
          Subordinates of employee {name}
        </Grid>
        <Grid md={3} className={classes.list} item>
          <SubordinateList subordinates={subordinates}/>
        </Grid>
      </Grid>
    </div>
  );
}
