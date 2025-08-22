
function applyGridSettings(count) {
  const style = document.createElement('style');
  style.id = 'youtube-grid-custom-style';
  style.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${count} !important;
    }
  `;
  document.head.appendChild(style);
}

chrome.storage.sync.get(['gridCount'], (result) => {
  const count = result.gridCount || 3;
  applyGridSettings(count);
  
  const observer = new MutationObserver(() => {
    if (!document.getElementById('youtube-grid-custom-style')) {
      applyGridSettings(count);
    }
  });
  
  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
});
