
class Song {
    constructor(title, artist, file, genre) {
        this.title = title;
        this.artist = artist;
        this.file = file;
        this.genre = genre;
    }
}

class MusicPlayer {
    constructor() {
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.audio = new Audio();
        this.volume = 0.5;
        this.audio.volume = this.volume;
    }

    addSong(song) {
        this.playlist.push(song);
        this.displayPlaylist();
    }

    playSong(index) {
        if (index < 0 || index >= this.playlist.length) return;

        this.currentIndex = index;
        const song = this.playlist[index];

        this.audio.src = song.file;
        this.audio.play();
        this.isPlaying = true;

        this.displayCurrentSong();
        this.displayPlaylist();
    }

    pauseSong() {
        this.audio.pause();
        this.isPlaying = false;
    }

    resumeSong() {
        this.audio.play();
        this.isPlaying = true;
    }

    nextSong() {
        if (this.playlist.length === 0) return;

        this.currentIndex =
            (this.currentIndex + 1) % this.playlist.length;

        this.playSong(this.currentIndex);
    }

    previousSong() {
        if (this.playlist.length === 0) return;

        this.currentIndex =
            (this.currentIndex - 1 + this.playlist.length) %
            this.playlist.length;

        this.playSong(this.currentIndex);
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        this.audio.volume = this.volume;
    }

    searchSong(keyword) {
        return this.playlist.filter(song =>
            song.title.toLowerCase().includes(keyword.toLowerCase()) ||
            song.artist.toLowerCase().includes(keyword.toLowerCase()) ||
            song.genre.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    shufflePlaylist() {
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [this.playlist[i], this.playlist[j]] =
                [this.playlist[j], this.playlist[i]];
        }

        this.currentIndex = 0;
        this.displayPlaylist();
    }

    displayCurrentSong() {
        const song = this.playlist[this.currentIndex];

        console.log("Now Playing:", song.title);
        console.log("Artist:", song.artist);
        console.log("Genre:", song.genre);
    }

    displayPlaylist() {
        console.table(this.playlist);
    }

    removeSong(index) {
        if (index < 0 || index >= this.playlist.length) return;

        this.playlist.splice(index, 1);

        if (this.playlist.length === 0) {
            this.audio.pause();
            this.audio.src = "";
            this.currentIndex = 0;
            this.isPlaying = false;
        } else if (index < this.currentIndex) {
            this.currentIndex--;
        } else if (index === this.currentIndex) {
            this.currentIndex = Math.min(
                this.currentIndex,
                this.playlist.length - 1
            );
            this.playSong(this.currentIndex);
        }

        this.displayPlaylist();
    }
}

const player = new MusicPlayer();

player.addSong(new Song(
    "Sample Song 1", "Artist A", "music/song1.mp3", "Pop"
));

player.addSong(new Song(
    "Sample Song 2", "Artist B", "music/song2.mp3", "Rock"
));

player.addSong(new Song(
    "Sample Song 3", "Artist C", "music/song3.mp3", "R&B"
));

player.playSong(0);