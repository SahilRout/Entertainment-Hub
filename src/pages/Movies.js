import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/CustomPagination'
import SingleContent from '../components/SingleContent'
import { makeStyles } from '@material-ui/core'
import Genres from '../components/Genres'
import useGenres from '../hooks/useGenre'

const useStyles = makeStyles(() => ({
    trending: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    }
}))
const Movies = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([])
    const genreForUrl = useGenres(selectedGenres);
    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`
        )
        //console.log(data);
        setContent(data.results);
        setNumOfPages(data.total_pages)
    }
    useEffect(() => {
        fetchMovies();
    }, [page, genreForUrl])
    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <div className={classes.trending}>
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
        </div>
    )
}

export default Movies