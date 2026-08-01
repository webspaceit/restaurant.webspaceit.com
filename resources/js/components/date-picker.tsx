import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/ui/calendar';
import * as Popover from '@radix-ui/react-popover';

type Props = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    min?: Date;
    disabled?: (date: Date) => boolean;
    placeholder?: string;
    className?: string;
};

export default function DatePicker({ value, onChange, min, disabled, placeholder = 'Pick a date', className }: Props) {
    const [open, setOpen] = useState(false);

    const handleSelect = useCallback(
        (d: Date) => {
            onChange?.(d);
            setOpen(false);
        },
        [onChange],
    );

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full h-12 pl-3 pr-4 text-left font-normal justify-start gap-3',
                        !value && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span>{value ? format(value, 'EEEE, MMMM d, yyyy') : placeholder}</span>
                </Button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    align="start"
                    sideOffset={4}
                    className="z-50 w-auto rounded-lg border bg-popover p-0 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                >
                    <Calendar selected={value} onSelect={handleSelect} min={min} disabled={disabled} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
