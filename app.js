import { showAlert } from './modules/alert.js';
import { fetchData } from './modules/fetchData.js';
import { createListItem } from './modules/createListItem.js';
import { likeFunctionality } from './modules/likeFunctionality.js';
import { modalFunctionality } from './modules/modalFunctionality.js';

// Newsletter Subscription
document.querySelector('.newsletter').addEventListener('click', () => {
  showAlert('뉴스레터 구독이 완료되었습니다!');
});

async function init() {
  const data = await fetchData();
  const list1 = document.querySelector('.list-container ul.card-list');

  data.forEach(item => {
    const listItem = createListItem(item);
    list1.innerHTML += listItem;
  });

  likeFunctionality();
  modalFunctionality(data);



}


init();


fetch('./blog.json')
.then((response) => response.json())
.then((blogs) => {
  const list2 = document.querySelector('.list2');
  let list2Items = '';

  blogs.forEach((blog) => {
    list2Items += `
      <li class="list2-item">
        <a href="${blog.link}" target="_blank">
          <div class="date">${blog.date}</div>
          <div class="title">${blog.title}</div>
        </a>
      </li>
      <hr/>
    `;
  });

  list2.innerHTML = list2Items;
})
.catch((error) => console.error(error));
