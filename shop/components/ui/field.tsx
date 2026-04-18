import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type Props = {
  id?: string;
  label: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export function Field({
  id,
  label,
  className,
  labelClassName,
  children,
}: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      {children}
    </div>
  );
}
