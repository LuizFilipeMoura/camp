import styled from '@emotion/styled';

export const VideoPlayerIframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 126px - 3rem);
  @media (max-width: 768px) {
    height: 250px;
  }
  border: none;
`;
