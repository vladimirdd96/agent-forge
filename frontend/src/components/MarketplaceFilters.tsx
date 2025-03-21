export default function MarketplaceFilters() {
  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            className="w-full bg-background border border-border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full bg-background border border-border rounded-md p-2"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {["Trading", "NFT", "DeFi", "Analytics", "Gaming"].map((category) => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="bg-background border border-border rounded"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Capabilities</h3>
        <div className="space-y-2">
          {[
            "Market Analysis",
            "Automated Trading",
            "Portfolio Management",
            "Data Collection",
            "Smart Contract Interaction",
          ].map((capability) => (
            <label key={capability} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="bg-background border border-border rounded"
              />
              <span>{capability}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <div className="space-y-2">
          {["Active", "Inactive", "Running"].map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="bg-background border border-border rounded"
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80">
        Apply Filters
      </button>
    </div>
  );
} 