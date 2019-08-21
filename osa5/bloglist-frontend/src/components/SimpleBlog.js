import React from 'react'

/* 5.13: blogilistan testit, step1 */
/* Lisää sovellukseesi tilapäisesti seuraava komponentti */

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog