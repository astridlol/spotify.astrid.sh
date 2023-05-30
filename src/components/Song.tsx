export interface Props {
  artist: string;
  name: string;
  cover: string;
}

// An actual link to the song will be added once I get the link from Spotify.

export const Song = ({ artist, name, cover }: Props) => {
  return (
    <div className="flex flex-col items-center transition-colors rounded-xl text-center w-36">
      <a rel="prefetch">
        <img
          src={cover}
          alt={`Album cover of ${name}`}
          className="w-full h-auto"
        />
      </a>
      <div className="w-full bg-black/20 mt-[-1rem]">
        <p className="text-white">{artist}</p>
      </div>
      <div className="w-full bg-black/20">
        <p className="text-white">{name}</p>
      </div>
    </div>
  );
};
