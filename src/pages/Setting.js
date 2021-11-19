import { Container, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import PublicProfile from '../components/PublicProfile'
import AccountSettings from '../components/AccountSettings';

const drawerWidth = 200

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
    },
})

function Setting() {
    const classes = useStyles()

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
                        <ListItemButton selected>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: "button"
                                }}
                            >
                                Public Profile</ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: "button"
                                }}
                            >
                                Account Settings</ListItemText>
                        </ListItemButton>
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
                        <ListItemButton>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: "button"
                                }}
                            >
                                Notifications</ListItemText>
                        </ListItemButton>
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
                    {/* <PublicProfile /> */}
                    <AccountSettings />
                </Stack>
            </div>
        </Container>
    );
}

export default Setting;