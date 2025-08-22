
document.addEventListener('DOMContentLoaded', () => {
  const countInput = document.getElementById('gridCount');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  chrome.storage.sync.get(['gridCount'], (result) => {
    countInput.value = result.gridCount || 3;
  });

  saveBtn.addEventListener('click', () => {
    const count = parseInt(countInput.value);
    if (count >= 1 && count <= 12) {
      chrome.storage.sync.set({ gridCount: count }, () => {
        status.textContent = '设置已保存！';
        setTimeout(() => status.textContent = '', 2000);
        
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
          });
        });
      });
    }
  });
});
