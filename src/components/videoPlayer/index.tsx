import { VideoPlayerIframe } from './styles';

interface VideoPlayerProps {
  link: string;
}

export const VideoPlayer = ({ link }: VideoPlayerProps) => {
  return <VideoPlayerIframe src={link}></VideoPlayerIframe>;
};
