import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { UserListProps } from "@/types/userTypes";

const UserList = ({ users, toggleFavorite }: UserListProps) => {
  return (
    <Grid container spacing={2}>
      {users?.map((user) => (
        <Grid item xs={12} sm={6} md={3} key={user.id}>
          <Card style={{ boxShadow: "none", position: "relative", justifyContent: "center", display: "grid" }}>
            <CardMedia
              component="img"
              height="160px"
              image={user?.avatar_url}
              alt={user?.login}
              style={{ borderRadius: "50%", objectFit: "cover", width: "160px", height: "160px" }}
            />
            <IconButton
              onClick={() => toggleFavorite(user?.id)}
              style={{ position: "absolute", top: "10px", right: "10px", color: user?.isFavorite ? "gold" : "inherit" }}
            >
              {user?.isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ placeSelf: "center" }}>
                <a href={`/details/${user?.login}`} rel="noopener noreferrer">
                  {capitalizeFirstLetter(user?.login?.toString())}
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
