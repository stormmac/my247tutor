"use client";

import { useAccount } from "@/components/useAccount";
import { addChild, switchChild, useChildren } from "@/components/useProfile";
import { MAX_CHILDREN } from "@/lib/learner/model";

const ADD = "__add";

/** Which child is learning, in the top bar. Hidden until there is a child to show, and for a child signed in on their own. */
export function ChildSwitcher() {
  const { children, current, canAdd } = useChildren();
  const { user } = useAccount();
  if (!children.length || user?.child) return null;
  return (
    <select
      className="child-switcher"
      aria-label="Child"
      title="Switch child"
      value={current ?? ADD}
      onChange={(e) => (e.target.value === ADD ? addChild() : switchChild(e.target.value))}
    >
      {!current && <option value={ADD}>New child</option>}
      {children.map((c) => (
        <option key={c.id ?? c.name} value={c.id}>
          {c.name}
        </option>
      ))}
      {current && canAdd && <option value={ADD}>+ Add a child</option>}
    </select>
  );
}

/** The parent page's row of children, one tab each, with room to add up to three. */
export function ChildTabs({ elsewhere = false, onSelect }: { elsewhere?: boolean; onSelect?: () => void } = {}) {
  const { children, current } = useChildren();
  // `elsewhere`: the page is showing another child (such as one at a centre), so none of these is selected.
  const selected = (id: string | undefined) => !elsewhere && id === current;
  return (
    <div className="tabs no-print" role="tablist" aria-label="Your children">
      {children.map((c) => (
        <button
          key={c.id ?? c.name}
          type="button"
          role="tab"
          aria-selected={selected(c.id)}
          className={`tab${selected(c.id) ? " active" : ""}`}
          onClick={() => {
            onSelect?.();
            if (c.id && c.id !== current) switchChild(c.id);
          }}
        >
          {c.name}
        </button>
      ))}
      {children.length < MAX_CHILDREN && (
        <button type="button" className="tab" onClick={() => addChild()} title={`Up to ${MAX_CHILDREN} children`}>
          + Add a child
        </button>
      )}
    </div>
  );
}
