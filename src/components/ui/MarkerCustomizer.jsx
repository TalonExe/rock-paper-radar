const MarkerCustomizer = ({ size, setSize }) => {
    return (
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="markerSize" className="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="range"
            id="markerSize"
            min="10"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="mt-1 block w-full"
          />
        </div>
      </div>
    );
  };

  export default MarkerCustomizer