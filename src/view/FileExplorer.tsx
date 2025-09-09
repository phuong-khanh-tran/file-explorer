"use client";

import Button from "@/component/Button";
import { Input } from "@/component/Input";
import Item from "@/component/Item";
import { structure, TreeNode } from "@/data/DefaultData";
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FileExplorer: FC = () => {
    const [dataTree, setDataTree] = useState<TreeNode[]>(structure);
    const [expandedList, setExpandedList] = useState<string[]>([]);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState<{ parentId: string; isFolder: boolean } | null>(null);
    const [inputText, setInputText] = useState<string>("");

    const toggleExpand = (id: string) => {
        if (expandedList.includes(id)) {
            setExpandedList((prev) => prev.filter((itemId) => itemId != id));
        } else {
            setExpandedList((prev) => [...prev, id]);
        }
    };

    const openModal = (parentId: string, isFolder: boolean) => {
        setModalInfo({ parentId, isFolder });
        setOpenModal(true);
    };

    const onCancel = () => {
        setModalInfo(null);
        setInputText("");
        setOpenModal(false);
    };

    const addNewItem = () => {
        if (!modalInfo || !inputText.trim()) return;

        const { parentId, isFolder } = modalInfo;
        const newId = uuidv4();
        const newItem = { id: newId, isFolder: isFolder, name: inputText };

        const insertItem = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((node) => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: node.children ? [...node.children, newItem] : [newItem],
                    };
                }
                if (node.children) {
                    return {
                        ...node,
                        children: insertItem(node.children),
                    };
                }
                return node;
            });
        };

        setDataTree((prev) => insertItem(prev));
        onCancel();
    };

    const remove = (id: string) => {
        const removeItem = (nodes: TreeNode[]): TreeNode[] => {
            return nodes
                .filter((node) => node.id !== id)
                .map((node) => ({
                    ...node,
                    children: node.children ? removeItem(node.children) : node.children,
                }));
        };

        setDataTree((prev) => removeItem(prev));
    };

    return (
        <div className="flex flex-col gap-3 p-4">
            <ul>
                {dataTree.map((node) => {
                    return (
                        <Item
                            key={node.id}
                            item={node}
                            expandedList={expandedList}
                            toggleExpand={toggleExpand}
                            addNewItem={openModal}
                            remove={remove}
                        />
                    );
                })}
            </ul>

            {isOpenModal && modalInfo && (
                <div className="flex flex-col gap-1">
                    <div className="text-base">Enter {modalInfo.isFolder ? "Folder" : "File"} name</div>
                    <Input value={inputText} onChange={(e) => setInputText(e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                        <Button role="button" onClick={() => addNewItem()}>
                            Add
                        </Button>
                        <Button role="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileExplorer;
