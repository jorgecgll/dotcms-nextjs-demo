"use client";

import { useState } from "react";
import { X, Search, Loader2, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchContent } from "@/utils/searchAPI";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        
        try {
            console.log("Searching for:", searchQuery);
            
            const results = await searchContent(searchQuery, "Blog", 10);
            setSearchResults(results);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSearchQuery("");
        setSearchResults([]);
        setHasSearched(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-background border border-border rounded-lg shadow-lg">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="p-4">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none"
                                    autoFocus
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={!searchQuery.trim() || isLoading}
                                className="px-6"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Search"
                                )}
                            </Button>
                        </div>
                        
                        {/* Ask AI Suggestion */}
                        {searchQuery.trim() && (
                            <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                                <Sparkles className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    Ask AI <span className="text-foreground">{searchQuery}</span>
                                </span>
                                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                                    <span>Start conversation</span>
                                    <span>↗</span>
                                </div>
                            </div>
                        )}
                    </div>
                </form>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                    {hasSearched && (
                        <div className="p-4 border-t border-border">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    <span className="ml-2 text-muted-foreground">Searching...</span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                    </p>
                                    {searchResults.map((result, index) => (
                                        <Link 
                                            key={index}
                                            href={result.url}
                                            onClick={handleClose}
                                            className="group block p-3 border rounded-md hover:bg-gray-100 hover:!border-gray-400 cursor-pointer transition-colors"
                                        >
                                            <div className="text-xs text-muted-foreground/70 font-medium mb-1">
                                                {result.contentType}
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Globe className="h-4 w-4 text-muted-foreground/70 group-hover:text-muted-foreground" />
                                                <h3 className="text-base font-medium text-foreground">
                                                    {result.title}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-sm text-muted-foreground line-clamp-1">
                                                {result.matches && result.matches.length > 0 
                                                    ? result.matches[0].extractedText 
                                                    : result.excerpt
                                                }
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">No results found</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
