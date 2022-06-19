import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import { Button } from '@material-ui/core';
import YoutubeIcon from '@material-ui/icons/YouTube'
import '../App.css'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
    media: {
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#282c34",
        borderRadius: "10px",
        position: "relative",
        fontFamily: '"Montserrat",sans-serif',
        '&:hover': {
            backgroundColor: "white",
            color: "black",
        },
        [theme.breakpoints.down('md')]: {
            width: "46%"
        }
    },
    contentModal_potrait: {
        display: "none",
        objectFit: "contain",
        borderRadius: "10px",
        [theme.breakpoints.up('md')]: {
            display: "flex",
            width: "38%",
            borderRadius: "10px",
        }

    },
    tagline: {
        paddingBottom: "10px",
        alignSelf: "center"
    },
    contentModal_backdrop: {
        objectFit: "contain",
        borderRadius: "10px",
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
    },
    contentModal: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px 0"
        }
    },
    contentModal_about: {
        padding: "10px",
        width: "95%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Montserrat",sans-serif',
        justifyContent: "space-evenly",
        fontWeight: "300",
        [theme.breakpoints.up('md')]: {
            width: "58%",
            padding: 0,
            height: "100%"
        }
    },
    contentModal_title: {
        height: "12%",
        fontSize: "5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up('md')]: {
            fontSize: "3.5vw"
        }
    },
    contentModal_description: {
        display: "flex",
        height: "40%",
        overflowY: "scroll",
        padding: "15px",
        borderRadius: "20px",
        scrollbarWidth: "thin",
        boxShadow: "inset 0 0 5px #000000",
        textAlign: "justify",
        [theme.breakpoints.up('md')]: {
            fontSize: "22px",

        }
    },

}));

export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState()
    const [video, setVideo] = useState()
    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setContent(data)
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        setVideo(data.results[0]?.key);
    }
    useEffect(() => {
        fetchData()
        fetchVideo()
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className={classes.media} type="button" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className={classes.contentModal} id="ContentModal" >
                                < img className={classes.contentModal_potrait} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />
                                <img className={classes.contentModal_backdrop} src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} />
                                <div className={classes.contentModal_about}>
                                    <span className={classes.contentModal_title}>
                                        {content.name || content.title} ({
                                            (content.first_air_date || content.release_date || "-----").substring(0, 4)
                                        })
                                    </span>
                                    {content.tagline && (
                                        <i className={classes.tagline}>{content.tagline}</i>
                                    )}
                                    <span className={classes.contentModal_description} id="ContentModal_description">
                                        {content.overview}
                                    </span>
                                    <div>

                                    </div>
                                    <Button
                                        variant='contained'
                                        startIcon={<YoutubeIcon />}
                                        color='secondary'
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </ >
    );
}
