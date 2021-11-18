import { Container, List, ListItemButton, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import PublicProfile from '../components/PublicProfile'

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
                        <ListItemButton>
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
                <PublicProfile />
            </div>
        </Container>
    );
}

export default Setting;