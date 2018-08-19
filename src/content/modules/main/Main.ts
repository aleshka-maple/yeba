import {getElementByXpath, getXPath} from 'core/utils/xpathUtils';
import {EMessageTypes} from 'core/enums';

/**
 * Main message service.
 */
export class Main {

    private oldStyle: string = '';

    constructor () {
        $('body').on('click', this.handleOnClick);
        chrome.runtime.onMessage.addListener(this.handleOnMessage);
    }

    handleOnClick = (event) => {
        const {tagName} = event.target;
        /** chrome.runtime.sendMessage(string extensionId, any message, object options, function responseCallback) */
        chrome.runtime.sendMessage({
            type: 'element',
            target: {
                tagName,
                xpath: getXPath(event.target).join('/')
            }
        });
    };

    handleOnMessage = (message) => {
        const element = getElementByXpath(message.target.xpath);
        switch (message.type) {
            case EMessageTypes.SHOW:
                this.oldStyle = $(element).css('borderColor');
                $(element).css('borderColor', '#00FFFF');
                break;
            case EMessageTypes.HIDE:
                $(element).css('borderColor', this.oldStyle);
                this.oldStyle = '';
                break;
            case EMessageTypes.CLICK:
                $(element).trigger('click');
                break;
        }
    }
}
