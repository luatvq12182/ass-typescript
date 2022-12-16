import { Term } from '../interfaces';

const listToTree = (list: Array<any>, order?: boolean) => {
    let cloneList = [...list];
    let map: any = {};
    let output: any = [];

    cloneList.forEach((item) => {
        map[item.id] = item;
    });

    cloneList.forEach((item) => {
        if (!item.parentId) {
            output.push(map[item.id]);
        } else {
            if (!map[item.parentId].children) {
                map[item.parentId].children = [item];
            } else {
                map[item.parentId].children.push(item);
            }
        }
    });

    if (order) {
        output = output.sort((a: any, b: any) => {
            return a.linkOrder - b.linkOrder;
        });

        output.forEach((link: any) => {
            recursive(link, (value) => {
                if (value?.children) {
                    value.children = value.children.sort(
                        (childA: any, childB: any) => {
                            return childA.linkOrder - childB.linkOrder;
                        }
                    );
                }
            });
        });
    }

    return output;
};

const diffing = (
    orderList: any,
    newList: any,
    callback: (newValue: any) => void,
    newParentId?: number
) => {
    newList.forEach((newLink: any, index: number) => {
        if (newLink.id !== orderList?.[index]?.id) {
            callback({
                ...newLink,
                linkOrder: index + 1,
                children: undefined,
                parentId: newParentId || 0,
                key: undefined,
                label: undefined,
            });
        }

        if (newLink?.children) {
            diffing(
                orderList?.[index]?.children,
                newLink.children,
                callback,
                newLink.id
            );
        }
    });
};

const recursive = (node: any, callback: (value: any) => void) => {
    callback(node);
    if (node?.children) {
        node?.children?.forEach((childNode: any) => {
            recursive(childNode, callback);
        });
    }
};

export { listToTree, diffing, recursive };
