import { BASE_URL } from "../utils/constants";

let movies = [
  {
    backdrop_path: "/kYWk8TW5TkpCWkB0mkUm72N0lb8.jpg",
    id: 838209,
    title: "Exhuma",
    original_title: "파묘",
    overview:
      "After tracing the origin of a disturbing supernatural affliction to a wealthy family's ancestral gravesite, a team of paranormal experts relocates the remains—and soon discovers what happens to those who dare to mess with the wrong grave.",
    poster_path: "/pQYHouPsDw32FhDLr7E3jmw0WTk.jpg",
    media_type: "movie",
    adult: false,
    original_language: "ko",
    genre_ids: [9648, 27, 53],
    popularity: 204.384,
    release_date: "2024-02-22",
    video: false,
    vote_average: 7.595,
    vote_count: 241,
  },
  {
    backdrop_path: "/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg",
    id: 348,
    title: "Alien",
    original_title: "Alien",
    overview:
      "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.",
    poster_path: "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [27, 878],
    popularity: 111.392,
    release_date: "1979-05-25",
    video: false,
    vote_average: 8.2,
    vote_count: 14154,
  },
  {
    backdrop_path: "/mvDMt3JZ5zlsrXduGzj9jBEfVBT.jpg",
    id: 1034541,
    title: "Terrifier 3",
    original_title: "Terrifier 3",
    overview:
      "Art the Clown unleashes chaos on the unsuspecting residents of Miles County as they peacefully drift off to sleep on Christmas Eve.",
    poster_path: "/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [27, 53, 80],
    popularity: 67.32,
    release_date: "2024-10-11",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    backdrop_path: "/jNjT5y95BToczcxgVPl1NBB7goY.jpg",
    id: 11,
    title: "Star Wars",
    original_title: "Star Wars",
    overview:
      "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [12, 28, 878],
    popularity: 111.557,
    release_date: "1977-05-25",
    video: false,
    vote_average: 8.204,
    vote_count: 20247,
  },
  {
    backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    id: 155,
    title: "The Dark Knight",
    original_title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [18, 28, 80, 53],
    popularity: 157.845,
    release_date: "2008-07-16",
    video: false,
    vote_average: 8.517,
    vote_count: 32246,
  },
  {
    backdrop_path: "/1KJtjg3MQFnrfd7NXfs11z4HLwD.jpg",
    id: 804616,
    title: "Something in the Water",
    original_title: "Something in the Water",
    overview:
      "Reunited at an exotic destination wedding, five girlfriends decide to rent a boat to spend a day together along the paradise-like coast. Their friendship is put to the ultimate test when they find themselves stranded in open water fighting for their lives against sharks and mother nature as they desperately try to survive.",
    poster_path: "/1iWGGxHEwswZGvPSoMZlLFf0PNq.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [53, 27],
    popularity: 56.827,
    release_date: "2024-03-22",
    video: false,
    vote_average: 4.5,
    vote_count: 33,
  },
  {
    backdrop_path: "/2XSeKDmIa2KxaiJy4J9e8FrIZhk.jpg",
    id: 20352,
    title: "Despicable Me",
    original_title: "Despicable Me",
    overview:
      "Villainous Gru lives up to his reputation as a despicable, deplorable and downright unlikable guy when he hatches a plan to steal the moon from the sky. But he has a tough time staying on task after three orphans land in his care.",
    poster_path: "/9lOloREsAhBu0pEtU0BgeR1rHyo.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [10751, 16, 35],
    popularity: 234.939,
    release_date: "2010-07-08",
    video: false,
    vote_average: 7.242,
    vote_count: 14778,
  },
  {
    backdrop_path: "/60qVuzQOKgyD57tsgBceT5ScCSX.jpg",
    id: 1214488,
    title: "Skywalkers: A Love Story",
    original_title: "Skywalkers: A Love Story",
    overview:
      "Two real-life daredevils test the limits of their love and trust by illegally scaling one of the world's tallest buildings to perform an acrobatic stunt.",
    poster_path: "/7A4x0D1gNTpmMn9E9BW9hWiaOkv.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [99, 10749, 53],
    popularity: 60.151,
    release_date: "2024-07-12",
    video: false,
    vote_average: 7.452,
    vote_count: 31,
  },
  {
    backdrop_path: "/uUJuPiZh1QfIeTa1GeLWqnEkaP2.jpg",
    id: 1302011,
    title: "Init",
    original_title: "Init",
    overview:
      "When a young barrio lass moves in to the city to study, she lives in a boarding house with other college students. Unknown to them, behind her shy and timid personality is a woman with insatiable hunger for sex.",
    poster_path: "/fGY13rtdRzFqTkDMi5JayUWg6vL.jpg",
    media_type: "movie",
    adult: false,
    original_language: "tl",
    genre_ids: [18],
    popularity: 55.045,
    release_date: "2024-07-30",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    backdrop_path: "/xAAYm7bUC5LnAj2Hs2hePOMHh2z.jpg",
    id: 1251687,
    title: "Don't Tell Mom the Babysitter's Dead",
    original_title: "Don't Tell Mom the Babysitter's Dead",
    overview:
      "Seventeen year old Tanya's plans for a carefree summer are derailed when her stressed-to-the-limit mom takes off for a wellness retreat and puts Tanya and her three siblings in the charge of a crotchety (and racist) old babysitter. The babysitter’s sudden death leaves the kids short on cash and reluctant to pull mom prematurely out of her much-needed R&R, so Tanya is forced to get a job. Posing as an adult, she gets a gig as the executive assistant at a fashion company and overnight is thrust into the world of adulthood and parenting.",
    poster_path: "/aMLrX8qaagRUESyPSJCARNlT8Xd.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [35],
    popularity: 16.443,
    release_date: "2024-04-12",
    video: false,
    vote_average: 7.1,
    vote_count: 7,
  },
  {
    backdrop_path: "/rt9jRDrN938wwSkEemwvmXKFMja.jpg",
    id: 872906,
    title: "Jawan",
    original_title: "जवान",
    overview:
      "An emotional journey of a prison warden, driven by a personal vendetta while keeping up to a promise made years ago, recruits inmates to commit outrageous crimes that shed light on corruption and injustice, in an attempt to get even with his past,  and that leads him to an unexpected reunion.",
    poster_path: "/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
    media_type: "movie",
    adult: false,
    original_language: "hi",
    genre_ids: [28, 12, 53],
    popularity: 69.623,
    release_date: "2023-09-07",
    video: false,
    vote_average: 7.2,
    vote_count: 229,
  },
  {
    backdrop_path: "/tq8COKsI99Bivjd4CZIYVGoKcIx.jpg",
    id: 937287,
    title: "Challengers",
    original_title: "Challengers",
    overview:
      'Tennis player turned coach Tashi has taken her husband, Art, and transformed him into a world-famous Grand Slam champion. To jolt him out of his recent losing streak, she signs him up for a "Challenger" event — close to the lowest level of pro tournament — where he finds himself standing across the net from his former best friend and Tashi\'s former boyfriend.',
    poster_path: "/H6vke7zGiuLsz4v4RPeReb9rsv.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [10749, 18],
    popularity: 131.411,
    release_date: "2024-04-18",
    video: false,
    vote_average: 7.2,
    vote_count: 1159,
  },
  {
    backdrop_path: "/a1m4DAmySexNaaGnjEVA2MKNUCo.jpg",
    id: 998846,
    title: "Back to Black",
    original_title: "Back to Black",
    overview:
      "The extraordinary story of Amy Winehouse’s early rise to fame from her early days in Camden through the making of her groundbreaking album, Back to Black that catapulted Winehouse to global fame. Told through Amy’s eyes and inspired by her deeply personal lyrics, the film explores and embraces the many layers of the iconic artist and the tumultuous love story at the center of one of the most legendary albums of all time.",
    poster_path: "/xHQEeUT3Ac4fTY72UeNrI75xLtE.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [10402, 36, 18],
    popularity: 81.319,
    release_date: "2024-04-11",
    video: false,
    vote_average: 6.846,
    vote_count: 282,
  },
  {
    backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
    id: 634649,
    title: "Spider-Man: No Way Home",
    original_title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [28, 12, 878],
    popularity: 205.299,
    release_date: "2021-12-15",
    video: false,
    vote_average: 7.962,
    vote_count: 19652,
  },
  {
    backdrop_path: "/ipyxbPJrLB1g9AfHq4xH5nLWmew.jpg",
    id: 245891,
    title: "John Wick",
    original_title: "John Wick",
    overview:
      "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
    poster_path: "/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [28, 53],
    popularity: 74.283,
    release_date: "2014-10-22",
    video: false,
    vote_average: 7.434,
    vote_count: 18825,
  },
  {
    backdrop_path: "/sDH1LkdFOkQmTJaF1sIIniQyFOk.jpg",
    id: 597,
    title: "Titanic",
    original_title: "Titanic",
    overview:
      "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
    poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [18, 10749],
    popularity: 172.698,
    release_date: "1997-11-18",
    video: false,
    vote_average: 7.906,
    vote_count: 24872,
  },
  {
    backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    id: 447365,
    title: "Guardians of the Galaxy Vol. 3",
    original_title: "Guardians of the Galaxy Vol. 3",
    overview:
      "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
    poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [878, 12, 28],
    popularity: 160.998,
    release_date: "2023-05-03",
    video: false,
    vote_average: 7.971,
    vote_count: 6482,
  },
  {
    backdrop_path: "/i9gC7lfWa56pQ5AmfGsOhHlmg6o.jpg",
    id: 1172533,
    title: "Pee Nak 4",
    original_title: "พี่นาค 4",
    overview:
      "Three friends find themselves at an old temple located on the outskirts of the city. However, this temple harbours a terrifying legend: anyone who wishes to be ordained as a monk there is cursed.",
    poster_path: "/6tbY9zSftquXK9xsdqU6LGFIj5F.jpg",
    media_type: "movie",
    adult: false,
    original_language: "th",
    genre_ids: [35, 27],
    popularity: 20.777,
    release_date: "2024-02-22",
    video: false,
    vote_average: 4,
    vote_count: 4,
  },
  {
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    id: 157336,
    title: "Interstellar",
    original_title: "Interstellar",
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [12, 18, 878],
    popularity: 186.852,
    release_date: "2014-11-05",
    video: false,
    vote_average: 8.438,
    vote_count: 34776,
  },
  {
    backdrop_path: "/obKmfNexgL4ZP5cAmzdL4KbHHYX.jpg",
    id: 673,
    title: "Harry Potter and the Prisoner of Azkaban",
    original_title: "Harry Potter and the Prisoner of Azkaban",
    overview:
      "Year three at Hogwarts means new fun and challenges as Harry learns the delicate art of approaching a Hippogriff, transforming shape-shifting Boggarts into hilarity and even turning back time. But the term also brings danger: soul-sucking Dementors hover over the school, an ally of the accursed He-Who-Cannot-Be-Named lurks within the castle walls, and fearsome wizard Sirius Black escapes Azkaban. And Harry will confront them all.",
    poster_path: "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [12, 14],
    popularity: 161.39,
    release_date: "2004-05-31",
    video: false,
    vote_average: 8.019,
    vote_count: 21121,
  },
];

export default function WatchList() {
  let genres = ["All Genres", "Action", "Comedy", "Sci-Fi"];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[90%] my-8 justify-evenly">
        {genres.map((genre, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer text-2xl rounded-2xl text-white h-[3rem] w-[12rem] bg-slate-400 flex items-center justify-center"
            >
              {genre}
            </div>
          );
        })}
      </div>
      <input
        placeholder="Search..."
        className="h-[4rem] p-4 w-[24rem] my-8 text-2xl bg-slate-200 outline-none"
      />

      <table className="rounded-xl border w-[90%] overflow-hidden	">
        <thead className="bg-slate-300 h-12 rounded-lg">
          <tr className="border-b-2	text-left	">
            <th className="p-8">Name</th>
            <th>
              <i className="fa-solid fa-angle-up mr-2"></i>Ratings
              <i className="fa-solid fa-angle-down ml-2"></i>
            </th>
            <th>
              <i className="fa-solid fa-angle-up mr-2"></i>Popularity
              <i className="fa-solid fa-angle-down ml-2"></i>
            </th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            return (
              <tr key={movie.id} className="border-2	hover:bg-slate-100">
                <td className="flex m-4 gap-8 items-center">
                  <img
                    className="h-32 w-36 rounded-lg"
                    src={BASE_URL + movie.backdrop_path}
                    alt="poster"
                  />
                  {movie.title}
                </td>
                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>
                <td>{movie.genre_ids[0]}</td>
                <td className="text-rose-600 cursor-pointer	">
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
