import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMovies } from "../store/slice/movieThunk";
import Header from "../layout/Header";
import styled, { ThemeProvider } from "styled-components";
import Modal from "./Modal";

const MovieApp = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [isNight, setIsNight] = useState(true);

  const { movies } = useSelector((state) => state.movies);

  const toggleModalHandler = (movieId) => {
    setOpenEditModal((prev) => !prev);
    if (movieId) {
      setEditingMovieId(movieId);
    } else {
      setEditingMovieId(null);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const deleteHandler = (id) => dispatch(deleteMovie(id));

  const toggleThemeHandler = () => setIsNight((prev) => !prev);

  return (
    <ThemeProvider theme={isNight ? nightTheme : dayTheme}>
      <Container>
        <Header />

        {openEditModal && (
          <Modal onClose={toggleModalHandler} movieId={editingMovieId} />
        )}

        <MoviesContainer>
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieImage src={movie.image} />
              <MovieContent>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieRating>{movie.rating}</MovieRating>
              </MovieContent>
              <ButtonsContainer>
                <Button onClick={() => deleteHandler(movie.id)}>Delete</Button>
                <Button onClick={() => toggleModalHandler(movie.id)}>
                  Update
                </Button>
              </ButtonsContainer>
            </MovieCard>
          ))}
        </MoviesContainer>

        <ColorBack>
          <ThemeToggle onClick={toggleThemeHandler}>
            {isNight ? "Light" : "Dark"}
          </ThemeToggle>
        </ColorBack>
      </Container>
    </ThemeProvider>
  );
};

export default MovieApp;

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  max-height: 100%;
  position: relative;
`;

const ColorBack = styled.div`
  position: absolute;
  top: 0px;
  left: 1720px;
`;

const dayTheme = {
  background: "#ffffff",
  color: "#ffffff",
};

const nightTheme = {
  background: "#242424",
  color: "#fff",
};

const MoviesContainer = styled.div`
  display: flex;
  margin-top: 20px;
  padding-inline: 30px;
  flex-wrap: wrap;
  gap: 30px;
`;

const MovieCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MovieContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const MovieRating = styled.p`
  font-size: 14px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ThemeToggle = styled.p`
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  text-align: center;
`;
