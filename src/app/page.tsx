import FileExplorer from "@/view/FileExplorer";

export default function Home() {
    return (
        <div className="w-screen h-screen flex justify-center overflow-y-auto">
            <FileExplorer />
        </div>
    );
}
