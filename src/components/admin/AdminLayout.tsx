import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

type AdminLayoutProps = {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
};

import { adminModuleCategories } from "./adminModules";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AdminLayout = ({ children, activeView, setActiveView }: AdminLayoutProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>(() => {
    // Find which category contains the active view and open it by default
    const activeCategory = adminModuleCategories.find(category =>
      category.items.some(item => item.key === activeView)
    );
    return activeCategory ? [activeCategory.key] : ['dashboard'];
  });

  const toggleCategory = (categoryKey: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryKey)
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-semibold text-sidebar-primary">SWENLOG Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <div className="space-y-1">
            {adminModuleCategories.map((category) => {
              const isOpen = openCategories.includes(category.key);
              const hasActiveItem = category.items.some(item => item.key === activeView);
              
              return (
                <Collapsible
                  key={category.key}
                  open={isOpen}
                  onOpenChange={() => toggleCategory(category.key)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm font-medium transition-colors
                      ${hasActiveItem ? 'text-sidebar-primary bg-sidebar-accent' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'}
                    `}>
                      <div className="flex items-center">
                        <category.icon className="mr-3 h-4 w-4" />
                        {category.label}
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="pb-1">
                    <div className="ml-4 space-y-1">
                      {category.items.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setActiveView(item.key)}
                          className={`flex w-full items-center px-4 py-2 text-sm rounded-none text-left transition-colors
                            ${
                              activeView === item.key
                                ? 'text-sidebar-primary bg-sidebar-accent font-medium border-r-2 border-sidebar-primary'
                                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            to="/"
            className="flex items-center text-sm text-sidebar-foreground hover:text-sidebar-primary transition-colors"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
