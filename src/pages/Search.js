import { TextField, ThemeProvider, createMuiTheme, Button, Tabs, Tab, makeStyles } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import axios from 'axios'
import { useEffect } from 'react';
import CustomPagination from '../components/CustomPagination';
import SingleContent from '../components/SingleContent';

const useStyles = makeStyles(() => ({
    trending: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    }
}))
const Search = () => {

    const classes = useStyles()

    const [type, setType] = useState(0)
    const [page, setPage] = useState()
    const [searchText, setSearchText] = useState("")
    const [content, setContent] = useState()
    const [numOfPages, setNumOfPages] = useState()
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            }
        }
    })


    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
        setContent(data.results)
        setNumOfPages(data.total_pages);
    }
    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
    }, [type, page, searchText])



    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="search"
                        variant='filled'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}><SearchIcon /></Button >
                </div>

                <Tabs value={type} indicatorColor="primary" textColor='primary'
                    onChange={(event, newVal) => {
                        setType(newVal);
                        setPage(1);
                    }}
                    style={{ paddingBottom: 5 }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className={classes.trending}>
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
        </div>
    )
}

export default Search