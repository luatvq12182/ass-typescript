// function listToTree(list: Array<any>) {
//     list = [...list];

//     let map = {},
//         node,
//         roots = [],
//         i;

//     for (i = 0; i < list.length; i += 1) {
//         if (list[i].id) {
//             map[list[i].id] = i; // initialize the map
//             list[i].children = []; // initialize the children
//         }
//     }

//     for (i = 0; i < list.length; i += 1) {
//         node = list[i];
//         if (node.parentId !== '0') {
//             // if you have dangling branches check that map[node.parentId] exists
//             list[map[node.parentId]].children.push(node);
//         } else {
//             roots.push(node);
//         }
//     }
//     return roots;
// }

const listToTree = (list: Array<any>) => {
    const cloneList = [...list];
    const map: any = {};
    const output: any = [];

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

    return output;
};

export { listToTree };
