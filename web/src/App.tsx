import MediaPlayer from "./components/app/MediaPlayer";
import LoadingProgress from "./components/app/LoadingProgress";

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black">
      <video
        src="https://s3.venoxity.dev/LoadingMovie.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40" />

      <MediaPlayer />
      <LoadingProgress />
    </div>
  );
}
