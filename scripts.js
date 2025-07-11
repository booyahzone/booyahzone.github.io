// Game data and their respective script snippets
const gameScripts = {
    'imazing_cheat': {
        title: 'Imazing Anti Ban 3D and HEADSHOT 100/100',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var MUpPt_DSy_kDIgEc={"it":4522829,"key":"60ce2"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/82eb0fc.js' }
            // تأكد مما إذا كان _qd(); يجب أن يكون موجودًا هنا
        ]
    },
    'filza_cheat': {
        title: 'File Filza Anti Ban 3D and Headshot 100/100 VIP Files',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var sHpOO_CRs_iMRkxc={"it":4522810,"key":"4b776"};' },
            { type: 'src', url: 'https://dlk457skl57zp.cloudfront.net/15b7771.js' }
            // تأكد مما إذا كان _qd(); يجب أن يكون موجودًا هنا
        ]
    },
    'ipa_free_fire': {
        title: 'IPA FREE FIRE ANTI BAN 100%',
        scriptsToLoad: [
            { type: 'text/javascript', content: 'var vVcHy_Uiy_tHuoTc={"it":4522819,"key":"8e75c"};' },
            { type: 'src', url: 'https://dfmpe7igjx4jo.cloudfront.net/2bde1d3.js' }
            // تأكد مما إذا كان _qd(); يجب أن يكون موجودًا هنا
        ]
    }
};

// Main page elements
const container = document.querySelector('.container');
const buttonSection = document.getElementById('buttonSection');
const messageArea = document.getElementById('messageArea'); // عنصر جديد للرسائل

// دالة لتوليد الأزرار ديناميكيًا
function generateButtons() {
    buttonSection.innerHTML = ''; // مسح أي أزرار موجودة
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

// دالة لعرض رسالة مؤقتة
function showMessage(msg, duration = 5000) {
    messageArea.textContent = msg;
    messageArea.classList.add('show');
    // إخفاء الرسالة بعد مدة معينة
    setTimeout(() => {
        messageArea.classList.remove('show');
        messageArea.textContent = ''; // مسح المحتوى بعد الإخفاء
    }, duration);
}

// دالة لمعالجة النقر على زر Claim Now
function handleClaimButtonClick(event) {
    const clickedButton = event.currentTarget; // الزر الذي تم النقر عليه
    const gameId = clickedButton.dataset.gameId;
    const scriptsToRun = gameScripts[gameId].scriptsToLoad;

    // تعطيل الزر لمنع النقر المتعدد
    clickedButton.disabled = true;
    clickedButton.textContent = 'Processing...';

    if (scriptsToRun && scriptsToRun.length > 0) {
        const newWindow = window.open('about:blank', '_blank');

        if (newWindow) {
            // قم بكتابة هيكل HTML أساسي للنافذة الجديدة
            // يمكن أن يكون هنا HTML بسيط جدًا إذا كنت لا تريد أي شيء مرئي
            newWindow.document.write('<!DOCTYPE html><html lang="en"><head><title>Loading Script</title></head><body></body></html>');
            newWindow.document.close(); // مهم لإغلاق مستند newWindow والكتابة فيه

            // حقن السكريبتات في النافذة الجديدة
            injectScriptsIntoWindow(newWindow, scriptsToRun, () => {
                // هذا الكولباك يتم تشغيله بعد محاولة حقن جميع السكريبتات
                // إعادة الزر لوضعه الطبيعي بعد فتح النافذة
                clickedButton.disabled = false;
                clickedButton.textContent = 'Claim Now';
                showMessage('The script has been opened in a new window/tab. Check for pop-ups!', 7000);
            });

        } else {
            alert('Pop-up blocked! Please allow pop-ups for this site to claim your cheat.');
            clickedButton.disabled = false;
            clickedButton.textContent = 'Claim Now';
        }
    } else {
        console.warn('No scripts defined for this game ID:', gameId);
        alert('No cheat script available for this selection.');
        clickedButton.disabled = false;
        clickedButton.textContent = 'Claim Now';
    }
}

// دالة لحقن السكريبتات في نافذة معينة
// تم إضافة callbackFunction ليتم تنفيذه بعد الحقن
function injectScriptsIntoWindow(targetWindow, scripts, callbackFunction) {
    if (!targetWindow || !targetWindow.document) {
        console.error('Target window not valid for script injection.');
        if (callbackFunction) callbackFunction();
        return;
    }

    const head = targetWindow.document.head;
    if (!head) {
        console.error('Head element not found in target window.');
        if (callbackFunction) callbackFunction();
        return;
    }

    let scriptsLoadedCount = 0;
    const totalScripts = scripts.length;

    const scriptLoadHandler = () => {
        scriptsLoadedCount++;
        if (scriptsLoadedCount === totalScripts) {
            // كل السكريبتات تم حقنها (وليس بالضرورة تحميلها بالكامل إذا كانت src)
            // الآن نحاول تشغيل _qd()
            setTimeout(() => {
                try {
                    if (typeof targetWindow._qd === 'function') {
                        targetWindow._qd();
                    } else {
                        console.warn('_qd() function not found in the new window context. This might be normal if the external script calls it internally.');
                    }
                } catch (e) {
                    console.error('Error executing _qd() in new window:', e);
                }
                if (callbackFunction) callbackFunction(); // تشغيل الكولباك بعد محاولة تشغيل _qd
            }, 500); // إعطاء بعض الوقت لتحميل السكريبتات الخارجية
        }
    };

    scripts.forEach(script => {
        const scriptEl = targetWindow.document.createElement('script');
        
        if (script.type === 'text/javascript') {
            scriptEl.textContent = script.content;
            head.appendChild(scriptEl);
            scriptLoadHandler(); // يعتبر جاهزًا فورًا للسكريبتات النصية
        } else if (script.type === 'src') {
            scriptEl.src = script.url;
            scriptEl.async = false; // تشغيل متسلسل
            scriptEl.onload = scriptLoadHandler; // عند تحميل السكريبت الخارجي
            scriptEl.onerror = (e) => {
                console.error('Error loading external script:', script.url, e);
                scriptLoadHandler(); // لا تزال تزيد العدد حتى لو فشل التحميل
            };
            head.appendChild(scriptEl);
        }
    });

    // إذا لم يكن هناك سكريبتات، قم بتشغيل الكولباك فورًا
    if (totalScripts === 0 && callbackFunction) {
        callbackFunction();
    }
}

// عند تحميل الصفحة، قم بتوليد الأزرار
document.addEventListener('DOMContentLoaded', generateButtons);
