import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Search = ({ value, onChange, placeholder = "Buscar..." }: SearchProps) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition-all"
      />
    </div>
  );
};

export default Search;
