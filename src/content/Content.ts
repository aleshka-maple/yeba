import {getElementByXpath, getXPath} from '../core/utils/xpathUtils';

/**
 * Content-script.
 */
export class Content {

    private oldStyle: string = '';

    constructor () {
        $('body').on('click', this.handleOnClick);
        chrome.runtime.onMessage.addListener(this.handleOnMessage);
    }

    handleOnClick (event) {
        const {tagName} = event.target;
        /** chrome.runtime.sendMessage(string extensionId, any message, object options, function responseCallback) */
        chrome.runtime.sendMessage({
            type: 'element',
            target: {
                tagName,
                xpath: getXPath(event.target).join('/')
            }
        });
    }

    handleOnMessage (message) {
        const element = getElementByXpath(message.target.xpath);
        switch (message.type) {
            case 'show':
                this.oldStyle = $(element).css('background-color');
                $(element).css('background-color', '#00FFFF');
                break;
            case '!show':
                $(element).css('background-color', this.oldStyle);
                this.oldStyle = '';
                break;
        }
    }
}
