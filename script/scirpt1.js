"use strict";

let nextPage = ''; //глобальная переменная

document.addEventListener("DOMContentLoaded", () => {

  //search input keyboard
  {
    //!!!!!!!!!!!!!!!!!!!!!!!!
    const keyboardButton = document.querySelector(".search-form__keyboard");
    const keyboard = document.querySelector(".keyboard");
    const closeKeyboard = document.getElementById("close-keyboard");
    const SearchInput = document.querySelector(".search-form__input");
    const backspace = document.getElementById("keyboard-backspace");
    const space = document.getElementById("keyboard-space");
    //!!!!!!!!!!!!!!!!!!!!!!!!

    const toggleKeyBoard = () => {
      keyboard.style.top = keyboard.style.top ? "" : "50%";
    };
    //Смена языка
    const changeLang = (btn, lang) => {
      const langRu = [
        "ё",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "-",
        "=",
        "⬅",
        "й",
        "ц",
        "у",
        "к",
        "е",
        "н",
        "г",
        "ш",
        "щ",
        "з",
        "х",
        "ъ",
        "ф",
        "ы",
        "в",
        "а",
        "п",
        "р",
        "о",
        "л",
        "д",
        "ж",
        "э",
        "я",
        "ч",
        "с",
        "м",
        "и",
        "т",
        "ь",
        "б",
        "ю",
        ".",
        "en",
        " "
      ];
      const langEn = [
        "`",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "-",
        "=",
        "⬅",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "[",
        "]",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        ";",
        '"',
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "/",
        "ru",
        " "
      ];
      if (lang === "en") {
        btn.forEach((elem, i) => {
          elem.textContent = langEn[i];
        });
      } else
        btn.forEach((elem, i) => {
          elem.textContent = langRu[i];
        });
    };
    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === "button") {
        const contentButton = target.textContent.trim();
        const buttons = [...keyboard.querySelectorAll("button")].filter(
          elem => elem.style.visibility !== "hidden"
        );
        // Клавиша пробел
        if (target === space) {
          SearchInput.value += " ";
          // Клавиша backspace
        } else if (target === backspace) {
          SearchInput.value = SearchInput.value.slice(0, -1);
        } else if (contentButton === "en" || contentButton === "ru") {
          changeLang(buttons, contentButton);
        } else {
          SearchInput.value += contentButton;
        }
      }
    };

    closeKeyboard.addEventListener("click", toggleKeyBoard);
    keyboardButton.addEventListener("click", toggleKeyBoard);
    keyboard.addEventListener("click", typing);
  } // end search input keyboard

  //rigth-side navigation menu
  {
    const burgerIcon = document.querySelector(".spinner");
    const sideBarMenu = document.querySelector(".sidebarMenu");

    burgerIcon.addEventListener("click", () => {
      burgerIcon.classList.toggle("active");
      sideBarMenu.classList.toggle("rollUp");
    });

    sideBarMenu.addEventListener("click", e => {
      let target = e.target;
      target = target.closest("a[href='#']");

      if (target) {
        const parentTarget = target.parentElement;
        sideBarMenu.querySelectorAll("li").forEach(elem => {
          elem === parentTarget
            ? elem.classList.add("active")
            : elem.classList.remove("active");
        });
      }
    });
  } // end rigth-side navigation menu

  //modal youtuber

  const youtuber = () => {
    const youTuberItems = document.querySelectorAll("[data-youtuber]");
    const youTuberModal = document.querySelector(".youTuberModal");
    const youtuberContainer = document.getElementById("youtuberContainer");
    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;
      // console.log(ww);

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {
          youtuberContainer.querySelector("iframe").style.cssText = `
						width: ${qw[i]}px; 
						height: ${qh[i]}px;
        `;

          // `;
          youtuberContainer.style.cssText = `
          width: ${qw[i]}px; 
          height: ${qh[i]}px;
          top:${(wh - qh[i]) / 2}px;
          left:${(ww - qw[i]) / 2}px`;
          break;
        }
      }
    };

    youTuberItems.forEach(elem => {
      elem.addEventListener("click", () => {
        const idVideo = elem.dataset.youtuber;
        youTuberModal.style.display = "block";

        const youTuberFrame = document.createElement("iframe");
        youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
        youtuberContainer.insertAdjacentElement("beforeend", youTuberFrame);

        window.addEventListener("resize", sizeVideo);
        sizeVideo();
      });
    });
    youTuberModal.addEventListener("click", () => {
      youTuberModal.style.display = "";
      youtuberContainer.textContent = "";
      window.removeEventListener("resize", sizeVideo);
    });
  };  // end youtuber

  //modal window
  {
    document.body.insertAdjacentHTML(
      "beforeend",
      ` <div class="youTuberModal">
        <div id="youtuberClose">&#215;</div>
        <div id="youtuberContainer"></div>
         </div> `
    );
    youtuber();
  }  // end modal window

  // API
  {
    const API_KEY = apiKey;
    const CLIENT_ID = cliendId;

    //авторизация
    {
      const buttonAuth = document.getElementById("authorize");
      const authBlock = document.querySelector(".auth");
      const errorAuth = err => {
        console.log(err)
        authBlock.style.display = "";
      };
      gapi.load("client:auth2", () => {
        gapi.auth2.init({ client_id: CLIENT_ID });
      });

      const authenticate = () =>
        gapi.auth2
          .getAuthInstance()
          .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
          .then(() => console.log("Sign-in successful"))
          // .catch("Ошибка при аутентификации: ");
          .catch(errorAuth);

      const loadClient = () => {
        gapi.client.setApiKey(API_KEY);
        return gapi.client
          .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(() => console.log("GAPI client loaded for API"))
          .then(() => (authBlock.style.display = "none"))
          .catch(errorAuth);
      };

      buttonAuth.addEventListener("click", () => {
        authenticate().then(loadClient);
      });
    }  // end  авторизация

    //request
    {
      const gloTube = document.querySelector(".logo-academy");
      const trends = document.getElementById("yt_trend");
      const like = document.getElementById("like");
      const main = document.getElementById("yt_main");
      const subscriptions = document.getElementById("subscriptions");
      const searchForm = document.querySelector(".search-form");
      const nextResult = document.getElementById("next_result");

      // отображаем и скрываем кнопку Далее
      const showButtonNext = () => nextResult.style.display = "block";
      // const hideButtonNext = () => nextResult.style.display = "none";

      const request = options =>
        gapi.client.youtube[options.method]
          .list(options)
          .then(response => {
            // console.log('response.result: ', response.result);
            return response.result;
            // return response.result.items;
          })
          .then(data =>
            options.method === "subscriptions" ? renderSub(data) : render(data)
          )
          .catch(err =>
            console.error("Во время запроса произошла ошибка: " + err)
          );

      //запрос на видео с канала (канал передается по свойству chanelId)

      const renderSub = data => {
        let ytWrapper = document.getElementById("yt-wrapper");
        ytWrapper.textContent = "";
        const { nextPageToken, items } = data;
        nextPage = nextPageToken;
        sessionStorage.setItem('nextPage', nextPageToken);
        items.forEach(item => {
          try {
            const {
              snippet: {
                resourceId: { channelId },
                description,
                title,
                thumbnails: {
                  high: { url }
                }
              }
            } = item;
            ytWrapper.innerHTML += `<div class="yt" data-youtuber="${channelId}">
          <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
            <img src="${url}" class="yt-thumbnail__img">
          </div>
          <div class="yt-title">${title}</div>
          <div class="yt-channel">${description}</div>
        </div>`;
          } catch (err) {
            console.error(err);
          }
        });
        showButtonNext();
        ytWrapper = document.querySelectorAll(".yt").forEach(item => {
          item.addEventListener("click", () => {
            const options =
            {
              method: "search",
              part: "snippet",
              channelId: item.dataset.youtuber,
              order: "date",
              pageToken: '',
              maxResults: 6
            }
            sessionStorage.clear();
            sessionStorage.setItem('options', JSON.stringify(options));
            request(options);
          });
        });
      };

      const render = data => {
        const ytWrapper = document.getElementById("yt-wrapper");
        ytWrapper.textContent = "";
        const { nextPageToken, items } = data;
        nextPage = nextPageToken;
        sessionStorage.setItem('nextPage', nextPageToken);
        items.forEach(item => {
          try {
            const {
              id,
              id: { videoId },
              snippet: {
                channelTitle,
                title,
                resourceId: { videoId: likedVideoId } = {},
                thumbnails: {
                  high: { url }
                }
              }
            } = item;
            ytWrapper.innerHTML += `<div class="yt" data-youtuber="${likedVideoId ||
              videoId ||
              id}">
          <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
            <img src="${url}" class="yt-thumbnail__img">
          </div>
          <div class="yt-title">${title}</div>
          <div class="yt-channel">${channelTitle}</div>
        </div>`;
          } catch (err) {
            console.error(err);
          }
        });
        youtuber();
        showButtonNext();
      };  // end render()

      gloTube.addEventListener("click", () => {
        const options =
        {
          method: "search",
          part: "snippet",
          channelId: "UCkwu9d355WAN63_2MvtUF4Q",
          order: "date",
          pageToken: '',
          maxResults: 6
        }
        sessionStorage.clear();
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      }
      );

      nextResult.addEventListener("click", () => {
        const nextPage = sessionStorage.getItem('nextPage');
        const options = JSON.parse(sessionStorage.getItem('options'));
        options.pageToken = nextPage;
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      }
      )

      trends.addEventListener("click", () => {
        const options = {
          method: "videos",
          part: "snippet",
          chart: "mostPopular",
          maxResults: 6,
          regionCode: "RU",
          pageToken: '',
        }
        sessionStorage.clear();
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      });

      like.addEventListener("click", () => {
        const options = {
          method: "playlistItems",
          part: "snippet",
          playlistId: "LLkwu9d355WAN63_2MvtUF4Q",
          maxResults: 6,
          pageToken: '',
        }
        sessionStorage.clear();
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      });

      main.addEventListener("click", () => {
        const options = {
          method: "search",
          part: "snippet",
          channelId: "UCWXkvKfkwiO65olOv1RN1mA",
          order: "date",
          maxResults: 6,
          pageToken: '',
        }
        sessionStorage.clear();
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      });

      subscriptions.addEventListener("click", () => {
        const options = {
          method: "subscriptions",
          part: "snippet",
          mine: true,
          maxResults: 6,
          pageToken: '',
        }
        sessionStorage.clear();
        sessionStorage.setItem('options', JSON.stringify(options));
        request(options);
      });

      searchForm.addEventListener("submit", event => {
        event.preventDefault();
        const searchInput = searchForm.elements[0].value;
        if (!searchInput) {
          searchForm.style.border = "2px solid red";
          alert("Введите значение для поиска");
          return;
        }
        searchForm.style.border = "";
        request({
          method: "search",
          part: "snippet",
          order: "relevance",
          maxResults: 6,
          q: searchInput
        });

        // searchInput.value = "";
        searchForm.elements[0].value = "";
      });
    }  // end request

  }  // end API
});  // end DOMContentLoaded
