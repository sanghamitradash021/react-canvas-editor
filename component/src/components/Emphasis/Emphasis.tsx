import React, { useState, useEffect } from 'react'
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DOMEventHandlers, IRangeStyle } from "@mindfiredigital/canvas-editor";

const buttonStyle = { border: '0px', marginRight: '1px' };
export const Emphasis = (_props: any) => {
    const [contentStyles, setContentStyles] = useState<IRangeStyle | undefined>();
    const [boldButtonStyle, setBoldButtonStyle] = useState(buttonStyle);
    const [italicButtonStyle, setItalicButtonStyle] = useState(buttonStyle);
    const [underlinedButtonStyle, setUnderlinedButtonStyle] = useState(buttonStyle);

    useEffect(() => {
        _props?.toolbarClass?.item?.bold && setBoldButtonStyle(Object.assign(buttonStyle, _props?.toolbarClass?.item?.bold));
        _props?.toolbarClass?.item?.italic && setItalicButtonStyle(Object.assign(buttonStyle, _props?.toolbarClass?.item?.italic));
        _props?.toolbarClass?.item?.underlined && setUnderlinedButtonStyle(Object.assign(buttonStyle, _props?.toolbarClass?.item?.underline));
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let attached = false;

        const tryAttach = () => {
            try {
                const editor: any = (DOMEventHandlers as any).getEditorInstance?.();
                if (!editor?.listener) return false;
                editor.listener.rangeStyleChange = (payload: IRangeStyle) => {
                    setContentStyles(payload);
                };
                return true;
            } catch { return false; }
        };

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                const editorDom = document.querySelector('.canvas-editor');
                if (!editorDom) return;
                if (!attached) attached = tryAttach();
                try {
                    const data = DOMEventHandlers.getContentStyles();
                    if (data) setContentStyles(data);
                } catch (e) {}
            }, 100);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            try {
                const editor: any = (DOMEventHandlers as any).getEditorInstance?.();
                if (editor?.listener) editor.listener.rangeStyleChange = null;
            } catch {}
        };
    }, []);

    const formats = [
        contentStyles?.bold && 'bold',
        contentStyles?.italic && 'italic',
        contentStyles?.underline && 'underlined',
    ].filter(Boolean) as string[];

    return (
        <ToggleButtonGroup
            size='small'
            value={formats}
            aria-label="text formatting"
            {...({ 'editor-component': 'toolbar' } as any)}
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
                const t = e.target as HTMLElement
                if (t && t.closest('input, textarea, [contenteditable="true"]')) return
                e.preventDefault()
            }}
        >
            {_props?.toolbar?.bold &&
                <ToggleButton sx={boldButtonStyle} value="bold" aria-label="bold" onMouseDown={(e) => e.preventDefault()} onClick={DOMEventHandlers.handleBold}>
                    <FormatBoldIcon />
                </ToggleButton>
            }
            {_props?.toolbar?.italic &&
                <ToggleButton sx={italicButtonStyle} value="italic" aria-label="italic" onMouseDown={(e) => e.preventDefault()} onClick={DOMEventHandlers.handleItalic}>
                    <FormatItalicIcon />
                </ToggleButton>}
            {_props?.toolbar?.underline &&
                <ToggleButton sx={underlinedButtonStyle} value="underlined" aria-label="underlined" onMouseDown={(e) => e.preventDefault()} onClick={DOMEventHandlers.handleUnderline}>
                    <FormatUnderlinedIcon />
                </ToggleButton>}
        </ToggleButtonGroup>
    );
}
