"use client";

import { addChild, switchChild, useChildren } from "@/components/useProfile";
import { MAX_CHILDREN } from "@/lib/learner/model";

const ADD = "__add";

/** Which child is learning, in the top bar. Hidden until there is a child to show. */
export function ChildSwitcher() {
  const { children, current, canAdd } = useChildren();
  if (!children.length) return null;
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
export function ChildTabs() {
  const { children, current } = useChildren();
  return (
    <div className="tabs no-print" role="tablist" aria-label="Your children">
      {children.map((c) => (
        <button
          key={c.id ?? c.name}
          type="button"
          role="tab"
          aria-selected={c.id === current}
          className={`tab${c.id === current ? " active" : ""}`}
          onClick={() => c.id && c.id !== current && switchChild(c.id)}
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
