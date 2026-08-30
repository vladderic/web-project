// ============================================
// All four interactions from the project brief
// ============================================

// ============================================
// Interaction 1: Like a Build
// ============================================
const galleryGrid = document.getElementById('gallery-grid');
const likeButtons = document.querySelectorAll('.like-btn');

// Toggles the liked state and updates the like count for a single build.
function likeBuild(event) {
  const likeButton = event.currentTarget;
  const likeCount = likeButton.querySelector('.like-count');
  let count = parseInt(likeCount.textContent, 10);
  likeButton.classList.toggle('liked');
  likeButton.classList.contains('liked') ? count++ : count--;
  likeCount.textContent = count;
}

likeButtons.forEach(button => button.addEventListener('click', likeBuild));

// ============================================
// Interaction 2: Post a Comment
// ============================================
const commentForms = document.querySelectorAll('.comment-form');

// Adds a new comment to a build's comment list and clears the form inputs.
function postComment(event) {
  const form = event.currentTarget;
  const name = form.querySelector('.comment-name').value.trim() || 'Anonymous';
  const message = form.querySelector('.comment-input').value.trim();
  if (!message) return;

  const commentList = form.previousElementSibling;
  const newComment = document.createElement('li');
  newComment.className = 'comment-item';
  const nameTag = document.createElement('strong');
  nameTag.textContent = name + ': ';
  newComment.appendChild(nameTag);
  newComment.appendChild(document.createTextNode(message));
  commentList.appendChild(newComment);

  form.querySelector('.comment-name').value = '';
  form.querySelector('.comment-input').value = '';
}

commentForms.forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  postComment(event);
}));

// ============================================
// Interaction 3: Submit Your Build
// ============================================
const buildForm = document.getElementById('build-form');
const confirmationMessage = document.getElementById('confirmation-msg');

// Creates a new build card in the gallery from the submitted form values.
function submitBuild(event) {
  event.preventDefault();
  const title = document.getElementById('build-title').value.trim();
  const image = document.getElementById('build-image').value.trim();
  const owner = document.getElementById('build-owner').value.trim();
  const story = document.getElementById('build-story').value.trim();
  const category = document.getElementById('build-category').value;

  const newCard = document.createElement('article');
  newCard.className = 'build-card';
  newCard.dataset.category = category;

  const cardImage = document.createElement('img');
  cardImage.className = 'build-image';
  cardImage.src = image;
  cardImage.alt = 'A submitted car build by ' + owner;

  const buildInfo = document.createElement('div');
  buildInfo.className = 'build-info';
  const buildTitle = document.createElement('h3');
  buildTitle.className = 'build-title';
  buildTitle.textContent = title;
  const buildOwner = document.createElement('span');
  buildOwner.className = 'build-owner';
  buildOwner.textContent = 'by ' + owner;
  const buildStory = document.createElement('p');
  buildStory.className = 'build-story';
  buildStory.textContent = story;
  buildInfo.append(buildTitle, buildOwner, buildStory);

  const reactions = document.createElement('div');
  reactions.className = 'reactions';
  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.className = 'like-btn';
  likeButton.setAttribute('aria-label', 'Like this build');
  likeButton.innerHTML = '👍 <span class="like-count">0</span>';
  reactions.appendChild(likeButton);

  const comments = document.createElement('div');
  comments.className = 'comments';
  const commentList = document.createElement('ul');
  commentList.className = 'comment-list';
  const commentForm = document.createElement('form');
  commentForm.className = 'comment-form';
  commentForm.innerHTML = `
    <input type="text" class="comment-name" placeholder="Your name" aria-label="Your name">
    <input type="text" class="comment-input" placeholder="Add a comment..." aria-label="Add a comment">
    <button type="submit" class="btn btn-primary post-btn">Post</button>
  `;
  comments.append(commentList, commentForm);

  newCard.append(cardImage, buildInfo, reactions, comments);
  galleryGrid.appendChild(newCard);

  likeButton.addEventListener('click', likeBuild);
  commentForm.addEventListener('submit', event => {
    event.preventDefault();
    postComment(event);
  });

  buildForm.reset();
  confirmationMessage.hidden = false;
}

buildForm.addEventListener('submit', submitBuild);

// ============================================
// Interaction 4: Filter Builds by Category
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');

// Shows builds matching the selected category and highlights the active filter.
function filterBuilds(event) {
  const selectedCategory = event.currentTarget.dataset.category;
  const buildCards = galleryGrid.querySelectorAll('.build-card');

  buildCards.forEach(card => {
    card.classList.toggle('hidden', selectedCategory !== 'all' && card.dataset.category !== selectedCategory);
  });

  filterButtons.forEach(button => {
    const isActive = button === event.currentTarget;
    button.classList.toggle('active-filter', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

filterButtons.forEach(button => button.addEventListener('click', filterBuilds));
