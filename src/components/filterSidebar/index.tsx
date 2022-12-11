import { Sidebar, useProSidebar } from 'react-pro-sidebar';
import { FilterSidebarContainer, FilterSidebarContent, FilterSidebarOverlayContent } from './styles';
import { Heading, Paragraph } from '../../../campgladiator/cgui-core.atoms.typography';
import { ButtonGroup } from '../../../campgladiator/cgui-core.molecules.button-group';
import { Button } from '../../../campgladiator/cgui-core.atoms.button';
import { useEffect, useState } from 'react';

interface FilterSidebarProps {
  impacts?: string[];
  levels?: string[];
  filterByImpact?: (impact: string) => void;
  filterByLevel?: (level: string) => void;
  resetFilters?: () => void;
}

export const FilterSidebar = ({ impacts, levels, filterByImpact, filterByLevel, resetFilters }: FilterSidebarProps) => {
  const { collapsed, collapseSidebar } = useProSidebar();
  const [impactIndex, setImpactIndex] = useState(-1);
  const [levelIndex, setLevelIndex] = useState(-1);
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(typeof window === 'undefined');
  }, []);
  const onSelectImpact = (e: number) => {
    if (impacts && filterByImpact) {
      filterByImpact(impacts[e]);
      setImpactIndex(e);
    }
  };
  const onSelectLevel = (e: number) => {
    if (levels && filterByLevel) {
      filterByLevel(levels[e]);
      setLevelIndex(e);
    }
  };

  const onResetFilters = () => {
    setImpactIndex(-1);
    setLevelIndex(-1);
    if (resetFilters) {
      resetFilters();
    }
  };
  const smallScreen = () => {
    if (typeof window !== 'undefined') return window && window.innerWidth < 728 && !collapsed;
  };
  return (
    <>
      {smallScreen() && !isSSR && (
        <FilterSidebarOverlayContent onClick={() => collapseSidebar()}></FilterSidebarOverlayContent>
      )}
      <FilterSidebarContainer>
        <FilterSidebarContent opened={!collapsed}>
          <Sidebar collapsedWidth={'0px'} defaultCollapsed={true}>
            <Heading type={'h2'}>Filters</Heading>
            <Paragraph>Impact</Paragraph>
            <ButtonGroup
              defaultSelected={impactIndex}
              forceSelected={impactIndex}
              size='default'
              onSelect={(e) => onSelectImpact(e)}
              buttons={
                impacts
                  ? impacts?.map((impact) => {
                    return { text: impact };
                  })
                  : []
              }
            />
            <Paragraph>Levels</Paragraph>
            <ButtonGroup
              defaultSelected={levelIndex}
              forceSelected={levelIndex}
              size='default'
              onSelect={(e) => onSelectLevel(e)}
              buttons={
                levels
                  ? levels?.map((level) => {
                    return { text: level };
                  })
                  : []
              }
            />
            <div style={{ height: '100%' }}>
              <Button onClick={onResetFilters}>Reset Filters</Button>
            </div>
          </Sidebar>
        </FilterSidebarContent>
      </FilterSidebarContainer>
    </>
  );
};
