import React, { useState, useEffect } from 'react';

const DebugConsole = () => {
    const [logs, setLogs] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Override console.log
        const originalLog = console.log;
        console.log = (...args) => {
            originalLog(...args);
            setLogs(prev => [...prev, { type: 'log', msg: args.join(' ') }]);
        };

        // Override console.error
        const originalError = console.error;
        console.error = (...args) => {
            originalError(...args);
            setLogs(prev => [...prev, { type: 'error', msg: args.join(' ') }]);
        };

        // Override console.warn
        const originalWarn = console.warn;
        console.warn = (...args) => {
            originalWarn(...args);
            setLogs(prev => [...prev, { type: 'warn', msg: args.join(' ') }]);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
        }
    }, []);

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white p-2 rounded-full shadow-lg text-xs font-mono opacity-50 hover:opacity-100"
            >
                DEBUG
            </button>
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full h-1/2 bg-black/90 text-green-400 font-mono text-xs z-[9999] overflow-auto p-4 border-b border-white/20">
            <div className="flex justify-between items-center mb-2 sticky top-0 bg-black/90 pb-2 border-b border-white/10">
                <h3 className="font-bold text-white">Debug Console</h3>
                <div className="flex gap-2">
                    <button onClick={() => setLogs([])} className="bg-slate-700 px-2 py-1 rounded text-white">Clear</button>
                    <button onClick={() => setIsVisible(false)} className="bg-red-600 px-2 py-1 rounded text-white">Min</button>
                </div>
            </div>
            <div className="space-y-1">
                {logs.map((log, i) => (
                    <div key={i} className={`p-1 border-b border-white/5 ${log.type === 'error' ? 'text-red-400 bg-red-900/20' :
                            log.type === 'warn' ? 'text-yellow-400 bg-yellow-900/20' :
                                'text-slate-300'
                        }`}>
                        <span className="opacity-50 uppercase text-[10px] mr-2">[{log.type}]</span>
                        {log.msg}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DebugConsole;
