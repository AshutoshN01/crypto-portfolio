import EmptyState from '../components/ui/EmptyState'

interface PlaceholderPageProps {
  title: string
  description: string
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </section>
      <EmptyState title={`${title} workspace`} description="The route, shell, and design-system foundations are ready for feature implementation." />
    </div>
  )
}
