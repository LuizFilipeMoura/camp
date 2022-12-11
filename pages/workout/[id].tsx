import { useRouter } from 'next/router';
import { Header } from '../../campgladiator/cgui-core.organisms.header';
import { PageContainer, PageContent } from '../../src/components/pageContainer';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../src/components/pageHeader';
import { Title } from '../../src/components/title';
import { Workout } from '../../src/models/workout';
import { VideoPlayer } from '../../src/components/videoPlayer';
import { Paragraph } from '../../campgladiator/cgui-core.atoms.typography';
import { SuggestionsCarousel } from '../../src/components/suggestionsCarousel';

export interface WorkoutDetails {
  workout: Workout;
  sameLevels: Workout[];
  sameImpacts: Workout[];
}

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const workoutDetailsRes = await fetch(`http://localhost:3000/api/workoutDetails/${id}`, {
    method: 'GET',
  });

  try {
    const { workout, sameImpacts, sameLevels } = await workoutDetailsRes.json();
    return { props: { workout, sameImpacts, sameLevels } };
  } catch (e) {
    throw new Error();
  }
}

export default function WorkoutById({ workout, sameImpacts, sameLevels }: WorkoutDetails) {
  const [isSSR, setIsSSR] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsSSR(typeof window === 'undefined');
  }, []);
  return (
    <>
      {!isSSR && <Header loginUrl={''} />}
      <PageContainer>
        {workout && (
          <PageContent>
            <PageHeader>
              <Title>{workout.title}</Title>
            </PageHeader>
            <VideoPlayer link={workout.media}></VideoPlayer>
            <Paragraph size={'xlarge'}>{workout.description}</Paragraph>
            <SuggestionsCarousel
              workouts={sameLevels}
              title={'Other training sessions with the same difficult level'}
            ></SuggestionsCarousel>
            <SuggestionsCarousel
              workouts={sameImpacts}
              title={'Other training sessions on the same impact'}
            ></SuggestionsCarousel>
          </PageContent>
        )}
      </PageContainer>
    </>
  );
}
