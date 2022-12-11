import { Workout } from '../../models/workout';
import { Label, Paragraph } from '../../../campgladiator/cgui-core.atoms.typography';
import { CarouselCell, CarouselContainer, CarouselContent } from './styles';
import { useRouter } from 'next/router';

interface SuggestionCarouselProps {
  title: string;
  workouts: Workout[];
}

export const SuggestionsCarousel = ({ title, workouts }: SuggestionCarouselProps) => {
  const router = useRouter();

  const handleCellClick = (id: string) => {
    router.push(`/workout/${id}`);
  };
  return (
    <>
      <Paragraph size={'large'}>{title}</Paragraph>

      <CarouselContainer>
        {workouts.map((workout) => (
          <CarouselContent key={workout.id}>
            <CarouselCell
              onClick={() => handleCellClick(workout.id)}
              key={workout.id}
              backgroundURL={workout.thumbnail}
            ></CarouselCell>
            <Label>
              {workout.title} - {workout.duration} MIN
            </Label>
          </CarouselContent>
        ))}
      </CarouselContainer>
    </>
  );
};
