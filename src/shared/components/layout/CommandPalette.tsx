/**
 * Global command palette — the header's ⌘K surface.
 *
 * One keyboard-first list that unifies the three things a CRM user reaches for
 * all day: find a record, create a record, jump to a section.
 *  - empty query  → Quick create · Recent leads · Go to (all nav)
 *  - typing (2+)  → Lead search results · matching Go to · matching Quick create
 *
 * Arrow keys move the selection across the whole flat list, Enter activates,
 * Esc (or a backdrop click) closes. Focus is trapped to the dialog and restored
 * to the trigger on close.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, CornerDownLeft, Plus, ArrowRight, Clock, User,
  DollarSign, ListChecks, Megaphone,
} from 'lucide-react';
import { DrawerType } from '../../constants/enums';
import { sidebarAdminItem, sidebarNavGroups, sidebarSettingsItem } from '../../constants/sidebar';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { useGlobalLeadSearch } from '../../../features/enquiries/hooks/useGlobalLeadSearch';
import './CommandPalette.css';

type LucideIcon = typeof Search;

interface CreateItem { kind: 'create'; id: string; label: string; icon: LucideIcon; type: DrawerType; keywords: string; }
interface NavItem { kind: 'nav'; id: string; label: string; icon: LucideIcon; path: string; keywords: string; }
interface LeadItem { kind: 'lead'; id: string; label: string; sub: string; status?: string; phone: string; }
type CmdItem = CreateItem | NavItem | LeadItem;

const CREATE_ITEMS: CreateItem[] = [
  { kind: 'create', id: 'c-lead', label: 'New lead', icon: User, type: DrawerType.LEAD, keywords: 'create add lead contact' },
  { kind: 'create', id: 'c-deal', label: 'New deal', icon: DollarSign, type: DrawerType.DEAL, keywords: 'create add deal opportunity' },
  { kind: 'create', id: 'c-task', label: 'New task', icon: ListChecks, type: DrawerType.TASK, keywords: 'create add task todo follow up' },
  { kind: 'create', id: 'c-campaign', label: 'New campaign', icon: Megaphone, type: DrawerType.CAMPAIGN, keywords: 'create add campaign' },
];

const NAV_ITEMS: NavItem[] = [
  ...sidebarNavGroups.flatMap((g) => g.items),
  sidebarAdminItem,
  sidebarSettingsItem,
].map((item) => ({
  kind: 'nav' as const,
  id: `n-${item.path}`,
  label: item.label,
  icon: item.icon as LucideIcon,
  path: item.path,
  keywords: item.label.toLowerCase(),
}));

interface Section { title: string; items: CmdItem[]; }

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickCreate: (type: DrawerType) => void;
}

const CommandPalette = ({ isOpen, onClose, onQuickCreate }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { recent, addRecent } = useRecentSearches();
  const [committedQuery, setCommittedQuery] = useState('');
  const { searchValue: query, handleSearchChange, resetSearch } = useDebouncedSearch(setCommittedQuery, 250);
  const { results, isLoading } = useGlobalLeadSearch(committedQuery);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const trimmed = query.trim();
  const searching = trimmed.length >= 2;

  const sections = useMemo<Section[]>(() => {
    if (searching) {
      const q = trimmed.toLowerCase();
      const leads: LeadItem[] = results.map((r) => ({
        kind: 'lead',
        id: `l-${r.id}`,
        label: r.name,
        sub: [r.phone, r.source].filter(Boolean).join(' · '),
        phone: r.phone,
        ...(r.status ? { status: r.status } : {}),
      }));
      const nav = NAV_ITEMS.filter((n) => n.keywords.includes(q));
      const create = CREATE_ITEMS.filter((c) => c.keywords.includes(q));
      return [
        { title: isLoading ? 'Searching…' : `Leads${leads.length ? ` (${leads.length})` : ''}`, items: leads },
        { title: 'Go to', items: nav },
        { title: 'Create', items: create },
      ].filter((s) => s.items.length > 0 || s.title === 'Searching…');
    }
    const recentItems: LeadItem[] = recent.map((r) => ({
      kind: 'lead', id: `r-${r.id}`, label: r.name, sub: r.phone, phone: r.phone,
    }));
    return [
      { title: 'Quick create', items: CREATE_ITEMS },
      ...(recentItems.length ? [{ title: 'Recent', items: recentItems }] : []),
      { title: 'Go to', items: NAV_ITEMS },
    ];
  }, [searching, trimmed, results, isLoading, recent]);

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  useEffect(() => setActiveIndex(0), [committedQuery, searching, flat.length]);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      resetSearch();
      setCommittedQuery('');
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen, resetSearch]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!isOpen) return null;

  const runItem = (item: CmdItem) => {
    if (item.kind === 'create') {
      onClose();
      onQuickCreate(item.type);
    } else if (item.kind === 'nav') {
      navigate(item.path);
      onClose();
    } else {
      addRecent({ id: item.id.replace(/^[lr]-/, ''), name: item.label, phone: item.phone });
      navigate(`/leads?search=${encodeURIComponent(item.phone || item.label)}`);
      onClose();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
    if (!flat.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((i) => (i + 1) % flat.length); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((i) => (i - 1 + flat.length) % flat.length); }
    else if (event.key === 'Enter') { event.preventDefault(); const it = flat[activeIndex]; if (it) runItem(it); }
  };

  let runningIndex = -1;

  return (
    <div className="cmdk" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="cmdk__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
      >
        <div className="cmdk__field">
          <Search size={18} className="cmdk__field-icon" />
          <input
            ref={inputRef}
            className="cmdk__input"
            type="text"
            placeholder="Search leads, create records, or jump to a section…"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-activedescendant={flat[activeIndex]?.id}
            aria-controls="cmdk-list"
            role="combobox"
            aria-expanded="true"
          />
          <kbd className="cmdk__esc">Esc</kbd>
        </div>

        <div className="cmdk__list" id="cmdk-list" role="listbox" ref={listRef}>
          {flat.length === 0 && !isLoading && (
            <div className="cmdk__empty">No matches for “{trimmed}”</div>
          )}
          {sections.map((section) => (
            <div className="cmdk__section" key={section.title}>
              <div className="cmdk__section-title">{section.title}</div>
              {section.items.map((item) => {
                runningIndex += 1;
                const index = runningIndex;
                const active = index === activeIndex;
                return (
                  <button
                    type="button"
                    key={item.id}
                    id={item.id}
                    role="option"
                    aria-selected={active}
                    data-active={active}
                    className={`cmdk__item${active ? ' is-active' : ''}`}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => runItem(item)}
                  >
                    <span className="cmdk__item-icon">
                      {item.kind === 'lead'
                        ? (item.id.startsWith('r-') ? <Clock size={16} /> : <User size={16} />)
                        : item.kind === 'create'
                          ? <Plus size={16} />
                          : <item.icon size={16} />}
                    </span>
                    <span className="cmdk__item-body">
                      <span className="cmdk__item-label">{item.label}</span>
                      {item.kind === 'lead' && item.sub && (
                        <span className="cmdk__item-sub">{item.sub}</span>
                      )}
                    </span>
                    {item.kind === 'lead' && item.status && (
                      <span className="cmdk__item-tag">{item.status}</span>
                    )}
                    {item.kind === 'nav' && <ArrowRight size={14} className="cmdk__item-hint" />}
                    {active && <CornerDownLeft size={14} className="cmdk__item-enter" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmdk__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
