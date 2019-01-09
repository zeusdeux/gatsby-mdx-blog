import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import cn from 'classnames'
import Loader from './loader'
import style from './video.module.css'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  onReady() {
    this.setState({ isLoading: false })
  }
  render() {
    const {
      videoId,
      height = '500',
      width = '100%',
      autoplay = false,
      modestBranding = true,
      caption = ''
    } = this.props

    return (
      <div className={style.container}>
        {this.state.isLoading ? <Loader /> : null}
        <div
          className={cn({
            [style.videoContainer]: true,
            [style.hidden]: this.state.isLoading
          })}
        >
          <YouTube
            videoId={videoId}
            onReady={() => this.onReady()}
            opts={{
              height,
              width,
              playerVars: {
                autoplay: autoplay ? 1 : 0,
                modestbranding: modestBranding ? 1 : 0
              }
            }}
          />
          <p className={style.caption}>{caption}</p>
        </div>
      </div>
    )
  }
}

Video.propTypes = {
  videoId: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  autoplay: PropTypes.bool,
  modestBranding: PropTypes.bool,
  caption: PropTypes.string
}
