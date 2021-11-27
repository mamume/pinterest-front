import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function ProfileNotFound({ message }) {
  return (
    <Box mt={20}>
      <Typography variant="h1" textAlign="center" fontWeight="bold">404</Typography>
      <Typography variant="h3" textAlign="center">Not Found</Typography>
      <Typography variant="body1" textAlign="center">{message}</Typography>
    </Box>
  );
}

export default ProfileNotFound;