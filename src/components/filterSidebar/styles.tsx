import styled from '@emotion/styled';

export const FilterSidebarContainer = styled.div`
  background: #1a1a1a;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    height: 100vh;
    z-index: 10; 
  }
  right: 0;

  aside {
    border-right: 0px !important;

    div {
      overflow-y: hidden;
      background: transparent;
      display: flex;
      gap: 1rem;
      flex-direction: column;

      div {
        //flex-direction: row;
        gap: 0;

        button {
          border-radius: 30px !important;
          width: 100%;
          margin-left: 0 !important;
        }
      }
    }
  }
`;

export interface FilterSidebarContent {
  opened: boolean;
}

export const FilterSidebarOverlayContent = styled.div`
  position: fixed; 
  width: 100vh; 
  height: 100vh; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
  cursor: pointer; 
`;
export const FilterSidebarContent = styled.div<FilterSidebarContent>`
  margin: ${(props) => (props.opened ? '1rem' : '0')};
`;
