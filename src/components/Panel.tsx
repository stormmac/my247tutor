import { useId, type ReactNode } from "react";

/** The colours of the Student page's panels. */
export type PanelColour = "teacher" | "diy" | "practice" | "games" | "account";

/**
 * A coloured panel with a round icon beside its heading, as on the Student page. Used on the
 * Family, Classes and Centre pages too, so every portal looks the same.
 */
export function Panel({
  colour,
  icon,
  title,
  action,
  className,
  children,
}: {
  colour: PanelColour;
  icon: string;
  title: ReactNode;
  /** A button beside the heading. */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  const heading = (
    <h2 id={id} className="section-title">
      <span className="section-icon" aria-hidden>
        {icon}
      </span>{" "}
      {title}
    </h2>
  );
  return (
    <section className={`stack home-section section-${colour}${className ? ` ${className}` : ""}`} aria-labelledby={id}>
      {action ? (
        <div className="row spread" style={{ gap: 8 }}>
          {heading}
          {action}
        </div>
      ) : (
        heading
      )}
      {children}
    </section>
  );
}
