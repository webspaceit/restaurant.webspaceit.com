import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isBefore,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
    selected?: Date;
    onSelect?: (date: Date) => void;
    min?: Date;
    disabled?: (date: Date) => boolean;
    className?: string;
};

const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function Calendar({ selected, onSelect, min, disabled, className }: Props) {
    const [viewMonth, setViewMonth] = useState(selected ?? new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(viewMonth)),
        end: endOfWeek(endOfMonth(viewMonth)),
    });

    const isDisabled = useCallback(
        (d: Date) => {
            if (min && isBefore(d, min)) return true;
            return disabled?.(d) ?? false;
        },
        [min, disabled],
    );

    const canGoBack = !min || isBefore(startOfMonth(min), startOfMonth(viewMonth));

    return (
        <div className={cn('p-3', className)}>
            <div className="flex items-center justify-between mb-3">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMonth((m) => subMonths(m, 1))}
                    disabled={!canGoBack}
                    className="h-7 w-7"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                    {format(viewMonth, 'MMMM yyyy')}
                </span>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMonth((m) => addMonths(m, 1))}
                    className="h-7 w-7"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-7 gap-0">
                {dayLabels.map((label) => (
                    <div key={label} className="flex h-8 items-center justify-center text-xs text-muted-foreground">
                        {label}
                    </div>
                ))}
                {days.map((d) => {
                    const disabledDay = isDisabled(d);
                    const isSelected = selected && isSameDay(d, selected);
                    return (
                        <Button
                            key={d.toISOString()}
                            type="button"
                            variant="ghost"
                            disabled={disabledDay}
                            onClick={() => onSelect?.(d)}
                            className={cn(
                                'h-8 w-8 p-0 text-sm font-normal',
                                !isSameMonth(d, viewMonth) && 'text-muted-foreground/40',
                                isToday(d) && !isSelected && 'border border-primary/40',
                                isSelected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                                !isSelected && !disabledDay && 'hover:bg-accent hover:text-accent-foreground',
                                disabledDay && 'opacity-40 cursor-not-allowed',
                            )}
                        >
                            {format(d, 'd')}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
