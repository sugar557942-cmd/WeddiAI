import { useState, useLayoutEffect, RefObject } from 'react';

interface UseOverflowProtectionProps {
    ref: RefObject<HTMLElement>;
    maxAttempts?: number;
    enabled?: boolean;
}

export function useOverflowProtection({ ref, maxAttempts = 3, enabled = true }: UseOverflowProtectionProps) {
    const [reductionLevel, setReductionLevel] = useState(0);

    useLayoutEffect(() => {
        if (!enabled || !ref.current) return;

        // Reset if we re-render and somehow have more space (rare in print, but good practice)
        // Actually, for this specific use case, we want to monotonically increase reduction
        // until fit, or stop. No going back unless component unmounts.

        const checkOverflow = () => {
            const element = ref.current;
            if (!element) return;

            // Check if content overflows. 
            // Logic: scrollHeight > clientHeight (approx)
            // For safety, we can add a buffer, e.g., 20px
            // In print context, clientHeight might be large if container is flexible, 
            // so we might need to enforce a "Print Height Limit" via props or context if not naturally constrained.
            // But for now, assuming the container has a max-height or fixed height in print CSS.

            // However, relying on fixed height CSS might be tricky if "Strict Reset" set height: auto.
            // We need to KNOW what the safety limit is. 
            // A4 printable height (approx) = 297mm - 24mm (margins) = 273mm.
            // 273mm in pixels (96dpi) approx 1031px.
            // Let's use a configurable max height or measure logical height.

            const SAFE_HEIGHT_PX = 1030; // Approx 273mm
            const currentHeight = element.scrollHeight;

            if (currentHeight > SAFE_HEIGHT_PX && reductionLevel < maxAttempts) {
                // Trigger reduction
                console.log(`[Overflow Detected] Height: ${currentHeight} > ${SAFE_HEIGHT_PX}. Reducing density to ${reductionLevel + 1}`);
                setReductionLevel(prev => prev + 1);
            }
        };

        // Run check
        checkOverflow();

    }, [enabled, reductionLevel, maxAttempts, ref]); // Re-run when level changes to check if it's enough

    return reductionLevel;
}
