import { Filter2LightOutlineIcon } from '@iconbox/iconly';
import { FilterButtonContainer } from './styles';
import { useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { FilterSidebar } from '../filterSidebar';

export const FilterButton = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <>
      <FilterButtonContainer onClick={() => collapseSidebar()}>
        <Filter2LightOutlineIcon></Filter2LightOutlineIcon>
      </FilterButtonContainer>
    </>
  );
};
