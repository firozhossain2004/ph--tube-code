// Date
function timesection(time) {
  const hour = parseInt(time / 3600);
  const remanningSchend = time % 3600;
  const minite = parseInt(remanningSchend / 60);
  const sechend = remanningSchend % 60;
  return `${hour}hour ${minite} minite ${sechend} secound `;
}

// Date
//
const removeCatwgore = () => {
  const removebtns = document.getElementsByClassName("catagore-btn");
  for (let removebtn of removebtns) {
    removebtn.classList.remove("btns");
  }
};
//

// button
const lodeCatgores = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => lodeDispaly(data.categories))
    .catch((error) => console.log(error));
};
// video
const lodeVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => lodeVideoDispaly(data.videos))
    .catch((error) => console.log(error));
};
// video Id***async Function
const videoId = async (videoIds) => {
  console.log(videoIds);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoIds}`;
  const res = await fetch(url);
  const data = await res.json();
  dataDispaly(data.video);
};
const dataDispaly = (video) => {
  console.log(video);
  const modalContiner = document.getElementById("modal-contan");
  modalContiner.innerHTML = `
<img src=${video.thumbnail}/>
<p>${video.description} </p>
`;
  document.getElementById("modalData").click();
};
// videoId
// defarent catagory
const defrentCatagory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeCatwgore();
      const btnColor = document.getElementById(`btn-${id}`);
      btnColor.classList.add("btns");

      lodeVideoDispaly(data.category);
    })
    .catch((error) => console.log(error));
};

//
const lodeVideoDispaly = (data) => {
  const videoContiner = document.getElementById("videos");
  videoContiner.innerHTML = "";
  if (data.length === 0) {
    videoContiner.classList.remove("grid");
    videoContiner.innerHTML = `
  <div class="mai-h-screen flex felx-col gap-11 justify-center items-center mt-56">
  <img src="assets/Icon.png"/>
  <h1 class="text-2xl font-bold text-gray-600">Oops!! Sorry, There is no content here</h1>
  </div>
  `;
  } else {
    videoContiner.classList.add("grid");
  }
  data.forEach((video) => {
    console.log(video);
    const cord = document.createElement("div");
    cord.classList = "card bg-base-100";
    cord.innerHTML = `
       <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="w-full h-full object-cover "
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `
      <span class="absolute right-2 bottom-2 bg-black rounded text-white p-1">${timesection(
        video.others.posted_date
      )}</span>
      `
      }
      
  </figure>
  <div class="flex gap-2 py-4 px-0">
        <div>
        <img class="w-10 h-10 rounded-full object-cover"src=${
          video.authors[0].profile_picture
        }
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex gap-3 items-center">
        <P class="text-gray-400">${video.authors[0].profile_name}</P>
         ${
           video.authors[0].verified === true
             ? ` <img class="h-[20px]" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">`
             : ""
         }
        </div>
        <p>  <button class="btn bg-red-300 btn-sm" onclick="videoId('${
          video.video_id
        }')"> Details</button></p>
        </div>
    </div>
  </div>
    `;
    videoContiner.append(cord);
  });
};
// video

// button
const lodeDispaly = (data) => {
  const catagorContiner = document.getElementById("catagor-continer");
  data.forEach((item) => {
    console.log(item);
    const buttonContiner = document.createElement("div");
    buttonContiner.innerHTML = `
    <button class="btn catagore-btn" id="btn-${item.category_id}"  onclick="defrentCatagory(${item.category_id})">
    ${item.category}
    </button>
    `;

    catagorContiner.append(buttonContiner);
  });
};

lodeCatgores();

lodeVideo();
// item.category;
