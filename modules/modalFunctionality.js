export function modalFunctionality(data) {
    function openModal(id) {
        const modal = document.querySelector('#custom-modal');
        const modalContent = modal.querySelector('.modal-content-w');
        const item = data.find(item => item.id === id);

        modalContent.innerHTML = `
        <img src="${item.imgUrl}" alt="Image" class="modal-image">
        <h3 class="modal-title">${item.title}</h3>
        <p class="modal-content">${item.content}</p>
        <div class="tags">
                ${item.tag.map(t => `<span class="modal-tag tag">${t}</span>`).join('')}
              </div>
        <p class="modal-details">${item.details}</p>
      `;

        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.querySelector('#custom-modal');
        modal.style.display = 'none';
    }

    document.querySelector('.card-list').addEventListener('click', (event) => {
        if (event.target.closest('.card-item') && !event.target.closest('.card-like')) {
            const id = parseInt(event.target.closest('.card-item').dataset.id, 10);
            openModal(id);
        }
    });

    document.querySelector('.close-modal').addEventListener('click', closeModal);

    document.querySelector('.close-button').addEventListener('click', closeModal);
}

