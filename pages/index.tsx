import { useEffect, useState } from 'react';
import { Header } from '../campgladiator/cgui-core.organisms.header';
import { GridContainer } from '../src/components/gridContainer';
import { GridCell } from '../src/components/gridCell';
import { Title } from '../src/components/title';
import { Workout } from '../src/models/workout';
import { useRouter } from 'next/router';
import { GridTitle } from '../src/components/gridTitle';
import { Label } from '../campgladiator/cgui-core.atoms.typography';
import { ImpactTag, LevelTag } from '../src/components/gridTag';
import { firstLetterUppercase } from '../src/shared/utils';
import { FilterButton } from '../src/components/filterButton';
import { PageHeader } from '../src/components/pageHeader';
import { PageContainer, PageContent } from '../src/components/pageContainer';
import { FilterSidebar } from '../src/components/filterSidebar';

interface HomeProps {
  workouts: Workout[];
  impacts: string[];
  levels: string[];
}

export async function getServerSideProps() {
  const workoutRes = await fetch(`${process.env.API_URL || 'http://localhost:3000/'}api/workouts`, {
    method: 'GET',
  });
  const filtersRes = await fetch(`${process.env.API_URL|| 'http://localhost:3000/'}api/filters`, {
    method: 'GET',
  });

  try {
    const { impacts, levels } = await filtersRes.json();
    const { workouts } = await workoutRes.json();
    return { props: { workouts, levels, impacts } };
  } catch (e) {
    throw new Error();
  }
}

export default function Home({ workouts, impacts, levels }: HomeProps) {
  const [isSSR, setIsSSR] = useState(true);
  const [impactFilter, setImpactFilter] = useState<string>();
  const [levelFilter, setLevelFilter] = useState<string>();
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsSSR(typeof window === 'undefined');
    setFilteredWorkouts(workouts);
  }, []);

  const handleCellClick = (id: string) => {
    router.push(`/workout/${id}`);
  };

  const handleFilterByImpact = (impact: string) => {
    setImpactFilter(impact);
    setFilteredWorkouts(workouts.filter((workout) => workout.impactTag === impact));
  };
  const handleFilterByLevel = (level: string) => {
    setLevelFilter(level);
  };
  useEffect(() => {
    if (!impactFilter && !levelFilter) return;
    setFilteredWorkouts(
      workouts.filter(
        (workout) =>
          (levelFilter ? workout.levelTag === levelFilter : true) &&
          (impactFilter ? workout.impactTag === impactFilter : true)
      )
    );
  }, [impactFilter, levelFilter]);
  const handleResetFilters = () => {
    setFilteredWorkouts(workouts);
  };

  return (
    <>
      {!isSSR && <Header loginUrl={''} />}
      <PageContainer>
        <PageContent>
          <PageHeader>
            <Title>Dashboard</Title>
            <FilterButton></FilterButton>
          </PageHeader>

          <GridContainer>
            {filteredWorkouts?.map((workout: Workout) => (
              <GridCell
                onClick={() => handleCellClick(workout.id)}
                key={workout.id}
                backgroundURL={workout.thumbnail}
              >
                <LevelTag size="xsmall" emphasis="primary" variation="alternative">
                  {firstLetterUppercase(workout.levelTag)}
                </LevelTag>
                <ImpactTag size="xsmall" emphasis="secondary" variation="alternative">
                  {firstLetterUppercase(workout.impactTag)} impact
                </ImpactTag>
                <GridTitle>
                  <Label>{workout.title} - {workout.duration} MIN</Label>
                </GridTitle>
              </GridCell>
            ))}
          </GridContainer>
        </PageContent>
        <FilterSidebar
          impacts={impacts}
          levels={levels}
          filterByImpact={handleFilterByImpact}
          filterByLevel={handleFilterByLevel}
          resetFilters={handleResetFilters}
        ></FilterSidebar>
      </PageContainer>
    </>
  );
}
