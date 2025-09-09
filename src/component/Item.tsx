import { FC } from "react";
import { MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TreeNode } from "@/data/DefaultData";
import classNames from "classnames";

interface ItemProps {
    item: TreeNode;
    expandedList: string[];
    toggleExpand: (id: string) => void;
    addNewItem: (parentId: string, isFolder: boolean) => void;
    remove: (id: string) => void;
}

const Item: FC<ItemProps> = ({ item, expandedList, toggleExpand, addNewItem, remove }) => {
    const { id, name, isFolder, children } = item;
    const isExpand = expandedList.includes(id);

    return (
        <div className="flex flex-col text-base">
            <div className="flex items-center gap-1">
                {isFolder && (
                    <MdExpandMore
                        className={classNames("cursor-pointer transition-transform duration-500", {
                            "rotate-180": isExpand,
                        })}
                        onClick={() => toggleExpand(id)}
                    />
                )}
                <div>{name}</div>
                {isFolder && <FiFolderPlus className="cursor-pointer" onClick={() => addNewItem(id, true)} />}
                {isFolder && <AiOutlineFileAdd className="cursor-pointer" onClick={() => addNewItem(id, false)} />}
                <MdDeleteOutline className="cursor-pointer" onClick={() => remove(id)} />
            </div>

            {isExpand && children && children.length > 0 && (
                <ul className="pl-8">
                    {children.map((child) => (
                        <Item
                            item={child}
                            expandedList={expandedList}
                            toggleExpand={toggleExpand}
                            addNewItem={addNewItem}
                            remove={remove}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Item;
