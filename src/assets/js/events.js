// Importing helpers module from './helpers.js'
import helpers from './helpers.js';

// Event listener for window load event
window.addEventListener('load', () => {
    // Event listener for clicking the chat icon
    document.querySelector('#toggle-chat-pane').addEventListener('click', (e) => {
        // Toggle chat pane visibility and adjust main section width
        let chatElem = document.querySelector('#chat-pane');
        let mainSecElem = document.querySelector('#main-section');

        if (chatElem.classList.contains('chat-opened')) {
            chatElem.setAttribute('hidden', true);
            mainSecElem.classList.remove('col-md-9');
            mainSecElem.classList.add('col-md-12');
            chatElem.classList.remove('chat-opened');
        } else {
            chatElem.attributes.removeNamedItem('hidden');
            mainSecElem.classList.remove('col-md-12');
            mainSecElem.classList.add('col-md-9');
            chatElem.classList.add('chat-opened');
        }

        // Remove 'New' badge on chat icon after chat is opened
        setTimeout(() => {
            if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });

    // Event listener for clicking the video frame to enable picture-in-picture
    document.getElementById('local').addEventListener('click', () => {
        // Toggle picture-in-picture mode
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
                .catch(error => {
                    // Video failed to enter Picture-in-Picture mode
                    console.error(error);
                });
        } else {
            document.exitPictureInPicture()
                .catch(error => {
                    // Video failed to leave Picture-in-Picture mode
                    console.error(error);
                });
        }
    });

    // Event listener for clicking the 'Create room' button
    document.getElementById('create-room').addEventListener('click', (e) => {
        e.preventDefault();

        let roomName = document.querySelector('#room-name').value;
        let yourName = document.querySelector('#your-name').value;

        if (roomName && yourName) {
            // Remove error message if any
            document.querySelector('#err-msg').innerText = "";

            // Save user's name in sessionStorage
            sessionStorage.setItem('username', yourName);

            // Create room link
            let roomLink = `${location.origin}?room=${roomName.trim().replace(' ', '_')}_${helpers.generateRandomString()}`;

            // Show message with link to room
            document.querySelector('#room-created').innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to Join. 
                Share the room link with your partners.`;

            // Empty the values
            document.querySelector('#room-name').value = '';
            document.querySelector('#your-name').value = '';
        } else {
            // Show error message if fields are empty
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    });

    // Event listener for clicking the 'Enter room' button
    document.getElementById('enter-room').addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if (name) {
            // Remove error message if any
            document.querySelector('#err-msg-username').innerText = "";

            // Save user's name in sessionStorage
            sessionStorage.setItem('username', name);

            // Reload room
            location.reload();
        } else {
            // Show error message if username field is empty
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    });

    // Event listener for clicking on elements with class 'expand-remote-video' or 'mute-remote-mic'
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            // Maximize remote video
            helpers.maximiseStream(e);
        } else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            // Toggle mute for remote microphone
            helpers.singleStreamToggleMute(e);
        }
    });

    // Event listener for clicking the 'closeModal' element
    document.getElementById('closeModal').addEventListener('click', () => {
        // Close recording options modal
        helpers.toggleModal('recording-options-modal', false);
    });
});
    