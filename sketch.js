/**
 * Copyright 2018 Jonathan Boulenaz
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Shortcuts to DOM Elements.
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('new-post-message');
var titleInput = document.getElementById('new-post-title');
var signInButton = document.getElementById('sign-in-button');
var splashPage = document.getElementById('page-splash');
var addPost = document.getElementById('add-post');
var addButton = document.getElementById('add');
var recentPostsSection = document.getElementById('recent-posts-list');
var userPostsSection = document.getElementById('user-posts-list');
var topUserPostsSection = document.getElementById('top-user-posts-list');
var recentMenuButton = document.getElementById('menu-recent');

/**
 * Saves a new post to the Firebase DB.
 */
// [START write_fan_out]
function writeNewPost(uid, username, title, body) {
  // A post entry.
  var postData = {
    //author: username,
    uid: uid,
    body: body,
    title: title,
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
// [END write_fan_out]

/**
 * Creates a post element.
 */
function createPostElement(postId, title, text, author) {
  var uid = firebase.auth().currentUser.uid;

  var html =
      '<div class="post mdl-cell mdl-cell--12-col ' +
                  'mdl-cell--6-col-tablet mdl-cell--4-col-desktop mdl-grid mdl-grid--no-spacing">' +
        '<div class="mdl-card mdl-shadow--2dp">' +
          '<div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">' +
            '<h4 class="mdl-card__title-text"></h4>' +
          '</div>' +
          // '<button>ksk</button>'
          // '<div class="header">' +
          // '</div>' +
          // '<span class="star">' +
          // '</span>' +
          '<div class="text"></div>' +
          // '<div class="comments-container"></div>' +
          // '<form class="add-comment" action="#">' +
            '<div class="mdl-textfield mdl-js-textfield">' +
            '<br>' +
            '<br>' +
            '<button class="mdl-button mdl-js-button mdl-button--fab mdl-color--red mdl-shadow--4dp mdl-js-ripple-effect" id="add">REC</button>'
            '</div>' +
          // '</form>' +
        '</div>' +
      '</div>';

  // Create the DOM element from the HTML.
  var div = document.createElement('div');
  div.innerHTML = html;
  var postElement = div.firstChild;
  componentHandler.upgradeElements(postElement.getElementsByClassName('mdl-textfield')[0]);


  // Set values.
  postElement.getElementsByClassName('text')[0].innerText = text;
  postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = title;

  return postElement;
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
  // [START my_top_posts_query]
  var myUserId = firebase.auth().currentUser.uid;
  //var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  // [END my_top_posts_query]
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // [END recent_posts_query]
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef, sectionElement) {
    postsRef.on('child_added', function(data) {
      var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
      containerElement.insertBefore(
          createPostElement(data.key, data.val().title, data.val().body, data.val().author),
          containerElement.firstChild);
    });
  };

  fetchPosts(recentPostsRef, recentPostsSection);
  fetchPosts(userPostsRef, userPostsSection);
}

/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    //username: name,
    email: email
  });
}
// [END basic_write]

// Bindings on load.
window.addEventListener('load', function() {
  // Bind Sign in button.
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      splashPage.style.display = 'none';
      writeUserData(user.uid, user.displayName, user.email);
      startDatabaseQueries();
    } else {
      splashPage.style.display = 'block';
    }
  });

  // Saves message on form submit.
  messageForm.onsubmit = function(e) {
    e.preventDefault();
    if (messageInput.value && titleInput.value) {
      var postText = messageInput.value;
      messageInput.value = '';
      // [START single_value_read]
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        //var username = snapshot.val().username;
        // [START_EXCLUDE]
        writeNewPost(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName,
            titleInput.value, postText).then(function() {
              //myPostsMenuButton.click();
              recentMenuButton.onclick();
            });
        // [END_EXCLUDE]
      });
      // [END single_value_read]
    }

  };

  // Bind menu buttons.
  recentMenuButton.onclick = function() {
    recentPostsSection.style.display = 'block';
    userPostsSection.style.display = 'none';
    topUserPostsSection.style.display = 'none';
    addPost.style.display = 'none';
    recentMenuButton.classList.add('is-active');
  };

  addButton.onclick = function() {
    recentPostsSection.style.display = 'none';
    userPostsSection.style.display = 'none';
    topUserPostsSection.style.display = 'none';
    addPost.style.display = 'block';
    recentMenuButton.classList.remove('is-active');
    messageInput.value = '';
    titleInput.value = '';
  };
  recentMenuButton.onclick();
}, false);
