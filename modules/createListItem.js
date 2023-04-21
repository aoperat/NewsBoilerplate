export function createListItem(item) {
    const listItem = `
      <li class="card-item" data-id="${item.id}">
        <img src="${item.imgUrl}" alt="Image">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.content}</p>
          <div class="tags">
            ${item.tag.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="card-like">
          <span class="like-icon">❤️</span>
          <span class="like-count">0</span>
        </div>
      </li>`;
    return listItem;
  }
  