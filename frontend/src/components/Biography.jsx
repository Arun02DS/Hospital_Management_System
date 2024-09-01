import React from 'react'

const Biography = ({imageurl}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <img src={imageurl} alt="about" className="image-container"/>
      </div>
      <div className="banner">
        <p>Biography</p>
        <h1>Who We Are</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure expedita fugit sapiente dolores officia autem, beatae tempora mollitia doloribus eligendi reiciendis saepe nostrum quod ducimus? Itaque delectus neque pariatur amet architecto adipisci reprehenderit dolorum quasi rem eum veritatis perspiciatis quidem cupiditate in placeat illo temporibus, cum sapiente tempora? Maiores, magnam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p>
          Lorem ipsum dolor sit amet.
        </p>
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores eveniet at facilis soluta nulla voluptatibus placeat delectus maiores error esse.
        </p>
      </div>
    </div>
  )
}

export default Biography
