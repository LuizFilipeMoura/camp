import styled from '@emotion/styled';

export interface GridCellProps {
  backgroundURL: string;
}

export const GridCell = styled.div<GridCellProps>`
  cursor: pointer;
  min-height: 300px;
  background-image: url(${props => (props.backgroundURL)});
  border-radius: 1.5rem;
  transition-duration: 0.2s;
  transition-delay: 0s;
  filter: grayscale(0.9);
  position: relative;

  &:hover {
    transform: scale(1.1);
    filter: grayscale(0);
  }
`;
