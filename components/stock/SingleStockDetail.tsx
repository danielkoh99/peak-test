export default function SingleStockDetail({ title, data }: { title: string; data: string }) {
    return (
        <div>
            <h3 className="text-sm text-gray-500">{title}</h3>
            <p className="text-lg font-semibold">{data}</p>
        </div>
    );
}