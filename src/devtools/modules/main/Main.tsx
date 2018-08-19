import * as React from 'react';
import styles from './main.less';
import {sendMessageToActiveTab} from 'core/utils/chromeApiUtils';
import {EMessageTypes} from 'core/enums';

interface IProps {}

interface IState {
    components: string[]
}

const getDefaultState = () => ({
    components: []
});

export class Main extends React.Component<IProps, IState> {

    state = getDefaultState();

    componentDidMount () {
        chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
            switch (message.type) {
                case 'element':
                    this.setState({
                        components: [
                            ...this.state.components,
                            JSON.stringify(message.target)
                        ]
                    });
                    break;
                default:
                    break;
            }
        });
    }

    handleClear = () => {
        this.setState(getDefaultState())
    };

    handleStart = () => {
        const {components} = this.state;
        sendMessageToActiveTab({
            type: EMessageTypes.CLICK,
            target: JSON.parse(components[0])
        });
    };

    handleMouseOver = (item) => {
        sendMessageToActiveTab({
            type: EMessageTypes.SHOW,
            target: JSON.parse(item)
        });
    };

    handleMouseLeave = (item) => {
        sendMessageToActiveTab({
            type: EMessageTypes.HIDE,
            target: JSON.parse(item)
        });
    };

    render () {
        const {components} = this.state;
        return (
            <div className={styles.bootstrap}>
                <button type="button" onClick={this.handleClear}>Очистить серое полотно</button>
                <h3>Жали сюда:</h3>
                <ul>
                    {
                        components.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onMouseOver={() => this.handleMouseOver(item)}
                                    onMouseLeave={() => this.handleMouseLeave(item)}
                                >
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
                <button type="button" onClick={this.handleStart}>Start!</button>
            </div>
        )
    }
}
