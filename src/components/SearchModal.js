"use client";

import { useState } from "react";
import { Search, Loader2, Globe, Sparkles } from "lucide-react";
import { searchContent, generateAIResponse } from "@/utils/searchAPI";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentView, setCurrentView] = useState('search'); // 'search' or 'ai'
    const [aiResponse, setAiResponse] = useState("");
    const [aiSources, setAiSources] = useState([]);

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

    const handleAIChat = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        
        try {
            console.log("Asking AI:", searchQuery);
            
            const { response, sources } = await generateAIResponse(searchQuery);
            setAiResponse(response);
            setAiSources(sources);
        } catch (error) {
            console.error("AI chat error:", error);
            setAiResponse("Sorry, I couldn't generate a response. Please try again.");
            setAiSources([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setSearchQuery("");
        setSearchResults([]);
        setHasSearched(false);
        setAiResponse("");
        setAiSources([]);
        setCurrentView('search'); // Reset to search view
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
            <div className="relative w-full max-w-2xl max-h-[80vh] bg-background border border-border rounded-lg shadow-lg flex flex-col">
                {/* Search Form - only show in search view */}
                {currentView === 'search' && (
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
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        type="submit"
                                        onClick={() => setCurrentView('search')}
                                        disabled={isLoading}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                                            currentView === 'search' 
                                                ? 'bg-white text-foreground shadow-sm' 
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Search className="h-4 w-4" />
                                                Search
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentView('ai')}
                                        disabled={isLoading}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                                            currentView === 'ai' 
                                                ? 'bg-white text-foreground shadow-sm' 
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        Ask AI
                                    </button>
                                </div>
                            </div>
                            
                            {/* Ask AI Suggestion - only show in search view */}
                            {searchQuery.trim() && (
                                <div 
                                    onClick={() => setCurrentView('ai')}
                                    className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                                >
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
                )}

                {/* AI View Header - only show in AI view */}
                {currentView === 'ai' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">Ask AI</h2>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    type="button"
                                    onClick={() => setCurrentView('search')}
                                    disabled={isLoading}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                                        currentView === 'search' 
                                            ? 'bg-white text-foreground shadow-sm' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <Search className="h-4 w-4" />
                                    Search
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentView('ai')}
                                    disabled={isLoading}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                                        currentView === 'ai' 
                                            ? 'bg-white text-foreground shadow-sm' 
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <Sparkles className="h-4 w-4" />
                                    Ask AI
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* AI Chat Form - show when AI view is selected */}
                {currentView === 'ai' && (
                    <div className="p-4">
                        {/* AI Empty State */}
                        {!hasSearched && (
                            <div className="text-center py-8">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Hi! 👋</h3>
                                    <p className="text-muted-foreground">How can I help you today?</p>
                                </div>
                                
                                {/* Example Questions */}
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setSearchQuery("How do I get started?")}
                                        className="block w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm text-foreground"
                                    >
                                        How do I get started?
                                    </button>
                                    <button 
                                        onClick={() => setSearchQuery("What are the best practices?")}
                                        className="block w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm text-foreground"
                                    >
                                        What are the best practices?
                                    </button>
                                    <button 
                                        onClick={() => setSearchQuery("Can you explain this concept?")}
                                        className="block w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm text-foreground"
                                    >
                                        Can you explain this concept?
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* AI Input */}
                        <form onSubmit={handleAIChat}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="How do I get started?"
                                    className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={!searchQuery.trim() || isLoading}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Search Results - only show in search view */}
                {currentView === 'search' && (
                    <div className="flex-1 overflow-y-auto">
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
                )}

                {/* AI Chat Results - only show in AI view */}
                {currentView === 'ai' && (
                    <div className="flex-1 overflow-y-auto">
                        {hasSearched && (
                            <div className="p-4 border-t border-border">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        <span className="ml-2 text-muted-foreground">Thinking...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* AI Response */}
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <Sparkles className="h-4 w-4 text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <div 
                                                        className="text-foreground whitespace-pre-wrap"
                                                        dangerouslySetInnerHTML={{
                                                            __html: aiResponse
                                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                                .replace(/\n/g, '<br>')
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Sources */}
                                        {aiSources.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-foreground mb-3">Sources</h4>
                                                <div className="space-y-2">
                                                    {aiSources.map((source, index) => (
                                                        <Link
                                                            key={index}
                                                            href={source.url}
                                                            onClick={handleClose}
                                                            className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-shrink-0">
                                                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium text-foreground truncate">
                                                                        {source.title}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {source.contentType}
                                                                    </p>
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
