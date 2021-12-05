import { makeStyles } from "@mui/styles";


export default makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '445px',
    backgroundColor: 'white',
    borderRadius: "32px",
    boxShadow: '24',
    padding: 20
  },
  pin: {
    borderRadius: 16,
    border: "1px lightgray solid",
    minHeight: 236,
    maxWidth: 236,
    minWidth: 236,
    '&:hover': {
      cursor: "pointer",
      opacity: 0.9,
    }
  },
  masonry: {
    margin: 'auto',
    width: '90%'
  },
  boardThumbnail: {
    width: 300,
    height: 157,
    borderRadius: 16,
    backgroundColor: "whitesmoke",
    // border: "1px lightgray solid",
  }
})
