import React from 'react'

import { Container, Header} from 'semantic-ui-react'
import BooksList from '../books/BooksList'

const BooksContainer = () => (

  <Container className='books-container'>
    <Header as='h2'>Libros recomendados | Featured Products</Header>
    <div 
    // style={styles} 
    className="books-container-cards">
    <BooksList />
      
   </div>

  </Container>

)

export default BooksContainer

// const styles = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 250px))',
//   gridTemplateAreas: `movie-img `,
//   gridGap: '2rem',
//   justifyItems: 'center',
//   div: {
//     margin: '1rem',
//     display: 'grid',
//   }
// }