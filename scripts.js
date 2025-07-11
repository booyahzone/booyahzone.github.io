// Game data and their respective script snippets
// تأكد من أن 'id' لكل لعبة فريد!
const gameScripts = {
    'imazing_cheat': { // ID فريد للعبة Imazing
        title: 'Imazing Anti Ban 3D and HEADSHOT 100/100',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var MUpPt_DSy_kDIgEc={"it":4522829,"key":"60ce2"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/82eb0fc.js' }
            // لا يوجد _qd(); هنا في السكريبت الأصلي الذي قدمته، إذا كان يجب أن يكون هناك، أضفه.
        ]
    },
    'filza_cheat': { // ID فريد للعبة Filza
        title: 'File Filza Anti Ban 3D and Headshot 100/100 VIP Files',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var sHpOO_CRs_iMRkxc={"it":4522810,"key":"4b776"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/15b7771.js' }
            // لا يوجد _qd(); هنا في السكريبت الأصلي الذي قدمته، إذا كان يجب أن يكون هناك، أضفه.
        ]
    },
    'ipa_free_fire': { // ID فريد للعبة IPA Free Fire
        title: 'IPA FREE FIRE ANTI BAN 100%',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var vVcHy_Uiy_tHuoTc={"it":4522819,"key":"8e75c"};' },
            { type: 'src', url: 'https://dfmpe7igjx4jo.cloudfront.net/2bde1d3.js' }
            // لا يوجد _qd(); هنا في السكريبت الأصلي الذي قدمته، إذا كان يجب أن يكون هناك، أضفه.
        ]
    }
};

// Main page elements
const container = document.querySelector('.container');
const buttonSection = document.getElementById('buttonSection');

// دالة لتوليد الأزرار ديناميكيًا
function generateButtons() {
    buttonSection.innerHTML = ''; // مسح أي أزرار موجودة (إذا كانت الصفحة تُعاد تحميلها ديناميكيًا)
    for (const gameId in gameScripts) {
        const game = gameScripts[gameId];
        const buttonRow = document.createElement('div');
        buttonRow.className = 'button-row';

        const fileNameSpan = document.createElement('span');
        fileNameSpan.className = 'file-name';
        fileNameSpan.textContent = game.title;

        const claimButton = document.createElement('button');
        claimButton.className = 'claim-button';
        claimButton.textContent = 'Claim Now';
        claimButton.dataset.gameId = gameId; // ربط الزر بـ gameId

        buttonRow.appendChild(fileNameSpan);
        buttonRow.appendChild(claimButton);
        buttonSection.appendChild(buttonRow);
    }

    // أعد إضافة المستمعين للأحداث بعد توليد الأزرار
    attachButtonListeners();
}

// دالة لإرفاق مستمعي الأحداث بالأزرار
function attachButtonListeners() {
    document.querySelectorAll('.claim-button').forEach(button => {
        button.removeEventListener('click', handleClaimButtonClick); // إزالة أي مستمعين سابقين لتجنب التكرار
        button.addEventListener('click', handleClaimButtonClick);
    });
}

// دالة لمعالجة النقر على زر Claim Now
function handleClaimButtonClick(event) {
    const gameId = event.currentTarget.dataset.gameId;
    const scriptsToRun = gameScripts[gameId].scriptsToLoad;

    if (scriptsToRun && scriptsToRun.length > 0) {
        const newWindow = window.open('about:blank', '_blank');

        if (newWindow) {
            // قم بكتابة هيكل HTML أساسي للنافذة الجديدة
            newWindow.document.write('<!DOCTYPE html><html lang="en"><head><title>Loading Script</title></head><body></body></html>');
            newWindow.document.close(); // مهم لإغلاق مستند newWindow والكتابة فيه

            // حقن السكريبتات في النافذة الجديدة
            injectScriptsIntoWindow(newWindow, scriptsToRun);

            // إخفاء قسم الأزرار في الصفحة الأصلية
            buttonSection.style.opacity = '0';
            setTimeout(() => {
                buttonSection.style.display = 'none';
                if (container) {
                    container.innerHTML += '<p style="font-size: 1.2em; color: #fff; margin-top: 30px;">Processing complete. Please check the new window/tab for the script.</p>';
                }
            }, 300);
        } else {
            alert('Pop-up blocked! Please allow pop-ups for this site to claim your cheat.');
        }
    } else {
        console.warn('No scripts defined for this game ID:', gameId);
        alert('No cheat script available for this selection.');
    }
}

// دالة لحقن السكريبتات في نافذة معينة
function injectScriptsIntoWindow(targetWindow, scripts) {
    if (!targetWindow || !targetWindow.document) {
        console.error('Target window not valid for script injection.');
        return;
    }

    const head = targetWindow.document.head;
    if (!head) {
        console.error('Head element not found in target window.');
        return;
    }

    // يتم حقن السكريبتات بترتيبها
    scripts.forEach(script => {
        const scriptEl = targetWindow.document.createElement('script');
        
        if (script.type === 'text/javascript') {
            scriptEl.textContent = script.content;
        } else if (script.type === 'src') {
            scriptEl.src = script.url;
            scriptEl.async = false; // مهم لضمان تحميل السكريبتات بالترتيب
        }
        
        head.appendChild(scriptEl);
    });

    // ملاحظة: إذا كانت دالة _qd() تأتي من أحد السكريبتات الخارجية التي يتم تحميلها (مثل cloudfront.net)،
    // فقد لا تكون متاحة على الفور بعد الحقن. تأخير بسيط قد يساعد.
    // إذا كنت متأكدًا أنها يجب أن تكون متاحة دائمًا، يمكنك إبقاء هذا.
    // بخلاف ذلك، إذا كانت السكريبتات الخارجية هي التي تستدعي _qd() داخليًا، فقد لا تحتاج لهذا الاستدعاء هنا.
    setTimeout(() => {
        try {
            // تحقق مما إذا كانت دالة _qd موجودة في سياق النافذة الجديدة
            if (typeof targetWindow._qd === 'function') {
                targetWindow._qd();
            } else {
                console.warn('_qd() function not found in the new window context. This might be normal if the external script calls it internally.');
            }
        } catch (e) {
            console.error('Error executing _qd() in new window:', e);
        }
    }, 500); // إعطاء بعض الوقت لتحميل السكريبتات الخارجية
}

// عند تحميل الصفحة، قم بتوليد الأزرار
document.addEventListener('DOMContentLoaded', generateButtons);
