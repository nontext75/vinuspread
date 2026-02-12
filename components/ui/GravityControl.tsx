'use client';

import { useState, useEffect } from 'react';

interface GravityControlProps {
    onGravityChange?: (mode: string, intensity: number) => void;
    apiKey?: string;
}

interface GravityField {
    x: number;
    y: number;
    z: number;
    strength: number;
}

export default function GravityControl({ onGravityChange, apiKey }: GravityControlProps) {
    const [gravityMode, setGravityMode] = useState<'normal' | 'zero' | 'reverse'>('normal');
    const [intensity, setIntensity] = useState(50);
    const [isConnected, setIsConnected] = useState(false);
    const [googleGravityData, setGoogleGravityData] = useState<any>(null);
    const [isCalibrating, setIsCalibrating] = useState(false);

    // Google AI API로 안티그래비티 데이터 받기
    const fetchGravityData = async () => {
        if (!apiKey) return;

        setIsCalibrating(true);
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Generate anti-gravity field parameters for intensity ${intensity}/100 in ${gravityMode} mode. Return as JSON with fields: field_strength, resonance_frequency, stability_factor, power_consumption`
                        }]
                    }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                setGoogleGravityData(data.candidates[0].content.parts[0].text);
                setIsConnected(true);
            }
        } catch (error) {
            console.error('Google Gravity API Error:', error);
        } finally {
            setIsCalibrating(false);
        }
    };

    useEffect(() => {
        fetchGravityData();
    }, [intensity, gravityMode, apiKey]);

    const handleModeChange = (mode: 'normal' | 'zero' | 'reverse') => {
        setGravityMode(mode);
        if (onGravityChange) {
            onGravityChange(mode, intensity);
        }
    };

    const handleIntensityChange = (value: number) => {
        setIntensity(value);
        if (onGravityChange) {
            onGravityChange(gravityMode, value);
        }
    };

    // 실시간 중력장 시뮬레이션
    const [gravityField, setGravityField] = useState<GravityField[]>([]);

    useEffect(() => {
        const field: GravityField[] = [];
        const gridSize = 5;
        
        for (let x = -gridSize; x <= gridSize; x++) {
            for (let z = -gridSize; z <= gridSize; z++) {
                const distance = Math.sqrt(x * x + z * z);
                let strength = 0;
                
                if (gravityMode === 'reverse') {
                    strength = (intensity / 100) * 9.8 * (1 - distance / gridSize);
                } else if (gravityMode === 'zero') {
                    strength = (1 - intensity / 100) * 9.8;
                } else {
                    strength = 9.8;
                }
                
                field.push({
                    x,
                    y: 0,
                    z,
                    strength
                });
            }
        }
        
        setGravityField(field);
    }, [gravityMode, intensity]);

    return (
        <div className="bg-black/90 backdrop-blur-md p-6 rounded-lg text-white border border-cyan-500/30">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">🌍 안티그래비티 제어 시스템</h2>
            
            {/* 구글 연결 상태 */}
            <div className="mb-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className="text-sm">
                    {isConnected ? 'Google AI 연결됨' : 'Google AI 연결 안됨'}
                </span>
                {isCalibrating && <span className="text-yellow-400 text-sm">캘리브레이션 중...</span>}
            </div>

            {/* 중력 모드 선택 */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-cyan-300">중력 모드</label>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => handleModeChange('normal')}
                        className={`p-3 rounded border transition-all ${gravityMode === 'normal' 
                            ? 'bg-blue-600 border-blue-400 text-white' 
                            : 'bg-gray-800 border-gray-600 hover:border-blue-500'}`}
                    >
                        🌍 정상 중력
                    </button>
                    <button
                        onClick={() => handleModeChange('zero')}
                        className={`p-3 rounded border transition-all ${gravityMode === 'zero' 
                            ? 'bg-cyan-600 border-cyan-400 text-white' 
                            : 'bg-gray-800 border-gray-600 hover:border-cyan-500'}`}
                    >
                        🚀 무중력
                    </button>
                    <button
                        onClick={() => handleModeChange('reverse')}
                        className={`p-3 rounded border transition-all ${gravityMode === 'reverse' 
                            ? 'bg-purple-600 border-purple-400 text-white' 
                            : 'bg-gray-800 border-gray-600 hover:border-purple-500'}`}
                    >
                        🔄 반중력
                    </button>
                </div>
            </div>

            {/* 강도 조절 */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-cyan-300">
                    안티그래비티 강도: {intensity}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => handleIntensityChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>

            {/* 중력장 시각화 */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-cyan-300">중력장 분석</h3>
                <div className="grid grid-cols-11 gap-1 h-32 bg-gray-900 p-2 rounded">
                    {gravityField.map((point, index) => (
                        <div
                            key={index}
                            className="rounded"
                            style={{
                                backgroundColor: `rgba(0, 255, 255, ${Math.abs(point.strength) / 10})`,
                                boxShadow: point.strength > 0 
                                    ? `0 0 ${Math.abs(point.strength)}px rgba(0, 255, 255, 0.8)`
                                    : `0 0 ${Math.abs(point.strength)}px rgba(255, 0, 255, 0.8)`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Google AI 데이터 */}
            {googleGravityData && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-cyan-300">Google AI 분석 데이터</h3>
                    <pre className="bg-gray-900 p-3 rounded text-xs text-green-400 overflow-auto">
                        {googleGravityData}
                    </pre>
                </div>
            )}

            {/* 통계 정보 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-3 rounded">
                    <div className="text-2xl font-bold text-cyan-400">
                        {gravityMode === 'zero' ? '0.0' : 
                         gravityMode === 'reverse' ? `-${(intensity / 100 * 9.8).toFixed(1)}` : '9.8'}
                    </div>
                    <div className="text-xs text-gray-400">중력 (m/s²)</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                    <div className="text-2xl font-bold text-cyan-400">
                        {Math.round(intensity * 9.81)}%
                    </div>
                    <div className="text-xs text-gray-400">안티-효율</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                    <div className="text-2xl font-bold text-cyan-400">
                        {Math.round(gravityField.length * (intensity / 100))}
                    </div>
                    <div className="text-xs text-gray-400">활성 필드</div>
                </div>
            </div>

            {/* 제어 버튼 */}
            <div className="flex gap-2">
                <button
                    onClick={fetchGravityData}
                    disabled={isCalibrating}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded text-white transition-colors"
                >
                    🔄 재캘리브레이션
                </button>
                <button
                    onClick={() => {
                        setGravityMode('normal');
                        setIntensity(50);
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
                >
                    🔧 리셋
                </button>
            </div>
        </div>
    );
}