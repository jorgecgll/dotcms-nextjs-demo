export function CustomNoComponent({ contentType }) {
    return (
        <div className="relative w-full bg-gray-200 h-12 flex justify-center items-center overflow-hidden">
            There is no component for&nbsp;<strong>{contentType}</strong>&nbsp;content type.
        </div>
    );
}
