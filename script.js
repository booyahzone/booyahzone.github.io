// Game data and their respective script snippets
const gameScripts = {
    'imazing': {
        title: 'Imazing Anti Ban 3D and HEADSHOT 100/100',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var MUpPt_DSy_kDIgEc={"it":4522829,"key":"60ce2"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/82eb0fc.js' }
        ]
    },
    'filza': {
        title: 'File Filza Anti Ban 3D and Headshot 100/100 VIP Files',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var sHpOO_CRs_iMRkxc={"it":4522810,"key":"4b776"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/15b7771.js' }
        ]
    },
    'free_fire_anti_ban': {
        title: 'IPA FREE FIRE ANTI BAN 100%',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var vVcHy_Uiy_tHuoTc={"it":4522819,"key":"8e75c"};' },
            { type: 'src', url: 'https://dfmpe7igjx4jo.cloudfront.net/2bde1d3.js' }
        ]
    }
    // يمكنك إضافة المزيد من قفول المحتوى هنا بنفس التنسيق
};

// Main page elements
const container = document.querySelector('.container');
const buttonSection = document.getElementById('buttonSection');
const verificationArea = document.getElementById('verificationArea');
const downloadLinkWrapper = document.getElementById('downloadLinkWrapper');
const contentLocker = document.getElementById('contentLocker');

let currentScriptsToLoad = null;

// Fill game titles and create buttons when the page loads
document.addEventListener('DOMContentLoaded', function() {
    buttonSection.innerHTML = ''; // Clear existing buttons if any
    for (const gameId in gameScripts) {
        const gameData = gameScripts[gameId];
        
        const buttonRow = document.createElement('div');
        buttonRow.classList.add('button-row');

        const fileNameSpan = document.createElement('span');
        fileNameSpan.classList.add('file-name');
        fileNameSpan.textContent = gameData.title;

        const claimButton = document.createElement('button');
        claimButton.classList.add('claim-button');
        claimButton.dataset.gameId = gameId;
        claimButton.textContent = 'Claim Now';

        buttonRow.appendChild(fileNameSpan);
        buttonRow.appendChild(claimButton);
        buttonSection.appendChild(buttonRow);
    }

    // Add event listeners to newly created "Claim Now" buttons
    document.querySelectorAll('.claim-button').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.dataset.gameId;
            currentScriptsToLoad = gameScripts[gameId].scriptsToLoad;
            startVerificationProcess();
        });
    });
});

// Start the verification process
function startVerificationProcess() {
    // Hide the button section
    buttonSection.style.opacity = '0';
    setTimeout(() => {
        buttonSection.style.display = 'none';
        
        // Show the verification area
        verificationArea.style.display = 'flex';
        verificationArea.classList.add('show');

        // Simulate verification process (2 seconds)
        setTimeout(() => {
            verificationComplete();
        }, 2000);
    }, 300);
}

// After verification is complete
function verificationComplete() {
    // Hide the verification area
    verificationArea.classList.remove('show');
    setTimeout(() => {
        verificationArea.style.display = 'none';
        
        // Show the download button
        downloadLinkWrapper.style.display = 'flex';
        downloadLinkWrapper.classList.add('show');
    }, 300);
}

// When the final download button is clicked
document.getElementById('finalDownloadButton').addEventListener('click', function() {
    // Remove all elements from the page
    container.innerHTML = '';
    
    // Show only the content locker area
    contentLocker.style.display = 'block';
    contentLocker.classList.add('show');
    
    // Inject and execute the scripts
    injectScripts(currentScriptsToLoad);
});

// Inject and execute scripts
function injectScripts(scripts) {
    scripts.forEach(script => {
        const scriptEl = document.createElement('script');
        
        if (script.type === 'text/javascript') {
            scriptEl.text = script.content;
            if (script.runOnLoad) {
                scriptEl.onload = function() {
                    try {
                        eval(script.content);
                    } catch (e) {
                        console.error('Error executing script:', e);
                    }
                };
            }
        } else if (script.type === 'src') {
            scriptEl.src = script.url;
        }
        
        document.head.appendChild(scriptEl);
    });
    
    // Execute the page-opening function after the scripts have loaded
    setTimeout(() => {
        try {
            if (typeof _qd === 'function') {
                _qd();
            }
        } catch (e) {
            console.error('Error executing _qd():', e);
        }
    }, 500);
}
