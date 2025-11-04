import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../utils/helpers';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string | HTMLElement;
  maxLevel?: number;
  className?: string;
  sticky?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  maxLevel = 3,
  className = '',
  sticky = true,
}) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Parse headings from content
    const parseHeadings = () => {
      let container: HTMLElement | null = null;

      if (typeof content === 'string') {
        // If content is HTML string, create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = content;
        container = temp;
      } else {
        // If content is an HTMLElement
        container = content;
      }

      if (!container) return [];

      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const items: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level <= maxLevel) {
          const text = heading.textContent || '';
          let id = heading.id;

          // If heading doesn't have an ID, create one
          if (!id) {
            id = `heading-${index}-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
            heading.id = id;
          }

          items.push({ id, text, level });
        }
      });

      return items;
    };

    const items = parseHeadings();
    setTocItems(items);
  }, [content, maxLevel]);

  useEffect(() => {
    // Track active heading on scroll
    const handleScroll = () => {
      const headings = tocItems.map((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top,
          };
        }
        return null;
      }).filter(Boolean);

      // Find the heading closest to the top of the viewport
      const current = headings.find((heading) => heading && heading.top >= 0 && heading.top <= 150);
      if (current) {
        setActiveId(current.id);
      } else if (headings.length > 0 && headings[0]) {
        // If scrolled past all headings, set the last one as active
        const visibleHeadings = headings.filter((h) => h && h.top < 150);
        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[visibleHeadings.length - 1]!.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const handleClick = (id: string) => {
    smoothScrollTo(id);
  };

  if (tocItems.length === 0) return null;

  return (
    <div
      className={`${className} ${
        sticky ? 'sticky top-24' : ''
      } bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <List size={20} className="text-brand-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Table of Contents</h3>
        </div>
        <ChevronRight
          size={20}
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isCollapsed ? '' : 'rotate-90'
          }`}
        />
      </div>

      {/* TOC Items */}
      {!isCollapsed && (
        <nav className="p-4">
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                className="relative"
              >
                <button
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left text-sm transition-colors duration-200 hover:text-brand-primary ${
                    activeId === item.id
                      ? 'text-brand-primary font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {activeId === item.id && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-brand-primary rounded-r"></span>
                  )}
                  <span className={activeId === item.id ? 'ml-3' : ''}>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
