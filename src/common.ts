export const getAddress = (): Promise<string> => {
    return new Promise<string>(resolve => {
        chrome.storage.sync.get("address", res => {
            resolve(res?.["address"] ? res["address"] : "");
        });
    });
};
