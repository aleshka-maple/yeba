import Tab = chrome.tabs.Tab;
import {IMessageToContent} from 'core/models';

export function execWithActiveTab (fnToExec: (tab: Tab) => void) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, ([currentTab]) => {
        fnToExec(currentTab)
    });
}

export function sendMessageToActiveTab (message: IMessageToContent) {
    execWithActiveTab((tab) => chrome.tabs.sendMessage(tab.id, message));
}
