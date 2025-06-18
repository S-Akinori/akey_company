
interface SubFirstsViewProps {
    backgroundUrl: string;
    title: string;
}

const SubFirstsView = ({ backgroundUrl, title }: SubFirstsViewProps) => {
    return (
        <div
            className="flex items-center justify-center w-full h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
            <h1 className="text-4xl font-bold text-white">{title}</h1>
        </div>
    );
}

export default SubFirstsView;