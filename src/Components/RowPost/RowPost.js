import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../Constants/Constants'
import YouTube from 'react-youtube'



const RowPost = (props) => {

    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    const [showVideo, setShowVideo] = useState(true)
    useEffect(()=>{
        axios.get(props.url)
            .then((response)=>{
                console.log(response.data)
                setMovies(response.data.results)
            })
    },[])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handleMovieTrailer = (id)=>{
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then((response)=>{
                if(response.data.results.length !==0){
                    setUrlId(response.data.results[0])
                }
            })
    }

   

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
            {movies.map((item)=>(
                <img onClick={()=> handleMovieTrailer(item.id)} className={ props.isSmall ? 'smallPoster' : 'poster' } src={`${imageUrl+item.backdrop_path}`} alt="poster" />
            ))}
            
            

        </div>
       { urlId && <YouTube videoId={urlId.key} opts={opts} /> }
    </div>
  )
}

export default RowPost