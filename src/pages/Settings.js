import { BottomNavigation, BottomNavigationAction, Button, Container, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import PublicProfile from '../components/PublicProfile'
import AccountSettings from '../components/AccountSettings';
import Notifications from '../components/Notifications'
import {
    Routes,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import { Fragment } from 'react';

const drawerWidth = 200

const useStyles = makeStyles({
    root: {
        display: 'flex',
        // minHeight: "1vh"
    },
    drawer: {
        width: drawerWidth,
    },
    link: {
        textDecoration: "inherit",
        color: "inherit"
    },
    footer: {
        position: 'fixed',
        bottom: "20px",
        left: "50%"
    }
})

function Setting() {
    const classes = useStyles()
    let location = useLocation();

    return (
        <Fragment>
            <Container sx={{ minHeight: "1vh" }}>
                <div className={classes.root}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        anchor="left"
                        classes={{ paper: classes.drawer }}
                    >
                        <List>
                            <Link to="/settings/public-profile" className={classes.link}>
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

                            <Link to="/settings/account" className={classes.link}>
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

                            <Link to="/settings/notifications" className={classes.link}>
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

                            <ListItemButton>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: "button"
                                    }}
                                >
                                    Privacy and data</ListItemText>
                            </ListItemButton>
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
                            <Route path="/settings/public-profile" element={<PublicProfile />} />
                            <Route path="/settings/account" element={<AccountSettings />} />
                            <Route path="/settings/notifications" element={<Notifications />} />
                        </Routes>
                    </Stack>
                </div>
            </Container >
            <div className={classes.footer}>
                <BottomNavigation>
                    <BottomNavigationAction label="Reset" icon={<Button color="text" disabled>Reset</Button>} />
                    <BottomNavigationAction label="Save" icon={<Button color="text" disabled>Save</Button>} />
                </BottomNavigation>
            </div>
        </Fragment >
    );
}

export default Setting;