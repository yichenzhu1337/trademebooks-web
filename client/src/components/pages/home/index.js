import React, { useState, useEffect } from 'react'
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact'
import Books from '../../books/common/Books'
import Jumbotron from './Jumbotron'
import { getAllBooks } from '../../../actions/book'
import MetaDecorator from '../../utils/MetaDecorator'
import metags from '../../../config/metags'
import Spinner from '../../layout/Spinner'

const HomePage = () => {
  const [books, setBooks] = useState([])
  const [booksIsLoading, setBooksIsLoading] = useState(true)

  const onChangeSearchBooks = async (event) => {
    let searchQuery = event.target.value

    if (searchQuery.length >= 0) {
      setBooksIsLoading(true)

      const books = await getAllBooks(searchQuery, 20)

      setBooksIsLoading(false)

      setBooks(books)
    }
  }

  useEffect(() => {
    ;(async () => {
      setBooksIsLoading(true)

      const books = await getAllBooks(undefined, 20)

      setBooksIsLoading(false)

      setBooks(books)
    })()
  }, [])

  return (
    <>
      <MetaDecorator
        description={metags.homePage.description}
        title={metags.homePage.title}
        imageUrl={metags.homePage.imageUrl}
        imageAltText={metags.homePage.imageAltText}
      />
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="12">
            <Jumbotron onChangeSearchBooks={onChangeSearchBooks} />
            {booksIsLoading ? (
              <Spinner isLoading={false} />
            ) : (
              <Books books={books} editFlag={false} />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default HomePage
