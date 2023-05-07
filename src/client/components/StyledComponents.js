import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaFly } from 'react-icons/fa';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import ReactPlayer from 'react-player/youtube';

const hoverItem = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(0, 140, 255, 0.5);
  }
`;

const slideInTop = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  `;

const scaleIn = keyframes`
0% {
  transform: scaleY(0);
  opacity: 1;
}
100% {
  transform: scaleY(1);
  opacity: 1;
}
`;

const popOut = keyframes`
  0% {
    letter-spacing: 1em;
    transform: translateZ(300px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: translateZ(12px);
    filter: blur(0);
    opacity: 1;
  }
`;

const slideInBottom = keyframes`
    0% {
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;

const slideInRight = keyframes`
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes` 
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
  `;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 6rem;

  @media only screen and (max-width: 380px) {
    margin-top: 8.5rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;

  @media only screen and (max-width: 1016px) {
    gap: 1rem;
  }

  @media only screen and (max-width: 380px) {
    gap: 0.5rem;
  }
`;

export const FlexItem = styled.div`
  color: #1443d5;
  width: 19.55rem;
  font-size: 2.4rem;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  animation: ${({ animated }) => animated && scaleIn} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @media only screen and (max-width: 1016px) {
    width: 16rem;
    font-size: 2rem;
  }

  @media only screen and (max-width: 380px) {
    width: 14rem;
    font-size: 1.8rem;
  }
`;

export const Title = styled.div`
  width: 100%;
  max-width: 170.4rem;
  color: #1034a6;
  text-shadow: rgba(55, 16, 166, 0.5) 0px 0px 10px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989993px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756803px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279416px 0px;
  font-size: 3.2rem;
  text-align: center;
  padding: 1.5rem;
  border-radius: 10px;
  background: ${({ bgi }) => `url(${bgi}) no-repeat center`};
  background-size: cover;
  box-shadow: 4px 4px 4px 0 rgba(31, 38, 135, 0.37);

  @media only screen and (max-width: 1016px) {
    font-size: 2.6rem;
  }

  @media only screen and (max-width: 380px) {
    font-size: 2.4rem;
  }
`;

export const Head = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
  background-color: hsla(186, 33%, 94%);
  background: linear-gradient(
    90deg,
    hsla(186, 33%, 94%, 1) 0%,
    hsla(216, 41%, 79%, 1) 100%
  );
  box-shadow: 0px 2px 10px 1px rgba(29, 63, 212, 0.5);

  animation: ${slideInTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const Logo = styled.h1`
  font-size: 3.6rem;
  font-family: 'Shadows Into Light', cursive;
  padding-bottom: 0.8rem;
  padding-top: 0.5rem;
  color: #1034a6;
  text-shadow: 0px 0px 10px rgba(55, 16, 166, 0.5);

  &:hover {
    color: #107fa6;
  }

  animation: ${popOut} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 528px) {
    font-size: 2.8rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserWrapper = styled.div`
  font-size: 1.8rem;
  color: #1443d5;
  text-shadow: 0px 0px 5px rgba(125, 148, 219, 0.5);

  @media only screen and (max-width: 528px) {
    font-size: 1.4rem;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);
  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 528px) {
    font-size: 1.6rem;
  }
`;

export const LinkWRedirect = styled.span`
  font-size: 1.8rem;
  color: #1443d5;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1.2rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);

  &:hover {
    color: #107fa6;
  }

  @media only screen and (max-width: 528px) {
    font-size: 1.6rem;
  }
`;

export const Button = styled.button`
  font-size: 1.4rem;
  font-variant: small-caps;
  margin: 2rem;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1.5rem;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgba(0, 3, 255, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

export const Foot = styled.footer`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 0;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
  background-color: hsla(186, 33%, 94%);

  background: linear-gradient(
    90deg,
    hsla(186, 33%, 94%, 1) 0%,
    hsla(216, 41%, 79%, 1) 100%
  );
  box-shadow: 0px 2px 10px 1px rgba(29, 63, 212, 0.5);

  animation: ${slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const Heading = styled.h1`
  font-size: 1.8rem;
  color: #1443d5;
  padding: 0 2rem;
  text-align: center;
  padding-bottom: 0.5rem;
  text-shadow: 5px 5px 10px rgba(125, 148, 219, 0.75);

  > i {
    font-size: inherit;
  }

  @media only screen and (max-width: 545px) {
    padding-bottom: 1rem;
    font-size: 1.6rem;
    padding-bottom: 0.5rem;
  }
`;

export const GHIcon = styled(FaGithub)`
  font-size: 3rem;
  vertical-align: middle;

  @media only screen and (max-width: 545px) {
    font-size: 2.5rem;
  }
`;

export const LIIcon = styled(FaLinkedin)`
  font-size: 3rem;
  vertical-align: middle;

  @media only screen and (max-width: 545px) {
    font-size: 2.5rem;
  }
`;

export const FlyIcon = styled(FaFly)`
  font-size: 3rem;
  vertical-align: middle;

  @media only screen and (max-width: 545px) {
    font-size: 2.5rem;
  }
`;

export const CardsContainer = styled.main`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 9rem;
  text-align: center;

  @media only screen and (max-width: 380px) {
    margin-top: 8.5rem;
  }
`;

export const CardsTitle = styled.div`
  grid-column: 1/-1;
  color: #1034a6;
  text-shadow: 1px 1px 10px rgba(55, 16, 166, 0.5);
  font-size: 2.2rem;
  text-align: center;
  padding: 1.5rem;

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  @media only screen and (max-width: 1016px) {
    font-size: 1.6rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 19.55rem);
  grid-gap: 2rem;
  justify-content: center;
  align-content: center;
  padding-bottom: 7rem;
  padding-top: 2rem;

  @media only screen and (max-width: 1016px) {
    grid-template-columns: repeat(auto-fit, 16rem);
    grid-gap: 1rem;
  }

  @media only screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fit, 14rem);
    grid-gap: 0.5rem;
  }

  @media only screen and (max-width: 625px) {
    margin-bottom: 2rem;
  }
`;

export const CardItem = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;

  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
`;

export const CardImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  object-fit: cover;
  height: 11rem;
  width: 19.55rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media only screen and (max-width: 1016px) {
    height: 9rem;
    width: 16rem;
  }

  @media only screen and (max-width: 380px) {
    height: 7.875rem;
    width: 14rem;
  }
`;

export const CardTextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  padding: 1rem;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: none;
  border-top-right-radius: none;

  @media only screen and (max-width: 1016px) {
    height: 6.5rem;
    padding: 1rem;
  }
`;

export const CardText = styled.p`
  color: #1443d5;
  font-size: 1.4rem;
  text-align: center;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

export const PlayerContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 7rem;
  margin-bottom: 8rem;
`;

export const Slide = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 1rem;
  width: 100%;
  padding: 2rem;
  overflow-x: scroll;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d3fd47f;
  }

  animation: ${slideInTop} 1.5s both;
`;

export const PlaylistItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 16rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  text-decoration: none;
  &:hover {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  &:focus {
    animation: ${hoverItem} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @media only screen and (max-width: 1016px) {
    width: 14rem;
  }
`;

export const PlaylistImg = styled.img`
  src: ${({ src }) => src};
  aspect-ratio: 16/9;
  object-fit: cover;
  height: 9rem;
  width: 16rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media only screen and (max-width: 1016px) {
    height: 7.875rem;
    width: 14rem;
  }
`;

export const PlaylistTextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  padding: 0.5rem;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: none;
  border-top-right-radius: none;
`;

export const PlaylistText = styled.p`
  color: #1443d5;
  font-size: 1.2rem;
  text-align: center;
`;

export const PlayerSection = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 2rem;
  width: 95%;
  max-width: 1920px;

  @media only screen and (max-width: 1016px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

export const PlayerWindow = styled(ReactPlayer)`
  grid-area: 1 / 1 / 2 / 2;
  aspect-ratio: 16/9;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInLeft} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

export const PlayerTextContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: #1443d5;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);

  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

export const ArrBack = styled(TiArrowBackOutline)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const LinksButton = styled.button`
  word-wrap: break-word;
  font-size: 1.4rem;
  margin: 0 auto;
  width: 20rem;
  min-height: 6rem;
  color: #fff;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, #060e83 0%, #0c1ab4 100%);
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, #0004ff 0%, #027efb 100%);
  }

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
    width: 18rem;
    min-height: 5.5rem;
    padding: 0.5rem;
  }
`;

export const Back = styled(LinksButton)`
  text-decoration: none;
  min-height: 0;
  border-radius: 30px;
  margin-bottom: 2rem;
  font-variant: small-caps;

  @media only screen and (max-width: 1016px) {
    width: 18rem;
    min-height: 0;
  }
`;

export const VLBack = styled(Back)`
  margin-bottom: -0.7rem;
  margin-top: -0.8rem;
  display: inline-block;
`;

export const BackText = styled.p`
  font-size: 1.4rem;
  display: inline;
  vertical-align: middle;

  @media only screen and (max-width: 1016px) {
    font-size: 1.2rem;
  }
`;

export const VideoHeading = styled.h1`
  font-size: 2.6rem;
  padding-bottom: 0.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2.2rem;
  }
`;

export const VideoTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }
`;

export const Author = styled.div`
  padding-top: 2rem;
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 900;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
    padding-bottom: 2rem;
  }
`;

export const AddFav = styled(Back)`
  margin-bottom: 0;
  background: rgb(6, 14, 131);
  background: linear-gradient(to bottom, #8814a5 0%, #9817b8 100%);

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(to bottom, #a41cff 0%, #ea1ffd 100%);
  }
`;

export const FavIcon = styled(MdOutlineFavoriteBorder)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const Favorited = styled(MdOutlineFavorite)`
  font-size: 2.5rem;
  vertical-align: middle;
  margin-right: 1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const CommentsContainer = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  grid-row: span 2;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 4rem;
  color: #1443d5;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInLeft} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 4 / 1 / 5 / 2;
  }
`;

export const CommentsHeader = styled.h1`
  font-size: 2.4rem;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);
  text-align: center;
  margin-bottom: -1.5rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const CommentsSub = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #14003a;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1016px) {
    font-size: 1rem;
  }
`;

export const CommentForm = styled.form`
  width: 90%;
`;

export const CommentEntry = styled.textarea`
  width: 100%;
  resize: vertical;
  background-color: #ffffffb2;
  font-family: inherit;
  font-size: 1.6rem;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-color: #ffffff;
  border-radius: 10px;
  min-height: 10rem;
  padding: 0.5rem;
  padding-left: 1rem;
  color: inherit;

  &:focus {
    outline-offset: 0px;
    outline: none;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d3fd47f;
  }
`;

export const CommentSubmit = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-bottom: 3rem;
`;

export const SubmitButton = styled(Button)`
  text-decoration: none;
  margin: 0;
  border-radius: 30px;
  width: 10rem;
  padding: 1rem;
  min-height: 0.5rem;
  font-variant: small-caps;
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  padding-right: 2rem;
  width: 90%;
  background-color: #e2f2ffc0;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
`;

export const CommentItemDiv = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

export const CommentAuthor = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  padding-right: 1rem;
`;

export const TimeSince = styled.p`
  color: #684dffb7;
  font-family: 'Courgette', cursive;
  font-size: 1.2rem;
  padding-top: 0.3rem;
`;

export const CommentText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  word-break: break-word;
  text-align: justify;

  @media only screen and (max-width: 1016px) {
    font-size: 1.4rem;
  }
`;

export const LikeReplyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
`;

export const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-left: -1rem;

  &:hover {
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    background: rgba(21, 255, 0, 0.623);
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const Like = styled(AiOutlineLike)`
  font-size: 2rem;
`;

export const Liked = styled(AiFillLike)`
  font-size: 2rem;
`;

export const LikeText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  padding-left: 0.3rem;
`;

export const ReplyButton = styled(Button)`
  visibility: hidden;
  font-size: 1.2rem;
  text-decoration: none;
  margin: 0;
  border-radius: 30px;
  width: 8rem;
  padding: 0.5rem;
  min-height: 0rem;
  height: 3rem;
  font-variant: small-caps;
`;

export const LinksContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  height: 100%;
  padding: 2rem;
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);
  color: #1443d5;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${slideInRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    grid-area: 3 / 1 / 4 / 2;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-gap: 0.5rem;
`;

export const Urls = styled.a`
  text-decoration: none;
`;

export const LinksHeader = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const NoticeWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 3rem;
  padding: 1rem;
  color: #fff;
  text-align: center;
  z-index: 11;
  background: #1443d5;
  background: linear-gradient(to right, #1443d5 0%, #0c2a85 50%, #091f63 100%);

  @media only screen and (max-width: 1016px) {
    font-size: 2rem;
  }
`;

export const ARLContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);
  background: rgba(255, 255, 255, 0.1);
  color: #1443d5;
  max-width: 800px;
  margin: 10rem 2rem;
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${scaleIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const ATitle = styled.h1`
  font-size: 2rem;
  margin: 2rem auto;
`;

export const AP = styled.p`
  font-size: 1.8rem;
  padding: 1.5rem 0;
  line-height: 2.7rem;
  text-align: justify;
`;

export const Em = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 1.8rem;
  margin: 2rem auto;
  line-height: 2.5rem;
`;

export const RLCard = styled.div`
  text-shadow: 1px 1px 10px rgba(125, 148, 219, 0.75);
  background: rgba(255, 255, 255, 0.1);
  color: #1443d5;
  margin: 10rem 2rem;
  width: 800px;
  padding: 4rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  animation: ${scaleIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media only screen and (max-width: 1016px) {
    width: min-content;
    padding: 2rem;
  }
`;

export const RLTitle = styled.h1`
  font-size: 3.5rem;
  font-variant: small-caps;
  margin: 0 auto;

  @media only screen and (max-width: 1016px) {
    font-size: 2.8rem;
  }
`;

export const RLP = styled.p`
  margin-top: -2rem;
  font-size: 1.4rem;
  color: #14003a;
  text-align: justify;
  padding-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  font-size: 2rem;
  margin: 0 auto;
`;

export const Input = styled.input`
  font-size: inherit;
  background-color: #ffffffb2;
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 0 2rem;
  height: 4rem;
  color: #1443d5;

  &::placeholder {
    font-size: 1.8rem;
  }
`;

export const RLButton = styled.button`
  font-size: 1.4rem;
  font-variant: small-caps;
  margin-bottom: 2rem;
  margin-top: -6rem;
  width: 15rem;
  color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  background: rgb(6, 14, 131);
  background: linear-gradient(0deg, #060e83 0%, #0c1ab4 100%);
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(0deg, #0004ff 0%, #027efb 100%);
  }
`;

/*
import Cogs from '../assets/images/main-cogs.svg';

const appear = keyframes`
  0% {
    transform: translateZ(-800px) rotateX(90deg);
    opacity: 0;
  }
  54% {
    transform: translateZ(-160px) rotateX(87deg);
    opacity: 1;
  }
  100% {
    transform: translateZ(0) rotateX(0);
  }
`;

const slideDiv = keyframes`
  0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`;

animation: ${slideDiv} 1.1s both;
animation: ${({ animated }) => animated && appear} 0.45s ease-out both;
animation: ${slideInTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

//background-image: url(${Cogs});

animation: ${({ animated }) => animated && scaleIn} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
*/
