export function likeFunctionality() {
    const likeIcons = document.querySelectorAll('.like-icon');
    const likeCounts = document.querySelectorAll('.like-count');
  
    likeIcons.forEach((icon, index) => {
      icon.addEventListener('click', () => {
        let count = parseInt(likeCounts[index].innerText, 10);
        likeCounts[index].innerText = ++count;
      });
    });
  }
  