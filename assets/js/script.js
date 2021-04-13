const album = document.querySelector('.container-albumlist')
const songlist = document.querySelector('.songlist')
let audio = ''

const createList = (songs) => {
    album.innerHTML = ''
    songlist.innerHTML = ''
    for (const song of songs) {
        songlist.innerHTML +=
            `<li class="list-group-item">
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-outline-secondary rounded-circle songlist-playbutton" onclick="playMusic('${song.preview}')"><ion-icon class="d-none" name="pause-outline"></ion-icon><ion-icon class="" name="play-outline"></ion-icon><audio src="${song.preview}"></audio></button>
                                <span class="mx-2 songlist-songduration">${(parseFloat(song.duration)/60).toFixed(2)}</span>
                                <img class="mx-2 songlist-albumcover" src="${song.album.cover_small}" alt="">
                                <span class="mx-2 songlist-artist-name">${song.artist.name}</span>
                                <span class="mx-2 songlist-songtitle">${song.title}</span>
                            </div>
                        </div>
                    </li>`
    }

}

const createAlbumList = (songs) => {
    album.innerHTML = ''
    songlist.innerHTML = ''
    for (const song of songs) {
        album.innerHTML +=
            `<div class="col-3">
            <div class="card">
                <img src="${song.album.cover_medium}" class="card-img-top" alt="${song.album.title}">
                <div class="card-body">
                    <h5 class="card-title">${song.album.title}</h5>
                </div>
            </div>
        </div>`
    }
    count()
}


const getSearchResult = (event, keyword) => {
    event.preventDefault();
    const button = event.currentTarget.classList.contains("listAlbumButton")
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${keyword}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3e0ee43bffmsh46314b57fd57dc1p16035fjsn04092eace9f0",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(songs => {
            if (button) {
                createAlbumList(songs.data)
            } else {
                createList(songs.data)
            }

        })
        .catch(err => {
            console.error(err);
        });

}

const count = () => {
    const count = document.querySelector(".count")
    count.innerHTML = album.children.length

}

const playMusic = (url) => {
    audio = new Audio(url).play()
}

const stopMusic = (url) => {
    new Audio(url).play()
}