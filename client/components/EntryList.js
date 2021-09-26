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

export default function EntryList({ entries, deleteEntry = () => {} }) {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 0,
          width: "100%",
          border: '1px dashed grey',
          minHeight: '200px'
        },
      }}
    >
      <Paper variant="outlined" sx={{ margin: -8 }}>
        {!entries.length && <div className="flex-centered min-height-200"><span>Add foods to get started</span></div>}
        <Grid item xs={12}>
          <List dense={dense} sx={{ margin: 1 }}>
            {entries.map((entry) => (
              <ListItem
                key={entry.fdcId}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteEntry(entry.fdcId)}>
                    <DeleteIcon />
                  </IconButton>
                }
                divider={true}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SpaOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${entry.description} ${entry.brandName ? `(${entry.brandName})` : ''}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Paper>
    </Box>
  );
}
