export function getXPath(node: Node, path?: string[]): string[] {
    let count = 0;
    path = path || [];

    if (node.parentNode) {
        path = getXPath(node.parentNode, path);
    }

    if(node.previousSibling) {
        count = 1;
        let sibling = node.previousSibling;
        do {
            if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
                count++;
            }
            sibling = sibling.previousSibling;
        } while (sibling);

        if (count === 1) {
            count = null;
        }
    } else if (node.nextSibling) {
        let sibling = node.nextSibling;
        do {
            if(sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
                count = 1;
                sibling = null;
            } else {
                count = null;
                sibling = sibling.previousSibling;
            }
        } while(sibling);
    }

    if(node.nodeType === 1) {
        const id = node.attributes.getNamedItem('id');
        path.push(node.nodeName.toLowerCase() + (id ? "[@id='" + id + "']" : count > 0 ? '['+count+']' : ''));
    }
    return path;
}

export function getElementByXpath(path: string) {
    return document.evaluate(`//${path}`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
