"use client";

import { useEffect, useRef, useState } from "react";

interface TextTypeProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function TextType({
    texts,
    typingSpeed = 80,
    deletingSpeed = 50,
    pauseDuration = 1500,
    showCursor = true,
    cursorCharacter = "|",
    className = "",
    style,
}: TextTypeProps) {
    const [displayText, setDisplayText] = useState("");

    // All mutable state lives in refs so the timeout callback always sees fresh values
    const indexRef = useRef(0);          // which text in the array
    const charRef = useRef(0);           // how many chars shown so far
    const deletingRef = useRef(false);   // are we in delete phase?
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const tick = () => {
            const current = texts[indexRef.current];

            if (!deletingRef.current) {
                // ── Typing phase ──────────────────────────────
                charRef.current += 1;
                setDisplayText(current.slice(0, charRef.current));

                if (charRef.current >= current.length) {
                    // Finished typing → pause, then start deleting
                    deletingRef.current = true;
                    timerRef.current = setTimeout(tick, pauseDuration);
                    return;
                }
                timerRef.current = setTimeout(tick, typingSpeed);
            } else {
                // ── Deleting phase ────────────────────────────
                charRef.current -= 1;
                setDisplayText(current.slice(0, charRef.current));

                if (charRef.current <= 0) {
                    // Finished deleting → move to next text
                    deletingRef.current = false;
                    indexRef.current = (indexRef.current + 1) % texts.length;
                    timerRef.current = setTimeout(tick, typingSpeed);
                    return;
                }
                timerRef.current = setTimeout(tick, deletingSpeed);
            }
        };

        timerRef.current = setTimeout(tick, typingSpeed);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount

    return (
        <span className={`text-type ${className}`} style={style}>
            {displayText}
            {showCursor && (
                <span className="text-type__cursor" aria-hidden="true">
                    {cursorCharacter}
                </span>
            )}
        </span>
    );
}
