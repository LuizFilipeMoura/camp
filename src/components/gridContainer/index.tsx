import styled from '@emotion/styled';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 12fr));
  grid-gap: 3rem;
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  justify-items: stretch;

`;
