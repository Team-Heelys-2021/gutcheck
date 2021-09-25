import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function EntryList({ entries }) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          width: "100%",
        },
      }}
    >
      <Paper variant="outlined">
        <Grid item xs={12}>
          <List dense={dense}>
            {entries.map((entry) => (
              <ListItem
                key={entry.fdcId}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <SpaOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={entry.description}
                  secondary={entry.brandName}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Paper>
    </Box>
  );
}
