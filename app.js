document.querySelector('.newsletter').addEventListener('click', () => {
    alert('뉴스레터 구독이 완료되었습니다!');
});

let data = [];


async function fetchData() {
    const response = await fetch('data.json');
    data = await response.json();
    const list1 = document.querySelector('.list-container ul.card-list');

    data.forEach(item => {
        const listItem = `
        <li class="card-item" data-id="${item.id}">
          <img src="${item.imgUrl}" alt="Image">
          <div class="card-content">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <span class="tag">${item.tag}</span>
          </div>
          <div class="card-like">
            <span class="like-icon">❤️</span>
            <span class="like-count">0</span>
          </div>
        </li>
      `;
        list1.innerHTML += listItem;
    });

    const likeIcons = document.querySelectorAll('.like-icon');
    const likeCounts = document.querySelectorAll('.like-count');

    likeIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            let count = parseInt(likeCounts[index].innerText, 10);
            likeCounts[index].innerText = ++count;
        });
    });
}


fetchData();


function openModal(id) {
    const modal = document.querySelector('#custom-modal');
    const modalContent = modal.querySelector('.modal-content-w');
    const item = data.find(item => item.id === id);

    modalContent.innerHTML = `
      <img src="${item.imgUrl}" alt="Image" class="modal-image">
      <h3 class="modal-title">${item.title}</h3>
      <p class="modal-content">${item.content}</p>
      <span class="modal-tag tag">${item.tag}</span>
      <p class="modal-details">${item.details}</p>
    `;

    modal.style.display = 'block';
}



function closeModal() {
    const modal = document.querySelector('#custom-modal');
    modal.style.display = 'none';
}

document.querySelector('.card-list').addEventListener('click', (event) => {
    if (event.target.closest('.card-item')) {
        const id = parseInt(event.target.closest('.card-item').dataset.id, 10);
        openModal(id);
    }
});

document.querySelector('.close-modal').addEventListener('click', closeModal);

document.querySelector('.close-button').addEventListener('click', closeModal);
