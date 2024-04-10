import { basicRefType } from "./refBase";
import { Otbaldy } from "./otbaldy";
import { Otbaldy2 } from "./otbaldy2";

export type treeNode<dataType> = {
    data: dataType | null;
    nodes: {
        [key: string]: treeNode<dataType>,
    },
}

type refTreeNode = treeNode<basicRefType>;


export const allRefsArray = [
    Otbaldy,
    Otbaldy2,
] as basicRefType[];

export let allRefs = {nodes: {}} as refTreeNode;

for (const ref of allRefsArray) {
    let node = allRefs;

    // перебор типов источника по порядку
    for (const type of ref.type) {
        // если тип есть в ноде
        if (type in node) {
            // перейти в неё
            node = node.nodes[type];
        } else {
            // иначе создать тип в ноде и затем перейти в него
            node = node.nodes[type] = {
                data: null,
                nodes: {},
            } as refTreeNode;
        }
    }

    // на данный момент в node содержится нода, соответствующая источнику
    // если в ней уже содержатся данные, то данный тип источника дублируется
    if (node.data) {
        console.warn('Возможно, источник дублируется', node.data, ref);
    }

    // записать источник в данные этой ноды
    node.data = ref;
}
