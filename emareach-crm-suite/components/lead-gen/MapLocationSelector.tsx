'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Globe, Check, X, RotateCcw } from 'lucide-react';
import { LocationTarget, geocodingService } from '@/lib/lead-engine/geocoding-service';

interface MapLocationSelectorProps {
  selectedLocation: LocationTarget | null;
  onSelectLocation: (loc: LocationTarget | null) => void;
  className?: string;
}

export function MapLocationSelector({
  selectedLocation,
  onSelectLocation,
  className = '',
}: MapLocationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationTarget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const presets = geocodingService.getPresets();

  // Debounced geocoding search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await geocodingService.searchLocations(searchQuery);
        setSuggestions(results);
        setShowDropdown(true);
      } catch (err) {
        console.error('Location search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelect = (loc: LocationTarget) => {
    onSelectLocation(loc);
    setSearchQuery(loc.displayName);
    setShowDropdown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!showDropdown) setShowDropdown(true);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Input Bar with Autocomplete */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-indigo-600 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search country, state, city (e.g. Minnesota, California, Texas, United States)..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (suggestions.length === 0) setSuggestions(presets);
              setShowDropdown(true);
            }}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 shadow-xs focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowDropdown(false);
                onSelectLocation(null);
              }}
              className="absolute right-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute z-30 left-0 right-0 mt-1.5 rounded-xl border border-slate-200 bg-white shadow-xl max-h-64 overflow-y-auto divide-y divide-slate-100 text-slate-900">
            <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/50 flex items-center justify-between">
              <span>{isLoading ? 'Searching Locations...' : 'Geographic Matches'}</span>
              <Globe className="w-3.5 h-3.5 text-slate-500" />
            </div>
            {suggestions.map((loc, idx) => (
              <button
                key={`${loc.displayName}-${idx}`}
                type="button"
                onClick={() => handleSelect(loc)}
                className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 truncate">
                      {loc.displayName}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {loc.state ? `${loc.state}, ` : ''}
                      {loc.country}
                    </p>
                  </div>
                </div>
                {selectedLocation?.displayName === loc.displayName && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Preset Location Quick Pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
          Presets:
        </span>
        {presets.slice(0, 5).map((preset: any) => {
          const isSelected = selectedLocation?.state === preset.state && selectedLocation?.country === preset.country;
          return (
            <button
              key={preset.displayName}
              type="button"
              onClick={() => handleSelect(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <MapPin className="w-3 h-3 text-indigo-600" />
              <span>{preset.state ? `${preset.state} (${preset.stateCode || ''})` : preset.country}</span>
            </button>
          );
        })}
      </div>

      {/* Active Selected Location Display Card */}
      {selectedLocation ? (
        <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between text-slate-900">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Active Search Target
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">
                {selectedLocation.displayName}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectLocation(null);
              setSearchQuery('');
            }}
            className="px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            title="Clear target location"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 flex items-center gap-2.5 text-slate-500 text-xs">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span>No location selected. Search or click a preset above.</span>
        </div>
      )}
    </div>
  );
}

