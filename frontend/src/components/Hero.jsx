import React from 'react'

const Hero = ({ title, imageurl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet at morbi integer non dictumst dolor pellentesque. Magnis accumsan blandit volutpat erat erat nascetur. Dui etiam neque neque ad primis euismod consequat. Ad euismod odio enim ultricies porttitor consequat efficitur maximus. Primis id diam ipsum congue porttitor proin. Montes consectetur risus laoreet interdum hendrerit. Integer duis rutrum laoreet mus non sem.
          </p>
        </div>
        <div className="banner image-container">
          <img src={imageurl} alt="hero" className="animated-image" />
          <span>
            <img src="/vector.png" alt="vector" className="vector-image"/>
          </span>
        </div>
      </div>
    </>
  )
}

export default Hero
