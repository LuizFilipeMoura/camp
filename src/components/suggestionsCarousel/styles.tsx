import styled from '@emotion/styled';
export interface CarouselCellProps {
  backgroundURL: string;
}
export const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  overflow-x: auto;
  width: 2500px;
  max-width: 100%;
`;
export const CarouselCell = styled.div<CarouselCellProps>`
  background-image: url(${(props) => props.backgroundURL});
  border-radius: 1rem;
  min-width: 200px;
  min-height: 100px;
  cursor: pointer;
`;
export const CarouselContent = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 200px;
  max-height: 180px;
`;
