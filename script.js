
class Player
{
    constructor(_element)
    {
        this.element = _element
        this.audioElement = this.element.querySelector('.js-audio')

        this.init()
    }

    init()
    {
        this.setVolume()
        this.setSeekBar()
        this.setMute()
        this.toggleMute()
        this.togglePlay()
        this.setTime()
        this.toggleMode()
        this.changeSong()
        this.setForwardBack()
        this.swapPlayPauseDisplay()
    }

    setTime()
    {
        const audio = this.audioElement
        const currentTime = this.element.querySelector('.js-current-time')
        const remainingTime = this.element.querySelector('.js-remaining-time')
        setInterval(function() {
            const secs = Math.floor(audio.currentTime)
            if (secs%60 < 10)
                currentTime.innerHTML = "<p>" + Math.floor(secs/60) + ":0" + secs%60 + "</p>"
            else
                currentTime.innerHTML = "<p>" + Math.floor(secs/60) + ":" + secs%60 + "</p>"
          }, 100);

        setInterval(function() {
            const secs = Math.floor(audio.duration - audio.currentTime)
            if (secs%60 < 10)
                remainingTime.innerHTML = "<p>" + Math.floor(secs/60) + ":0" + secs%60 + "</p>"
            else
                remainingTime.innerHTML = "<p>" + Math.floor(secs/60) + ":" + secs%60 + "</p>"
          }, 100);
    }

    setForwardBack()
    {
        const goForward = this.element.querySelector('.js-after10s-button')
        const goBack = this.element.querySelector('.js-before10s-button')
        const audio = this.audioElement
        goForward.addEventListener('click', () =>
        {
            if (audio.duration - audio.currentTime > 10)
                audio.currentTime += 10
            else
                audio.currentTime = audio.duration
        })
        goBack.addEventListener('click', () =>
        {
            if (audio.currentTime > 10)
                audio.currentTime -= 10
            else
                audio.currentTime = 0
        })
    }
    //Play-pause button

    swapPlayPauseDisplay()
    {
        const togglePlayElementList = this.element.querySelectorAll('.js-play-pause')
        const playButtonList = document.querySelectorAll('.js-play-button')
        const pauseButtonList = document.querySelectorAll('.js-pause-button')
        const audio = this.audioElement

        setInterval(function() {
            if(audio.paused)
            {
                for (let j = 0; j < playButtonList.length; j++)
                {
                    playButtonList[j].style.display = 'block';
                    pauseButtonList[j].style.display = 'none';
                }
            }
            else
            {
                for (let j = 0; j < pauseButtonList.length; j++)
                {
                    playButtonList[j].style.display = 'none';
                    pauseButtonList[j].style.display = 'block';
                }
            }
          }, 100);
    }

    togglePlay()
    {
        const audio = this.audioElement
        const togglePlayElementList = this.element.querySelectorAll('.js-play-pause')
        togglePlayElementList.forEach(togglePlayElement =>
        {
            togglePlayElement.addEventListener('click', () =>
            {
                if(audio.paused)
                    audio.play()
                else
                    audio.pause()
            })
        });

        document.addEventListener('keydown', (event) =>
        {
            if(event.keyCode == 32)
            {
                if(audio.paused)
                    audio.play()
                else
                    audio.pause()
                this.swapPlayPauseDisplay()
            }
        });

    }

    setValueTill(max)
    {
        const volumeElementOne = this.element.querySelector('.js-bar-0')
        const volumeElementTwo = this.element.querySelector('.js-bar-1')
        const volumeElementThree = this.element.querySelector('.js-bar-2')
        const volumeElementFour = this.element.querySelector('.js-bar-3')
        const volumeElementFive = this.element.querySelector('.js-bar-4')

        const elementList = [volumeElementOne, volumeElementTwo, volumeElementThree, volumeElementFour, volumeElementFive]

        for(let i = 0; i < max; i++)
        {
            elementList[i].style.background = "rgba(242, 242, 242, 1)"
        }
        for(let i = elementList.length - 1; i >= max; i--)
        {
            elementList[i].style.background = "#555"
        }
    }

    setVolume()
    {
        const volumeElementOne = this.element.querySelector('.js-bar-0')
        const volumeElementTwo = this.element.querySelector('.js-bar-1')
        const volumeElementThree = this.element.querySelector('.js-bar-2')
        const volumeElementFour = this.element.querySelector('.js-bar-3')
        const volumeElementFive = this.element.querySelector('.js-bar-4')

        const elementList = [volumeElementOne, volumeElementTwo, volumeElementThree, volumeElementFour, volumeElementFive]

        volumeElementOne.addEventListener('click', () =>
        {
            this.audioElement.volume = Math.max(this.audioElement.volume = 0.2)
            this.setValueTill(1)
        })

        volumeElementTwo.addEventListener('click', () =>
        {
            this.audioElement.volume = Math.max(this.audioElement.volume = 0.4)
            this.setValueTill(2)
        })

        volumeElementThree.addEventListener('click', () =>
        {
            this.audioElement.volume = Math.max(this.audioElement.volume = 0.6)
            this.setValueTill(3)
        })

        volumeElementFour.addEventListener('click', () =>
        {
            this.audioElement.volume = Math.max(this.audioElement.volume = 0.8)
            this.setValueTill(4)
        })

        volumeElementFive.addEventListener('click', () =>
        {
            this.audioElement.volume = Math.min(this.audioElement.volume = 1)
            this.setValueTill(5)
        })
        this.setValueTill(5)
    }

    setMute()
    {
        const muteElement = this.element.querySelector('.js-mute')

        var lastVolume = this.audioElement.volume

        muteElement.addEventListener('click', () =>
        {
            if(this.audioElement.volume == 0)
            {
                this.audioElement.volume = lastVolume
            }
            else
            {
                lastVolume = this.audioElement.volume
                this.audioElement.volume = 0
            }
        })
    }

    toggleMute()
    {
        const muteElement = this.element.querySelector('.js-mute')
        const muteButton = this.element.querySelector('.js-mute-button')
        const unmuteButton = this.element.querySelector('.js-unmute-button')

        muteElement.addEventListener('click', () =>
        {
            if(this.audioElement.volume == 0)
            {
                this.setValueTill(0)
                muteButton.style.display = 'block';
                unmuteButton.style.display = 'none';
            }
            else
            {
                this.setValueTill(Math.floor(this.audioElement.volume*5))
                unmuteButton.style.display = 'block';
                muteButton.style.display = 'none';
            }


        })
    }

    toggleMode()
    {
        const body = document.querySelector('.js-body')
        const colorMode = document.querySelector('.js-color-mode')
        const moonButton = document.querySelector('.js-sun-pic')
        const sunButton = document.querySelector('.js-moon-pic')
        let day = false
        colorMode.addEventListener('click', () =>
        {
            if(!day)
            {
                body.classList.remove('dark-mode')
                body.classList.add('light-mode')
                moonButton.style.display = 'none';
                sunButton.style.display = 'block';
                day = !day
            }
            else
            {
                body.classList.remove('light-mode')
                body.classList.add('dark-mode')
                moonButton.style.display = 'block';
                sunButton.style.display = 'none';
                day = !day
            }


        })
    }

    setSeekBar()
    {
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const fillElement = seekBarElement.querySelector('.js-seek-bar-fill')

        this.audioElement.addEventListener('timeupdate', () =>
        {
            const ratio = this.audioElement.currentTime / this.audioElement.duration
            fillElement.style.transform = `scaleX(${ratio})`


        })

        seekBarElement.addEventListener('click', (_event) =>
        {
            const bounding = seekBarElement.getBoundingClientRect()
            const ratio = (_event.clientX - bounding.left) / bounding.width
            const time = ratio * this.audioElement.duration

            this.audioElement.currentTime = time
        })
    }

    changeSong()
    {
        const artist = this.element.querySelector('.js-artist')
        const cover = this.element.querySelector('.js-cover')

        const songTitle = this.element.querySelector('.js-song-title')
        const previousButton = this.element.querySelector('.js-previous-button')
        const nextButton = this.element.querySelector('.js-next-button')
        const audio = this.audioElement


        let indexMusic = [
            {
                "src": "audio/oxfordblood.mp3",
                "artist": "Autoheart",
                "song": "Oxford blood",
                "cover": "images/autoheart.jpg"
            },
            {
                "src": "audio/aintgonnadietonight.mp3",
                "artist": "Macklemore",
                "song": "Ain't gonna die tonight",
                "cover": "images/gemini.jpg"
            },
            {
                "src": "audio/getaway.mp3",
                "artist": "Saint-Motel",
                "song": "Getaway",
                "cover": "images/getaway.jpg"
            },
            {
                "src": "audio/wallpaper.mp3",
                "artist": "Spencer Sutherland",
                "song": "Wallpaper",
                "cover": "images/spencer.jpg",
            },
            {
                "src": "audio/brighterdays.mp3",
                "artist": "Sigala",
                "song": "Brighter days",
                "cover": "images/sigala.jpg"
            },
            {
                "src": "audio/electriclove.mp3",
                "artist": "BORNS",
                "song": "Electric love",
                "cover": "images/borns.png",
            },
            {
                "src": "audio/champion.mp3",
                "artist": "Bishop Briggs",
                "song": "Champion",
                "cover": "images/champion.jpg",
            },
            {
                "src": "audio/younger.mp3",
                "artist": "Jonas Blue",
                "song": "Younger",
                "cover": "images/younger.jpg"
            },
            {
                "src": "audio/hope.mp3",
                "artist": "The chainsmokers",
                "song": "Hope",
                "cover": "images/hope.jpg"
            },
            {
                "src": "audio/loveyouwhenimdrunk.mp3",
                "artist": "Mika",
                "song": "Love you when I'm drunk",
                "cover": "images/mika.jpg"
            },
            {
                "src": "audio/wanted.mp3",
                "artist": "One Republic",
                "song": "Wanted",
                "cover": "images/wanted.jpg",
            },
            {
                "src": "audio/luckystrike.mp3",
                "artist": "Maroon 5",
                "song": "Lucky strike",
                "cover": "images/maroon5.jpg"
            },
            {
                "src": "audio/neveralone.mp3",
                "artist": "Felix Jaehn",
                "song": "Never alone",
                "cover": "images/neveralone.jpg"
            },
            {
                "src": "audio/noonecomparestoyou.mp3",
                "artist": "Jack & Jack",
                "song": "No one compares to you",
                "cover": "images/jack.jpg"
            },
            {
                "src": "audio/remindmetoforget.mp3",
                "artist": "Kygo",
                "song": "Remind me to forget",
                "cover": "images/kygo.jpg"
            },
            {
                "src": "audio/sixteen.mp3",
                "artist": "Ellie Goulding",
                "song": "Sixteen",
                "cover": "images/sixteen.jpg"
            },
            {
                "src": "audio/seventeen.mp3",
                "artist": "Younotus",
                "song": "Seventeen",
                "cover": "images/seventeen.jpg"
            }
        ]

        let i = 0
        let new_i = 0
        let random = false
        // PLAY MUSIC

        const randomActive = this.element.querySelector('.js-random-active-button')
        const randomInacctive = this.element.querySelector('.js-random-inactive-button')
        const randomButton = this.element.querySelector('.js-random-button')


        randomButton.addEventListener('click', () =>
        {
            if (random)
            {
                randomActive.style.display = 'none';
                randomInacctive.style.display = 'block';
            }
            else
            {
                randomInacctive.style.display = 'none';
                randomActive.style.display = 'block';
            }
            random = !random
        })

        function nextMusic()
        {
            audio.currentTime = 0
            audio.pause()
            if (random)
            {
                new_i = Math.floor(Math.random() * indexMusic.length)
                if (i == new_i)
                    i = (i + 1) % indexMusic.length
                else
                    i = new_i
            }
            else
            {
                i = (i + 1) % indexMusic.length
            }
            audio.src = indexMusic[i].src
            cover.src = indexMusic[i].cover
            artist.innerText = indexMusic[i].artist
            songTitle.innerText = indexMusic[i].song
            audio.play()
        }

        // NEXT BUTTON
        nextButton.addEventListener('click', () =>
        {
            nextMusic()
        })

        // PLAY MUSIC
        function previousMusic()
        {
            audio.currentTime = 0
            audio.pause()
            if (random)
            {
                new_i = Math.floor(Math.random() * indexMusic.length)
                if (i == new_i)
                    i = (i - 1 + indexMusic.length) % indexMusic.length
                else
                    i = new_i
            }
            else
            {
                i = (i - 1 + indexMusic.length) % indexMusic.length
            }
            audio.src = indexMusic[i].src
            cover.src = indexMusic[i].cover
            artist.innerText = indexMusic[i].artist
            songTitle.innerText = indexMusic[i].song
            audio.play()
        }

        // NEXT BUTTON
        previousButton.addEventListener('click', () =>
        {
            previousMusic()
        })

        // AUTOPLAY
        audio.addEventListener('ended', () =>
        {
            nextMusic()
        })
    }
}


const player = new Player(document.querySelector('.js-player'))
