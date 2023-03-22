import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/header";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: #eef2f6;
  font-family: roboto, arial, sans-serif ;
  margin: 0;
  padding: 10px 10px;
  width: 100%;
  box-shadow: 2px 2px 5px 1px grey;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 3em;
  margin: 0;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2em;
  margin: 20px 0;
  text-align: center;
`;

const Link = styled.a`
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PageNotFound = () => {
    return (
        
        <>
            <Header />
            <div className="container-field container-primary contacts-wrp">
            <Container>
                <Title>404</Title>
                <Message>Oops! The page you're looking for doesn't exist.</Message>
                <Message>Please check the URL or click <Link href="/">here</Link> to go back to the homepage.</Message>
            </Container>
            </div>  
            <Footer />
        </>
    );
}

export default PageNotFound;