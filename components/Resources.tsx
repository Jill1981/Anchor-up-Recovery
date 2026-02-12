
import React, { useState } from 'react';
import { CRISIS_RESOURCES, Icons } from '../constants';
import { getSearchResources } from '../services/gemini';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ text: string, links: any[] } | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const data = await getSearchResources(`Find local recovery resources, support groups, or detox centers for: ${searchQuery}`);
      setResults({
        text: data.text,
        links: data.chunks
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-red-500 mr-2"><Icons.AlertCircle /></span> Emergency Hotlines
        </h2>
        <div className="space-y-4">
          {CRISIS_RESOURCES.map((r, i) => (
            <div key={i} className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-red-500">
              <h3 className="font-bold text-gray-800">{r.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{r.description}</p>
              <div className="flex space-x-3">
                <a href={`tel:${r.phone}`} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-bold text-center flex items-center justify-center space-x-2">
                  <Icons.Phone /> <span>Call {r.phone}</span>
                </a>
                <a href={r.url} target="_blank" rel="noopener" className="p-2 border rounded-lg text-gray-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-6 border-t">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Find Local Support</h3>
        <p className="text-sm text-gray-500 mb-4">Search for AA/NA meetings, detox centers, or therapist networks near you.</p>
        <div className="flex space-x-2 mb-4">
          <input 
            type="text" 
            placeholder="City, State or Zip Code..." 
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {results && (
          <div className="bg-gray-50 rounded-xl p-4 border space-y-4">
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{results.text}</div>
            {results.links.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sources</p>
                {results.links.map((chunk: any, i: number) => (
                  chunk.web && (
                    <a key={i} href={chunk.web.uri} target="_blank" rel="noopener" className="block text-blue-600 text-sm hover:underline truncate">
                      {chunk.web.title || chunk.web.uri}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Resources;
