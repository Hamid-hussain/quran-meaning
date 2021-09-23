const URL = 'https://api.quran.com/api/v4/verses/by_page/1?language=en&words=true&page=1&per_page=10';
const quranUsmani = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1';

let reqNew = new XMLHttpRequest();
reqNew.open('GET', quranUsmani, true);
reqNew.send();
reqNew.onload = () => {
  ayahData = JSON.parse(reqNew.responseText)
  ayah = ayahData['verses']
  // console.log(ayah[0]['text_uthmani'])
}

let req = new XMLHttpRequest();
req.open('GET', URL, true);
req.send()
req.onload = () => {
  const data = JSON.parse(req.responseText)
  englishMeaning = data['verses'];
  generateVerses()
}

let englishMeaning
let ayah

const container = document.getElementById('main-container')
const pracContainer = document.getElementById('practice-container')
const testContainer = document.getElementById('test-container')
generateVerses();




function generateVerses(){

  

   let ayahEach = ayah.map((item) => {
     return item['text_uthmani']
   });
   let meaningEach = englishMeaning.map((item) => {
     let num = item.words.map(item => item.translation.text)
     return num
  });
   let transEach = englishMeaning.map((item) => {
    let num = item.words.map(item => item.transliteration.text)
    return num
  });


  addQuran(ayahEach, meaningEach, transEach);
}
   

  function addQuran(ayaths, eng, trans) {
    // console.log(ayaths, eng, trans)
    let count = 1;

    container.innerHTML = `
    <h1 class="text-4xl font-bold p-2 mb-10">Quran</h1>
    <div>
      <h1 class="text-2xl p-2 mb-5 ">Display Mode</h1>
      <div class="flex flex-cols-4 justify-end text-right border border-black rounded p-2"> 
          <div class="flex-row">
            <p class="border-b border-black p-1 font-bold mb-2"}>${ayaths[count]}</p>
            <div class="border-b border-black p-1 font-bold">${eng[count]}</div>
            <div class="p-1 font-bold">${trans[count]}</div>
          </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl p-2 my-5 ">Practice Mode</h1>
      <div class="flex flex-cols-2 justify-center text-center border border-black rounded p-2"> 
          <div class="flex-row w-2/3">
            <p class="border-b border-black p-1 font-bold mb-4"}>${ayaths[count]}</p>
            <div id="showAyah" class="text-md p-2 font-bold mb-3 hidden">${eng[count]}</div>
            <div class="flex gap-3">
              <input type="text" placeholder="Write Meaning" class="rounded p-2 bg-red-100 w-full"></input>
              <button id="toggleAyah" class="text-sm"><i class="fa-solid fa-eye"></i>Check</button>
            </div>
          </div>
      </div>
    </div>
    <div>
      <h1 class="text-2xl p-2 my-5 ">Test!</h1>
      <div class="flex flex-cols-2 justify-center text-center border border-black rounded p-2"> 
          <div class="flex-row w-2/3">
          <input type="text" placeholder="Write the Verse" class="rounded p-2 m-2 bg-red-100 w-full h-20"></input>
            <input type="text" placeholder="Write Meaning" class="rounded p-2 m-2 bg-red-100 w-full h-20"></input>
          </div>
      </div>
      <button onClick="location.reload()" id="doneBtn" class="flex p-2 rounded mt-10 mx-auto bg-red-400 items-center gap-2 hover:bg-red-300">
        <span id="text">Done!</span>
        <i class="fa-solid fa-dove" ></i>
      </button>
    </div>
    `
    
    const checkBtn = container.querySelector('#toggleAyah');
    checkBtn.addEventListener('click', () => {
      let showAyah =  document.getElementById('showAyah')
      showAyah.classList.toggle('hidden')
    })
    
  }







