export type ProjectMetaItem = {
  label: string;
  value: string;
};

export function ProjectMetaGrid({ items }: { items: readonly ProjectMetaItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-8">
      {items.map((item) => (
        <div key={item.label} className="flex min-w-0 flex-col gap-2 md:gap-3">
          <dt className="type-label font-normal text-vinus-ink/65 md:font-medium md:text-vinus-ink/45">{item.label}</dt>
          <dd className="type-body break-words font-medium text-vinus-ink md:type-lead md:font-normal md:text-vinus-ink/65">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
