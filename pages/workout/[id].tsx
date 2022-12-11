import { useRouter } from 'next/router';
import { Header } from '../../campgladiator/cgui-core.organisms.header';
import { PageContainer, PageContent } from '../../src/components/pageContainer';
import { useEffect, useState } from 'react';
import { PageHeader, PageHeaderWithBackButton } from '../../src/components/pageHeader';
import { Title } from '../../src/components/title';
import { Workout } from '../../src/models/workout';
import { VideoPlayer } from '../../src/components/videoPlayer';
import { Paragraph } from '../../campgladiator/cgui-core.atoms.typography';
import { SuggestionsCarousel } from '../../src/components/suggestionsCarousel';
import { ArrowLeft2LightOutlineIcon } from '@iconbox/iconly';

export interface WorkoutDetails {
  workout: Workout;
  sameLevels: Workout[];
  sameImpacts: Workout[];
}

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const workoutDetailsRes = await fetch(`${process.env.API_URL|| 'http://localhost:3000/'}api/workoutDetails/${id}`, {
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
              <PageHeaderWithBackButton>
                <ArrowLeft2LightOutlineIcon
                  onClick={() => router.push('/')}
                  style={{ cursor: 'pointer', width: '15px' }}
                ></ArrowLeft2LightOutlineIcon>
                <Title>{workout.title}</Title>
              </PageHeaderWithBackButton>
            </PageHeader>
            <VideoPlayer link={workout.media}></VideoPlayer>
            <Paragraph size={'xlarge'}>{workout.description}</Paragraph>
            <SuggestionsCarousel
              workouts={sameLevels}
              title={`Other sessions for the ${workout.levelTag} level`}
            ></SuggestionsCarousel>
            <SuggestionsCarousel
              workouts={sameImpacts}
              title={`Other sessions with ${workout.impactTag} impact`}
            ></SuggestionsCarousel>
          </PageContent>
        )}
      </PageContainer>
    </>
  );
}
