import { getAddress } from '@/common';

//сделать класс, который умеет посылать сообщение и добавлять контент метод
function notifyReady() {
    chrome.runtime.sendMessage({
            type: 'ACTIVITY_HISTORY_READY'
        },
        function (response) {
            console.log(">>>>Response: ", response);
        });
}

(async () => {
    const address:string = await  getAddress();

    if (!!address) {
        notifyReady();
    }
})();




