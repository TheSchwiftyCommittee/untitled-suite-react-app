import React from 'react';

export const Home = (props) => {
  const {data} = props

  return (
    <>
      <div style={{width: "50%"}}>
        <h1>Untitled Suite</h1>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, impedit commodi ea, est quas asperiores nam quisquam, ipsam tempora modi voluptates sit quibusdam tenetur maiores. Sapiente consequatur sequi fuga doloribus rerum! Laudantium ipsum ipsam nostrum voluptatibus temporibus, quae culpa dolorem, pariatur nesciunt quos asperiores explicabo quidem ad ducimus. Cumque, veniam.</p>
        {data && data.map((list) => (
          <ul key={list.id}>
            <li>{list.title}</li>
            <li>{list.description}</li>
          </ul>
        ))}
      </div>
    </>
  )
}

