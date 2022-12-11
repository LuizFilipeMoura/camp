import styled from '@emotion/styled';

export const GridTitle = styled.div`
  font-size: 1.25rem;
  bottom: 0;
  transition-duration: 0.2s;
  transition-delay: 0s;
  filter: opacity(.7);
  display: flex;
  align-items: flex-end;

  width: 100%;
  position: absolute;
  span {
    width: 100%;
    padding: 1rem;
    border-radius: 0 0 1.5rem 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.66) 60%);
  }

  &:hover {
    filter: opacity(1);
  }

`;
