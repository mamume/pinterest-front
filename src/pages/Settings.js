import { Button, Container, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import PublicProfile from '../components/settings/PublicProfile'
import AccountSettings from '../components/settings/AccountSettings';
import Notifications from '../components/settings/Notifications'
import PrivacyAndData from '../components/settings/PrivacyAndData';
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

const drawerWidth = 200

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    marginTop: "90px",
    border: "0px"
  },
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})

function Setting() {
  const classes = useStyles()
  let location = useLocation();

  return (
    <Container>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawer }}
        >
          <List>
            <Link to="public-profile" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/public-profile"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Public Profile
                </ListItemText>
              </ListItemButton>
            </Link>

            <Link to="account" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/account"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Account Settings
                </ListItemText>
              </ListItemButton>
            </Link>

            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Home feed tuner</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Claim</ListItemText>
            </ListItemButton>

            <Link to="notifications" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/notifications"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Notifications
                </ListItemText>
              </ListItemButton>
            </Link>

            <Link to="privacy" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/privacy"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Privacy and data</ListItemText>
              </ListItemButton>
            </Link>

            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Security</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Apps</ListItemText>
            </ListItemButton>
          </List>
        </Drawer>
        <Stack spacing={2} sx={{ width: "490px" }}>
          <Routes>
            <Route path="" element={<PublicProfile />} />
            <Route path="public-profile" element={<PublicProfile />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="privacy" element={<PrivacyAndData />} />
          </Routes>
        </Stack>
      </div>
      <Stack direction="row" spacing={2} justifyContent="center" mt={5} mb={5}>
        <Button color="text" disabled>Reset</Button>
        <Button color="primary" disabled>Save</Button>
      </Stack>
    </Container >
  );
}

export default Setting;