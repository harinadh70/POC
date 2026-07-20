import { useEffect, useRef, useState } from 'react';
import { useNavigation } from 'react-router';

// VBS: Eebrowser second_window_onload lines 374-379
// After page load completes, update the menu frame's timing display.
// Legacy: mobjMenuFrame.UpdateInfo()  — showed mlngTimeBOProcessing in the menu bar.
//
// React equivalent: measure time from navigation start to idle, display in header.

export function usePageLoadTiming(): number | null {
    const navigation = useNavigation();
    const [timing, setTiming] = useState<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (navigation.state === 'loading') {
            startTimeRef.current = performance.now();
            setTiming(null);
        } else if (navigation.state === 'idle' && startTimeRef.current !== null) {
            setTiming(Math.round(performance.now() - startTimeRef.current));
            startTimeRef.current = null;
        }
    }, [navigation.state]);

    return timing;
}
