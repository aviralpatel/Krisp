document.getElementById('activate').addEventListener('click', function() {
    chrome.tabs.create({ url: 'index.html' });
});
