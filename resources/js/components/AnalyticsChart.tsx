import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
    title: string;
    data?: { label: string; value: number }[];
    emptyMessage?: string;
};

export function AnalyticsChart({ title, data, emptyMessage = 'No data available yet.' }: Props) {
    const maxValue = data ? Math.max(...data.map((d) => d.value), 1) : 1;

    return (
        <Card>
            <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
            <CardContent>
                {!data || data.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">{emptyMessage}</p>
                ) : (
                    <div className="space-y-3">
                        {data.map((item) => (
                            <div key={item.label} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>{item.label}</span>
                                    <span className="font-medium">{item.value}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all"
                                        style={{ width: `${(item.value / maxValue) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
