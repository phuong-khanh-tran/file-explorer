
export interface TreeNode {
    id: string,
    name: string,
    isFolder: boolean,
    children?: TreeNode[]
}
export const structure: TreeNode[] = [
    {
        id: "1",
        isFolder: true,
        name: "public",
        children: [
            {
                id: "2",
                isFolder: false,
                name: "index.html",
            }
        ],
    },
    {
        id: "3",
        isFolder: true,
        name: "src",
        children: [
            {
                id: "4",
                isFolder: false,
                name: "App.js",
            },
            {
                id: "5",
                isFolder: false,
                name: "index.js",
            }
        ],
    },
    {
        id: "6",
        isFolder: false,
        name: "package.json",
    }
]