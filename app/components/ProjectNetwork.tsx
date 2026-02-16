'use client';

import { useState, useCallback } from 'react';

const projects = [
    {
        id: 'market-mapping',
        title: 'Market Mapping',
        description: 'Given a company in a portfolio (or a specific market), our team organizes competitors to understand the competitive landscape, identify market gaps, and find investment opportunities.',
        deliverables: ['Executive Summary', 'Market Landscape Map', 'Competitive Matrix'],
        x: 85, // 0 deg
        y: 50,
    },
    {
        id: 'valuation',
        title: 'Valuation Analysis',
        description: 'Semester-long investigation of an opportunity. We interview founders, perform market evaluation (TAM/SAM/SOM), and model revenue growth (waterfall ARR/MRR).',
        deliverables: ['Executive Summary', 'Public/Private Comps', 'Growth Model'],
        x: 67.5, // 60 deg
        y: 80.3,
    },
    {
        id: 'diligence',
        title: 'Due Diligence',
        description: 'We connect with founders in the Austin area, source pitch decks and financials, then conduct rigorous investment analysis.',
        deliverables: ['Investment Decision', 'Deal Memo'],
        x: 32.5, // 120 deg
        y: 80.3,
    },
    {
        id: 'tech',
        title: 'Tech Projects',
        description: 'The majority of our members are technical. Previous work includes data analytics, compiler development, and diligence automation.',
        deliverables: ['Working Software', 'Technical Docs', 'Integration Support'],
        x: 15, // 180 deg
        y: 50,
    },
    {
        id: 'tooling',
        title: 'Internal Tooling',
        description: 'We develop and test internal tools for partners—sourcing agents, automated outflow managers, revenue modelers, or context-aware inference systems.',
        deliverables: ['Working Platform', 'Integration Docs'],
        x: 32.5, // 240 deg
        y: 19.7,
    },
    {
        id: 'thesis',
        title: 'Thesis Development',
        description: 'Research and develop investment theses. We maintain market maps for sectors of interest, highlight exciting startups, and predict market movement.',
        deliverables: ['Thesis Report', 'Sector Map', 'Partner Presentation'],
        x: 67.5, // 300 deg
        y: 19.7,
    },
];

const connections = [
    { from: 'market-mapping', to: 'valuation' },
    { from: 'valuation', to: 'diligence' },
    { from: 'diligence', to: 'tech' },
    { from: 'tech', to: 'thesis' },
    { from: 'thesis', to: 'tooling' },
    { from: 'tooling', to: 'market-mapping' },
    { from: 'valuation', to: 'thesis' },
    { from: 'market-mapping', to: 'diligence' },
    { from: 'tooling', to: 'tech' },
];

// Animation phases: idle → converging → expanded
type Phase = 'idle' | 'converging' | 'expanded';

export default function ProjectNetwork() {
    const [phase, setPhase] = useState<Phase>('idle');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const activeProject = projects.find(p => p.id === selectedId);

    const getNodePosition = (id: string) => {
        const project = projects.find(p => p.id === id);
        return project ? { x: project.x, y: project.y } : { x: 0, y: 0 };
    };

    const handleNodeClick = useCallback((id: string) => {
        if (phase !== 'idle') return;
        setSelectedId(id);
        setPhase('converging');
        // After nodes converge to center, show the card
        setTimeout(() => setPhase('expanded'), 600);
    }, [phase]);

    const handleClose = useCallback(() => {
        setPhase('converging');
        // Brief pause then scatter back out
        setTimeout(() => {
            setPhase('idle');
            setSelectedId(null);
        }, 100);
    }, []);

    return (
        <div className="relative">
            <div className="relative h-[500px] lg:h-[550px]">

                {/* Connection lines */}
                <svg
                    className="absolute inset-0 w-full h-full transition-opacity duration-500"
                    style={{ opacity: phase === 'idle' ? 1 : 0 }}
                >
                    {connections.map((conn, idx) => {
                        const from = getNodePosition(conn.from);
                        const to = getNodePosition(conn.to);
                        const dx = to.x - from.x;
                        const dy = to.y - from.y;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const duration = 2 + (length / 35);

                        return (
                            <g key={idx}>
                                <line
                                    x1={`${from.x}%`}
                                    y1={`${from.y}%`}
                                    x2={`${to.x}%`}
                                    y2={`${to.y}%`}
                                    stroke="#01A072"
                                    strokeWidth="1"
                                    strokeOpacity="0.3"
                                />

                                <circle r="4" fill="#01A072">
                                    <animate attributeName="cx" values={`${from.x}%;${to.x}%`} dur={`${duration}s`} repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                                    <animate attributeName="cy" values={`${from.y}%;${to.y}%`} dur={`${duration}s`} repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                                    <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${duration}s`} repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                                </circle>

                                <circle r="2" fill="#01A072">
                                    <animate attributeName="cx" values={`${to.x}%;${from.x}%`} dur={`${duration * 1.4}s`} repeatCount="indefinite" begin={`${idx * 0.3 + 1}s`} />
                                    <animate attributeName="cy" values={`${to.y}%;${from.y}%`} dur={`${duration * 1.4}s`} repeatCount="indefinite" begin={`${idx * 0.3 + 1}s`} />
                                    <animate attributeName="opacity" values="0;0.5;0.5;0" dur={`${duration * 1.4}s`} repeatCount="indefinite" begin={`${idx * 0.3 + 1}s`} />
                                </circle>
                            </g>
                        );
                    })}
                </svg>

                {/* Nodes - all converge to center on click */}
                {projects.map((project) => {
                    const isIdle = phase === 'idle';
                    const targetX = isIdle ? project.x : 50;
                    const targetY = isIdle ? project.y : 50;
                    const nodeScale = phase === 'expanded' ? 0 : isIdle ? 1 : 0.7;
                    const nodeOpacity = phase === 'expanded' ? 0 : 1;

                    return (
                        <div
                            key={project.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-out"
                            style={{
                                left: `${targetX}%`,
                                top: `${targetY}%`,
                                transform: `translate(-50%, -50%) scale(${nodeScale})`,
                                opacity: nodeOpacity,
                                zIndex: 10,
                                pointerEvents: isIdle ? 'auto' : 'none',
                            }}
                            onClick={() => handleNodeClick(project.id)}
                        >
                            <div className="group relative">
                                <div className="absolute inset-[-6px] rounded-full border-2 border-[#01A072] opacity-0 group-hover:opacity-40 group-hover:animate-ping"
                                    style={{ animationDuration: '1.5s' }} />

                                <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center border-2 border-[#01A072] bg-[#fcf7f0] group-hover:bg-[#01A072]/10 transition-all duration-300">
                                    <span className={`text-[10px] lg:text-xs font-bold text-center px-1 leading-tight text-[#082820] uppercase tracking-wide transition-opacity duration-300 ${phase === 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                                        {project.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Detail card - appears after nodes converge */}
                <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg transition-all duration-500 ease-out"
                    style={{
                        opacity: phase === 'expanded' ? 1 : 0,
                        transform: `translate(-50%, -50%) scale(${phase === 'expanded' ? 1 : 0.6})`,
                        pointerEvents: phase === 'expanded' ? 'auto' : 'none',
                        zIndex: 40,
                    }}
                >
                    {activeProject && (
                        <div className="bg-[#fcf7f0] border border-[#082820]/15 rounded-2xl p-8 lg:p-10">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#082820]/15 hover:bg-[#082820]/5 flex items-center justify-center transition-colors"
                            >
                                <span className="text-[#082820]/50 text-2xl leading-none">×</span>
                            </button>

                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#01A072] mb-2 block">
                                Engagement Type
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#082820]">{activeProject.title}</h3>
                            <p className="text-base text-[#082820]/60 leading-relaxed mb-6">
                                {activeProject.description}
                            </p>

                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-[#082820]/30 mb-3 block">
                                    Deliverables
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {activeProject.deliverables.map(item => (
                                        <span key={item} className="px-4 py-2 border border-[#082820]/15 text-[#082820]/70 rounded-full text-sm font-medium">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <p
                    className="absolute bottom-4 left-4 text-[#082820]/30 text-xs font-mono transition-opacity duration-500"
                    style={{ opacity: phase === 'idle' ? 1 : 0 }}
                >
                    Click nodes to explore
                </p>
            </div>
        </div>
    );
}
