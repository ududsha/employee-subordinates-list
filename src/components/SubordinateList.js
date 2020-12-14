import { List, ListItem } from "@material-ui/core";

export default function SubordinateList(props) {
  const { subordinates } = props;
  return (
    <List component="nav">
      {Array.from(subordinates).map((item) => {
        return <ListItem>{item}</ListItem>;
      })}
    </List>
  );
}
