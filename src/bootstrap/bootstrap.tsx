import * as React from 'react';
import styles from './bootstrap.less';
import {map} from 'lodash';

export class Bootstrap extends React.Component {

    state = {
        components: []
    };

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

    execOnActiveTab = (fnToExec) => {
        return chrome.tabs.query({
            active: true,
            currentWindow: true
        }, ([currentTab]) => {
            fnToExec(currentTab)
        });
    };

    handleClick = () => {
        this.setState({
            components: []
        })
    };

    handleMouseOver = (item) => {
        this.execOnActiveTab((tab) => {
            chrome.tabs.sendMessage(
                tab.id,
                {
                    type: 'show',
                    target: JSON.parse(item)
                }
            )
        });
    };

    handleMouseLeave = (item) => {
        this.execOnActiveTab((tab) => {
            chrome.tabs.sendMessage(
                tab.id,
                {
                    type: '!show',
                    target: JSON.parse(item)
                }
            )
        });
    };

    render () {
        const {components} = this.state;
        return (
            <div className={styles.bootstrap}>
                <button type="button" onClick={this.handleClick}>Очистить серое полотно</button>
                <h3>Жали сюда:</h3>
                <ul>
                    {
                        map(components, (item, index) => {
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
            </div>
        )
    }
}
