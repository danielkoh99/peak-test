export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
    );
}