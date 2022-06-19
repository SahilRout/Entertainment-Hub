import { makeStyles, Badge } from '@material-ui/core'
import React from 'react'
import { img_300, unavailable } from '../config/config'
import ContentModal from './ContentModal'
const useStyles = makeStyles((theme) => (
    {
        poster: {
            borderRadius: "10px",
        },
        title: {
            width: "100%",
            textAlign: "center",
            fontSize: "17px",
            padding: "8px 0",
        },
        subtitle: {
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "3px",
            padding: "0 2px",

        }
    }
))

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {

    const classes = useStyles();

    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
            <img className={classes.poster} src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className={classes.title}>{title}</b>
            <span className={classes.subtitle}>{media_type === 'tv' ? "TV Series" : "Movie"}
                <span className={classes.subtitle}>{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent